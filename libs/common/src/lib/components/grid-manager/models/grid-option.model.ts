import { GridData, IPagerTemplate, LibGrids, LibModulesRootLangKeys } from '@lib-common';
import { Observable } from 'rxjs';

export enum GridProviders {
  KENDO,
  INFRAGISTICS,
}

export enum PagingTypes {
  REMOTE,
  LOCAL,
  NONE,
}

export enum RowSelectionModes {
  NONE = 'none',
  SINGLE = 'single',
  MULTIPLE = 'multiple',
}

export interface IGridOptions {
  readonly provider: GridProviders;
  readonly allowFiltering: boolean;
  readonly dynamicGrid: boolean;
  readonly hideRowSelectors: boolean;
  readonly rowSelectable: boolean;
  readonly multipleRowSelection: boolean;
  readonly singleRowSelection: boolean;
  readonly paging: boolean;
  readonly width: string;
  readonly height: string;
  readonly perPage: number;
  readonly pagingType: PagingTypes;
  readonly gridId: LibGrids;
  readonly gridModuleKey: LibModulesRootLangKeys;
  readonly gridTitle: string;
  readonly childKey: string;
  readonly columnNamesWithoutPrefix: boolean;
  readonly dataSource: (pagerTemplate?: Partial<IPagerTemplate>) => Observable<GridData>;
  readonly actionStrip: boolean;
  readonly actionStripFirstGrid: boolean;
  readonly columnMovable: boolean;
  readonly rowSelectionMode: RowSelectionModes;
  updatePageSize(newPageSize: number): void;

  // readonly ignoredColumnSpecification: (columns: (IGridColumnExt | IGridColumn)[]) => (IGridColumnExt | IGridColumn)[];
  // readonly columnHeaderSpecification: (val: string) => string;
  // readonly editableColumnSpecification: (column: IgxColumnComponent) => boolean;
  // readonly firstLevelIgnoredColumnSpecification: (columns: (IGridColumnExt | IGridColumn)[]) => (IGridColumnExt | IGridColumn)[];
  // readonly columnDataTypeSpecification: (column: IgxColumnComponent) => GridColumnDataType;
  // readonly firstLevelEditableColumnSpecification: (column: IGridColumnExt | IGridColumn) => boolean;
}

class GridOptions implements IGridOptions {
  _provider: GridProviders;
  _allowFiltering: boolean;
  _dynamicGrid: boolean;
  _hideRowSelectors: boolean;
  _rowSelectable: boolean;
  _paging: boolean;
  _width: string;
  _height: string;
  _perPage: number;
  _pagingType: PagingTypes;
  _gridId: LibGrids;
  _gridTitle: string;
  _childKey: string;
  _gridModuleKey: LibModulesRootLangKeys;
  _multipleRowSelection: boolean;
  _singleRowSelection: boolean;
  _columnNamesWithoutPrefix: boolean;
  _dataSource: (pagerTemplate?: Partial<IPagerTemplate>) => Observable<GridData>;
  _actionStrip: boolean;
  _actionStripFirstGrid: boolean;
  _columnMovable: boolean;
  // _ignoredColumnSpecification: (columns: (IGridColumnExt | IGridColumn)[]) => (IGridColumnExt | IGridColumn)[];
  // _columnHeaderSpecification: (val: string) => string;
  // _editableColumnSpecification: (column: IgxColumnComponent) => boolean;
  // _firstLevelIgnoredColumnSpecification: (columns: (IGridColumnExt | IGridColumn)[]) => (IGridColumnExt | IGridColumn)[];
  // _columnDataTypeSpecification: (column: IgxColumnComponent) => GridColumnDataType;
  // _firstLevelEditableColumnSpecification: (column: IGridColumnExt | IGridColumn) => boolean;
  _rowSelectionMode: RowSelectionModes;

  get provider() {
    return this._provider;
  }

  get allowFiltering() {
    return this._allowFiltering;
  }

  get dynamicGrid() {
    return this._dynamicGrid;
  }

  get hideRowSelectors() {
    return this._hideRowSelectors;
  }

