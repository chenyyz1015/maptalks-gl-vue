import type { CoreGroupTileLayer } from "../../core";

// OSM地图-标准地图
export const OSM_STANDARD_LAYER_GTL: CoreGroupTileLayer[] = [
  {
    id: "osm",
    type: "wms",
    opts: {
      urlTemplate: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      subdomains: ["a", "b", "c"],
      minZoom: 0,
      maxZoom: 18
    }
  }
];
