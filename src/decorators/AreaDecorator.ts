import { Polygon } from "maptalks-gl";
import type { PolygonCoordinatesType, PolygonOptionsType } from "maptalks/dist/geometry/Polygon";
import type { AreaLayer } from "../layers";
import type { GeometryDecoratorOptions } from "./GeometryDecorator";
import GeomeDecorator, { GeometryDecoratorType } from "./GeometryDecorator";

export interface AreaDecoratorOptions extends GeometryDecoratorOptions {
  geo: typeof GeometryDecoratorType.AREA;
  coordinates: PolygonCoordinatesType;
  options: PolygonOptionsType;
}

export default class AreaDecorator extends GeomeDecorator {
  declare protected opts: AreaDecoratorOptions;
  declare protected layer: AreaLayer;
  declare protected geometry: Polygon;

  constructor(opts: AreaDecoratorOptions, layer: AreaLayer) {
    super(opts, layer);
  }
}
