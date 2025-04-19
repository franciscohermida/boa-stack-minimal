import { cloudflare } from "unenv";
import nitroCloudflareBindings from "nitro-cloudflare-dev";

export default defineNitroConfig({
  compatibilityDate: "2025-04-19",
  srcDir: "server",
  preset: "cloudflare-module",
  unenv: cloudflare,
  modules: [nitroCloudflareBindings],
});
