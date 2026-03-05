package connector

import (
	"context"
	"encoding/binary"
	"fmt"
	"io"
	"log/slog"
	"net"
	"strconv"
	"sync"
	"time"

	"github.com/intuware/intu/internal/message"
	"github.com/intuware/intu/pkg/config"
)

type DICOMSource struct {
	cfg      *config.DICOMListener
	listener net.Listener
	logger   *slog.Logger
	cancel   context.CancelFunc
	wg       sync.WaitGroup
}

func NewDICOMSource(cfg *config.DICOMListener, logger *slog.Logger) *DICOMSource {
	return &DICOMSource{cfg: cfg, logger: logger}
}

func (d *DICOMSource) Start(ctx context.Context, handler MessageHandler) error {
	addr := ":" + strconv.Itoa(d.cfg.Port)
	ln, err := net.Listen("tcp", addr)
	if err != nil {
		return fmt.Errorf("DICOM listen on %s: %w", addr, err)
	}
	d.listener = ln
	ctx, d.cancel = context.WithCancel(ctx)

	d.wg.Add(1)
	go func() {
		defer d.wg.Done()
		for {
			conn, err := ln.Accept()
			if err != nil {
				select {
				case <-ctx.Done():
					return
				default:
					d.logger.Error("DICOM accept error", "error", err)
					continue
				}
			}
			d.wg.Add(1)
			go func(c net.Conn) {
				defer d.wg.Done()
				defer c.Close()
				d.handleConnection(ctx, c, handler)
			}(conn)
		}
	}()

	aeTitle := d.cfg.AETitle
	if aeTitle == "" {
		aeTitle = "INTU_SCP"
	}

	d.logger.Info("DICOM source (SCP) started",
		"addr", addr,
		"ae_title", aeTitle,
	)
	return nil
}

func (d *DICOMSource) handleConnection(ctx context.Context, conn net.Conn, handler MessageHandler) {
	conn.SetDeadline(time.Now().Add(60 * time.Second))

	for {
		select {
		case <-ctx.Done():
			return
		default:
		}

		pduType, pduData, err := d.readPDU(conn)
		if err != nil {
			if err == io.EOF {
				return
			}
			if netErr, ok := err.(net.Error); ok && netErr.Timeout() {
				return
			}
			d.logger.Debug("DICOM read error", "error", err)
			return
		}

		switch pduType {
		case 0x01:
			d.logger.Debug("DICOM A-ASSOCIATE-RQ received", "size", len(pduData))
			d.sendAssociateAC(conn)

		case 0x04:
			d.logger.Debug("DICOM P-DATA-TF received", "size", len(pduData))
			msg := message.New("", pduData)
			msg.ContentType = "dicom"
			msg.Metadata["source"] = "dicom"
			msg.Metadata["ae_title"] = d.cfg.AETitle
			msg.Metadata["remote_addr"] = conn.RemoteAddr().String()
			msg.Metadata["pdu_type"] = fmt.Sprintf("0x%02X", pduType)

			if err := handler(ctx, msg); err != nil {
				d.logger.Error("DICOM handler error", "error", err)
			}

		case 0x05:
			d.logger.Debug("DICOM A-RELEASE-RQ received")
			d.sendReleaseRP(conn)
			return

		case 0x07:
			d.logger.Debug("DICOM A-ABORT received")
			return

		default:
			d.logger.Debug("DICOM unknown PDU type", "type", fmt.Sprintf("0x%02X", pduType))
			msg := message.New("", pduData)
			msg.ContentType = "dicom"
			msg.Metadata["source"] = "dicom"
			msg.Metadata["pdu_type"] = fmt.Sprintf("0x%02X", pduType)

			if err := handler(ctx, msg); err != nil {
				d.logger.Error("DICOM handler error", "error", err)
			}
		}

		conn.SetDeadline(time.Now().Add(60 * time.Second))
	}
}

func (d *DICOMSource) readPDU(conn net.Conn) (byte, []byte, error) {
	header := make([]byte, 6)
	if _, err := io.ReadFull(conn, header); err != nil {
		return 0, nil, err
	}

	pduType := header[0]
	pduLength := binary.BigEndian.Uint32(header[2:6])

	if pduLength > 16*1024*1024 {
		return pduType, nil, fmt.Errorf("PDU too large: %d bytes", pduLength)
	}

	data := make([]byte, pduLength)
	if _, err := io.ReadFull(conn, data); err != nil {
		return pduType, nil, fmt.Errorf("read PDU body: %w", err)
	}

	return pduType, data, nil
}

func (d *DICOMSource) sendAssociateAC(conn net.Conn) {
	aeTitle := d.cfg.AETitle
	if aeTitle == "" {
		aeTitle = "INTU_SCP"
	}

	paddedAE := fmt.Sprintf("%-16s", aeTitle)
	calledAE := paddedAE
	callingAE := paddedAE

	var pduData []byte
	pduData = append(pduData, 0x00, 0x01)
	pduData = append(pduData, 0x00, 0x00)
	pduData = append(pduData, []byte(calledAE)...)
	pduData = append(pduData, []byte(callingAE)...)
	pduData = append(pduData, make([]byte, 32)...)

	pdu := make([]byte, 6+len(pduData))
	pdu[0] = 0x02
	pdu[1] = 0x00
	binary.BigEndian.PutUint32(pdu[2:6], uint32(len(pduData)))
	copy(pdu[6:], pduData)

	conn.Write(pdu)
}

func (d *DICOMSource) sendReleaseRP(conn net.Conn) {
	pdu := make([]byte, 10)
	pdu[0] = 0x06
	pdu[1] = 0x00
	binary.BigEndian.PutUint32(pdu[2:6], 4)
	conn.Write(pdu)
}

func (d *DICOMSource) Stop(ctx context.Context) error {
	if d.cancel != nil {
		d.cancel()
	}
	if d.listener != nil {
		d.listener.Close()
	}
	d.wg.Wait()
	return nil
}

func (d *DICOMSource) Type() string {
	return "dicom"
}
