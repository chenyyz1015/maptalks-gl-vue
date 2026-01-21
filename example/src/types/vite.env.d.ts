/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * 天地图key
   */
  readonly VITE_TDT_MAP_KEY: string;

  /**
   * 谷歌地图key
   */
  readonly VITE_GOOGLE_MAP_KEY: string;

  /**
   * 默认底图
   */
  readonly VITE_MAP_BASE_LAYER: "tdt" | "google" | "osm";

  /**
   * 默认搜索引擎
   */
  readonly VITE_MAP_SEARCH_ENGINE: "tdt" | "google" | "osm";

  /**
   * 是否自动切换搜索引擎
   */
  readonly VITE_MAP_SEARCH_ENGINE_AUTO: "true" | "false";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
