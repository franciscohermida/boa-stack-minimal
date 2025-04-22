import type { Env } from "../types/envBindings";

export default defineEventHandler(async (event) => {
  const env = event.context.cloudflare.env as Env;
  console.log("env", env);
  {
    const result = await env.APP_WORKER.add(1, 2);
    console.log("APP_WORKER.add", result);
  }

  {
    const result = await env.APP_WORKER.doSayHello("world");
    console.log("APP_WORKER.doSayHello", result);
  }

  // TODO: doesn't work
  // const result = env.DO.sayHello("world");
  // console.log("result", result);

  return "Start by editing <code>server/routes/index.ts</code>.";
});
