# BOA Stack Minimal

## Overview

This project explores optimal configurations for multi-app projects leveraging Cloudflare infrastructure, specifically focusing on microservice architectures utilizing Service Bindings and Durable Objects.

The `app-worker` could represent, for example, a central authentication service accessible by other applications.

Frameworks like Hono would fall into the same category as app-worker, where all features work.

## Feature Support Matrix

The following table outlines the support for Cloudflare features across different application setups:

| Application              | Service Bindings | Durable Objects\* | Notes |
| :----------------------- | :--------------: | :---------------: | :---- |
| `app-worker`             |        ✅        |        ✅         |       |
| `app-worker-h3(v2)`      |        ✅        |        ✅         |       |
| `app-worker-hono`        |        ✅        |        ✅         |       |
| `app-nitro`              |        ✅        |        ❌         | [1]   |
| `app-vue`                |        ✅        |        ✅         |       |
| `app-vue-cf-vite-plugin` |        ❌        |        ✅         | [2]   |
| `app-nuxt`               |        ✅        |        ❌         | [1]   |
| `app-nuxt-spa`           |        ✅        |        ✅         |       |

**Notes:**

- \* **Durable Objects**: Indicates native support for Durable Object features. Service Bindings support RPC methods.
- **[1]**: For applications lacking native Durable Object support, a workaround involves creating a separate worker and establishing a Service Binding to it.
- **[2]**: Requires using either direct HTTP fetches to a separate worker or the `wrangler dev --local` auxiliary worker functionality, which can be less flexible during local development.
- **[3]**: Not released and no documentation yet on how to setup env, no migration path from h3 v1 for using workers.

## How to run in local dev

For full stack apps not using @cloudflare/vite-plugin run one terminal with `pnpm wrangler dev` and another for vite `pnpm dev`.

## Architecture

- **`app-worker`**: Implements Durable Objects and exposes functionality via RPC methods (including methods that invoke Durable Object RPCs).
- **Other Apps**: Access `app-worker` primarily through Service Bindings where available. If Service Bindings are not supported, they fall back to standard HTTP fetch requests.

---

_Disclaimer: Any mention of features "not working" may reflect my own limitations in understanding or configuration rather than inherent platform issues._

_Nitro Note: Nitro's `cloudflare-durable` preset enables Durable Objects via an internal module, creating a single global instance primarily for WebSocket support through a wrapper API. I'm not sure how this is achieved and could be a path to explore unlocking full functionality on nitro based setups, not sure if it supports rpc methods though._

## Resources

- [Nuxt Durable Objects Monorepo Example](https://github.com/timhanlon/nuxt-durable-objects-monorepo)
- [Tanstack Start on Cloudflare Workers Example](https://github.com/backpine/tanstack-start-on-cloudflare-workers-v0)
- [One Database Per User with Cloudflare Durable Objects and Drizzle ORM](https://boristane.com/blog/durable-objects-database-per-user/)

## Service Bindings

app-nuxt uses app-worker-h3
app-nitro uses app-worker
app-vue uses app-worker

## TODO:

- [ ] complete minimal setup of all apps
- [ ] explore nitro's cloudflare-durable preset
- [x] h3 v2 app
- [ ] root script to run all processes in parallel with one command
- [ ] organize ports
