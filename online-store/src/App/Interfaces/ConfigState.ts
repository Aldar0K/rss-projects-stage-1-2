export interface ConfigState {
  search: string;
  sort: string;
  filterAmount: Array<number>;
  filterYear: Array<number>;
  filterBrand: Array<string>;
  filterCameras: Array<string>;
  filterColor: Array<string>;
  filterInCart: boolean;
}
