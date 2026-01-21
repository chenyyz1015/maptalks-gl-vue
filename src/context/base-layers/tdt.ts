import type { WMSTileLayerOptionsType } from "maptalks/dist/layer/tile/WMSTileLayer";
import type { CoreGroupTileLayer } from "../../core";

// 天地图图层类型
// vec-矢量底图 | cva-矢量注记
// img-影像底图 | cia-影像注记
// ter-地形渲染 | cta-地形注记
// ibo-全球境界
type TDTLayerType = "vec" | "cva" | "img" | "cia" | "ter" | "cta" | "ibo";
// 天地图投影类型
// w-球面墨卡托投影 | c-经纬度投影
type TDTProjectionType = "w" | "c";

// 获取天地图WMS配置项
const getTDTWMSTileLayerOptions = (
  tk: string,
  layer: TDTLayerType = "img",
  projection: TDTProjectionType = "w"
): WMSTileLayerOptionsType => {
  return {
    urlTemplate: `https://t{s}.tianditu.gov.cn/${layer}_${projection}/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=${layer}&STYLE=default&TILEMATRIXSET=${projection}&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tk}`,
    subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
    minZoom: 0,
    maxZoom: 18
  };
};

// 天地图-矢量图
export const TDT_VEC_LAYER_GTL = (tk: string): CoreGroupTileLayer[] => [
  { id: "tdt_vec", type: "wms", opts: getTDTWMSTileLayerOptions(tk, "vec") },
  { id: "tdt_ibo", type: "wms", opts: getTDTWMSTileLayerOptions(tk, "ibo") },
  { id: "tdt_cva", type: "wms", opts: getTDTWMSTileLayerOptions(tk, "cva") }
];

// 天地图-影像图
export const TDT_IMG_LAYER_GTL = (tk: string): CoreGroupTileLayer[] => [
  { id: "tdt_img", type: "wms", opts: getTDTWMSTileLayerOptions(tk, "img") },
  { id: "tdt_ibo", type: "wms", opts: getTDTWMSTileLayerOptions(tk, "ibo") },
  { id: "tdt_cia", type: "wms", opts: getTDTWMSTileLayerOptions(tk, "cia") }
];

// 天地图-地形图
export const TDT_TER_LAYER_GTL = (tk: string): CoreGroupTileLayer[] => [
  { id: "tdt_ter", type: "wms", opts: getTDTWMSTileLayerOptions(tk, "ter") },
  { id: "tdt_ibo", type: "wms", opts: getTDTWMSTileLayerOptions(tk, "ibo") },
  { id: "tdt_cta", type: "wms", opts: getTDTWMSTileLayerOptions(tk, "cta") }
];
