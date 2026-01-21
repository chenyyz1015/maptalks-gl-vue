import Vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [Vue()],
  resolve: {
    alias: {
      // 开发模式：使用源码（支持热更新）
      // 生产模式：使用构建包
      ...(process.env.NODE_ENV === "development" && {
        "maptalks-gl-vue": path.resolve(__dirname, "../src/index.ts")
      })
    }
  }
});
