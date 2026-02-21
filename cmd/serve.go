package cmd

import (
	"errors"

	"github.com/spf13/cobra"
)

func newServeCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "serve",
		Short: "Start the intu runtime (not implemented yet)",
		RunE: func(cmd *cobra.Command, args []string) error {
			return errors.New("serve is not implemented yet")
		},
	}
}
