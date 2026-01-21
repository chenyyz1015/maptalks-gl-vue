import { Layer, OverlayLayer } from "maptalks-gl";
import { MapCore } from "../core";
import type { AreaDecoratorOptions, LineDecoratorOptions, MarkerDecoratorOptions } from "../decorators";
import { GeometryDecorator } from "../decorators";

export type GeometryDecoratorMap = Map<string, GeometryDecorator>;

export abstract class GeometryLayer extends OverlayLayer {
  abstract viewer: MapCore;
  abstract decoratorMap: GeometryDecoratorMap;
  abstract addGeo(opts: MarkerDecoratorOptions | LineDecoratorOptions | AreaDecoratorOptions): void;
  abstract removeGeoByType(type: string): void;
  abstract removeGeoById(id: string | string[]): void;
  abstract clearGeo(): void;
  abstract focusLayer(): void;
  abstract destroy(): void;
}

export type GeometryLayerConstructor<T extends Layer> = new (...args: any[]) => T;

export const GeometryLayerMixin = <TBase extends GeometryLayerConstructor<OverlayLayer>>(Base: TBase) => {
  return class extends Base implements GeometryLayer {
    declare viewer: MapCore;
    declare decoratorMap: GeometryDecoratorMap;

    constructor(...args: any[]) {
      super(...args);
    }

    /**
     * 添加图形
     * @param {MarkerDecoratorOptions|LineDecoratorOptions|AreaDecoratorOptions} opts
     */
    addGeo(opts: MarkerDecoratorOptions | LineDecoratorOptions | AreaDecoratorOptions) {
      const decorator = new GeometryDecorator(opts, this);
      decorator.addTo();
      this.decoratorMap.set(opts.id, decorator);
    }

    /**
     * 移除图形(type)
     * @param {string} type
     */
    removeGeoByType(type: string) {
      const decorators = Array.from(this.decoratorMap.entries())
        .filter(([, d]) => {
          const properties = d.getProperties();
          return properties?.type === type;
        })
        .map(([, d]) => d);
      decorators.forEach((d) => d.remove());
    }

    /**
     * 移除图形(id)
     * @param {string|string[]} id
     */
    removeGeoById(id: string | string[]) {
      if (typeof id === "string") {
        const decorator = this.decoratorMap.get(id);
        decorator?.remove();
        this.decoratorMap.delete(id);
      } else {
        const decorators = Array.from(this.decoratorMap.entries()).filter(([i]) => id.includes(i));
        decorators.forEach(([i, d]) => {
          d.remove();
          this.decoratorMap.delete(i);
        });
      }
    }

    /**
     * 清除图形
     */
    clearGeo() {
      const decorators = Array.from(this.decoratorMap.entries());
      decorators.forEach(([i, d]) => {
        d.remove();
        this.decoratorMap.delete(i);
      });
    }

    /**
     * 聚焦图层
     */
    focusLayer() {
      const extent = this.getExtent();
      this.viewer.fitExtent(extent);
    }

    /**
     * 销毁实例
     */
    destroy() {
      this.decoratorMap.clear();
      this.clear();
      this.remove();
    }
  };
};
