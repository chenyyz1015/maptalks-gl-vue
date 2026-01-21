import { getCurrentInstance } from "vue";

export const useMapInstance = () => {
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error("useMapInstance must be used in setup");
  }
  const { viewer, container } = instance.appContext.config.globalProperties.$map;

  return { viewer, container };
};
