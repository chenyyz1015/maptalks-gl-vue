import { MaptalksGlVue } from "maptalks-gl-vue";
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

// Register the plugin with API keys
// Replace with your actual API keys or use environment variables
app.use(MaptalksGlVue, {
  tk: import.meta.env.VITE_TDT_MAP_KEY,
  gk: import.meta.env.VITE_GOOGLE_API_KEY,
  defaultBaseLayer: import.meta.env.VITE_MAP_BASE_LAYER,
  defaultSearchEngine: import.meta.env.VITE_MAP_SEARCH_ENGINE,
  searchEngineAuto: import.meta.env.VITE_MAP_SEARCH_ENGINE_AUTO === "true"
});

app.mount("#app");
