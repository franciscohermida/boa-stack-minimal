import { AppWorker } from "app-worker/src/exports";
import { DurableObject } from "cloudflare:workers";

type Env = {
  DO: DurableObjectNamespace<DurableNitro>;
  APP_WORKER: Service<AppWorker>;
};

export class DurableNitro extends DurableObject {
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
  }

  async sayHello(str: string) {
    return `hello ${str} from app-nitro worker-do`;
  }
}

export default {
  fetch() {
    // Doesn't have to do anything, but a DO cannot be the default export
    return new Response("Hello, world!");
  },
};
