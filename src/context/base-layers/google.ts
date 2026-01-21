import type { WMSTileLayerOptionsType } from "maptalks/dist/layer/tile/WMSTileLayer";
import type { CoreGroupTileLayer } from "../../core";

// 谷歌地图图层类型
// m-普通街道地图 | r-普通街道地图(样式差异)
// s-影像图 | h-标注
// y-影像图 + 标注 | t-地形图
// p-普通街道地图 + 地形图
export type GoogleLayerType = "m" | "r" | "s" | "h" | "y" | "t" | "p";

// 获取谷歌地图WMS配置项
const getGoogleWMSTileLayerOptions = (layer: GoogleLayerType = "m"): WMSTileLayerOptionsType => {
  return {
    urlTemplate: `http://mt{s}.google.com/vt/lyrs=${layer}&x={x}&y={y}&z={z}`,
    subdomains: ["0", "1", "2", "3"],
    minZoom: 0,
    maxZoom: 18
  };
};

// 谷歌地图-标准地图
export const GOOGLE_ROAD_LAYER_GTL: CoreGroupTileLayer[] = [
  { id: "google_road", type: "wms", opts: getGoogleWMSTileLayerOptions("m") }
];

// 谷歌地图-影像图
export const GOOGLE_IMG_LAYER_GTL: CoreGroupTileLayer[] = [
  { id: "google_img", type: "wms", opts: getGoogleWMSTileLayerOptions("y") }
];

// 谷歌地图-地形图
export const GOOGLE_TER_LAYER_GTL: CoreGroupTileLayer[] = [
  { id: "google_ter", type: "wms", opts: getGoogleWMSTileLayerOptions("p") }
];
