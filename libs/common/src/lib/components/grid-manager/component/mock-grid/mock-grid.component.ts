import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import {
  AbsoluteScrollStrategy,
  AutoPositionStrategy,
  ColumnPinningPosition,
  IColumnResizeEventArgs,
  IPinningConfig,
  IRowSelectionEventArgs,
  IgxColumnComponent,
  IgxCsvExporterService,
  IgxExcelExporterService,
  IgxGridComponent,
  VerticalAlignment,
} from '@infragistics/igniteui-angular';
import {
  IGridColumn,
  IGridColumnExt,
  IGridOptions,
  LanguageService,
  LibGrids
} from '@lib-common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'lib-mock-grid',
  providers: [IgxExcelExporterService, IgxCsvExporterService],
  templateUrl: './mock-grid.component.html',
  styleUrls: ['./mock-grid.component.scss'],
})
export class MockGridComponent implements OnInit {
  @ViewChild('theGrid') libGrid: IgxGridComponent;
  @ViewChild('booleanCell', { static: true }) booleanCellRef: TemplateRef<any>;
  @ViewChild('imageCell', { static: true }) imageCellRef: TemplateRef<any>;

  @Output() didDoubleClick: EventEmitter<any> = new EventEmitter();
  @Output() didRowSelectionChange: EventEmitter<IRowSelectionEventArgs> = new EventEmitter();
  @Output() didImgClick: EventEmitter<any> = new EventEmitter();
  @Output() onRightClick: EventEmitter<{ event: MouseEvent; cell: any }> = new EventEmitter();
  @Output() onLeftClick: EventEmitter<{ event: MouseEvent; cell: any }> = new EventEmitter();

  private _gridOption: IGridOptions;
  private _extraColOpt: IGridColumnExt[] = [];

  dateTimeColumnNames: string[];
  timeColumnNames: string[];

  @Input()
  set gridOption(val: IGridOptions) {
    if (!val) return;

    this._gridOption = val;

    this.gridLangKey = LibGrids[this._gridOption.gridId];
    this.translatePrefix = `${this._gridOption.gridModuleKey}.Gridler.${this.gridLangKey}`;
  }

  get gridOption(): IGridOptions {
    return this._gridOption;
  }

  @Input()
  set extraColOpt(val: IGridColumnExt[]) {
    this._extraColOpt = val ?? [];
    this.setupExtraColumns();
  }

  get extraColOpt(): IGridColumnExt[] {
    return this._extraColOpt;
  }

  pinningConfig: IPinningConfig = { columns: ColumnPinningPosition.Start };

  pendingSave = false;

  data: any[];
  columnField = [] as (IGridColumn | IGridColumnExt)[];
  translatePrefix = 'translate yok!';
  gridLangKey = 'key yok!';
  selectOptions = [5, 10, 15, 20, 25, 50, 100, 1000, 10000];
  totalCount = 0;

  LibGrids = LibGrids;

  positionStrategyAuto = new AutoPositionStrategy({
    verticalDirection: VerticalAlignment.Top,
  });

  overlaySettingsAuto = {
    positionStrategy: this.positionStrategyAuto,
    scrollStrategy: new AbsoluteScrollStrategy(),
    modal: false,
    closeOnEscape: false,
  };

  showGrid = true;

  constructor(
    public langService: LanguageService,
    public _translateService: TranslateService,
  ) {
  }

  ngOnInit(): void {
  }

  dblClick(dblClickEvent) {
    this.didDoubleClick.emit(dblClickEvent);
  }

  getFieldTranslate(field: string): string {
    if (this.gridOption.gridId.toString() === LibGrids.aylaraGoreTeknikTalepDurumlariList.toString()) {
      if (field.endsWith('-Miktar') || field.endsWith('-Oran(%)')) {
        const parts = field.split('-');
        const tail = parts.pop();
        const key = tail === 'Miktar' ? 'Miktar' : tail === 'Oran(%)' ? 'Oran' : tail;

        const translateKey = `TY.Raporlar.${key}`;
        const translation = this._translateService.instant(translateKey);

        return translation === translateKey ? field : `${parts.join('-')} - ${translation}`;
      }
    }

    // Diger alanlar için klasik çeviri
    const translateKey = `${this.translatePrefix}.${field}`;
    const translation = this._translateService.instant(translateKey);
    return translation === translateKey ? field : translation;
  }

  private setupExtraColumns(): void {
    if (!this.extraColOpt || this.extraColOpt.length === 0) return;

    this.extraColOpt.forEach((ext) => {
      const colToExtra = this.columnField.find((col) => col.field === ext.field);
      if (colToExtra) {
        colToExtra.colRef = ext.colRef;
      } else {
        if (ext.append) {
          this.columnField.push(ext);
        } else {
          this.columnField.unshift(ext);
        }
      }
    });
  }

  resizing(event: IColumnResizeEventArgs) {
    this.pendingSave = true;
  }

  onRowSelectionChange(rowSelectionChangeEvent: IRowSelectionEventArgs) {
    this.didRowSelectionChange.emit(rowSelectionChangeEvent);
  }

  onRghtClick(event: MouseEvent, cell: any) {
    this.onRightClick.emit({ event, cell });
  }
  imgClick(event: MouseEvent, cell: any) {
    this.didImgClick.emit(cell);
    this.onLeftClick.emit({ event, cell });
  }

  onPageSizeChange(newSize: number): void {
    if (this.gridOption.perPage !== newSize) {
      this.gridOption.updatePageSize(newSize);

      // this.currentPage = 1;
      // if (this.gridOption.pagingType === PagingTypes.REMOTE) {
      //   this.refreshData(true, this.gotoPage);
      // } else {
      this.reCalculateLayout();
      // }
    }
  }

  private reCalculateLayout(): void {
    if (this.libGrid) {
      this.libGrid.reflow();
    }
  }

  public initColumns(column: IgxColumnComponent) {

    if (column.dataType === 'boolean') {
      column.bodyTemplate = this.booleanCellRef;
    }

    if (column.dataType === 'date') {
      column.formatter = (date) => this.formatNovaDate(date, column.field);
    }

    if (column.dataType === 'number' && column.field.toLowerCase().includes('id')) {
      column.formatter = this.formatNumbers;
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

  formatNumbers(val: number): string {
    return `${val}`;
  }

  isBoolean(val: any): boolean {
    return typeof val === 'boolean';
  }
}
