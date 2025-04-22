import { AppWorker } from "app-worker/src/exports";

export type Env = {
  DO: DurableObjectNamespace /* DurableNitro */;
  APP_WORKER: Service<AppWorker>;
};
