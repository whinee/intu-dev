package runtime

import "context"

// Engine defines the contract for the future intu runtime implementation.
type Engine interface {
	Start(ctx context.Context) error
	Stop(ctx context.Context) error
}
