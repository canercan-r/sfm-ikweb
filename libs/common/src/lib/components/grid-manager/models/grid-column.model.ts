import { TemplateRef } from '@angular/core';
import { ColumnTypes, GridColumnSortTypes, IColumnDbSettings } from '.';
import { GridUtils } from '../utils/grid.utils';

export interface IGridColumn extends IColumnDbSettings {
  field: string;

  pinned: boolean;
  resizable: boolean;
  movable: boolean;
  groupable: boolean;
  filterable: boolean;
  editable: boolean;
  type: string;
  sortable: boolean;
  hidden: boolean;
  hasSummary: boolean;

  masterID?: number;
  columnID?: number;
  columnType?: ColumnTypes;
  dataSource?: boolean;
  disableHiding?: boolean;

  [key: string]: any;
}

export interface IGridColumnExt {
  append: boolean;
  field: string;
  colRef: TemplateRef<any>;
  width: string;
  [key: string]: any;
}

export interface IGridColumnSortData {
  columnName: string;
  sortType: GridColumnSortTypes;
}

export class GridColumn implements IGridColumn {
  order: number;
  pinned: boolean;
  filterable: boolean;
  groupable: boolean;
  editable: boolean;
  sortable: boolean;
  hidden: boolean;
  hasSummary: boolean;
  minWidth: string;
  maxWidth: string;
  width: string;
  resizable: boolean;
  movable: boolean;
  type: string;
  field: string;
  colRef: TemplateRef<any>;
  masterID?: number;
  columnID?: number;
  columnType?: ColumnTypes;
  dataSource?: boolean;

  constructor(field: string, value: any) {
    this.field = field;

    this.pinned = false;
    this.movable = true;
    this.resizable = true;
    this.groupable = false;
    this.filterable = true;
    this.editable = false;
    this.width = '200';
    this.type = GridUtils.getType(value);

    this.sortable = true;
    this.hasSummary = false;
    this.hidden = false;
    this.minWidth = '20';
    this.maxWidth = '400';
    this.dataSource = false;
  }

  public static config(field: string, configObj: IColumnDbSettings): GridColumn {
    const col = new GridColumn(field, 1);
    col.field = field;

    col.pinned = configObj.pinned;
    col.movable = configObj.movable;
    col.resizable = configObj.resizable;
    col.groupable = configObj.groupable;
    col.filterable = configObj.filterable;
    col.editable = configObj.editable;
    col.width = configObj.width;
    col.type = configObj.type;

    col.sortable = configObj.sortable;
    col.hasSummary = configObj.hasSummary;
    col.hidden = configObj.hidden;
    col.minWidth = configObj.minWidth;
    col.maxWidth = configObj.maxWidth;

    col.masterID = configObj.masterID;
    col.columnID = configObj.columnID;
    col.columnType = configObj.columnType;
    col.dataSource = configObj.dataSource;

    return col;
  }
}

