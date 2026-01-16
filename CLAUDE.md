# CLAUDE.md

Instructions for AI agents working in this repository.

## Monorepo Structure

This is a pnpm monorepo. When developing new TypeScript code:

- **Applications** go in `apps/`
- **Shared libraries** go in `packages/`
- **Utility scripts** go in `scripts/`

Do not create standalone TypeScript files in the repository root.

## x402 Payment Protocol

For all x402-related operations, use `@faremeter` packages unless explicitly instructed otherwise. Available packages include:

- `@faremeter/fetch` - HTTP fetch utilities with x402 support
- `@faremeter/facilitator` - Payment facilitation logic
- `@faremeter/middleware` - Middleware for Hono, Express, and other frameworks
- `@faremeter/payment-evm` - EVM chain payment handling
- `@faremeter/payment-solana` - Solana payment handling
- `@faremeter/wallet-evm` - EVM wallet integration
- `@faremeter/wallet-solana` - Solana wallet integration

**Do not use experimental x402 payment schemes unless explicitly told to do so.**

## Additional Conventions

See `CONVENTIONS.md` for complete development conventions including:

- Package management with pnpm catalog
- TypeScript configuration
- Code style and linting
- Build verification (`make` before completing tasks)