  get rowSelectable() {
    return this._rowSelectable;
  }

  get multipleRowSelection() {
    return this._multipleRowSelection;
  }

  get singleRowSelection() {
    return this._singleRowSelection;
  }

  get columnNamesWithoutPrefix() {
    return this._columnNamesWithoutPrefix;
  }

  get rowSelectionMode() {
    return this._rowSelectionMode ?? RowSelectionModes.NONE;
  }

  get paging() {
    return this._paging;
  }

  get perPage() {
    return this._perPage;
  }

  get height() {
    return this._height;
  }

  get width() {
    return this._width;
  }

  get pagingType() {
    return this._pagingType;
  }

  get gridId() {
    return this._gridId;
  }

  get gridTitle() {
    return this._gridTitle;
  }

  get childKey() {
    return this._childKey;
  }

  get gridModuleKey() {
    return this._gridModuleKey;
  }

  get columnMovable() {
    return this._columnMovable;
  }

  get dataSource(): (pagerTemplate?: Partial<IPagerTemplate>) => Observable<GridData> {
    return this._dataSource;
  }

  public updatePageSize(newSize: number) {
    this._perPage = newSize;
  }

  get actionStrip(): boolean {
    return this._actionStrip;
  }

  get actionStripFirstGrid(): boolean {
    return this._actionStripFirstGrid;
  }

  // get ignoredColumnSpecification() {
  //   return this._ignoredColumnSpecification;
  // }

  // get columnHeaderSpecification() {
  //   return this._columnHeaderSpecification;
  // }

  // get editableColumnSpecification() {
  //   return this._editableColumnSpecification;
  // }

  // get firstLevelIgnoredColumnSpecification() {
  //   return this._firstLevelIgnoredColumnSpecification;
  // }

  // get columnDataTypeSpecification() {
  //   return this._columnDataTypeSpecification;
  // }

  // get firstLevelEditableColumnSpecification() {
  //   return this._firstLevelEditableColumnSpecification;
  // }
}

export class GridOptionsBuilder {
  private _options: GridOptions;

  constructor() {
    this._options = new GridOptions();
    const buildDirector = new GridOptionsDirector();
    buildDirector.setBuilder(this);
    buildDirector.buildDefaultOptions();
  }

  withProvider(provider: GridProviders): GridOptionsBuilder {
    this._options._provider = provider;
    return this;
  }

  withPagingType(paginType: PagingTypes): GridOptionsBuilder {
    this._options._pagingType = paginType;
    return this;
  }

  withRemotePaging(): GridOptionsBuilder {
    this._options._pagingType = PagingTypes.REMOTE;
    return this;
  }

  withLocalPaging(): GridOptionsBuilder {
    this._options._pagingType = PagingTypes.LOCAL;
    return this;
  }

  withPageSize(pageSize: number): GridOptionsBuilder {
    this._options._perPage = pageSize;
    return this;
  }

  forGrid(gridName: LibGrids): GridOptionsBuilder {
    this._options._gridId = gridName;
    return this;
  }

  withFiltering(isAllowed: boolean): GridOptionsBuilder {
    this._options._allowFiltering = isAllowed;
    return this;
  }

  withDynamicGrid(isDynamic: boolean): GridOptionsBuilder {
    this._options._dynamicGrid = isDynamic;
    return this;
  }

  withHideRowSelectors(isHideRowSelectors: boolean): GridOptionsBuilder {
    this._options._hideRowSelectors = isHideRowSelectors;
    return this;
  }

  columMovable(movable: boolean): GridOptionsBuilder {
    this._options._columnMovable = movable;
    return this;
  }

  setRowSelectable(isRowSelectable: boolean): GridOptionsBuilder {
    this._options._rowSelectable = isRowSelectable;
    if (isRowSelectable) {
      this._options._rowSelectionMode = RowSelectionModes.SINGLE;
    }
    return this;
  }

  setMultipleRowSelection(multipleRowSelection: boolean): GridOptionsBuilder {
    this._options._multipleRowSelection = multipleRowSelection;
    if (multipleRowSelection) {
      this._options._rowSelectionMode = RowSelectionModes.MULTIPLE;
    }

    return this;
  }

