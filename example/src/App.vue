<template>
  <div class="app-container">
    <MapPicker v-model="location" />
  </div>
</template>

<script setup lang="ts">
import { MapPicker, useMapGlobalState } from "maptalks-gl-vue";
import { onMounted, ref } from "vue";

onMounted(() => {
  mapState.init();
});

const mapState = useMapGlobalState();

const location = ref<string>("118.5546748,31.6976106");
</script>

<style scoped>
.app-container {
  width: 100%;
  height: 100%;
}
</style>
