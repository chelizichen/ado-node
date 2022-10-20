import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";
import { config } from "./src/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
      entry: "/src/client/main.tsx",
      template: "/index.html",
      inject: {
        data: {
          title: config.title,
          injectScript: config.injectScript,
        },
      },
    }),
  ],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: `http://localhost:3001`,
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
  build: {
    outDir: "dist/app",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/client"),
    },
  },
});
