import { Geometry, LineString, Marker, Polygon } from "maptalks-gl";
import type { LineStringCoordinatesType, LineStringOptionsType } from "maptalks/dist/geometry/LineString";
import type { MarkerCoordinatesType, MarkerOptionsType } from "maptalks/dist/geometry/Marker";
import type { PolygonCoordinatesType, PolygonOptionsType } from "maptalks/dist/geometry/Polygon";
import type { GeometryLayer } from "../layers";

export const GeometryDecoratorType = {
  MARKER: "marker",
  LINE: "line",
  AREA: "area"
} as const;

export type GeometryDecoratorType = (typeof GeometryDecoratorType)[keyof typeof GeometryDecoratorType];

export interface GeometryDecoratorOptions {
  [key: string]: any;
  geo: GeometryDecoratorType;
  id: string;
  type: string;
  coordinates: MarkerCoordinatesType | LineStringCoordinatesType | PolygonCoordinatesType;
  options: MarkerOptionsType | LineStringOptionsType | PolygonOptionsType;
}

export default class GeometryDecorator {
  protected opts: GeometryDecoratorOptions;
  protected layer: GeometryLayer;
  protected geometry: Geometry;

  constructor(opts: GeometryDecoratorOptions, layer: GeometryLayer) {
    this.opts = opts;
    this.layer = layer;

    const { geo, coordinates, options } = opts;
    if (geo === GeometryDecoratorType.MARKER) {
      this.geometry = new Marker(coordinates as MarkerCoordinatesType, { ...options, properties: opts });
    } else if (geo === GeometryDecoratorType.LINE) {
      this.geometry = new LineString(coordinates as LineStringCoordinatesType, { ...options, properties: opts });
    } else {
      this.geometry = new Polygon(coordinates as PolygonCoordinatesType, { ...options, properties: opts });
    }
  }

  addTo() {
    this.layer.addGeometry(this.geometry);
  }

  remove() {
    this.layer.removeGeometry(this.geometry);
  }

  getProperties() {
    return this.geometry.getProperties();
  }
}
