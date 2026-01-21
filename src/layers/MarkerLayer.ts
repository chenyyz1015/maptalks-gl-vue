import { PointLayer } from "maptalks-gl";
import type { MapCore } from "../core";
import { MarkerDecorator } from "../decorators";
import { GeometryLayerMixin } from "./GeometryLayer";

export type MarkerDecoratorMap = Map<string, MarkerDecorator>;

export default class MarkerLayer extends GeometryLayerMixin(PointLayer) {
  declare decoratorMap: MarkerDecoratorMap;

  constructor(id: string, viewer: MapCore) {
    super(id, {});

    this.viewer = viewer;
    this.addTo(this.viewer);
    this.decoratorMap = new Map([]);
  }
}
