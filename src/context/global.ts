import type { App, Plugin } from "vue";
import { useMapGlobalOptions } from "../composables";
import { MapCore } from "../core";
import { DEFAULT_OPTIONS } from "./config";

export function setupGlobalMap(app: App) {
  const container = document.createElement("div");
  container.style.width = "100%";
  container.style.height = "100%";
  container.style.overflow = "hidden";
  container.style.position = "relative";

  // 创建地图实例
  const viewer = new MapCore(container, DEFAULT_OPTIONS);

  app.config.globalProperties.$map = { viewer, container };
}

export interface MaptalksGlVueOptions {
  /** 天地图API key */
  tk?: string;
  /** 谷歌地图API key */
  gk?: string;
  /** 默认底图 */
  defaultBaseLayer?: "tdt" | "google" | "osm";
  /** 默认搜索引擎 */
  defaultSearchEngine?: "tdt" | "google" | "osm";
  /** 是否自动切换搜索引擎 */
  searchEngineAuto?: boolean;
}

export const MaptalksGlVue: Plugin<MaptalksGlVueOptions> = {
  install: (app, options) => {
    setupGlobalMap(app);

    // 注入API key及默认配置
    const { tk, gk, defaultBaseLayer, defaultSearchEngine, searchEngineAuto } = useMapGlobalOptions();
    tk.value = options.tk ?? "";
    gk.value = options.gk ?? "";
    defaultBaseLayer.value = options.defaultBaseLayer ?? "tdt";
    defaultSearchEngine.value = options.defaultSearchEngine ?? "tdt";
    searchEngineAuto.value = options.searchEngineAuto ?? false;
  }
};
