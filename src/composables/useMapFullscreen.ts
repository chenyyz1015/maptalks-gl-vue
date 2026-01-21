import { useEventListener } from "@vueuse/core";
import { Ref, ref } from "vue";

export const useMapFullscreen = (containerRef: Ref<HTMLElement | undefined>) => {
  const isFullscreen = ref(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (!containerRef.value) {
        console.warn("containerRef is undefined");
      }
      containerRef.value?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleFullscreenChange = () => {
    isFullscreen.value = !!document.fullscreenElement;
  };

  useEventListener(document, "fullscreenchange", handleFullscreenChange);

  return { isFullscreen, toggleFullscreen };
};
