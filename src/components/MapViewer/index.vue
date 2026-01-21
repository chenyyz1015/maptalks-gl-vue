<template>
  <div ref="viewerRef" class="map-viewer">
    <MapToolbar
      v-if="toolbar"
      v-model:open="open"
      :is-fullscreen="isFullscreen"
      @toggle-fullscreen="() => $emit('toggle-fullscreen')"
    />
    <MapPanToolbar :open="open" />
    <MapLayerPicker :open="open" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useMapMount } from "../../composables";
import { MapLayerPicker, MapPanToolbar, MapToolbar } from "./components";

interface Props {
  toolbar?: boolean;
  isFullscreen: boolean;
}

interface Emits {
  (e: "toggle-fullscreen"): void;
}

withDefaults(defineProps<Props>(), { toolbar: true });
defineEmits<Emits>();

const viewerRef = ref<HTMLElement>();
useMapMount({}, viewerRef);

const open = ref<boolean>(false);
</script>

<style lang="scss" scoped>
.map-viewer {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
