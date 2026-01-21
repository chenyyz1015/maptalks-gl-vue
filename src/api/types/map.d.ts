export interface TDTKeywordSearchParams {
  [key: string]: string;
  postStr: string;
  type: "query";
  tk: string;
}

export interface TDTKeywordSearchResultSuggest {
  address: string;
  gbCode: string;
  lonlat: string;
  name: string;
}

export interface TDTKeywordSearchResult {
  count: number;
  keyWord: string;
  resultType: number;
  suggests: TDTKeywordSearchResultSuggest[];
  suggestsKey: string;
}

export interface TDTGeocodeSearchParams {
  [key: string]: string;
  postStr: string;
  type: "geocode";
  tk: string;
}

export interface TDTGeocodeSearchResult {
  formatted_address: string;
  location: {
    lon: number;
    lat: number;
  };
  addressComponent: {
    address: string;
    address_distance: number;
    address_position: string;
    city: string;
    city_code: string;
    county: string;
    county_code: string;
    nation: string;
    poi: string;
    poi_distance: number;
    poi_position: string;
    province: string;
    province_code: string;
    road: string;
    road_distance: number;
    town: string;
    town_code: string;
  };
}
