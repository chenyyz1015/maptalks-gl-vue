# Maptalks GL Vue

[![npm version](https://badge.fury.io/js/maptalks-gl-vue.svg)](https://www.npmjs.com/package/maptalks-gl-vue)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

基于 Maptalks GL 的 Vue 3 地图组件库，支持天地图、谷歌地图、OpenStreetMap 等多种地图源。

[English Documentation](./README.md)

## 特性

- 🗺️ **多地图源支持**: 支持天地图、谷歌地图和 OpenStreetMap
- 🎯 **位置选择器**: 交互式地图选择器,带搜索功能
- 🔍 **地理编码**: 内置地理编码和逆地理编码
- 🎨 **可定制**: 灵活的样式和配置选项
- 🔧 **TypeScript**: 完整的 TypeScript 支持
- ⚡ **Vue 3**: 使用 Vue 3 组合式 API 构建

## 安装

```bash
npm install maptalks-gl-vue
```

或

```bash
yarn add maptalks-gl-vue
```

或

```bash
pnpm add maptalks-gl-vue
```

## 对等依赖

此包需要以下对等依赖：

```bash
npm install vue maptalks-gl ant-design-vue
```

或

```bash
yarn add vue maptalks-gl ant-design-vue
```

或

```bash
pnpm add vue maptalks-gl ant-design-vue
```

## 快速开始

### 1. 注册插件

```typescript
// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import MaptalksGlVue from "maptalks-gl-vue";

const app = createApp(App);

app.use(MaptalksGlVue, {
  tk: "你的天地图API密钥", // 可选: 天地图 API key
  gk: "你的谷歌地图API密钥", // 可选: 谷歌地图 API key
  defaultBaseLayer: "tdt", // 可选: 默认底图
  defaultSearchEngine: "tdt", // 可选: 默认搜索引擎
  searchEngineAuto: false // 可选: 是否自动切换搜索引擎
});

app.mount("#app");
```

```vue
<!-- App.vue -->
<script setup lang="ts">
import { useMapGlobalState } from "maptalks-gl-vue";
import { onMounted } from "vue";

onMounted(() => {
  mapState.init();
});

const mapState = useMapGlobalState();
</script>
```

### 2. 使用 MapPicker 组件

```vue
<template>
  <div style="width: 100%; height: 600px;">
    <MapPicker v-model="location" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { MapPicker } from "maptalks-gl-vue";

const location = ref<string>("118.5546748,31.6976106");
</script>
```

### 3. 使用 MapViewer 组件

```vue
<template>
  <div style="width: 100%; height: 600px;">
    <MapViewer />
  </div>
</template>

<script setup lang="ts">
import { MapViewer } from "maptalks-gl-vue";
</script>
```

## API 文档

### 插件选项

| 属性                | 类型           | 默认值 | 说明                 |
| ------------------- | -------------- | ------ | -------------------- |
| tk                  | string         | -      | 天地图 API 密钥      |
| gk                  | string         | -      | 谷歌地图 API 密钥    |
| defaultBaseLayer    | tdt/google/osm | tdt    | 默认底图             |
| defaultSearchEngine | tdt/google/osm | tdt    | 默认搜索引擎         |
| searchEngineAuto    | boolean        | false  | 是否自动切换搜索引擎 |

### MapPicker 属性

| 属性            | 类型    | 默认值   | 说明                      |
| --------------- | ------- | -------- | ------------------------- |
| modelValue      | string  | 必填     | 位置坐标 (经度,纬度 格式) |
| search          | boolean | true     | 启用搜索功能              |
| clickable       | boolean | true     | 允许点击地图选择位置      |
| dragPan         | boolean | true     | 启用地图拖动              |
| scrollWheelZoom | boolean | true     | 启用鼠标滚轮缩放          |
| doubleClickZoom | boolean | true     | 启用双击缩放              |
| pickerIcon      | string  | 默认图标 | 自定义选择器图标 URL      |
| pickerSize      | number  | 65       | 选择器图标大小(像素)      |
| toolbar         | boolean | true     | 显示地图工具栏            |

### MapViewer 属性

| 属性         | 类型    | 默认值 | 说明           |
| ------------ | ------- | ------ | -------------- |
| toolbar      | boolean | true   | 显示地图工具栏 |
| isFullscreen | boolean | false  | 全屏模式       |

### 组合式函数

#### useMapInstance

访问地图实例:

```typescript
import { useMapInstance } from "maptalks-gl-vue";

const { viewer, container } = useMapInstance();
```

#### useMapGlobalState

管理地图状态:

```typescript
import { useMapGlobalState } from "maptalks-gl-vue";

const mapState = useMapGlobalState();

// 切换底图
mapState.switchBaseLayer({
  value: "base_layer_tdt_img",
  engine: "tdt"
});

// 控制缩放
mapState.switchZoom("plus");
mapState.switchZoom("minus");

// 重置视图
mapState.resetView();
```

#### useMapFullscreen

处理全屏模式:

```typescript
import { useMapFullscreen } from "maptalks-gl-vue";

const containerRef = ref<HTMLElement>();
const { isFullscreen, toggleFullscreen } = useMapFullscreen(containerRef);
```

## 高级用法

### 自定义标记

```typescript
import { MarkerLayer, GeometryDecoratorType } from "maptalks-gl-vue";

const { viewer } = useMapInstance();
const markerLayer = new MarkerLayer("custom-markers", viewer);

markerLayer.addGeo({
  geo: GeometryDecoratorType.MARKER,
  id: "marker-1",
  type: "custom",
  coordinates: [118.5546748, 31.6976106],
  options: {
    symbol: {
      markerFile: "/path/to/icon.png",
      markerWidth: 32,
      markerHeight: 32
    }
  }
});
```

### 绘制线条和区域

```typescript
import { LineLayer, AreaLayer, GeometryDecoratorType } from "maptalks-gl-vue";

// 线条
const lineLayer = new LineLayer("custom-lines", viewer);
lineLayer.addGeo({
  geo: GeometryDecoratorType.LINE,
  id: "line-1",
  type: "route",
  coordinates: [
    [118.5, 31.6],
    [118.6, 31.7]
  ],
  options: {
    symbol: {
      lineColor: "#1978ff",
      lineWidth: 3
    }
  }
});

// 区域
const areaLayer = new AreaLayer("custom-areas", viewer);
areaLayer.addGeo({
  geo: GeometryDecoratorType.AREA,
  id: "area-1",
  type: "zone",
  coordinates: [
    [
      [118.5, 31.6],
      [118.6, 31.6],
      [118.6, 31.7],
      [118.5, 31.7]
    ]
  ],
  options: {
    symbol: {
      polygonFill: "rgba(25, 120, 255, 0.3)",
      polygonOpacity: 0.8,
      lineColor: "#1978ff",
      lineWidth: 2
    }
  }
});
```

### 地理编码

```typescript
import { getTDTSearchResultByKeword, getTDTSearchResultByGeocode } from "maptalks-gl-vue";

// 关键词搜索
const searchResult = await getTDTSearchResultByKeword({
  postStr: JSON.stringify({
    keyWord: "北京",
    mapBound: "-180,-90,180,90",
    level: 18,
    queryType: 4,
    start: 0,
    count: 10
  }),
  type: "query",
  tk: "你的API密钥"
});

// 逆地理编码
const geocodeResult = await getTDTSearchResultByGeocode({
  postStr: JSON.stringify({
    lon: 118.5546748,
    lat: 31.6976106,
    ver: 1
  }),
  type: "geocode",
  tk: "你的API密钥"
});
```

## 环境变量配置

在 `.env` 中配置默认设置:

```env
# 天地图 API Key
VITE_TDT_MAP_KEY = ''

# 谷歌地图 API Key
VITE_GOOGLE_MAP_KEY = ''

# 默认底图: 'tdt' | 'google' | 'osm'
VITE_MAP_BASE_LAYER = 'tdt'

# 默认搜索引擎: 'tdt' | 'google' | 'osm'
VITE_MAP_SEARCH_ENGINE = 'tdt'

# 根据底图自动切换搜索引擎
VITE_MAP_SEARCH_ENGINE_AUTO = 'false'
```

## 获取 API 密钥

### 天地图 API Key

1. 访问 [天地图开放平台](http://lbs.tianditu.gov.cn/)
2. 注册并登录
3. 进入"应用管理"创建新应用
4. 复制生成的 API Key

### 谷歌地图 API Key

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 启用 Maps JavaScript API
4. 创建凭据并获取 API Key

## 示例

查看 `example` 目录了解更多使用示例。

运行示例项目:

```bash
cd example
npm install
npm run dev
```

## 更新日志

详见 [CHANGELOG.md](./CHANGELOG.md)

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 开源协议

[MIT](./LICENSE)

## 贡献

欢迎贡献代码! 详情请阅读我们的[贡献指南](./CONTRIBUTING.md)。

## 支持

- 📧 邮箱: chenyyz1015@gmail.com
- 🐛 问题: [GitHub Issues](https://github.com/chenyyz1015/maptalks-gl-vue/issues)
- 💬 讨论: [GitHub Discussions](https://github.com/chenyyz1015/maptalks-gl-vue/discussions)
