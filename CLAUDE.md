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

- `@faremeter/info` - Chain and network helpers (e.g. `solana.x402Exact()`, `evm.x402Exact()`)
- `@faremeter/types` - Shared type definitions for x402 payment requirements
- `@faremeter/fetch` - HTTP fetch utilities with x402 support
- `@faremeter/facilitator` - Payment facilitation logic
- `@faremeter/middleware` - Middleware for Hono, Express, and other frameworks
- `@faremeter/payment-evm` - EVM chain payment handling
- `@faremeter/payment-solana` - Solana payment handling
- `@faremeter/wallet-evm` - EVM wallet integration
- `@faremeter/wallet-solana` - Solana wallet integration
- `@faremeter/wallet-crossmint` - Crossmint custodial smart wallet integration
- `@faremeter/wallet-ledger` - Ledger hardware wallet integration
- `@faremeter/wallet-solana-squads` - Solana Squads multisig wallet integration
- `@faremeter/test-harness` - In-process test harness for x402 protocol testing
- `@faremeter/logs` - Configurable logging abstraction (use instead of `console.log`)

**Do not use experimental x402 payment schemes unless explicitly told to do so.**

## Additional Conventions

See `CONVENTIONS.md` for complete development conventions including:

- Package management with pnpm catalog
- TypeScript configuration
- Code style and linting
- Build verification (`make` before completing tasks)

When making changes to code, check whether `CLAUDE.md` and `CONVENTIONS.md` need corresponding updates. When updating either document, check whether the other needs to stay in sync.
