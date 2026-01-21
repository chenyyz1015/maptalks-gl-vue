import { Marker } from "maptalks-gl";
import type { MarkerCoordinatesType, MarkerOptionsType } from "maptalks/dist/geometry/Marker";
import type { MarkerLayer } from "../layers";
import type { GeometryDecoratorOptions } from "./GeometryDecorator";
import GeomeDecorator, { GeometryDecoratorType } from "./GeometryDecorator";

export interface MarkerDecoratorOptions extends GeometryDecoratorOptions {
  geo: typeof GeometryDecoratorType.MARKER;
  coordinates: MarkerCoordinatesType;
  options: MarkerOptionsType;
}

export default class MarkerDecorator extends GeomeDecorator {
  declare protected opts: MarkerDecoratorOptions;
  declare protected layer: MarkerLayer;
  declare protected geometry: Marker;

  constructor(opts: MarkerDecoratorOptions, layer: MarkerLayer) {
    super(opts, layer);
  }
}
