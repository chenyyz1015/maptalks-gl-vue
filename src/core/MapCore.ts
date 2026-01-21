import type { TileLayerOptionsType } from "maptalks";
import { GroupTileLayer, Map as MaptalksGLMap, TileLayer, WMSTileLayer } from "maptalks-gl";
import type { GroupTileLayerOptionsType } from "maptalks/dist/layer/tile/GroupTileLayer";
import type { WMSTileLayerOptionsType } from "maptalks/dist/layer/tile/WMSTileLayer";
import type { MapContainerType, MapCreateOptionsType, MapViewType } from "maptalks/dist/map/Map";
import { DEFAULT_VIEW } from "../context";
import type { GeometryLayer } from "../layers";

export type CoreZoomType = "plus" | "minus";

export type CoreTileLayerMap = Map<string, TileLayer | WMSTileLayer | GroupTileLayer>;

export interface CoreGroupTileLayer {
  id: string;
  type: "tile" | "wms";
  opts: TileLayerOptionsType | WMSTileLayerOptionsType;
}

export default class MapCore extends MaptalksGLMap {
  private tileLayerMap: CoreTileLayerMap = new Map([]);

  constructor(container: MapContainerType, opts: MapCreateOptionsType) {
    super(container, { ...opts, attribution: false });
  }

  /**
   * 添加基础瓦片图层
   * @param {string} id
   * @param {TileLayerOptionsType} opts
   * @returns {TileLayer} layer
   */
  addTileLayer(id: string, opts: TileLayerOptionsType): TileLayer {
    const layer = new TileLayer(id, opts);
    this.tileLayerMap.set(id, layer);
    return layer;
  }

  /**
   * 添加WMS瓦片图层
   * @param {string} id
   * @param {WMSTileLayerOptionsType} opts
   * @returns {WMSTileLayer} layer
   */
  addWMSTileLayer(id: string, opts: WMSTileLayerOptionsType): WMSTileLayer {
    const layer = new WMSTileLayer(id, opts);
    this.tileLayerMap.set(id, layer);
    return layer;
  }

  /**
   * 添加组合瓦片图层
   * @param {string} id
   * @param {CoreGroupTileLayer[]} layers
   * @param {GroupTileLayerOptionsType} groupOpts
   * @returns {GroupTileLayer} groupLayer
   */
  addGroupTileLayer(id: string, layers: CoreGroupTileLayer[], groupOpts: GroupTileLayerOptionsType): GroupTileLayer {
    const tileLayers: (TileLayer | WMSTileLayer)[] = layers.map((l) => {
      switch (l.type) {
        case "tile":
          return this.addTileLayer(l.id, l.opts);
        case "wms":
          return this.addWMSTileLayer(l.id, l.opts);
        default:
          return this.addTileLayer(l.id, l.opts);
      }
    });
    const groupLayer = new GroupTileLayer(id, tileLayers, groupOpts);
    this.tileLayerMap.set(id, groupLayer);
    return groupLayer;
  }

  /**
   * 设置默认底图
   * @param {string} id
   */
  setDefaultBaseLayer(id: string) {
    const baseLayer = this.tileLayerMap.get(id);
    if (!baseLayer) {
      throw new Error(`Layer ${id} 未加载`);
    }
    this.setBaseLayer(baseLayer);
  }

  /**
   * 切换zoom
   * @param {CoreZoomType} type
   * @returns {number} zoom
   */
  zoomTo(type: CoreZoomType): number {
    let zoom = this.getZoom();
    zoom = type === "plus" ? zoom + 1 : zoom - 1;
    zoom = zoom > 18 ? 18 : zoom < 0 ? 0 : zoom;
    this.flyTo({ zoom }, { duration: 1000, easing: "inAndOut" });
    return zoom;
  }

  /**
   * 切换旋转角度
   * @param {number|undefined} bearing
   * @returns {number} bearing
   */
  bearingTo(bearing?: number): number {
    if (typeof bearing !== "number") {
      bearing = this.getBearing() ? 0 : 180;
    }
    this.flyTo({ bearing }, { duration: 1000, easing: "inAndOut" });
    return bearing;
  }

  /**
   * 切换倾斜角度
   * @param {number|undefined} pitch
   * @returns {number} pitch
   */
  pitchTo(pitch?: number): number {
    if (typeof pitch !== "number") {
      pitch = this.getPitch() ? 0 : 60;
    }
    this.flyTo({ pitch }, { duration: 1000, easing: "inAndOut" });
    return pitch;
  }

  /**
   * 重置视角
   * @param {MapViewType} view
   */
  resetView(view: MapViewType = DEFAULT_VIEW) {
    this.flyTo(view, { duration: 1000, easing: "inAndOut" });
  }

  /**
   * 清空标注
   */
  clear() {
    const layers = this.getLayers() as GeometryLayer[];
    layers.forEach((l) => l.destroy());
  }

  /**
   * 销毁实例
   */
  destroy() {
    this.tileLayerMap.clear();
    this.remove();
  }
}
