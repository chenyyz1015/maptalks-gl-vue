import { LineStringLayer } from "maptalks-gl";
import type { MapCore } from "../core";
import type { LineDecorator } from "../decorators";
import { GeometryLayerMixin } from "./GeometryLayer";

export type LineDecoratorMap = Map<string, LineDecorator>;

export default class LineLayer extends GeometryLayerMixin(LineStringLayer) {
  declare decoratorMap: LineDecoratorMap;

  constructor(id: string, viewer: MapCore) {
    super(id, {});

    this.viewer = viewer;
    this.addTo(this.viewer);
    this.decoratorMap = new Map([]);
  }
}
