import { WorkerEntrypoint, DurableObject } from "cloudflare:workers";

type Env = {
  DO: DurableObjectNamespace<DurableWorker>;
};

export class DurableWorker extends DurableObject {
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
  }

  async sayHello(str: string) {
    return `hello ${str} from app-worker worker-do`;
  }
}

export default class extends WorkerEntrypoint {
  env: Env;

  constructor(ctx: ExecutionContext, env: Env) {
    super(ctx, env);
    this.env = env;
  }

  async fetch(request: Request) {
    return new Response("Hello, World!");
  }

  add(a: number, b: number) {
    return a + b;
  }

  doSayHello(str: string) {
    const id = this.env.DO.idFromName("hello");
    const stub = this.env.DO.get(id);
    return stub.sayHello(str);
  }
}
