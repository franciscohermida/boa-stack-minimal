import { WorkerEntrypoint, DurableObject } from "cloudflare:workers";
import { H3, toWebHandler } from "h3-nightly";

type Env = {
  DO: DurableObjectNamespace<DurableWorkerH3>;
};

export class DurableWorkerH3 extends DurableObject {
  private app: H3;
  private handler: ReturnType<typeof toWebHandler>;
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    const app = new H3({ debug: true });
    this.handler = toWebHandler(app);

    app.get("/api/do/hello", async (event) => {
      return this.sayHello("world");
    });

    this.app = app;
  }

  async fetch(request: Request) {
    return await this.handler(request);
  }

  async sayHello(str: string) {
    return `hello ${str} from app-worker-h3 DurableWorkerH3`;
  }
}

const app = new H3({ debug: true });
const handler = toWebHandler(app);

app.get("/api/hello", (event) => {
  console.log(event.context.cloudflare.env);
  return "hello from app-worker-h3";
});

app.use("/api/do/**", async (event) => {
  const env: Env = event.context.cloudflare.env;
  const id = env.DO.idFromName("hello");
  const stub = env.DO.get(id);
  return stub.fetch(event.req);
});

export default class extends WorkerEntrypoint<Env> {
  constructor(ctx: ExecutionContext, env: Env) {
    super(ctx, env);
  }

  async fetch(request: Request) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api")) {
      return handler(request, { cloudflare: { env: this.env, ctx: this.ctx } });
    }

    return new Response("Not Found", { status: 404 });
  }

  async add(a: number, b: number) {
    return a + b;
  }

  async doSayHello(str: string) {
    const id = this.env.DO.idFromName("hello");
    const stub = this.env.DO.get(id);
    const result = await stub.sayHello(str);
    return result;
  }
}
