import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    exclude: ["auto-backup-config.json"],
  },
  server: {
    proxy: {
      "/baiduApi": {
        target: "https://openapi.baidu.com", // 目标服务器的地址
        changeOrigin: true,
        // 将URL中的/api替换为空字符，如 /api/users 将被转发到 https://openapi.baidu.com/users
        rewrite: (path) => path.replace(/^\/baiduApi/, ""),
      },
      "/panApi" : {
        target:"https://pan.baidu.com",
        changeOrigin: true,
        // 将URL中的/api替换为空字符，如 /api/users 将被转发到 https://openapi.baidu.com/users
        rewrite: (path) => path.replace(/^\/panApi/, ""),
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
