// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
import { fileURLToPath } from "url";

export default defineNuxtConfig({
  devtools: { enabled: true },
  components: {
    dirs: [
      {
        path: "@/components",
        pathPrefix: true
      }
    ]
  },
  css: ['@/assets/style/base.scss'],
  buildDir: "dist",
  modules: ["@nuxt/eslint"],
  alias: {
    "@": fileURLToPath(new URL("./", import.meta.url)),
    "~": fileURLToPath(new URL("./", import.meta.url)),
    "@@": fileURLToPath(new URL("./", import.meta.url)),
    "~~": fileURLToPath(new URL("./", import.meta.url)),
    "@images": fileURLToPath(new URL("./assets/images/", import.meta.url))
  },
  lint: {
    eslint: {
      extensions: ["js", "vue"]
    }
  }
});
