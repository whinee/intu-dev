package channel

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/intuware/intu/pkg/config"
	"github.com/intuware/intu/pkg/logging"
	"github.com/spf13/cobra"
)

func newListCmd(logLevel *string) *cobra.Command {
	var dir, profile string

	cmd := &cobra.Command{
		Use:   "list",
		Short: "List all channels in the project",
		Args:  cobra.NoArgs,
		RunE: func(cmd *cobra.Command, args []string) error {
			logger := logging.New(*logLevel)
			loader := config.NewLoader(dir)
			cfg, err := loader.Load(profile)
			if err != nil {
				return fmt.Errorf("load config: %w", err)
			}

			channelsDir := filepath.Join(dir, cfg.ChannelsDir)
			entries, err := os.ReadDir(channelsDir)
			if err != nil {
				if os.IsNotExist(err) {
					fmt.Fprintln(cmd.OutOrStdout(), "No channels found.")
					return nil
				}
				return fmt.Errorf("read channels dir: %w", err)
			}

			for _, e := range entries {
				if !e.IsDir() {
					continue
				}
				channelPath := filepath.Join(channelsDir, e.Name(), "channel.yaml")
				if _, err := os.Stat(channelPath); err != nil {
					if os.IsNotExist(err) {
						continue
					}
					logger.Warn("skip channel", "dir", e.Name(), "error", err)
					continue
				}
				fmt.Fprintln(cmd.OutOrStdout(), e.Name())
			}
			return nil
		},
	}

	cmd.Flags().StringVar(&dir, "dir", ".", "Project root directory")
	cmd.Flags().StringVar(&profile, "profile", "dev", "Config profile")
	return cmd
}
