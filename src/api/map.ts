import type {
  TDTGeocodeSearchParams,
  TDTGeocodeSearchResult,
  TDTKeywordSearchParams,
  TDTKeywordSearchResult
} from "./types";

// 地名搜索
export async function getTDTSearchResultByKeword(params: TDTKeywordSearchParams): Promise<TDTKeywordSearchResult> {
  const searchParams = new URLSearchParams(params);
  const result = await fetch(`https://api.tianditu.gov.cn/v2/search?${searchParams}`);
  const data = await result.json();
  return data;
}

// 逆地理编码查询
export async function getTDTSearchResultByGeocode(
  params: TDTGeocodeSearchParams
): Promise<TDTGeocodeSearchResult | null> {
  const searchParams = new URLSearchParams(params);
  const result = await fetch(`https://api.tianditu.gov.cn/geocoder?${searchParams}`);
  const data = await result.json();
  return data.status === "0" ? data.result : null;
}
