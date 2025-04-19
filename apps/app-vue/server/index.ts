import { AppWorker } from "app-worker/src/exports";
import { DurableObject } from "cloudflare:workers";

type Env = {
  DO: DurableObjectNamespace<DurableVue>;
  APP_WORKER: Service<AppWorker>;
};

export class DurableVue extends DurableObject {
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
  }

  async sayHello(str: string) {
    return `hello ${str} from app-vue worker-do`;
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/api/hello") {
      // respond with a json object
      return new Response(JSON.stringify({ message: "Hello, from the server!" }), {
        status: 200,
      });
    }

    if (url.pathname === "/api/do") {
      const doId = env.DO.idFromName("hello");
      const stub = env.DO.get(doId);
      const message = await stub.sayHello("world");

      return new Response(JSON.stringify({ message }), {
        status: 200,
      });
    }

    if (url.pathname === "/api/app-worker/add") {
      const appWorker = env.APP_WORKER;
      const result = await appWorker.add(1, 2);

      return new Response(JSON.stringify({ result }), {
        status: 200,
      });
    }

    if (url.pathname === "/api/app-worker/do-say-hello") {
      const appWorker = env.APP_WORKER;
      const result = await appWorker.doSayHello("world");

      return new Response(JSON.stringify({ result }), {
        status: 200,
      });
    }

    return new Response("Not found", {
      status: 404,
    });
  },
} satisfies ExportedHandler<Env>;
