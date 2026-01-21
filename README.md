# Maptalks GL Vue

[![npm version](https://badge.fury.io/js/maptalks-gl-vue.svg)](https://www.npmjs.com/package/maptalks-gl-vue)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A Vue 3 map component library based on Maptalks GL, supporting multiple map sources such as Sky Map, Google Map, OpenStreetMap, etc.

[中文文档](./README.zh-CN.md)

## Features

- 🗺️ **Multiple Map Sources**: Support for TianDiTu Map, Google Maps, and OpenStreetMap
- 🎯 **Location Picker**: Interactive map picker component with search functionality
- 🔍 **Geocoding**: Built-in geocoding and reverse geocoding
- 🎨 **Customizable**: Flexible styling and configuration options
- 🔧 **TypeScript**: Full TypeScript support
- ⚡ **Vue 3**: Built with Vue 3 Composition API

## Installation

```bash
npm install maptalks-gl-vue
```

or

```bash
yarn add maptalks-gl-vue
```

or

```bash
pnpm add maptalks-gl-vue
```

## Peer Dependencies

This package requires the following peer dependencies:

```bash
npm install vue maptalks-gl ant-design-vue
```

or

```bash
yarn add vue maptalks-gl ant-design-vue
```

or

```bash
pnpm add vue maptalks-gl ant-design-vue
```

## Quick Start

### 1. Register Plugin

```typescript
// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import MaptalksGlVue from "maptalks-gl-vue";

const app = createApp(App);

app.use(MaptalksGlVue, {
  tk: "YOUR_TIANDITU_API_KEY", // Optional: TianDiTu API Key
  gk: "YOUR_GOOGLE_API_KEY", // Optional: Google Maps API Key
  defaultBaseLayer: "tdt", // Optional: Default Base Layer
  defaultSearchEngine: "tdt", // Optional: Default Search Engine
  searchEngineAuto: false // Optional: Search Engine Auto Switch
});

app.mount("#app");
```

### 2. Use MapPicker Component

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

### 3. Use MapViewer Component

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

## API Reference

### Plugin Options

| Property            | Type           | Default | Description               |
| ------------------- | -------------- | ------- | ------------------------- |
| tk                  | string         | -       | TianDiTu API Key          |
| gk                  | string         | -       | Google Maps API Key       |
| defaultBaseLayer    | tdt/google/osm | tdt     | Default Base Layer        |
| defaultSearchEngine | tdt/google/osm | tdt     | Default Search Engine     |
| searchEngineAuto    | boolean        | false   | Search Engine Auto Switch |

### MapPicker Props

| Property        | Type    | Default      | Description                              |
| --------------- | ------- | ------------ | ---------------------------------------- |
| modelValue      | string  | required     | Location coordinates (lng,lat format)    |
| search          | boolean | true         | Enable search functionality              |
| clickable       | boolean | true         | Allow clicking on map to select location |
| dragPan         | boolean | true         | Enable map panning                       |
| scrollWheelZoom | boolean | true         | Enable zoom with scroll wheel            |
| doubleClickZoom | boolean | true         | Enable zoom on double click              |
| pickerIcon      | string  | default icon | Custom picker icon URL                   |
| pickerSize      | number  | 65           | Picker icon size in pixels               |
| toolbar         | boolean | true         | Show map toolbar                         |

### MapViewer Props

| Property     | Type    | Default | Description      |
| ------------ | ------- | ------- | ---------------- |
| toolbar      | boolean | true    | Show map toolbar |
| isFullscreen | boolean | false   | Fullscreen mode  |

### Composables

#### useMapInstance

Access the map instance:

```typescript
import { useMapInstance } from "maptalks-gl-vue";

const { viewer, container } = useMapInstance();
```

#### useMapGlobalState

Manage map state:

```typescript
import { useMapGlobalState } from "maptalks-gl-vue";

const mapState = useMapGlobalState();

// Switch base layer
mapState.switchBaseLayer({
  value: "base_layer_tdt_img",
  engine: "tdt"
});

// Control zoom
mapState.switchZoom("plus");
mapState.switchZoom("minus");

// Reset view
mapState.resetView();
```

#### useMapFullscreen

Handle fullscreen mode:

```typescript
import { useMapFullscreen } from "maptalks-gl-vue";

const containerRef = ref<HTMLElement>();
const { isFullscreen, toggleFullscreen } = useMapFullscreen(containerRef);
```

## Advanced Usage

### Custom Markers

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

### Drawing Lines and Areas

```typescript
import { LineLayer, AreaLayer, GeometryDecoratorType } from "maptalks-gl-vue";

// Line
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

// Area
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

### Geocoding

```typescript
import { getTDTSearchResultByKeword, getTDTSearchResultByGeocode } from "maptalks-gl-vue";

// Search by keyword
const searchResult = await getTDTSearchResultByKeword({
  postStr: JSON.stringify({
    keyWord: "Beijing",
    mapBound: "-180,-90,180,90",
    level: 18,
    queryType: 4,
    start: 0,
    count: 10
  }),
  type: "query",
  tk: "YOUR_API_KEY"
});

// Reverse geocoding
const geocodeResult = await getTDTSearchResultByGeocode({
  postStr: JSON.stringify({
    lon: 118.5546748,
    lat: 31.6976106,
    ver: 1
  }),
  type: "geocode",
  tk: "YOUR_API_KEY"
});
```

## Environment Variables

Configure default settings in `.env`:

```env
# TianDiTu API Key
VITE_TDT_MAP_KEY = ''

# Google Maps API Key
VITE_GOOGLE_MAP_KEY = ''

# Default base layer: 'tdt' | 'google' | 'osm'
VITE_MAP_BASE_LAYER = 'tdt'

# Default search engine: 'tdt' | 'google' | 'osm'
VITE_MAP_SEARCH_ENGINE = 'tdt'

# Auto switch search engine based on base layer
VITE_MAP_SEARCH_ENGINE_AUTO = 'false'
```

## Getting API Keys

### TianDiTu API Key

1. Visit [TianDiTu Open Platform](http://lbs.tianditu.gov.cn/)
2. Register and login
3. Go to "Application Management" and create a new application
4. Copy the generated API Key

### Google Maps API Key

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable Maps JavaScript API
4. Create credentials and get the API Key

## Examples

Check the `example` directory for more usage examples.

Run the example project:

```bash
cd example
npm install
npm run dev
```

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history and updates.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

[MIT](./LICENSE)

## Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details.

## Support

- 📧 Email: chenyyz1015@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/chenyyz1015/maptalks-gl-vue/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/chenyyz1015/maptalks-gl-vue/discussions)