  setSingleRowSelection(singleRowSelection: boolean): GridOptionsBuilder {
    this._options._singleRowSelection = singleRowSelection;
    if (singleRowSelection) {
      this._options._rowSelectionMode = RowSelectionModes.SINGLE;
    }

    return this;
  }

  setColumnNamesWithoutPrefix(columnNamesWithoutPrefix: boolean): GridOptionsBuilder {
    this._options._columnNamesWithoutPrefix = columnNamesWithoutPrefix;
    return this;
  }

  hasPaging(hasPaging: boolean): GridOptionsBuilder {
    this._options._paging = hasPaging;
    return this;
  }

  inModule(moduleKey: LibModulesRootLangKeys): GridOptionsBuilder {
    this._options._gridModuleKey = moduleKey;
    return this;
  }

  withWidth(widthString: string): GridOptionsBuilder {
    this._options._width = widthString;
    return this;
  }

  withHeight(heightString: string): GridOptionsBuilder {
    this._options._height = heightString;
    return this;
  }

  withTitle(title: string): GridOptionsBuilder {
    this._options._gridTitle = title;
    return this;
  }

  withDataSource(
    dataSource: (pagerTemplate?: Partial<IPagerTemplate>) => Observable<GridData>
  ): GridOptionsBuilder {
    this._options._dataSource = dataSource;
    return this;
  }

  withActionStrip(actionStrip: boolean): GridOptionsBuilder {
    this._options._actionStrip = actionStrip;
    return this;
  }

  withActionStripFirstGrid(actionStrip: boolean): GridOptionsBuilder {
    this._options._actionStripFirstGrid = actionStrip;
    return this;
  }

  // setIgnoredColumnSpecifications(spec: (columns: (IGridColumnExt | IGridColumn)[]) => (IGridColumnExt | IGridColumn)[]) {
  //   this._options._ignoredColumnSpecification = spec;
  //   return this;
  // }

  // setColumnHeaderSpecification(spec: (val: string) => string) {
  //   this._options._columnHeaderSpecification = spec;
  //   return this;
  // }

  // setEditableColumnSpecification(spec: (column: IgxColumnComponent) => boolean) {
  //   this._options._editableColumnSpecification = spec;
  //   return this;
  // }

  // setFirstLevelIgnoredColumnSpecification(spec: (columns: (IGridColumnExt | IGridColumn)[]) => (IGridColumnExt | IGridColumn)[]) {
  //   this._options._firstLevelIgnoredColumnSpecification = spec;
  //   return this;
  // }

  // setColumnDataTypeSpecification(spec: (column: IgxColumnComponent) => GridColumnDataType) {
  //   this._options._columnDataTypeSpecification = spec;
  //   return this;
  // }

  // setFirstLevelEditableColumnSpecification(spec: (column: IGridColumnExt | IGridColumn) => boolean) {
  //   this._options._firstLevelEditableColumnSpecification = spec;
  //   return this;
  // }

  build(): IGridOptions {
    if (this._options._pagingType === PagingTypes.REMOTE) {
      if (this._options._dataSource == null) {
        throw new Error('remote grid needs datasource');
      }
    }

    return this._options;
  }
}

class GridOptionsDirector {
  private builder: GridOptionsBuilder;

  public setBuilder(builder: GridOptionsBuilder): void {
    this.builder = builder;
  }

  public buildDefaultOptions(): void {
    this.builder
      .forGrid(LibGrids.NOT_ASSINGED)
      .inModule(LibModulesRootLangKeys.NOT_ASSINGED)
      .withLocalPaging()
      .withProvider(GridProviders.INFRAGISTICS)
      .withFiltering(false)
      .setRowSelectable(false)
      .withPageSize(20)
      .hasPaging(true)
      .withTitle('')
      .withDataSource(null)
      .withWidth('100%')
      .withHeight('100%')
      .withActionStrip(false)
      .withActionStripFirstGrid(false)
      .columMovable(true);
  }
}
