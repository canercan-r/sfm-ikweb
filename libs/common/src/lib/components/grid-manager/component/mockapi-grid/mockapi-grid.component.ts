import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { GridOptionsBuilder, IGridColumn, IGridColumnExt, IGridOptions, IMockGridData, LibGrids, PagingTypes } from '@lib-common';


import {
  AbsoluteScrollStrategy,
  AutoPositionStrategy,
  ColumnPinningPosition,
  IGridEditDoneEventArgs,
  IgxCsvExporterService,
  IgxExcelExporterService,
  IgxGridComponent,
  IPinningConfig,
  IRowSelectionEventArgs,
  VerticalAlignment
} from 'igniteui-angular';

@Component({
  selector: 'lib-mockapi-grid',
  providers: [IgxExcelExporterService, IgxCsvExporterService],
  templateUrl: './mockapi-grid.component.html',
  styleUrl: './mockapi-grid.component.scss'
})
export class MockapiGridComponent implements OnInit {
  @ViewChild('theGrid') libGrid: IgxGridComponent;

  @Output() didRowSelectionChange = new EventEmitter<IRowSelectionEventArgs>();
  @Output() didDoubleClick = new EventEmitter<any>();
  @Output() editCellEvent = new EventEmitter<IGridEditDoneEventArgs>();

  @Input() gridOption: IGridOptions;
  @Input() extraColOpt: IGridColumnExt[] = [];
  @Input() data: any[] = [];

  pinningConfig: IPinningConfig = { columns: ColumnPinningPosition.Start };
  columnField: (IGridColumn | IGridColumnExt)[] = [];

  translatePrefix = 'translate yok!';
  gridLangKey = 'key yok!';
  selectOptions = [5, 10, 15, 20, 25, 50, 100, 1000, 10000];
  totalCount = 0;

  LibGrids = LibGrids;
  pagingTypes = PagingTypes;

  positionStrategyAuto = new AutoPositionStrategy({
    verticalDirection: VerticalAlignment.Top,
  });

  overlaySettingsAuto = {
    positionStrategy: this.positionStrategyAuto,
    scrollStrategy: new AbsoluteScrollStrategy(),
    modal: false,
    closeOnEscape: false,
  };

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (!this.gridOption) {
      this.gridOption = new GridOptionsBuilder().build();
    }

    this.gridLangKey = LibGrids[this.gridOption.gridId];
    this.translatePrefix = `${this.gridOption.gridModuleKey}.Gridler.${this.gridLangKey}`;

    this.setupExtraColumns();
  }

  public render(gridData: IMockGridData, removeRelationKeyFromMaster = false, collapse = false): void {
    if (!gridData) return;

    this.libGrid?.clearFilter();

    this.data = gridData.getPage ? gridData.getPage(gridData.Page) : gridData.Data || [];

    this.totalCount = gridData.TotalCount || this.data.length;

    setTimeout(() => {
      this.cdr.detectChanges();
      this.libGrid?.reflow();
      this.libGrid?.markForCheck();
    }, 50);
  }

  private setupExtraColumns() {
    if (this.extraColOpt.length > 0) {
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
  }

  getFieldLangKey(field: string): string {
    return `${this.translatePrefix}.${field}`;
  }

  onRowSelectionChange(rowSelectionChangeEvent: IRowSelectionEventArgs) {
    this.didRowSelectionChange.emit(rowSelectionChangeEvent);
  }

  cellEdit(event: IGridEditDoneEventArgs) {
    this.editCellEvent.emit(event);
  }

  dblClick(dblClickEvent) {
    this.didDoubleClick.emit(dblClickEvent);
  }
}
