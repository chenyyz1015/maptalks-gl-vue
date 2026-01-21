<template>
  <div ref="pickerRef" class="map-picker">
    <div v-if="search" class="location-filter">
      <Select
        v-model:value="modelValue"
        show-search
        :show-arrow="false"
        :default-active-first-option="false"
        :filter-option="false"
        :not-found-content="null"
        :options="options"
        placeholder="地名/坐标检索"
        :get-popup-container="(triggerNode: any) => triggerNode.parentNode"
        dropdown-match-select-width
        @search="handleSearch"
        @change="handleChange"
      ></Select>
      <Button type="primary" @click="onResetSearchResult">重置</Button>
    </div>
    <div v-else class="location-label">{{ locationLabel }}</div>
    <div class="map-content">
      <MapViewer :toolbar="toolbar" :is-fullscreen="isFullscreen" @toggle-fullscreen="toggleFullscreen" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button, Select } from "ant-design-vue";
import type { DefaultOptionType, SelectValue } from "ant-design-vue/es/select";
import { debounce, isNil } from "lodash-es";
import type { HandlerFnResultType } from "maptalks/dist/core/Eventable";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { MapViewer } from "..";
import type { TDTGeocodeSearchParams, TDTKeywordSearchParams } from "../../api";
import { getTDTSearchResultByGeocode, getTDTSearchResultByKeword } from "../../api";
import { useMapFullscreen, useMapGlobalOptions, useMapGlobalState, useMapInstance } from "../../composables";
import { CDN_ASSETS } from "../../context";
import { GeometryDecoratorType } from "../../decorators";
import { MarkerLayer } from "../../layers";
import { uuid } from "../../utils";

interface Props {
  search?: boolean;
  clickable?: boolean;
  dragPan?: boolean;
  scrollWheelZoom?: boolean;
  doubleClickZoom?: boolean;
  pickerIcon?: string;
  pickerSize?: number;
  toolbar?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  search: true,
  clickable: true,
  dragPan: true,
  scrollWheelZoom: true,
  doubleClickZoom: true,
  pickerIcon: CDN_ASSETS.icons.picker,
  pickerSize: 65,
  toolbar: true
});

const modelValue = defineModel<SelectValue>("modelValue", { required: true });

onMounted(() => {
  viewer.on("click", handleViewerClick);
});

const pickerRef = ref<HTMLElement>();
const { isFullscreen, toggleFullscreen } = useMapFullscreen(pickerRef);
const { tk } = useMapGlobalOptions();
const mapState = useMapGlobalState();
const { viewer } = useMapInstance();

viewer.config(props);

const markerLayer = new MarkerLayer(`layer_${uuid()}`, viewer);

const focus = ref<boolean>(true);
const options = ref<DefaultOptionType[]>([]);
const locationLabel = computed<string>(() => {
  const result = options.value.find((o) => o.value === modelValue.value);
  return result?.label ?? "暂未查询到地址";
});

const handleKeywordSearch = async (keyWord: string) => {
  try {
    const postStr = {
      keyWord,
      mapBound: "-180,-90,180,90",
      level: 18,
      queryType: 4,
      start: 0,
      count: 10
    };
    const params: TDTKeywordSearchParams = {
      postStr: JSON.stringify(postStr),
      type: "query",
      tk: tk.value
    };
    const { suggests } = await getTDTSearchResultByKeword(params);
    options.value = (suggests ?? []).map((s, i) => {
      return { ...s, key: i, label: `${s.name} · ${s.address}`, value: s.lonlat };
    });
  } catch (error) {
    console.error(error);
    options.value = [];
  }
};

const handleGeocodeSearch = async (lng: number, lat: number) => {
  try {
    const params: TDTGeocodeSearchParams = {
      postStr: JSON.stringify({ lon: lng, lat, ver: 1 }),
      type: "geocode",
      tk: tk.value
    };
    const result = await getTDTSearchResultByGeocode(params);
    const { formatted_address, addressComponent } = result ?? {};
    const { nation, province, city, county, town, address } = addressComponent ?? {};
    const label = formatted_address || `${nation}${province}${city}${county}${town}${address}`;
    const value = [lng, lat].join(",");
    options.value = [{ label, value }];
  } catch (error) {
    console.error(error);
    options.value = [];
  }
};

const render = () => {
  markerLayer.clearGeo();
  if (!modelValue.value) {
    return;
  }
  const [lng, lat] = modelValue.value
    .toString()
    .split(",")
    .map((i) => Number(i));
  if (!lng || !lat || Number.isNaN(lng) || Number.isNaN(lat)) {
    return;
  }

  markerLayer.addGeo({
    geo: GeometryDecoratorType.MARKER,
    id: uuid(),
    type: "picker",
    coordinates: [lng, lat],
    options: {
      symbol: {
        markerFile: props.pickerIcon,
        markerWidth: props.pickerSize,
        markerHeight: props.pickerSize
      }
    }
  });
  if (focus.value) {
    markerLayer.focusLayer();
  }
  if (!options.value.length) {
    handleGeocodeSearch(lng, lat);
  }
};
watch(modelValue, () => render(), { immediate: true });

const handleViewerClick = (e?: HandlerFnResultType) => {
  if (
    !props.clickable ||
    isNil(e?.coordinate?.x) ||
    isNil(e?.coordinate?.y) ||
    Number.isNaN(Number(e.coordinate.x)) ||
    Number.isNaN(Number(e.coordinate.y))
  ) {
    return;
  }
  const lng = Number(Number(e.coordinate.x).toFixed(6));
  const lat = Number(Number(e.coordinate.y).toFixed(6));
  focus.value = false;
  modelValue.value = [lng, lat].join(",");
  handleGeocodeSearch(lng, lat);
};

const handleSearch = debounce(async (keyword: string) => {
  if (!props.search || !keyword) {
    return;
  }
  const result = keyword
    .split(",")
    .filter((k) => k.trim())
    .map((k) => Number(k));
  const [lng, lat] = result;
  const geocode = lng && lat && !Number.isNaN(lng) && !Number.isNaN(lat);
  if (result.length === 2 && geocode) {
    handleGeocodeSearch(lng, lat);
  } else {
    handleKeywordSearch(keyword);
  }
}, 500);

const handleChange = () => {
  focus.value = true;
};

const onResetSearchResult = () => {
  modelValue.value = undefined;
  options.value = [];
  mapState.resetView();
};

onUnmounted(() => {
  viewer.off("click", handleViewerClick);
});
</script>

<style lang="scss" scoped>
.map-picker {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.map-picker .location-filter {
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;

  :deep(.ant-select) {
    flex: 1 1 auto;
    width: 0;
    height: auto;

    .ant-select-selector {
      border-radius: var(--border-radius) 0 0 0;
    }

    .ant-select-dropdown {
      left: 0 !important;
      top: 32px !important;
      transform: none !important;
    }
  }

  .ant-btn {
    border-radius: 0 var(--border-radius) 0 0;
  }
}

.map-picker .location-label {
  width: 100%;
  height: 40px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: var(--border-radius) var(--border-radius) 0 0;
}

.map-picker .map-content {
  width: 100%;
  height: 0;
  flex: 1 1 auto;
  border-radius: 0 0 var(--border-radius) var(--border-radius);
  overflow: hidden;
}
</style>
