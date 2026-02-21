package channel

import (
	"github.com/spf13/cobra"
)

// NewChannelCmd creates the intu channel subcommand.
func NewChannelCmd(logLevel *string) *cobra.Command {
	cmd := &cobra.Command{
		Use:   "channel",
		Short: "Manage channels",
		Long:  "List, add, and describe channels in an intu project.",
	}

	cmd.AddCommand(newAddCmd(logLevel))
	cmd.AddCommand(newListCmd(logLevel))
	cmd.AddCommand(newDescribeCmd(logLevel))

	return cmd
}
