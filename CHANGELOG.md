# Changelog

## 1.2.0-alpha.0

### Minor Changes

- b7e0ac9: maptalks-gl-vue@1.2.0正式发布

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2024-01-22

### Added

- 🗺️ **Multiple Map Sources**: Support for TianDiTu Map, Google Maps, and OpenStreetMap
- 🎯 **MapPicker Component**: Interactive map picker with search functionality
- 🔍 **Geocoding**: Built-in geocoding and reverse geocoding for TianDiTu
- 🎨 **MapViewer Component**: Standalone map viewer with toolbar
- 🔧 **TypeScript Support**: Full TypeScript definitions
- ⚡ **Vue 3 Support**: Built with Vue 3 Composition API
- 🛠️ **Core Features**:
  - Location picker with coordinate search
  - Address search with autocomplete
  - Click-to-select location on map
  - Fullscreen mode support
  - Map controls (zoom, bearing, pitch)
  - Layer switcher with thumbnails
  - Custom marker support
  - Line and area drawing
  - Geocoding and reverse geocoding

### Components

- `MapPicker`: Interactive location picker with search
- `MapViewer`: Standalone map viewer
- `MapToolbar`: Map control toolbar
- `MapLayerPicker`: Layer selection interface
- `MapPanToolbar`: Map panning controls

### Composables

- `useMapInstance`: Access map instance
- `useMapGlobalState`: Manage global map state
- `useMapGlobalOptions`: Manage plugin options
- `useMapFullscreen`: Handle fullscreen mode
- `useMapMount`: Mount map to container

### Layers

- `MarkerLayer`: Point markers layer
- `LineLayer`: Line geometries layer
- `AreaLayer`: Polygon areas layer

### Decorators

- `MarkerDecorator`: Marker geometry decorator
- `LineDecorator`: Line geometry decorator
- `AreaDecorator`: Area geometry decorator

### API

- TianDiTu keyword search
- TianDiTu geocoding and reverse geocoding
- Support for multiple map tile sources

### Configuration

- Environment variable support
- Plugin options for API keys
- Default base layer configuration
- Default search engine configuration
- Auto-switching search engine option

### Documentation

- Comprehensive README in English and Chinese
- API documentation
- Usage examples
- Quick start guide
- Contributing guidelines

### Infrastructure

- Vite build setup
- TypeScript configuration
- Vue 3 plugin architecture
- CDN asset hosting support
- Example application

## Release Notes

### Version 1.0.0

This is the initial stable release of Maptalks GL Vue, a Vue 3 component library for interactive maps.

**Key Features:**

- Support for multiple map providers (TianDiTu, Google Maps, OpenStreetMap)
- Easy-to-use Vue components
- Full TypeScript support
- Built-in geocoding capabilities
- Flexible and extensible architecture

**Getting Started:**

```bash
npm install maptalks-gl-vue
```

**Basic Usage:**

```typescript
import { createApp } from "vue";
import MaptalksGlVue from "maptalks-gl-vue";

app.use(MaptalksGlVue, {
  tk: "YOUR_TIANDITU_API_KEY"
});
```

See the [README](./README.md) for complete documentation.

---

## How to Update This Changelog

### For Contributors

When making changes, add entries under the `[Unreleased]` section:

```markdown
## [Unreleased]

### Added

- New feature description

### Changed

- Changed feature description

### Fixed

- Bug fix description
```

### For Maintainers

When creating a release:

1. Move items from `[Unreleased]` to a new version section
2. Add release date
3. Update version links at bottom of file
4. Create git tag matching version

### Categories

- **Added**: New features
- **Changed**: Changes in existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security fixes

[Unreleased]: https://github.com/chenyyz1015/maptalks-gl-vue/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/chenyyz1015/maptalks-gl-vue/releases/tag/v1.0.0
