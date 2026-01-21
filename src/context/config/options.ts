import type { ClassOptions } from "maptalks/dist/core/Class";
import type { MapCreateOptionsType } from "maptalks/dist/map/Map";

export const DEFAULT_OPTIONS: MapCreateOptionsType = {
  center: [118.5546748, 31.6976106],
  zoom: 11,
  bearing: 0,
  pitch: 0,
  dragPitch: false,
  dragRotate: false,
  dragPan: true,
  scrollWheelZoom: true,
  doubleClickZoom: true,
  minZoom: 3,
  maxZoom: 18
};

export const DEFAULT_CONFIG_OPTIONS: ClassOptions = {
  dragPan: true,
  scrollWheelZoom: true,
  doubleClickZoom: true
};
