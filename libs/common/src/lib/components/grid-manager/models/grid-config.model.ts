import { IGridColumn } from './grid-column.model';
import { ColumnTypes, LibGrids } from './grids.enum';

export interface IGridYetkileri {
  gridId: LibGrids;
  canExport: boolean;
  canFilter: boolean;
  canSelectRow: boolean;
  unAuthrizedColmns: string[];
}

export interface IColumnDbSettings {
  order: number;
  pinned: boolean;
  filterable: boolean;
  groupable: boolean;
  editable: boolean;
  sortable: boolean;
  hidden: boolean;
  hasSummary: boolean;
  resizable: boolean;
  movable: boolean;
  minWidth: string;
  maxWidth: string;
  width: string;
  type: string;
  masterID?: number;
  columnID?: number;
  columnType?: ColumnTypes;
  dataSource?: boolean;
}

export interface IGridUserColSettings {
  [key: string]: IColumnDbSettings;
}

export interface IGridConfig {
  properties: IGridYetkileri;
  columnsConfig: IGridUserColSettings;
  firstLevelColumnsConfig: IGridUserColSettings;
}

export class ColumnDbSettings implements IColumnDbSettings {
  order: number;
  pinned: boolean;
  filterable: boolean;
  groupable: boolean;
  editable: boolean;
  sortable: boolean;
  hidden: boolean;
  hasSummary: boolean;
  resizable: boolean;
  movable: boolean;
  minWidth: string;
  maxWidth: string;
  width: string;
  type: string;
  masterID: number;
  columnID: number;
  columnType: ColumnTypes;
  dataSource: boolean;

  constructor(localConfig: IGridColumn, order: number) {
    this.order = order;

    this.groupable = localConfig.groupable;
    this.hasSummary = localConfig.hasSummary;
    this.pinned = localConfig.pinned;
    this.movable = localConfig.movable;
    this.resizable = localConfig.resizable;
    this.filterable = localConfig.filterable;
    this.editable = localConfig.editable;
    this.width = localConfig.width;
    this.type = localConfig.type;
    this.sortable = localConfig.sortable;
    this.hidden = localConfig.hidden;

    this.minWidth = localConfig.minWidth;
    this.maxWidth = localConfig.maxWidth;

    this.masterID = localConfig.masterID;
    this.columnID = localConfig.columnID;
    this.columnType = localConfig.columnType;
    this.dataSource = localConfig.dataSource;
  }
}
