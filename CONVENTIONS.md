# Conventions

This document outlines the development conventions for this repository. All contributors (developers and agents) must follow these guidelines.

## Package Management

This repository uses **pnpm** (version 10.12.1+) with a centralized dependency catalog.

### Using the Catalog

**All package references must use the `catalog:` version specifier.** Never hardcode versions directly in package.json files. Versions are defined centrally in `pnpm-workspace.yaml`.

### Adding a New Dependency

1. Add the version to the `catalog` section in `pnpm-workspace.yaml`
2. Reference the package with `"package-name": "catalog:"` in your package.json
3. Run `pnpm install`

**Keep package installations constrained to the locations they're needed. DO NOT install packages at the top-level unless absolutely necessary.**

## @faremeter Packages

**Do not write custom functionality when a @faremeter package already provides the capability.**

Available packages:

| Package                           | Purpose                                                |
| --------------------------------- | ------------------------------------------------------ |
| `@faremeter/types`                | Shared type definitions across the Faremeter ecosystem |
| `@faremeter/info`                 | Information and metadata utilities                     |
| `@faremeter/facilitator`          | Payment facilitation logic                             |
| `@faremeter/fetch`                | HTTP fetch utilities                                   |
| `@faremeter/middleware`           | Middleware utilities                                   |
| `@faremeter/rides`                | Ride management functionality                          |
| `@faremeter/payment-evm`          | EVM chain payment handling                             |
| `@faremeter/payment-solana`       | Solana payment handling                                |
| `@faremeter/wallet-evm`           | EVM wallet integration                                 |
| `@faremeter/wallet-solana`        | Solana wallet integration                              |
| `@faremeter/wallet-crossmint`     | Crossmint custodial smart wallet integration           |
| `@faremeter/wallet-ledger`        | Ledger hardware wallet integration                     |
| `@faremeter/wallet-solana-squads` | Solana Squads multisig wallet integration              |
| `@faremeter/test-harness`         | In-process test harness for x402 protocol testing      |
| `@faremeter/logs`                 | Configurable logging abstraction                       |

Use `@faremeter/logs` for all application logging instead of `console.log`.

Before implementing new functionality, check if an existing @faremeter package provides it.

## TypeScript

Strict TypeScript is enforced with additional strictness flags including `noUncheckedIndexedAccess`, `noImplicitOverride`, and `exactOptionalPropertyTypes`. See `tsconfig.base.json` for the full configuration.

### Imports

- Use explicit type imports (e.g., `import type { Foo }`) due to `verbatimModuleSyntax`
- Use the `node:` prefix for Node.js built-in modules (e.g., `node:fs`, `node:path`)

## Code Style

### Unused Variables

Prefix unused variables with `_` (e.g., `_unusedParam`).

### Formatting

Prettier handles formatting with default configuration. Run `make format` to auto-fix.

### Full Configuration

See `eslint.config.ts` for all linting rules.

## Project Structure

Workspace packages are organized into `apps/`, `packages/`, and `scripts/` directories. See `pnpm-workspace.yaml` for the full workspace configuration.

## Build & Verification

**Developers and agents must run `make` before assuming any task is complete.** A task is not finished until the full build passes (lint, build, and test).

### Makefile Targets

| Target        | Description                         |
| ------------- | ----------------------------------- |
| `make`        | Run lint, build, and test (default) |
| `make lint`   | Run prettier and eslint             |
| `make build`  | Compile TypeScript                  |
| `make test`   | Run tests                           |
| `make format` | Auto-fix formatting issues          |
| `make clean`  | Remove build artifacts and caches   |

## Git Workflow

### Setup

Configure git hooks before making commits: `git config core.hooksPath .githooks`

### Commit Messages

- **Summary line**: Max 72 characters, non-empty
- **Blank line**: Required between summary and body (if body exists)
- **Body lines**: Max 72 characters each

The pre-commit hook automatically runs `make lint` on staged files. See `.githooks/` for hook implementations.

## Testing

Tests use the `tap` framework (node-tap) with TypeScript support via `@tapjs/tsx`.
