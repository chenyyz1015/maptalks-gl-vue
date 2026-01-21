<template>
  <div class="map-pan-toolbar" :class="{ 'is-open': open }">
    <FloatButton v-for="(btn, bIndex) in PanToolBtnList" :key="bIndex">
      <template #icon>
        <div class="icon-content" @click="btn.handler">
          <component :is="btn.icon" />
        </div>
      </template>
    </FloatButton>
  </div>
</template>

<script setup lang="ts">
import { DownOutlined, LeftOutlined, RightOutlined, UpOutlined } from "@ant-design/icons-vue";
import { FloatButton } from "ant-design-vue";
import { FunctionalComponent } from "vue";
import { useMapInstance } from "../../../composables";

interface ToolBtn {
  key: string;
  icon?: FunctionalComponent;
  handler: (...args: any[]) => any;
}

interface Props {
  open: boolean;
  step?: number;
}

const props = withDefaults(defineProps<Props>(), { step: 300 });

const { viewer } = useMapInstance();

const PanToolBtnList: ToolBtn[] = [
  { key: "pan-left", icon: LeftOutlined, handler: () => viewer.panBy([props.step, 0]) },
  { key: "pan-right", icon: RightOutlined, handler: () => viewer.panBy([-props.step, 0]) },
  { key: "pan-up", icon: UpOutlined, handler: () => viewer.panBy([0, props.step]) },
  { key: "pan-down", icon: DownOutlined, handler: () => viewer.panBy([0, -props.step]) }
];
</script>

<style lang="scss" scoped>
.map-pan-toolbar {
  position: absolute;
  right: 90px;
  bottom: 25px;
  z-index: 9;
  display: flex;
  align-items: center;
  gap: 16px;
  visibility: hidden;
  opacity: 0;
  transform: translateX(100%);
  transform-origin: right bottom;
  transition: all 0.25s ease-in-out;

  &.is-open {
    visibility: visible;
    opacity: 1;
    transform: translateX(0);
  }

  :deep(.ant-float-btn) {
    position: relative;
    inset-inline-end: 0;
    inset-block-end: 0;

    .ant-float-btn-content {
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
}
</style>
