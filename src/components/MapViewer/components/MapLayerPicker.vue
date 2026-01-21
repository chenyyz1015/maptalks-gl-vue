<template>
  <div class="map-layer-picker" :class="{ 'is-open': open }">
    <div v-for="group in baseLayerGroup" :key="group.name" class="layer-group">
      <div class="group-header">{{ group.name }}</div>
      <div class="group-body">
        <div
          v-for="layer in group.layers"
          :key="layer.value"
          class="layer-item"
          :class="{ 'is-active': layer.value === baseLayerId }"
          @click="mapState.switchBaseLayer(layer)"
        >
          <img :src="layer.thumb" alt="" class="thumb" />
          <div class="label">{{ layer.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMapGlobalState } from "../../../composables";

interface Props {
  open: boolean;
}

defineProps<Props>();

const mapState = useMapGlobalState();
const { baseLayerId, baseLayerGroup } = mapState;
</script>

<style lang="scss" scoped>
.map-layer-picker {
  position: absolute;
  right: 90px;
  bottom: 81px;
  z-index: 9;
  width: 270px;
  max-height: 255px;
  overflow-y: auto;
  padding: 5px 15px 10px;
  background: #ffffff;
  border-radius: var(--border-radius);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
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

  .layer-group {
    .group-header {
      width: 100%;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .group-body {
      width: 100%;
      height: auto;
      display: flex;
      flex-flow: row wrap;
      gap: 10px;

      .layer-item {
        width: calc(calc(100% - 20px) / 3);
        height: 50px;
        border: 2px solid transparent;
        position: relative;
        opacity: 0.8;
        cursor: pointer;
        transition: all 0.2s linear;

        &.is-active,
        &:hover {
          border-color: var(--primary-color);
          opacity: 1;
        }

        .thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .label {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: auto;
          padding: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.25);
          font-size: var(--font-size-small);
          color: #ffffff;
        }
      }
    }
  }
}
</style>
