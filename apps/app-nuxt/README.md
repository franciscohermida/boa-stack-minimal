Support Service Bindings
Doesn't support Durable Objects (limitation of getPlatformProxy? https://developers.cloudflare.com/workers/wrangler/api/#supported-bindings)

Workaround to use durable objects: create a separate worker and service bind to it.