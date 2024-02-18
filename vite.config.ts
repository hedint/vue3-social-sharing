import { resolve } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  plugins: [vue()],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      name: "clutch-components",
      fileName: `vue3-social-sharing`,
    },
    rollupOptions: {
      external: ["vue"],
      input: "src/index.ts",
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
        inlineDynamicImports: false,
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
