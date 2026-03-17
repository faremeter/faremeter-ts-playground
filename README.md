# What is this repo?

This repo is a starting point for experimenting with x402 payments in TypeScript. It comes pre-configured as a monorepo with all the Faremeter packages available in a shared dependency catalog, so you can focus on building rather than setup.

Use it to:

- **Prototype a paid API** -- add x402 middleware to any HTTP endpoint and start accepting payments on Solana or EVM chains.
- **Explore Faremeter packages** -- the workspace has every `@faremeter/*` package pinned and ready to import.
- **Test payment flows end-to-end** -- point at the testnet facilitator (`facilitator.corbits.dev`) and run through the full request-pay-settle cycle with devnet tokens.

To get started, clone the repo, run `pnpm install`, and create a new app under `apps/`. Each app is a self-contained TypeScript project that can import from the shared catalog. See the Static Pricing Server example under [Adding a New App](#adding-a-new-app) for a working reference.

## What is x402?

> x402 is a payment protocol built on the HTTP `402 Payment Required` status code. It enables programmatic payments between any HTTP client and server without accounts, sessions, or custom authentication.
>
> — [Faremeter: How x402 Works](https://docs.faremeter.xyz/concepts/how-x402-works)

## Prerequisites

- **Node.js** v20+
- **pnpm** v10.12.1+

See [CONVENTIONS.md](CONVENTIONS.md) for project structure, available `@faremeter` packages, development commands, and coding conventions.

## Getting Started

Clone the repository:

```sh
git clone https://github.com/faremeter/faremeter-ts-playground.git
cd faremeter-ts-playground
```

Configure git hooks:

```sh
git config core.hooksPath .githooks
```

Install dependencies:

```sh
pnpm install
```

Verify the setup:

```sh
make
```

## Adding a New App

1. Create a directory under `apps/`:
   ```sh
   mkdir -p apps/my-app/src
   ```
2. Add a `package.json` with dependencies using `catalog:` version specifiers (versions are defined centrally in `pnpm-workspace.yaml`):
   ```json
   {
     "name": "@playground/my-app",
     "version": "0.0.0",
     "private": true,
     "type": "module",
     "dependencies": {
       "@faremeter/middleware": "catalog:",
       "hono": "catalog:"
     }
   }
   ```
3. Run `pnpm install` from the workspace root.

### Example: Static Pricing Server

A Hono-based HTTP server that has endpoint pricing manually configured and accepts payment on Solana and EVM chains.

```ts
// index.ts — requires "type": "module" in package.json
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { createMiddleware } from "@faremeter/middleware/hono";
import { solana, evm } from "@faremeter/info";

const app = new Hono();

const paymentWall = await createMiddleware({
  facilitatorURL: "https://facilitator.corbits.dev",
  accepts: [
    ...solana.x402Exact({
      network: "devnet",
      asset: "USDC",
      amount: "0.01",
      payTo: "YOUR_SOLANA_WALLET_ADDRESS",
    }),
    evm.x402Exact({
      network: 84532, // Base Sepolia
      asset: "USDC",
      amount: "0.01",
      payTo: "0xYOUR_EVM_ADDRESS",
    }),
  ],
});

app.use("/protected/*", paymentWall);

app.get("/protected/data", (c) => {
  return c.json({ msg: "success" });
});

serve(app);
```

The middleware builds x402 payment requirements for both Solana and EVM, and settles the payment through a Faremeter facilitator before serving the response.
