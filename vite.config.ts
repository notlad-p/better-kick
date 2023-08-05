import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte()],
  build: {
    minify: false,
    reportCompressedSize: false,
    modulePreload: false,
    rollupOptions: {
      input: {
        modules: "src/modules/index.ts",
        content: "src/content.ts",
        background: "src/background.ts",
      },
      output: {
        dir: "dist",
        format: "es",
        entryFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
        chunkFileNames: "assets/[name].js",

        // preserveModules: true,
        // preserveModulesRoot: "src",
        // exports: "named",
      },

      // preserveEntrySignatures: "exports-only",
    },
  },
});
