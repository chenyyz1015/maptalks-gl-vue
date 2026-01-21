<template>
  <FloatButtonGroup trigger="click" type="primary" class="map-toolbar" @open-change="handleOpenChange">
    <template #icon>
      <EnvironmentOutlined />
    </template>
    <FloatButton v-for="(btn, bIndex) in ToolBtnList" :key="bIndex">
      <template #icon>
        <div class="icon-content" @click="btn.handler">
          <template v-if="btn.key === 'pitch'">{{ pitch ? "2D" : "3D" }}</template>
          <template v-else-if="btn.key === 'fullscreen'">
            <FullscreenOutlined v-if="!isFullscreen" />
            <FullscreenExitOutlined v-else />
          </template>
          <template v-else>
            <component :is="btn.icon" />
          </template>
        </div>
      </template>
    </FloatButton>
  </FloatButtonGroup>
</template>

<script setup lang="ts">
import {
  CompassOutlined,
  EnvironmentOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  MinusOutlined,
  PlusOutlined
} from "@ant-design/icons-vue";
import { FloatButton, FloatButtonGroup } from "ant-design-vue";
import { FunctionalComponent } from "vue";
import { useMapGlobalState } from "../../../composables";

interface ToolBtn {
  key: string;
  icon?: FunctionalComponent;
  handler: (...args: any[]) => any;
}

interface Props {
  isFullscreen: boolean;
}

interface Emits {
  (e: "toggle-fullscreen"): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const open = defineModel<boolean>("open", { required: true });

const mapState = useMapGlobalState();
const { pitch } = mapState;

const ToolBtnList: ToolBtn[] = [
  { key: "fullscreen", handler: () => emit("toggle-fullscreen") },
  { key: "bearing", icon: CompassOutlined, handler: () => mapState.switchBearing() },
  { key: "pitch", handler: () => mapState.switchPitch() },
  { key: "zoom-out", icon: MinusOutlined, handler: () => mapState.switchZoom("minus") },
  { key: "zoom-in", icon: PlusOutlined, handler: () => mapState.switchZoom("plus") }
];

const handleOpenChange = (val: boolean) => (open.value = val);
</script>

<style lang="scss" scoped>
.map-toolbar {
  position: absolute;
  right: 25px;
  bottom: 25px;

  :deep(.ant-float-btn-content) {
    width: 100%;
    height: 100%;
    padding: 0;

    .ant-float-btn-icon {
      width: 100%;
      height: 100%;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;

      .icon-content {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
