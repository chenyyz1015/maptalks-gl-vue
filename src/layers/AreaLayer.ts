import { PolygonLayer } from "maptalks-gl";
import type { MapCore } from "../core";
import type { AreaDecorator } from "../decorators";
import { GeometryLayerMixin } from "./GeometryLayer";

export type AreaDecoratorMap = Map<string, AreaDecorator>;

export default class AreaLayer extends GeometryLayerMixin(PolygonLayer) {
  declare decoratorMap: AreaDecoratorMap;

  constructor(id: string, viewer: MapCore) {
    super(id, {});

    this.viewer = viewer;
    this.addTo(this.viewer);
    this.decoratorMap = new Map([]);
  }
}
