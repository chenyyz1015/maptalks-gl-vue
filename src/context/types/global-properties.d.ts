import "vue";
import { MapCore } from "../../core";

declare module "vue" {
  interface ComponentCustomProperties {
    $map: {
      viewer: MapCore;
      container: HTMLElement;
    };
  }
}

export {};
