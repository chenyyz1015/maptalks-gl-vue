/**
 * 获取资源的 CDN URL
 * @param {string} path 相对于 assets 目录的路径
 * @returns {string} 完整的 CDN URL
 */
export function getCDNUrl(path: string): string {
  return `https://unpkg.com/maptalks-gl-vue@latest/assets/${path}`;
}

/**
 * 预定义的资源 URL
 */
export const CDN_ASSETS = {
  icons: {
    picker: getCDNUrl("icons/picker.png")
  },
  thumbs: {
    googleImg: getCDNUrl("thumbs/google_img.png"),
    googleRoad: getCDNUrl("thumbs/google_road.png"),
    googleTer: getCDNUrl("thumbs/google_ter.png"),
    osmStandard: getCDNUrl("thumbs/osm_standard.png"),
    tdtImg: getCDNUrl("thumbs/tdt_img.png"),
    tdtTer: getCDNUrl("thumbs/tdt_ter.png"),
    tdtVec: getCDNUrl("thumbs/tdt_vec.png")
  }
} as const;
