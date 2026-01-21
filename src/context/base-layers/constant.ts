import type { CoreGroupTileLayer } from "../../core";
import { CDN_ASSETS } from "../config";
import { GOOGLE_IMG_LAYER_GTL, GOOGLE_ROAD_LAYER_GTL, GOOGLE_TER_LAYER_GTL } from "./google";
import { OSM_STANDARD_LAYER_GTL } from "./osm";
import { TDT_IMG_LAYER_GTL, TDT_TER_LAYER_GTL, TDT_VEC_LAYER_GTL } from "./tdt";

export const MapSearchEngine = {
  TDT: "tdt",
  GOOGLE: "google",
  OSM: "osm"
} as const;

export type MapSearchEngine = (typeof MapSearchEngine)[keyof typeof MapSearchEngine];

export const BaseLayerType = {
  TDT: "tdt",
  GOOGLE: "google",
  OSM: "osm"
} as const;

export type BaseLayerType = (typeof BaseLayerType)[keyof typeof MapSearchEngine];

export const BaseLayerID = {
  TDT_VEC: "base_layer_tdt_vec",
  TDT_IMG: "base_layer_tdt_img",
  TDT_TER: "base_layer_tdt_ter",
  GOOGLE_ROAD: "base_layer_google_road",
  GOOGLE_IMG: "base_layer_google_img",
  GOOGLE_TER: "base_layer_google_ter",
  OSM_STANDARD: "base_layer_osm_standard"
} as const;

export type BaseLayerID = (typeof BaseLayerID)[keyof typeof BaseLayerID];

export const BaseLayerMap = {
  TDT_VEC: TDT_VEC_LAYER_GTL,
  TDT_IMG: TDT_IMG_LAYER_GTL,
  TDT_TER: TDT_TER_LAYER_GTL,
  GOOGLE_ROAD: GOOGLE_ROAD_LAYER_GTL,
  GOOGLE_IMG: GOOGLE_IMG_LAYER_GTL,
  GOOGLE_TER: GOOGLE_TER_LAYER_GTL,
  OSM_STANDARD: OSM_STANDARD_LAYER_GTL
} as const;

export type BaseLayerMap = (typeof BaseLayerMap)[keyof typeof BaseLayerMap];

export interface BaseLayerOptions {
  label: string;
  thumb: string;
  type: BaseLayerType;
  value: string;
  engine: string;
  layer: CoreGroupTileLayer[] | ((key: string) => CoreGroupTileLayer[]);
}

export interface BaseLayerGroup {
  name: string;
  layers: BaseLayerOptions[];
}

export const TDT_LAYERS: BaseLayerOptions[] = [
  {
    label: "标准地图",
    thumb: CDN_ASSETS.thumbs.tdtVec,
    type: BaseLayerType.TDT,
    value: BaseLayerID.TDT_VEC,
    layer: BaseLayerMap.TDT_VEC,
    engine: MapSearchEngine.TDT
  },
  {
    label: "影像地图",
    thumb: CDN_ASSETS.thumbs.tdtImg,
    type: BaseLayerType.TDT,
    value: BaseLayerID.TDT_IMG,
    layer: BaseLayerMap.TDT_IMG,
    engine: MapSearchEngine.TDT
  },
  {
    label: "地形晕渲",
    thumb: CDN_ASSETS.thumbs.tdtTer,
    type: BaseLayerType.TDT,
    value: BaseLayerID.TDT_TER,
    layer: BaseLayerMap.TDT_TER,
    engine: MapSearchEngine.TDT
  }
];

export const GOOGLE_LAYERS: BaseLayerOptions[] = [
  {
    label: "标准地图",
    thumb: CDN_ASSETS.thumbs.googleRoad,
    type: BaseLayerType.GOOGLE,
    value: BaseLayerID.GOOGLE_ROAD,
    layer: BaseLayerMap.GOOGLE_ROAD,
    engine: MapSearchEngine.GOOGLE
  },
  {
    label: "影像地图",
    thumb: CDN_ASSETS.thumbs.googleImg,
    type: BaseLayerType.GOOGLE,
    value: BaseLayerID.GOOGLE_IMG,
    layer: BaseLayerMap.GOOGLE_IMG,
    engine: MapSearchEngine.GOOGLE
  },
  {
    label: "地形晕渲",
    thumb: CDN_ASSETS.thumbs.googleTer,
    type: BaseLayerType.GOOGLE,
    value: BaseLayerID.GOOGLE_TER,
    layer: BaseLayerMap.GOOGLE_TER,
    engine: MapSearchEngine.GOOGLE
  }
];

export const OSM_LAYERS: BaseLayerOptions[] = [
  {
    label: "标准地图",
    thumb: CDN_ASSETS.thumbs.osmStandard,
    type: BaseLayerType.OSM,
    value: BaseLayerID.OSM_STANDARD,
    layer: BaseLayerMap.OSM_STANDARD,
    engine: MapSearchEngine.OSM
  }
];

export const BASE_LAYER_GROUP: BaseLayerGroup[] = [
  { name: "天地图", layers: TDT_LAYERS },
  { name: "Google Map", layers: GOOGLE_LAYERS },
  { name: "Open Street Map", layers: OSM_LAYERS }
];
