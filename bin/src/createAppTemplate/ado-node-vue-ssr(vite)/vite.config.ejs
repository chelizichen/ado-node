import path from "path";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import vue from "@vitejs/plugin-vue";
import {config} from './src/config/index'

export default defineConfig({
  root:process.cwd(),
  plugins: [
    vue(),
    createHtmlPlugin({
      minify: true,
      entry: "/src/client/main.ts",
      template: "/index.html",
      inject: {
        data: {
          title: config.title,
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
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
          return 
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/client"),
    },
  },
});
