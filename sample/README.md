# intu Project

Bootstrapped project for the intu interoperability framework.

## Quick Start

1. Review and update configuration files:
   - intu.yaml
   - intu.dev.yaml
   - intu.prod.yaml
   - .env
2. Install transformer runtime dependencies:
   - npm install
3. Run the framework once serve is implemented:
   - intu serve

## Structure

- channels/sample-channel/channel.yaml: sample channel definition.
- channels/sample-channel/transformer.ts: sample transformer using ctx.kafka.publish().
- channels/sample-channel/validator.ts: sample validator.
