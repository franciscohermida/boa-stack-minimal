Support Service Bindings
Doesn't support Durable Objects (limitation of getPlatformProxy? https://developers.cloudflare.com/workers/wrangler/api/#supported-bindings)

Workaround to use durable objects: create a separate worker and service bind to it.

## Pending documentation

- https://github.com/nuxt/nuxt.com/pull/1808/files?short_path=2152f5c#diff-2152f5ca7c3277fe69c30ed35fe930444438cf6aba288aa9ab04a1c1f2895785

## Steps after pnpm create nuxt

- set `{future: {compatibilityVersion: 4}}` in nuxt.config.ts (early adoption of nuxt 4 folder structure)
- move `app.vue` to `app/`
- copy over `wrangler.jsonc`
- add dependencies `pnpm add -D wrangler @cloudflare/workers-types nitro-cloudflare-dev`
- add app-worker-h3 as dependency `pnpm add app-worker-h3 --workspace`
- add "nitro-cloudflare-dev" do modules in nuxt.config.ts
- set nitro preset to `cloudflare-module` in nuxt.config.ts
- update compatibilityDate in nuxt.config.ts to latest

## TODO:

- [ ] typed context and env
- [ ] investigate integration with @nuxthub/core
