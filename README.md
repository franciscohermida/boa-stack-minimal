# BOA Stack Minimal

## Overview

This project explores optimal configurations for multi-app projects leveraging Cloudflare infrastructure, specifically focusing on microservice architectures utilizing Service Bindings and Durable Objects.

The `app-worker` could represent, for example, a central authentication service accessible by other applications.

Frameworks like Hono would work in the same category as app-worker, all features .

## Feature Support Matrix

The following table outlines the support for Cloudflare features across different application setups:

| Application              | Service Bindings | Durable Objects\* | Notes |
| :----------------------- | :--------------: | :---------------: | :---- |
| `app-worker`             |        ✅        |        ✅         |       |
| `app-nitro`              |        ✅        |        ❌         | [1]   |
| `app-vue`                |        ✅        |        ✅         |       |
| `app-vue-cf-vite-plugin` |        ❌        |        ✅         | [2]   |
| `app-nuxt`               |        ✅        |        ❌         | [1]   |
| `app-nuxt-spa`           |        ✅        |        ✅         |       |

**Notes:**

-   \* **Durable Objects**: Indicates native support for Durable Object features. Service Bindings support RPC methods.
-   **[1]**: For applications lacking native Durable Object support, a workaround involves creating a separate worker and establishing a Service Binding to it.
-   **[2]**: Requires using either direct HTTP fetches to a separate worker or the `wrangler dev --local` auxiliary worker functionality, which can be less flexible during local development.

## Architecture

-   **`app-worker`**: Implements Durable Objects and exposes functionality via RPC methods (including methods that invoke Durable Object RPCs).
-   **Other Apps**: Access `app-worker` primarily through Service Bindings where available. If Service Bindings are not supported, they fall back to standard HTTP fetch requests.

---

_Disclaimer: Any mention of features "not working" may reflect my own limitations in understanding or configuration rather than inherent platform issues._

_Nitro Note: Nitro's `cloudflare-durable` preset enables Durable Objects via an internal module, creating a single global instance primarily for WebSocket support through a wrapper API. I'm not sure how this is achieved and could be a path to explore unlocking full functionality on nitro based setups, not sure if it supports rpc methods though._

## TODO:
- [ ] complete minimal setup of all apps
- [ ] explore nitro's cloudflare-durable preset
- [ ] h3 setup? v2?


