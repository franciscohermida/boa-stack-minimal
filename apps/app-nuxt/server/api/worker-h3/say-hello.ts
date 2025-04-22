import type { Env } from "../../types/envBindings";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const env = event.context.cloudflare.env as Env;
  const result = await env.APP_WORKER_H3.doSayHello(body.str);

  return result;
});
