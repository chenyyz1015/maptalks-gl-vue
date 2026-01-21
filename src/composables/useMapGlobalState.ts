import { createGlobalState } from "@vueuse/core";
import { cloneDeep } from "lodash-es";
import type { MapViewType } from "maptalks/dist/map/Map";
import { ref } from "vue";
import type { BaseLayerGroup, BaseLayerOptions } from "../context";
import {
  BASE_LAYER_GROUP,
  BaseLayerID,
  BaseLayerType,
  DEFAULT_OPTIONS,
  DEFAULT_VIEW,
  MapSearchEngine
} from "../context";
import type { CoreZoomType } from "../core";
import { useMapGlobalOptions } from "./useMapGlobalOptions";
import { useMapInstance } from "./useMapInstance";

export const useMapGlobalState = createGlobalState(() => {
  const { tk, gk, defaultBaseLayer, defaultSearchEngine, searchEngineAuto } = useMapGlobalOptions();
  const { viewer } = useMapInstance();

  const baseLayerId = ref<string>("");
  const baseLayerGroup = ref<BaseLayerGroup[]>([]);
  const searchEngine = ref<string>(defaultSearchEngine.value);
  const zoom = ref<number>(DEFAULT_OPTIONS.zoom ?? 0);
  const bearing = ref<number>(DEFAULT_OPTIONS.bearing ?? 0);
  const pitch = ref<number>(DEFAULT_OPTIONS.pitch ?? 0);

  const init = () => {
    // 注入内置地图底图
    const layers = BASE_LAYER_GROUP.map((g) => g.layers).flat();
    layers.forEach((l) => addBaseLayerWithOptions(l));
    addBaseLayerWithGroup(BASE_LAYER_GROUP);
    // 设置默认底图
    switch (defaultBaseLayer.value) {
      case "tdt":
        if (tk.value) {
          switchBaseLayer({ value: BaseLayerID.TDT_IMG, engine: MapSearchEngine.TDT });
        } else {
          switchBaseLayer({ value: BaseLayerID.OSM_STANDARD, engine: MapSearchEngine.OSM });
        }
        break;
      case "google":
        if (gk.value) {
          switchBaseLayer({ value: BaseLayerID.GOOGLE_IMG, engine: MapSearchEngine.GOOGLE });
        } else {
          switchBaseLayer({ value: BaseLayerID.OSM_STANDARD, engine: MapSearchEngine.OSM });
        }
        break;
      case "osm":
        switchBaseLayer({ value: BaseLayerID.OSM_STANDARD, engine: MapSearchEngine.OSM });
        break;
      default:
        if (tk.value) {
          switchBaseLayer({ value: BaseLayerID.TDT_IMG, engine: MapSearchEngine.TDT });
        } else if (gk.value) {
          switchBaseLayer({ value: BaseLayerID.GOOGLE_IMG, engine: MapSearchEngine.GOOGLE });
        } else {
          switchBaseLayer({ value: BaseLayerID.OSM_STANDARD, engine: MapSearchEngine.OSM });
        }
        break;
    }
  };

  const addBaseLayer = (layer: BaseLayerGroup | BaseLayerGroup[]) => {
    if (layer instanceof Array) {
      const layers = layer.map((g) => g.layers).flat();
      layers.forEach((l) => addBaseLayerWithOptions(l));
      addBaseLayerWithGroup(layer);
    } else {
      layer.layers.forEach((l) => addBaseLayerWithOptions(l));
      addBaseLayerWithGroup([layer]);
    }
  };

  const addBaseLayerWithOptions = (layerOpts: BaseLayerOptions) => {
    if (typeof layerOpts.layer === "function") {
      if (layerOpts.type === BaseLayerType.TDT && tk.value) {
        viewer.addGroupTileLayer(layerOpts.value, layerOpts.layer(tk.value), { urlTemplate: "" });
      } else if (layerOpts.type === BaseLayerType.GOOGLE && gk.value) {
        viewer.addGroupTileLayer(layerOpts.value, layerOpts.layer(gk.value), { urlTemplate: "" });
      }
    } else {
      viewer.addGroupTileLayer(layerOpts.value, layerOpts.layer, { urlTemplate: "" });
    }
  };

  const addBaseLayerWithGroup = (layerGroup: BaseLayerGroup[], init = true) => {
    layerGroup = cloneDeep(layerGroup)
      .map((g) => {
        const layers = g.layers.filter((l) => {
          if (typeof l.layer === "function") {
            if (l.type === BaseLayerType.TDT) {
              return !!tk.value;
            } else if (l.type === BaseLayerType.GOOGLE) {
              return !!gk.value;
            }
            return false;
          }
          return true;
        });
        return { ...g, layers };
      })
      .filter((g) => g.layers.length > 0);
    if (init) {
      baseLayerGroup.value = [...layerGroup];
    } else {
      baseLayerGroup.value = [...baseLayerGroup.value, ...layerGroup];
    }
  };

  const switchBaseLayer = (layerOpts: Omit<BaseLayerOptions, "label" | "thumb" | "type" | "layer">) => {
    if (searchEngineAuto) {
      searchEngine.value = layerOpts.engine;
    }
    baseLayerId.value = layerOpts.value;
    viewer.setDefaultBaseLayer(layerOpts.value);
  };

  const switchSearchEngine = (engine: MapSearchEngine) => {
    searchEngine.value = engine;
  };

  const switchZoom = (type: CoreZoomType) => {
    zoom.value = viewer.zoomTo(type);
  };

  const switchBearing = (bear?: number) => {
    bearing.value = viewer.bearingTo(bear);
  };

  const switchPitch = (pit?: number) => {
    pitch.value = viewer.pitchTo(pit);
  };

  const resetView = (view: MapViewType = DEFAULT_VIEW) => {
    zoom.value = view.zoom ?? 11;
    bearing.value = view.bearing ?? 0;
    pitch.value = view.pitch ?? 0;
    view = { ...view, zoom: zoom.value, bearing: bearing.value, pitch: pitch.value };
    viewer.resetView(view);
  };

  return {
    baseLayerId,
    baseLayerGroup,
    searchEngine,
    zoom,
    bearing,
    pitch,
    init,
    addBaseLayer,
    switchBaseLayer,
    switchSearchEngine,
    switchZoom,
    switchBearing,
    switchPitch,
    resetView
  };
});
