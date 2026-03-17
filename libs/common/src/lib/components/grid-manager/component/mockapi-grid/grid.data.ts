import { IGridColumnExt } from "@lib-common";

export interface IMockGridData {
  Data: any[];
  TotalCount: number;
  Page?: number;
  getPage?: (page: number) => any[];
  DetailLevels?: any[];
}

export interface IMockGridDetailLevel {
  key: string;
  data: any[];
  getData?: (parentRow: any) => any[] | Promise<any[]>;
  columns?: IGridColumnExt[];
}
