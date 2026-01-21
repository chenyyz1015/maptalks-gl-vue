import Vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";
import DTS from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    Vue(),
    DTS({
      insertTypesEntry: true,
      cleanVueFileName: true,
      copyDtsFiles: true,
      include: ["src/**/*"],
      exclude: ["src/**/*.spec.ts", "example/**/*"]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  build: {
    lib: {
      name: "MaptalksGlVue",
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["es", "umd"],
      fileName: (format) => `maptalks-gl-vue.${format}.js`
    },
    rollupOptions: {
      // 确保这些依赖不被打包（保持外部引用）
      external: [
        "vue",
        "ant-design-vue",
        "@ant-design/icons-vue",
        "@ant-design/icons-svg",
        "@ant-design/colors",
        "maptalks",
        "maptalks-gl"
      ],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
          "ant-design-vue": "Antd",
          "@ant-design/icons-vue": "AntdIconsVue",
          "@ant-design/icons-svg": "AntdIconsSvg",
          "@ant-design/colors": "AntdColors",
          maptalks: "Maptalks",
          "maptalks-gl": "MaptalsGL"
        }
      }
    },
    cssCodeSplit: false,
    sourcemap: true
  }
});
