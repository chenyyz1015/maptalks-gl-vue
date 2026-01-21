import { createGlobalState } from "@vueuse/core";
import { ref } from "vue";

export const useMapGlobalOptions = createGlobalState(() => {
  const tk = ref<string>("");
  const gk = ref<string>("");

  const defaultBaseLayer = ref<"tdt" | "google" | "osm">("tdt");
  const defaultSearchEngine = ref<"tdt" | "google" | "osm">("tdt");
  const searchEngineAuto = ref<boolean>(false);

  return { tk, gk, defaultBaseLayer, defaultSearchEngine, searchEngineAuto };
});
