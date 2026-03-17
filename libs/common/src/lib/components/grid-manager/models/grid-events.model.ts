export interface IGridNavigationEvent {
  pageNo: number;
  pageSize: number;
  filterQuery: string;
  sortQuery: string;
}

export enum GridLifeCycle {
  DidFetchSettings,
  DidGetData
}
