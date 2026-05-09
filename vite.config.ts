import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

const resolvePath = (path: string) => fileURLToPath(new URL(path, import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolvePath("./src"),
    },
  },
  plugins: [vue()],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolvePath("./src/index.ts"),
      formats: ["es"],
      name: "Vue3SocialSharing",
      fileName: `vue3-social-sharing`,
    },
    rollupOptions: {
      external: ["vue"],
      input: "src/index.ts",
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
