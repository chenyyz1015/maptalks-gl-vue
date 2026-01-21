import { LineString } from "maptalks-gl";
import type { LineStringCoordinatesType, LineStringOptionsType } from "maptalks/dist/geometry/LineString";
import type { LineLayer } from "../layers";
import type { GeometryDecoratorOptions } from "./GeometryDecorator";
import GeomeDecorator, { GeometryDecoratorType } from "./GeometryDecorator";

export interface LineDecoratorOptions extends GeometryDecoratorOptions {
  geo: typeof GeometryDecoratorType.LINE;
  coordinates: LineStringCoordinatesType;
  options: LineStringOptionsType;
}

export default class LineDecorator extends GeomeDecorator {
  declare protected opts: LineDecoratorOptions;
  declare protected layer: LineLayer;
  declare protected geometry: LineString;

  constructor(opts: LineDecoratorOptions, layer: LineLayer) {
    super(opts, layer);
  }
}
