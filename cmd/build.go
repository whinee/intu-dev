package cmd

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"

	"github.com/spf13/cobra"
)

func newBuildCmd() *cobra.Command {
	var dir string

	cmd := &cobra.Command{
		Use:   "build",
		Short: "Compile TypeScript channels to dist/",
		Long:  "Runs npm run build (tsc) in the project directory to compile channels.",
		Args:  cobra.NoArgs,
		RunE: func(cmd *cobra.Command, args []string) error {
			packageJSON := filepath.Join(dir, "package.json")
			if _, err := os.Stat(packageJSON); err != nil {
				if os.IsNotExist(err) {
					return fmt.Errorf("package.json not found in %s (run intu init first)", dir)
				}
				return fmt.Errorf("stat package.json: %w", err)
			}

			npm := exec.Command("npm", "run", "build")
			npm.Dir = dir
			npm.Stdout = cmd.OutOrStdout()
			npm.Stderr = cmd.ErrOrStderr()
			if err := npm.Run(); err != nil {
				return fmt.Errorf("npm run build: %w", err)
			}

			fmt.Fprintln(cmd.OutOrStdout(), "Build complete.")
			return nil
		},
	}

	cmd.Flags().StringVar(&dir, "dir", ".", "Project root directory")
	return cmd
}
