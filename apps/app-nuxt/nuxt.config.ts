// https://nuxt.com/docs/api/configuration/nuxt-config
import nitroCloudflareBindings from "nitro-cloudflare-dev";

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  modules: [nitroCloudflareBindings],
  nitro: {
    preset: "cloudflare-module",
    cloudflare: { nodeCompat: true, deployConfig: true },
  },

  compatibilityDate: "2025-04-19",
  devtools: { enabled: true },
  devServer: {
    port: 3300,
  }
});
