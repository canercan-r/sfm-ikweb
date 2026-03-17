import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {
  ColumnDbSettings,
  ColumnTypes,
  CustomSortingStrategy,
  DataStorageTypes,
  GridColumn,
  GridConfigService,
  GridLifeCycle,
  GridOptionsBuilder,
  GridProviders,
  GridUtils,
  IColumnDbSettings,
  IGridColumn,
  IGridColumnExt,
  IGridColumnSortData,
  IGridConfig,
  IGridData,
  IGridNavigationEvent,
  IGridOptions,
  IGridPage,
  IGridRowColor,
  IGridUserColSettings,
  LanguageService,
  LibGrids,
  LibModulesRootLangKeys,
  PagingTypes,
} from '@lib-common';
import { TranslateService } from '@ngx-translate/core';
import {
  AbsoluteScrollStrategy,
  AutoPositionStrategy,
  ColumnPinningPosition,
  DefaultSortingStrategy,
  FilterMode,
  HorizontalAlignment,
  IColumnMovingEndEventArgs,
  IColumnMovingStartEventArgs,
  IColumnPipeArgs,
  IColumnResizeEventArgs,
  IColumnVisibilityChangedEventArgs,
  IFilteringEventArgs,
  IFilteringExpressionsTree,
  IForOfState,
  IGridCellEventArgs,
  IGridCreatedEventArgs,
  IGridEditDoneEventArgs,
  IGridEditEventArgs,
  IPaginatorResourceStrings,
  IPinningConfig,
  IRowDataEventArgs,
  IRowSelectionEventArgs,
  IRowToggleEventArgs,
  ISelectionEventArgs,
  ISortingExpression,
  IgxBannerComponent,
  IgxBooleanFilteringOperand,
  IgxColumnComponent,
  IgxCsvExporterService,
  IgxDateFilteringOperand,
  IgxDialogComponent,
  IgxExcelExporterService,
  IgxExporterEvent,
  IgxGridComponent,
  IgxGridEditingActionsComponent,
  IgxGridToolbarComponent,
  IgxGridToolbarExporterComponent,
  IgxHierarchicalGridComponent,
  IgxNumberFilteringOperand,
  IgxRowIslandComponent,
  IgxStringFilteringOperand,
  IgxToastComponent,
  PositionSettings,
  RowType,
  SortingDirection,
  VerticalAlignment
} from '@infragistics/igniteui-angular';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { catchError, debounceTime, first, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { IGridComboData } from '../models/grid-combo-data';
import { GridHeaderMenuActions, IHeaderMenuAction } from '../models/grid.actions.model';

// this will need custom dropdown for the export action in toolbar
// handle the grid state appropiately as it will not change will the new data coming  -->use concatMap to handle asynchrony
// TODO: cache maxSize limit with fifo management
// TODO: hook into export option and provide all data from backend if remote paging is 'on' :: done :: ref:  onExportStarted

/**
 * **LIB GRID MANAGER**
 * @author Me
 *
 *
 * @name LibGridComponent
 * @selector `lib-grid`
 *
 * generic use example:
 * ```html
 * <lib-grid #gridTempRef [gridOption]="gridOps"></lib-grid>
 * ```
 *
 * in consumer component:
 * Setup Example:
 * ```typescript
 * @ViewChild('gridTempRef') mGrid: IgxGridComponent;
 * this.gridOps = new GridOptionsBuilder()
 *                      .withRemotePaging()
 *                      .withPageSize(pageSize)
 *                      .build()
 * ```
 *
 * Show data example:
 * ```typescript
 *  this.mGrid.render(data: IGridDataContanier)
 * ```
 *
 * Pass page data example:
 * ```typescript
 *  this.mGrid.refreshGrid(data: IGridPageContanier)
 * ```
 */

@Component({
  selector: 'lib-grid',
  providers: [IgxExcelExporterService, IgxCsvExporterService],
  styleUrls: ['./lib-grid.component.scss'],
  templateUrl: 'lib-grid.component.html',
})
export class LibGridComponent implements OnInit, OnDestroy, AfterViewInit {
  /**
   * @hidden
   */
  get CurrentNavigateState(): IGridNavigationEvent {
    return {
      pageNo: this.currentPage,
      pageSize: this.gridOption.perPage,
      filterQuery: `${this.currentWhereSqlQuery}`,
      sortQuery: `${this.currentSortSqlQuery}`,
    };
  }

  /**
   * @hidden
   */
  get TotalPages(): number {
    if (this.gridData) {
      return Math.ceil(this.gridData.TotalCount / this.gridOption.perPage);
    }
    return 0;
  }

  /**
   * @hidden
   */
  get gridTemplateRef(): TemplateRef<any> {
    if (this.gridOption.pagingType === PagingTypes.REMOTE) {
      return this.remotePagerRef;
    } else {
      return this.defaultPagerRef;
    }
  }

  hasPermission: (permission: string | string[]) => boolean = () => false;
  constructor(
    public gridConfigService: GridConfigService,
    @Inject(DOCUMENT) private _document: Document,
    private excelExportService: IgxExcelExporterService,
    private translate: TranslateService,
    public _langService: LanguageService,
    public cdr: ChangeDetectorRef,
    private viewContainer: ViewContainerRef
  ) {
    this._filter$
      .asObservable()
      .pipe(debounceTime(1000), takeUntil(this.gridDestroyer$))
      .subscribe(() => this.emittFilter());
  }
  LibGrids = LibGrids;
  @ViewChild('theGrid') libGrid: IgxGridComponent;
  @ViewChild('theHGrid') libHGrid: IgxHierarchicalGridComponent;
  @ViewChild('theFirstGrid') libFirstGrid: IgxRowIslandComponent;
  @ViewChild('grid_toast') toast: IgxToastComponent;
  @ViewChild('toolbar') toolbar: IgxGridToolbarComponent;
  @ViewChild('toolbarExporter') toolbarExporter: IgxGridToolbarExporterComponent;

  @ViewChild('remotePager', { static: true }) remotePagerRef: TemplateRef<any>;
  @ViewChild('defaultPager', { static: true }) defaultPagerRef: TemplateRef<any>;
  @ViewChild('booleanCell', { static: true }) booleanCellRef: TemplateRef<any>;
  @ViewChild('imageCell', { static: true }) imageCellRef: TemplateRef<any>;
  @ViewChild('columnHeader', { static: true }) columnHeaderRef: TemplateRef<any>;
  @ViewChild('summaryTemplate', { static: true }) summaryTemplate: TemplateRef<any>;

  @ViewChild('gridOptionsMissingBanner', { static: true }) bannerGridOptions: IgxBannerComponent;
  @ViewChild('columnsKeysDialog', { static: true }) exportDialog: IgxDialogComponent;

  @ViewChild('exportTextArea', { read: ElementRef, static: true }) exportTextArea: ElementRef;

  @ViewChild('theTempHGrid') theTempHGrid: IgxHierarchicalGridComponent;

  @Input() gridOption: IGridOptions;
  @Input() gridData: IGridData;
  @Input() comboBoxData: IGridComboData[];

  @Input() extraColOpt = [] as IGridColumnExt[];
  @Input() firstLevelExtraColOpt = [] as IGridColumnExt[];

  @Input() isLoading = false;
  @Input() remoteStorageType: DataStorageTypes = DataStorageTypes.SQL;
  @Input() filterStyle: FilterMode = 'excelStyleFilter';

  @Output() viewReady: EventEmitter<boolean> = new EventEmitter();
  @Output() gotoPage: EventEmitter<IGridNavigationEvent> = new EventEmitter();
  @Output() didSort: EventEmitter<IGridNavigationEvent> = new EventEmitter();
  @Output() didFilter: EventEmitter<IGridNavigationEvent> = new EventEmitter();
  @Output() didClickCell: EventEmitter<any> = new EventEmitter();
  @Output() didDoubleClick: EventEmitter<any> = new EventEmitter();
  @Output() didRightClick: EventEmitter<any> = new EventEmitter();
  @Output() focustOutEvent: EventEmitter<any> = new EventEmitter();
  @Output() didRowSelectionChange: EventEmitter<IRowSelectionEventArgs> = new EventEmitter();
  @Output() editDoneEvent: EventEmitter<IGridEditDoneEventArgs> = new EventEmitter();
  @Output() editCellEvent: EventEmitter<IGridEditDoneEventArgs> = new EventEmitter();

  @Output() onRowAdd: EventEmitter<any> = new EventEmitter();
  @Output() rowDelete: EventEmitter<IRowDataEventArgs> = new EventEmitter();
  @Output() rowAdd: EventEmitter<IGridEditEventArgs>;
  @Output() rowDeleted: EventEmitter<any> = new EventEmitter();
  actions: IgxGridEditingActionsComponent;
  gridProviders = GridProviders;
  pagingTypes = PagingTypes;
  status = false;
  public selectOptions = [5, 10, 15, 20, 25, 50, 100, 1000, 10000];

  formatOptions = {
    digitsInfo: '1.2-2',
    currencyCode: '',
  };

  currentPage = 1;
  totalCount = 0;
  currentSortSqlQuery = '';
  currentWhereSqlQuery = '';
  isFirstPage = true;
  navigationDisabled = true;
  isLastPage = false;
  canRender$ = new BehaviorSubject<boolean>(false);
  didCheckTranslate = false;
  didFetchRemoteSettings = false;
  didGetData = false;
  showBanner = false;
  procedureDidChange = false;
  isNormalGrid = true;
  showToolbar = false;
  boldColumnName: string;
  redRowColumnName: string;
  rowColors: IGridRowColor[] = [];

  pinningConfig: IPinningConfig = { columns: ColumnPinningPosition.Start };

  gridColumsConfig: IGridUserColSettings;
  firstLevelColumnsConfig: IGridUserColSettings;
  rootGridColums = [] as (IGridColumn | IGridColumnExt)[];
  firstLevelColumns = [] as (IGridColumn | IGridColumnExt)[];
  userGridConfig: IGridConfig;

  gridPages$: Observable<IGridPage>;

  private _filter$ = new Subject<IFilteringExpressionsTree>();
  private _data$: BehaviorSubject<IGridPage>;
  private _firstData$: BehaviorSubject<IGridPage>;
  private gridDestroyer$ = new Subject<void>();

  pendingSave = false;
  bannerMessage = '';

  gridLangKey = 'hala yok!';
  canExportLangKeys = false;
  exportLangKeys = {} as any;
  translatePrefix = '';

  copyOptions = {
    enabled: true,
    copyHeaders: true,
    copyFormatters: true,
    separator: ' | ',
  };

  /**
   * @hidden
   * for later config options
   * also next version add [summaryCalculationMode]="summaryMode"
   */
  summaryMode = 'rootLevelOnly';
  summaryModes = [
    {
      label: 'rootLevelOnly',
      selected: this.summaryMode === 'rootLevelOnly',
      togglable: true,
    },
    {
      label: 'childLevelsOnly',
      selected: this.summaryMode === 'childLevelsOnly',
      togglable: true,
    },
    {
      label: 'rootAndChildLevels',
      selected: this.summaryMode === 'rootAndChildLevels',
      togglable: true,
    },
  ];

  columnsHeaderMenuActions: IHeaderMenuAction[] = [
    {
      actionId: GridHeaderMenuActions.TOGGLE_PIN,
      actionValue: GridHeaderMenuActions.TOGGLE_PIN,
      actionIcon: 'room',
    },
    {
      actionId: GridHeaderMenuActions.TOGGLE_SUMMARY,
      actionValue: GridHeaderMenuActions.TOGGLE_SUMMARY,
      actionIcon: 'insert_chart',
    },
    {
      actionId: GridHeaderMenuActions.TOGGLE_VISIBILITY,
      actionValue: GridHeaderMenuActions.TOGGLE_VISIBILITY,
      actionIcon: 'visibility',
    },
    {
      actionId: GridHeaderMenuActions.TOGGLE_GRUPING,
      actionValue: GridHeaderMenuActions.TOGGLE_GRUPING,
      actionIcon: 'group_work',
    },
  ];

  rowisland = false;
  customSortColumns: IGridColumnSortData[] = [];
  dateTimeColumnNames: string[];
  timeColumnNames: string[];

  remoteSum: number;

  styles = {
    'font-weight': (rowData, columnKey, cellValue, rowIndex) =>
      rowData[this.boldColumnName] === true ? 'bold' : 'normal',
    background: (rowData, coljey, cellValue, rowIndex) => {
      // rowData[this.redRowColumnName] === true ? '#ff6961' : 'white',
      let color = null; // default
      this.rowColors.forEach((x) => {
        if (rowData[x.columnName] === true) {
          color = x.color;
          return color;
        }
      });

      return color;
    },
  };

  public positionStrategyAuto = new AutoPositionStrategy({
    verticalDirection: VerticalAlignment.Top,
  });
  public overlaySettingsAuto = {
    positionStrategy: this.positionStrategyAuto,
    scrollStrategy: new AbsoluteScrollStrategy(),
    modal: false,
    closeOnEscape: false,
  };

  // public columnValuesStrategy = (column: IgxColumnComponent,
  //                               columnExprTree: IFilteringExpressionsTree,
  //                               done: (uniqueValues: any[]) => void) => {
  //   // Get specific column data.
  //   this.remoteValuesService.getColumnData(column, columnExprTree, uniqueValues => done(uniqueValues));
  // };

  public get canExport(): boolean {
    return !this.hasPermission('export') && (this.userGridConfig?.properties?.canExport ?? false);
  }

  paginatorResourceStrings: IPaginatorResourceStrings = {
    igx_paginator_label: '',
  };

  tempData = {
    data: [],
    masterColumns: [],
    firsLevelDetailColumns: [],
    secondLevelDetailColumns: [],
    masterPrimaryKey: '',
    firstLevelPrimaryKey: '',
  };

  ColumnTypes = ColumnTypes;

  ngOnInit(): void {
    this._data$ = new BehaviorSubject({} as IGridPage);

    this.gridPages$ = this._data$.asObservable().pipe(
      // tap(data => console.log("gridPages", data)),
      takeUntil(this.gridDestroyer$)
    );

    // console.log('this.gridOption libGrid', this.gridOption)
    if (!this.gridOption) {
      this.bannerMessage = 'Grid Options Yok!!';
      this.showBanner = true;

      this.gridOption = new GridOptionsBuilder().build();
    } else if (
      this.gridOption.gridId === LibGrids.NOT_ASSINGED ||
      this.gridOption.gridModuleKey === LibModulesRootLangKeys.NOT_ASSINGED
    ) {
      this.showBanner = true;
      if (this.gridOption.gridId === LibGrids.NOT_ASSINGED) {
        this.bannerMessage += 'Grid ID Yok!!';
      }
      if (this.gridOption.gridModuleKey === LibModulesRootLangKeys.NOT_ASSINGED) {
        this.bannerMessage += '\n Grid Module-Key Yok!!';
      }
    } else {
      this.setupData();
    }

    this.gridLangKey = LibGrids[this.gridOption.gridId];
    this.translatePrefix = `${this.gridOption.gridModuleKey}.Gridler.${this.gridLangKey}`;
  }

  addRowByIndex(index: number) {
    if (this.isNormalGrid) {
      this.libGrid.beginAddRowByIndex(index);
    } else {
      this.libHGrid.beginAddRowByIndex(index);
    }
  }

  addRowByIndexFirstGrid(event) {
    this.rowAdd.emit(event);
  }

  toggleSummary(column: IgxColumnComponent) {
    column.hasSummary = !column.hasSummary;
  }

  ngAfterViewInit(): void {
    // this.toast.position = this.toastPosition;
    this.toast.positionSettings = {
      horizontalDirection: HorizontalAlignment.Center,
      verticalDirection: VerticalAlignment.Middle,
    } as PositionSettings;
    this.viewReady.emit(true);
  }

  ngOnDestroy() {
    this.gridDestroyer$.next();
    this.gridDestroyer$.complete();
  }

  // TODO: on export ended need to add the data to cache and remove the remote paging
  // funcionallity

  getComboDatas(field: string) {
    return this.comboBoxData.find((x) => x.field === field).data;
  }

  onExportStarted(exportEvent: IgxExporterEvent): void {
    if (this.gridOption.pagingType === PagingTypes.REMOTE) {
      exportEvent.cancel = true;
      exportEvent.exporter.exportEnded.pipe(first()).subscribe(() => {
        this.toolbarExporter.exportEnded.emit();
        this.toolbarExporter['isExporting'] = false;
        this.toolbar.showProgress = false;
      });

      exportEvent.exporter.columnExporting.subscribe((args) => {
        args.header = this.translate.instant(this.getFieldLangKey(args.field));
      });

      this.gridOption.dataSource({ PageSize: this.totalCount }).subscribe((gridData) => {
        // columnExporting args.cancel is currently has a bug in infragistics 13 (max. call stack overflow)
        const displayedColumnsMap = new Map(
          this.rootGridColums.filter((e) => !e.hidden).map((e) => [e.field, true])
        );

        gridData.Page.PageContent.forEach((e) => {


          for (const prop in e) {
            if (displayedColumnsMap.has(prop) === false) {
              delete e[prop];
              continue;
            }
            if (prop.includes('tarih') || prop.includes('date')) {
              e[prop] = new Date(e[prop].replace('T', ' '))
            }

            if (this.gridColumsConfig[prop]?.type === 'image') {
              e[prop] = ""
            }
          }
        });

        //

        exportEvent.exporter.exportData(gridData.Page.PageContent, exportEvent.options);
      });
    }
  }

  onExportHierarchicalStarted(exportEvent: IgxExporterEvent): void {
    exportEvent.cancel = true;
    exportEvent.exporter.exportEnded.pipe(first()).subscribe(() => {
      this.toolbarExporter.exportEnded.emit();
      this.toolbarExporter['isExporting'] = false;
      this.toolbar.showProgress = false;
    });

    if (this.gridOption.pagingType === PagingTypes.REMOTE) {
      this.gridOption.dataSource({ PageSize: this.totalCount }).subscribe((gridData) => {
        this.tempDataFill(gridData);
      });
    } else {
      this.tempDataFill(this.gridData);
    }

    setTimeout(() => {
      this.excelExportService.export(this.theTempHGrid, exportEvent.options);
    }, 500);
  }

  tempDataFill(gridData: IGridData) {
    const primaryKey = gridData.Page.PrimaryKey;
    const masterColumns = [...gridData.setupRootColumns()];
    const masterContent = [...gridData.Page.PageContent];
    const firsLevelDetailColumns = gridData.FirstLevel ? [...gridData.FirstLevel.Columns] : [];
    const secondLevelDetailColumns = gridData.SecondLevel ? [...gridData.SecondLevel.Columns] : [];
    let firstLevelPrimaryKey = '';
    const data = [];

    masterContent.forEach((value) => {
      if (gridData.FirstLevel) {
        firstLevelPrimaryKey = gridData.FirstLevel.Page.PrimaryKey;
        const firstLevelDetailContent = gridData.FirstLevel.Page.PageContent;

        const fdetailData =
          firstLevelDetailContent.filter(
            (fcontent) => fcontent[primaryKey] === value[primaryKey]
          ) || [];

        if (fdetailData.length > 0) {
          const fArray = [];

          fdetailData.forEach((fval) => {
            if (gridData.SecondLevel) {
              const secondLevelDetailContent = gridData.SecondLevel.Page.PageContent;
              const sdetailData =
                secondLevelDetailContent.filter(
                  (scontent) => scontent[firstLevelPrimaryKey] === fval[firstLevelPrimaryKey]
                ) || [];

              if (sdetailData.length > 0) {
                const sArray = [];
                sdetailData.forEach((sval) => {
                  sArray.push(sval);
                });
                fval['DetaySecond'] = sArray;
              }
            }

            fArray.push(fval);
          });

          value['DetayFirst'] = fArray;
        }
      }

      data.push(value);
    });

    this.tempData.data = data;
    this.tempData.masterColumns = this.rootGridColums;
    this.tempData.firsLevelDetailColumns = firsLevelDetailColumns;
    this.tempData.secondLevelDetailColumns = secondLevelDetailColumns;
    this.tempData.masterPrimaryKey = primaryKey;
    this.tempData.firstLevelPrimaryKey = firstLevelPrimaryKey;
    this.theTempHGrid.reflow();
  }

  setupData(): void {
    this.gridConfigService.Config$.pipe(
      tap((_) => {
        this.rootGridColums = [];
      }),
      map((configs: IGridConfig[]) =>
        configs.find((config) => config.properties.gridId === this.gridOption.gridId)
      ),
      takeUntil(this.gridDestroyer$)
    ).subscribe((gridConfig: IGridConfig) => {
      //console.log("gridConfig", gridConfig);

      if (gridConfig) {
        this.userGridConfig = gridConfig;
        this.doConfig();
      }
      this.manageLifecycle(GridLifeCycle.DidFetchSettings);
    });
  }

  getFieldLangKey(field: string): string {
    return this.gridOption.columnNamesWithoutPrefix ? field : `${this.translatePrefix}.${field}`;
  }

  getFieldLangKeyDetay(field: string): string {
    return `${this.translatePrefix}.Detay.${field}`;
  }

  getFormat(colType: string): IColumnPipeArgs {
    let formatOptions: IColumnPipeArgs = {};

    if (colType === 'number') {
      // Number options
      formatOptions = {
        digitsInfo: '1.2-2',
        currencyCode: '',
      };
    }

    return formatOptions;
  }

  manageLifecycle(lifecycleEvent: GridLifeCycle) {
    switch (lifecycleEvent) {
      case GridLifeCycle.DidFetchSettings: {
        this.didFetchRemoteSettings = true;
        break;
      }
      case GridLifeCycle.DidGetData: {
        this.didGetData = true;
        break;
      }
    }

    if (this.didGetData && this.didFetchRemoteSettings) {
      if (this.gridData.Page && this.gridData.Page.PageContent?.length > 0) {
        // const freshColumnCount = Object.keys(this.gridData.Page.PageContent[0]).length;
        // const currentSettingsColumnsCount = this.gridColumsConfig ? Object.keys(this.gridColumsConfig).length : 0;
        // this.procedureDidChange = currentSettingsColumnsCount !== freshColumnCount;

        // if (this.procedureDidChange) {
        //   this.gridColumsConfig = this.gridColumsConfig ? this.gridColumsConfig : ({} as IGridUserColSettings);

        //   const diff = Object.keys(this.gridColumsConfig)
        //     .filter(x => !Object.keys(this.gridData.Page.PageContent[0]).includes(x))
        //     .concat(Object.keys(this.gridData.Page.PageContent[0]).filter(x => !Object.keys(this.gridColumsConfig).includes(x)));
        // }

        if (!this.userGridConfig) {
          this.rootGridColums = this.gridData.setupRootColumns();
          this.setupExtraColumns();
          this.saveDeafultsToDB(true).subscribe();
        }
      }
    }

    this.canRender$.next(this.didGetData && this.didFetchRemoteSettings);
  }

  private doConfig() {
    //this.canExportLangKeys = true;

    this.gridColumsConfig = this.userGridConfig.columnsConfig;
    if (this.gridColumsConfig) {
      Object.keys(this.gridColumsConfig)
        .sort((a, b) => this.gridColumsConfig[a].order - this.gridColumsConfig[b].order)
        .forEach((key) => {
          if (!this.userGridConfig.properties.unAuthrizedColmns.includes(key)) {
            // TODO: fix this problem
            this.rootGridColums.push(GridColumn.config(key, this.gridColumsConfig[key]));
          }
        });
    }

    this.firstLevelColumnsConfig = this.userGridConfig.firstLevelColumnsConfig;
    if (this.firstLevelColumnsConfig) {
      Object.keys(this.firstLevelColumnsConfig)
        .sort(
          (a, b) => this.firstLevelColumnsConfig[a].order - this.firstLevelColumnsConfig[b].order
        )
        .forEach((key) => {
          if (!this.userGridConfig.properties.unAuthrizedColmns.includes(key)) {
            // TODO: fix this problem
            this.firstLevelColumns.push(GridColumn.config(key, this.firstLevelColumnsConfig[key]));
          }
        });
    }

    this.setupExtraColumns();
  }

  private setupExtraColumns() {
    if (this.extraColOpt.length > 0) {
      this.extraColOpt.forEach((ext) => {
        const colToExtra = this.rootGridColums.find((col) => col.field === ext.field);
        if (colToExtra) {
          colToExtra.colRef = ext.colRef;
        } else {
          if (ext.append) {
            this.rootGridColums.push(ext);
          } else {
            this.rootGridColums.unshift(ext);
          }
        }
      });
    }

    if (this.firstLevelExtraColOpt?.length > 0) {
      this.firstLevelExtraColOpt.forEach((ext) => {
        const colToExtra = (
          this.firstLevelColumns?.length > 0
            ? this.firstLevelColumns
            : this.gridData.FirstLevel.Columns
        ).find((col) => col.field === ext.field);

        if (colToExtra) {
          colToExtra.colRef = ext.colRef;
        } else {
          if (ext.append) {
            if (this.firstLevelColumns?.length > 0) {
              this.firstLevelColumns.push(ext);
            } else {
              this.gridData.FirstLevel.Columns.push(ext);
            }
          } else {
            if (this.firstLevelColumns?.length > 0) {
              this.firstLevelColumns.unshift(ext);
            } else {
              this.gridData.FirstLevel.Columns.unshift(ext);
            }
          }
        }
      });
    }
  }

  private saveDeafultsToDB(isNew = false): Observable<any> {
    //   this.canExportLangKeys = true;
    if (this.gridOption.gridId > 0) {
      const toSaveObj = this.rootGridColums.reduce(
        (
          acc: IGridUserColSettings,
          currentCol: IGridColumn | IGridColumnExt,
          index: number
        ): IGridUserColSettings => {
          if (currentCol instanceof GridColumn) {
            acc[currentCol.field] = new ColumnDbSettings(currentCol, index);
          }
          return acc;
        },
        {} as IGridUserColSettings
      );

      this.gridColumsConfig = toSaveObj;

      //   console.log('saving :' + this.gridOption.gridId + this.gridColumsConfig);
      return this.gridConfigService.getDefaultGridSetting(this.gridOption.gridId).pipe(
        map((res: IGridUserColSettings) => {
          if (res) {
            return this.gridConfigService.saveGridConfig(this.gridOption.gridId, res, isNew);
          } else {
            return this.gridConfigService.saveGridConfig(
              this.gridOption.gridId,
              this.gridColumsConfig,
              isNew
            );
          }
        }),
        switchMap((res: any) => res)
      );
    } else {
      return of(null);
    }
  }

  // private saveDeafultsToDB(isNew = false)  {
  //   this.canExportLangKeys = true;
  //   if (this.gridOption.gridId > 0) {
  //     const toSaveObj = this.rootGridColums.reduce(
  //       (acc: IGridUserColSettings, currentCol: IGridColumn | IGridColumnExt, index: number): IGridUserColSettings => {
  //         if (currentCol instanceof GridColumn) {
  //           acc[currentCol.field] = new ColumnDbSettings(currentCol, index);
  //         }
  //         return acc;
  //       },
  //       {} as IGridUserColSettings,
  //     );

  //     this.gridColumsConfig = toSaveObj;

  //     //   console.log('saving :' + this.gridOption.gridId + this.gridColumsConfig);
  //     this.gridConfigService
  //       .getDefaultGridSetting(this.gridOption.gridId)
  //       .pipe(
  //         map((res: IGridUserColSettings) => {
  //           if (res) {
  //             return this.gridConfigService.saveGridConfig(this.gridOption.gridId, res, isNew);
  //           } else {
  //             return this.gridConfigService.saveGridConfig(this.gridOption.gridId, this.gridColumsConfig, isNew);
  //           }
  //         }),
  //         switchMap((res: any) => res),
  //       )
  //       .subscribe((res) => {
  //         if (res) {
  //           this.procedureDidChange = false;
  //           this.gridConfigService.configChanged$.next();
  //         }
  //       });
  //   }
  // }

  showColumnsExport() {
    const reducedObj = this.rootGridColums.reduce((acc, currCol) => {
      acc[currCol.field] = '';
      return acc;
    }, {});
    const gridIdNode = {};
    gridIdNode[this.gridLangKey] = reducedObj;
    this.exportLangKeys[this.gridOption.gridModuleKey] = {
      Gridler: gridIdNode,
    };
    this.exportDialog.open();
  }

  public copyToClipboard() {
    this.exportTextArea.nativeElement.select();
    this._document.execCommand('copy');
  }

  public render(gridData: IGridData, reRender = false, removeRelationKeyFromMaster = false) {
    if (reRender) {
      // For dynamic grids to recreate columns on data change
      this.reRenderGrid(gridData, removeRelationKeyFromMaster);
      return;
    }

    if (this.isNormalGrid) {
      this.libGrid?.clearFilter();
    } else {
      this.libHGrid.clearFilter();
    }

    this.gridData = gridData;
    this.totalCount = gridData.TotalCount;
    this.gridData.cachePage(gridData.Page);
    this._data$.next(this.gridData.getPage(this.currentPage));

    this.buttonStateManager(true);

    this.isNormalGrid = gridData.DetailLevels.length === 0;
    this.manageLifecycle(GridLifeCycle.DidGetData);

    this.collapseAll();
    this.cdr.detectChanges();
  }

  public refreshGrid(gridPage: IGridPage, newTotalCount: number) {
    this.gridData.TotalCount = newTotalCount;
    this.totalCount = newTotalCount;
    this.remoteSum = 0;

    // if we ever will use the virtalization feature
    // if (this.novaGrid) {
    // this.novaGrid.totalItemCount = newTotalCount;
    // }

    this.buttonStateManager(true);
    this.gridData.cachePage(gridPage);

    this._data$.next(this.gridData.getPage(this.currentPage));
    this.reCalculateLayout();
  }

  overwriteWithDefualts(removeRelationKeyFromMaster = false) {
    this.rootGridColums = this.gridData.setupRootColumns();
    if (!this.isNormalGrid && removeRelationKeyFromMaster) {
      this.rootGridColums = this.rootGridColums.filter((c) => c.field !== this.gridData.Page.PrimaryKey);
    }

    // if (!!this.gridOption.ignoredColumnSpecification) {
    //   const ignoredColumns = this.gridOption.ignoredColumnSpecification(this.rootGridColums);
    //   this.rootGridColums = this.rootGridColums.filter(c => !ignoredColumns.find(i => i.field === c.field));
    // }

    // this.setupExtraColumns();
    this.saveDeafultsToDB().subscribe();
  }

  // overwriteWithDefualts(removeRelationKeyFromMaster = false) {
  //   this.rootGridColums = this.gridData.setupRootColumns();
  //   if (removeRelationKeyFromMaster) {
  //     this.rootGridColums = this.rootGridColums.filter(
  //       (c) => c.field !== this.gridData.Page.PrimaryKey
  //     );
  //   }

  //   this.saveDeafultsToDB().subscribe();
  // }

  firstChanged() {
    this.libFirstGrid.reflow();
    this.libFirstGrid.markForCheck();
  }
  clearGridFilters() {
    this.currentWhereSqlQuery = '';
    if (this.isNormalGrid) {
      this.libGrid.clearFilter();
    } else {
      this.libHGrid.clearFilter();
    }
    if (this.gridOption.pagingType === PagingTypes.REMOTE) {
      this.refreshData(true, this.didFilter);
    }
  }

  expandAll() {
    if (!this.isNormalGrid) {
      this.libHGrid?.expandAll();
    }
  }

  collapseAll() {
    if (!this.isNormalGrid) {
      this.libHGrid?.collapseAll();
      // this.libHGrid?.getChildGrids().forEach((x: IgxHierarchicalGridComponent) => {
      //   x?.collapseAll();
      // });
    }
  }

  detectChanges() {
    if (!this.isNormalGrid) {
      this.libHGrid.cdr.detectChanges();
      // this.gridIslandCreated(this.novaHGrid())
      // this.novaFirstGrid.refreshGridState();
      this.libFirstGrid.markForCheck();
    } else {
      this.libGrid.cdr.detectChanges();
    }
  }

  clearGridSort() {
    this.currentSortSqlQuery = '';
    if (this.isNormalGrid) {
      this.libGrid.clearSort();
    } else {
      this.libHGrid.clearSort();
    }
    if (this.gridOption.pagingType === PagingTypes.REMOTE) {
      this.refreshData(true, this.didSort);
    }
  }

  clearGridGrouping() {
    if (this.isNormalGrid) {
      this.libGrid.clearGrouping();
    }
  }

  // TODO: find a way to fix this hack
  toogleGridFiltering(event) {
    if (this.isNormalGrid) {
      this.libGrid.allowFiltering = event.checked;
    } else {
      this.libHGrid.allowFiltering = event.checked;
      // TODO: QuickFix Detail Grids Filter Open
      this.rowisland = event.checked;
    }

    // this.libGrid.displayDensity = this.density;
    // this.clearGridGrouping();
    // gridBase.calculateGridHeight();
  }

  public invalidateLayout(delay = 0): void {
    setTimeout(() => {
      this.reCalculateLayout();
    }, delay);
  }

  toogleGridToolbar(event) {
    this.showToolbar = event.checked;
  }

  processData(event: IForOfState) {
    // console.log('grid processData');
  }

  gridIslandCreated(event: IGridCreatedEventArgs) {
    const masterPage = this.gridData.getPageInLevel(event.owner.level - 1);

    let detailData = [];
    const _masterPK = masterPage.PrimaryKey;

    detailData =
      this.gridData
        .getPageInLevel(event.owner.level)
        .PageContent.filter((content) => content[_masterPK] === event.parentID) || [];

    setTimeout(() => {
      event.grid.data = detailData;
      event.grid.columnList.forEach((column) => {
        if (column.dataType === 'date') {
          column.formatter = (date) => this.formatDetailColumnNovaDate(date, column.field);
        }
      });
      event.grid.reflow();
    }, 0);
  }

  rowToggle(event: IRowToggleEventArgs, primaryKey: string) {
    if (!event.expanded) {
      return;
    }

    let detailData = [];
    const _masterPK = primaryKey;

    detailData =
      this.gridData
        .getPageInLevel(1)
        .PageContent.filter((content) => content[_masterPK] === event.rowID) || [];
    setTimeout(() => {
      this.libHGrid.getChildGrids().find((cg) => cg.childRow.data.rowID === event.rowID).data =
        detailData;
      this.libHGrid
        .getChildGrids()
        .find((cg) => cg.childRow.data.rowID === event.rowID)
        .columnList.forEach((column) => {
          if (column.dataType === 'date') {
            column.formatter = (date) => this.formatDetailColumnNovaDate(date, column.field);
          }
        });
      this.libHGrid
        .getChildGrids()
        .find((cg) => cg.childRow.data.rowID === event.rowID)
        .reflow();
    }, 0);
  }

  rowToggleDetay(event: IRowToggleEventArgs, primaryKey: string) {
    if (!event.expanded) {
      return;
    }

    let detailData = [];
    const _masterPK = primaryKey;

    detailData =
      this.gridData
        .getPageInLevel(2)
        .PageContent.filter((content) => content[_masterPK] === event.rowID) || [];

    setTimeout(() => {
      const ccGrid = (
        this.libHGrid.getChildGrids()[0] as IgxHierarchicalGridComponent
      ).getChildGrids()[0];
      ccGrid.data = detailData;
      ccGrid.columnList.forEach((column) => {
        if (column.dataType === 'date') {
          column.formatter = (date) => this.formatDetailColumnNovaDate(date, column.field);
        }
      });
      ccGrid.reflow();
    }, 0);
  }

  firstLevelGridRefresh(masterRowID: number, primaryKey: string) {
    let detailData = [];
    const _masterPK = primaryKey;

    detailData =
      this.gridData
        .getPageInLevel(1)
        .PageContent.filter((content) => content[_masterPK] === masterRowID) || [];

    setTimeout(() => {
      const ccGrid = this.libHGrid
        .getChildGrids()
        .find((cg) => cg.childRow.data.rowID === masterRowID);
      // const ccGrid = this.novaHGrid.getChildGrids()[0] as IgxHierarchicalGridComponent;
      ccGrid.data = detailData;
      ccGrid.columnList.forEach((column) => {
        if (column.dataType === 'date') {
          column.formatter = (date) => this.formatDetailColumnNovaDate(date, column.field);
        }
      });
      ccGrid.reflow();
    }, 0);
  }

  private refreshData(purgeCache: boolean, navigateEventToEmit: EventEmitter<any>) {
    // console.log('refreshData');
    if (purgeCache) {
      // console.log('purgeCache');
      this.gridData.purgePageCache();
    }

    this.buttonStateManager(false);
    const cachedPage = this.gridData.getPage(this.currentPage);
    if (cachedPage) {
      // console.log('cachedPage');
      this.buttonStateManager(true);
      this._data$.next(cachedPage);
    } else {
      // console.log('cachedPage else');
      navigateEventToEmit.emit(this.CurrentNavigateState);
    }

    this.totalCount = this.isNormalGrid ? this.libGrid.totalRecords : this.libHGrid.totalRecords;

    if (cachedPage && this.gridData.TotalCount > 0) {
      this.totalCount = this.gridData.TotalCount;
    }

    this.invalidateLayout();
  }

  private reCalculateLayout(): void {
    if (this.libGrid) {
      this.libGrid.reflow();
    } else if (this.libHGrid) {
      this.libHGrid.reflow();
    }
  }

  public initColumns(column: IgxColumnComponent) {
    let index = column.index;
    if (index === -1) {
      index = this.rootGridColums.findIndex((c) => c.field === column.field);
    }
    // TODO: this.gridColums[column.index]
    column.filterable = this.rootGridColums[index].filterable;
    column.sortable = this.rootGridColums[index].sortable;
    column.editable = this.rootGridColums[index].editable;
    column.pinned = this.rootGridColums[index].pinned;
    // column.movable = this.rootGridColums[index].hasSummary
    //   ? false
    //   : this.rootGridColums[index].movable;
    column.groupable = this.rootGridColums[index].groupable;

    // column.hasSummary = this.rootGridColums[index].hasSummary;
    column.hidden = column.field === 'RowNumber' ? true : this.rootGridColums[index].hidden;
    column.resizable = this.rootGridColums[index].resizable;
    column.headerTemplate = this.columnHeaderRef;

    if (
      this.rootGridColums[index].hasSummary &&
      ['number', 'curreny', 'percent'].includes(column.dataType)
    ) {
      column.summaryTemplate = this.summaryTemplate;
    }

    if (this.rootGridColums[index]['colRef']) {
      column.bodyTemplate = this.rootGridColums[index]['colRef'];
    } else if (column.dataType === 'boolean') {
      column.bodyTemplate = this.booleanCellRef;
    } else if (this.rootGridColums[index].type === 'image') {
      column.bodyTemplate = this.imageCellRef;
    }

    if (column.dataType === 'date') {
      column.formatter = (date) => this.formatNovaDate(date, column.field);
    }

    if (column.dataType === 'number' && column.field.toLowerCase().includes('id')) {
      column.formatter = this.formatNumbers;
    }

    if (this.boldColumnName || this.rowColors) {
      // this.redRowColumnName
      column.cellStyles = this.styles;
    }

    if (this.remoteStorageType === DataStorageTypes.Redis) {
      switch (column.dataType) {
        case 'string':
          const permittedStrFilters = [
            'contains',
            'doesNotContain',
            'startsWith',
            'endsWith',
            'equals',
          ];
          column.filters.operations = column.filters.operations.filter((f) =>
            permittedStrFilters.includes(f.name)
          );
          break;
        case 'number':
          const permittedNumberFilters = [
            'equals',
            'doesNotEqual',
            'greaterThan',
            'lessThan',
            'greaterThanOrEqualTo',
            'lessThanOrEqualTo',
          ];
          column.filters.operations = column.filters.operations.filter((f) =>
            permittedNumberFilters.includes(f.name)
          );
          break;
        case 'dateTime':
        case 'date':
          const permittedDateFilters = ['equals', 'doesNotEqual', 'before', 'after'];
          column.filters.operations = column.filters.operations.filter((f) =>
            permittedDateFilters.includes(f.name)
          );
          break;
        case 'boolean':
          const permittedBoolFilters = ['all', 'true', 'false'];
          column.filters.operations = column.filters.operations.filter((f) =>
            permittedBoolFilters.includes(f.name)
          );
          break;
      }
    } else {
      switch (column.dataType) {
        case 'string':
          column.filters = IgxStringFilteringOperand.instance();
          break;
        case 'number':
          column.filters = IgxNumberFilteringOperand.instance();
          break;
        case 'dateTime':
        case 'date':
          column.filters = IgxDateFilteringOperand.instance();
          break;
        case 'boolean':
          column.filters = IgxBooleanFilteringOperand.instance();
          break;
      }
    }
  }

  columnOptionsMenu(event: ISelectionEventArgs, col: IgxColumnComponent) {
    this.pendingSave = true;
    if (this.gridColumsConfig) {
      switch (event.newSelection.value) {
        case GridHeaderMenuActions.TOGGLE_PIN:
          col.pinned = !col.pinned;
          this.gridColumsConfig[col.field].pinned = col.pinned;
          break;
        case GridHeaderMenuActions.TOGGLE_SUMMARY:
          col.hasSummary = !col.hasSummary;
          this.gridColumsConfig[col.field].hasSummary = col.hasSummary;
          this.clearGridGrouping();
          break;
        case GridHeaderMenuActions.TOGGLE_VISIBILITY:
          col.hidden = !col.hidden;
          this.gridColumsConfig[col.field].hidden = col.hidden;
          break;
        case GridHeaderMenuActions.TOGGLE_GRUPING:
          this.pendingSave = false;
          this.groupBy(col.field);
          break;
        default:
          this.pendingSave = false;
          break;
      }
    }
  }

  groupBy(name: string) {
    const expressions = this.libGrid.groupingExpressions;
    for (const gr of expressions) {
      if (gr.fieldName === name) {
        this.libGrid.clearGrouping(name);
        return;
      }
    }
    this.libGrid.groupBy({
      fieldName: name,
      dir: SortingDirection.Asc,
      ignoreCase: false,
      strategy: DefaultSortingStrategy.instance(),
    });
  }

  saveSettings() {
    const gridInUse = this.isNormalGrid ? this.libGrid : this.libHGrid;
    if (this.gridColumsConfig) {
      gridInUse.columns.forEach((col) => {
        if (this.gridColumsConfig[col.field]) {
          this.gridColumsConfig[col.field].order = col.index;
          this.gridColumsConfig[col.field].pinned = col.pinned;
          this.gridColumsConfig[col.field].filterable = col.filterable;
          this.gridColumsConfig[col.field].groupable = col.groupable;
          this.gridColumsConfig[col.field].editable = col.editable;
          this.gridColumsConfig[col.field].sortable = col.sortable;
          this.gridColumsConfig[col.field].hidden = col.hidden;
          this.gridColumsConfig[col.field].hasSummary = col.hasSummary;
          this.gridColumsConfig[col.field].resizable = col.resizable;
          this.gridColumsConfig[col.field].movable = true;
          this.gridColumsConfig[col.field].width = col.width;
        }
      });

      let config = JSON.stringify(this.gridColumsConfig);

      if (!this.isNormalGrid && this.gridData?.FirstLevel?.Columns) {
        const configExists = !!this.firstLevelColumnsConfig;
        let i = 0;
        this.gridData.FirstLevel.Columns.forEach((col) => {
          if (configExists) {
            if (this.firstLevelColumnsConfig[col.field]) {
              this.firstLevelColumnsConfig[col.field].order = col['index'];
              this.firstLevelColumnsConfig[col.field].pinned = col.pinned;
              this.firstLevelColumnsConfig[col.field].filterable = col.filterable;
              this.firstLevelColumnsConfig[col.field].groupable = col.groupable;
              this.firstLevelColumnsConfig[col.field].editable = col.editable;
              this.firstLevelColumnsConfig[col.field].sortable = col.sortable;
              this.firstLevelColumnsConfig[col.field].hidden = col.hidden;
              this.firstLevelColumnsConfig[col.field].hasSummary = col.hasSummary;
              this.firstLevelColumnsConfig[col.field].resizable = col.resizable;
              this.firstLevelColumnsConfig[col.field].movable = true; //col.movable; SEN-1767
              this.firstLevelColumnsConfig[col.field].width = col.width;
            }
          } else {
            if (!this.firstLevelColumnsConfig) {
              this.firstLevelColumnsConfig = {};
            }
            const colSetting: IColumnDbSettings = {
              order: i,
              pinned: col.pinned,
              filterable: col.filterable,
              groupable: col.groupable,
              editable: col.editable,
              sortable: col.sortable,
              hidden: col.hidden,
              hasSummary: col.hasSummary,
              resizable: col.resizable,
              movable: col.movable,
              minWidth: '20',
              maxWidth: '400',
              width: col.width,
              type: col.type,
            };

            this.firstLevelColumnsConfig[col.field] = colSetting;
            i += 1;
          }
        });

        const obj = JSON.parse(config);
        obj['FirstLevel'] = this.firstLevelColumnsConfig;
        config = JSON.stringify(obj);
      }

      this.toolbar.showProgress = true;

      this.gridConfigService
        .saveGridConfig(this.gridOption.gridId, this.gridColumsConfig)
        .subscribe((res) => {
          this.pendingSave = !res;
          this.toolbar.showProgress = false;
        });
    } else {
      this.toast.open('Optionlar Nerede???!!!');
    }
  }

  paginate(pageNo: number) {
    this.currentPage = pageNo;
    if (this.gridOption.pagingType === PagingTypes.REMOTE) {
      this.refreshData(false, this.gotoPage);
    }
  }

  previousPage() {
    this.currentPage--;
    if (this.gridOption.pagingType === PagingTypes.REMOTE) {
      this.refreshData(false, this.gotoPage);
    }
  }

  nextPage() {
    this.currentPage++;
    if (this.gridOption.pagingType === PagingTypes.REMOTE) {
      this.refreshData(false, this.gotoPage);
    }
  }

  onPageSizeChange(newSize: number): void {
    if (this.gridOption.perPage !== newSize) {
      this.gridOption.updatePageSize(newSize);
      this.currentPage = 1;
      if (this.gridOption.pagingType === PagingTypes.REMOTE) {
        this.refreshData(true, this.gotoPage);
      } else {
        this.reCalculateLayout();
      }
    }
  }

  filteringDone(event: IFilteringExpressionsTree) {
    // console.log(event);
    // this._filter$.next(event);
    this.emittFilter();
  }

  filtering(event: IFilteringEventArgs) {
    // this._filter$.next(event.filteringExpressions);
    // this.emittFilter(event.filteringExpressions);
  }
  advencedFilteringExpressionsTreeChange(event: IFilteringExpressionsTree) {
    // console.log('advencedFilteringExpressionsTreeChange');
    // console.log(event);
  }

  sortingDone(event: ISortingExpression | ISortingExpression[]) {
    if (this.gridOption.pagingType === PagingTypes.REMOTE) {
      this.currentSortSqlQuery = GridUtils.BuildOrderBySQL(this.libGrid.sortingExpressions);
      this.currentPage = 1;
      this.refreshData(true, this.didSort);
    }

    const sortData = this.customSortColumns.find(
      (column) => column.columnName === event['fieldName']
    );
    if (typeof event === 'object' && sortData) {
      if (event['dir'] !== SortingDirection.None) {
        this.libGrid.sortingExpressions = [
          {
            dir: event['dir'],
            fieldName: event['fieldName'],
            ignoreCase: true,
            strategy: new CustomSortingStrategy(sortData.sortType),
          },
        ];
      } else {
        this.libGrid.clearSort(event['fieldName']);
      }
    }
  }

  onCellClick(cellClickEvent) {
    this.didClickCell.emit(cellClickEvent);
  }

  onFocusOutEvent(event) {
    this.focustOutEvent.emit(event);
  }

  deleteRow(event) {
    this.rowDeleted.emit(event);
    //this.novaFirstGrid.deleteRowById(0);
    console.log(event.pk);
  }

  isDeleted(rowContext: RowType) {
    return rowContext && rowContext.deleted;
  }
  deleteFirstGridRow(id: number) {
    this.libFirstGrid.deleteRowById(id);
  }

  dblClick(dblClickEvent) {
    if (this.hasPermission('incele')) return;
    this.didDoubleClick.emit(dblClickEvent);
  }

  contextMenu(contextMenu: IGridCellEventArgs) {
    this.didRightClick.emit(contextMenu);
  }

  onRowSelectionChange(rowSelectionChangeEvent: IRowSelectionEventArgs) {
    this.didRowSelectionChange.emit(rowSelectionChangeEvent);
  }

  resizing(event: IColumnResizeEventArgs) {
    this.pendingSave = true;
  }

  visibilityChanged(events: IColumnVisibilityChangedEventArgs) {
    this.pendingSave = true;
    const col = this.rootGridColums.find((x) => x.field === events.column.field);
    if (col) {
      col.hidden = events.newValue;
    }
  }

  movingStarts(event: IColumnMovingStartEventArgs) { }

  movingEnds(event: IColumnMovingEndEventArgs) {
    this.pendingSave = true;
  }

  emittFilter() {
    // let _tree = this.isNormalGrid ? this.libGrid.filteringExpressionsTree : this.libHGrid.filteringExpressionsTree;
    // _tree = tree ?? _tree;
    // console.log("emitfilter", tree, _tree)
    // // console.log('emitFilter');
    // if (_tree) {
    //   this.currentWhereSqlQuery = GridUtils.BuildWhereSQL(_tree);
    // }
    // this.currentPage = 1;
    // this.refreshData(true, this.didFilter);
    const tree = this.isNormalGrid
      ? this.libGrid.filteringExpressionsTree
      : this.libHGrid.filteringExpressionsTree;
    // console.log("emitfilter", tree)
    if (tree) {
      this.currentWhereSqlQuery = GridUtils.BuildWhere(tree, this.remoteStorageType);
      console.log('currentWhereSqlQuery', this.currentWhereSqlQuery);
    }
    this.currentPage = 1;
    this.refreshData(true, this.didFilter);
  }

  buttonStateManager(isNavigationEnabled: boolean) {
    this.navigationDisabled = !isNavigationEnabled;
    const totalPages = this.TotalPages;
    if (totalPages <= 1) {
      this.isLastPage = true;
      this.isFirstPage = true;
    } else if (this.currentPage >= totalPages) {
      this.isLastPage = true;
      this.isFirstPage = false;
    } else if (1 < this.currentPage && this.currentPage < totalPages) {
      this.isLastPage = false;
      this.isFirstPage = false;
    } else {
      this.isLastPage = false;
      this.isFirstPage = true;
    }
  }

  public formatNovaDate(val: any, columnName: string): string {
    if (val) {
      val = new Date(val);
    }

    if (val instanceof Date && !isNaN(val.getHours())) {
      let hours = val.getHours();
      let minutes = 1;
      let formatedDate: string;

      if (this.timeColumnNames?.find((cn) => cn === columnName)) {
        return new Intl.DateTimeFormat('tr-TR', {
          hour: 'numeric',
          minute: 'numeric',
        }).format(val);
      }

      if (!this.dateTimeColumnNames?.find((cn) => cn === columnName)) {
        val.setHours(0);
        val.setMinutes(0);
        hours = 0;
        minutes = 0;
      }

      if (hours + minutes === 0) {
        formatedDate = new Intl.DateTimeFormat('tr-TR').format(val);
      } else {
        formatedDate = new Intl.DateTimeFormat('tr-TR', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        }).format(val);
      }

      return formatedDate;
    }

    return val;
  }

  public formatDetailColumnNovaDate(val: any, columnName: string): string {
    if (val) {
      val = new Date(val);
    }

    if (val instanceof Date && !isNaN(val.getHours())) {
      const hours = val.getHours();
      const minutes = val.getMinutes();
      let formatedDate: string;

      if (hours + minutes === 0) {
        formatedDate = new Intl.DateTimeFormat('tr-TR').format(val);
      } else {
        formatedDate = new Intl.DateTimeFormat('tr-TR', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        }).format(val);
      }
      return formatedDate;
    }

    return val;
  }

  log(val) {
    // tslint:disable-next-line: no-console
    // console.log('7-- ' + val);
  }

  formatNumbers(val: number): string {
    return `${val}`;
  }

  deselectAllRows() {
    if (this.libGrid) {
      this.libGrid.deselectAllRows();
    }
    if (this.libHGrid) {
      this.libHGrid.deselectAllRows();
    }
  }

  getSubColumns(columnID: number) {
    return this.rootGridColums?.filter((c) => c.masterID === columnID);
  }

  getFirstLevelColumns() {
    return this.firstLevelColumns?.length > 0
      ? this.firstLevelColumns
      : this.gridData.FirstLevel.Columns;
  }

  reRenderGrid(gridData: IGridData, removeRelationKeyFromMaster = false) {
    this.gridConfigService
      .deleteKullaniciGridSetting(this.gridOption.gridId)
      .pipe(
        tap((_) => {
          if (this.isNormalGrid) {
            this.libGrid?.clearFilter();
          } else {
            this.libHGrid.clearFilter();
          }

          this.gridData = gridData;
          this.totalCount = gridData.TotalCount;
          this.gridData.cachePage(gridData.Page);
          this._data$.next(this.gridData.getPage(this.currentPage));
          this.buttonStateManager(true);

          this.isNormalGrid = gridData.DetailLevels.length === 0;
          this.manageLifecycle(GridLifeCycle.DidGetData);

          this.collapseAll();
          this.overwriteWithDefualts(removeRelationKeyFromMaster);
        }),
        catchError((_) => of(false))
      )
      .subscribe((_) => {
        this.cdr.detectChanges();
      });
  }

  editDone(event: IGridEditDoneEventArgs) {
    this.editDoneEvent.emit(event);
  }

  cellEdit(event: IGridEditDoneEventArgs) {
    this.editCellEvent.emit(event);
  }
}
