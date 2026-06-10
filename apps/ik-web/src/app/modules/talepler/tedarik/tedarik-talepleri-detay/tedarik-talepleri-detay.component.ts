import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageLink } from '@ikweb-layout/core/page-info.service';
import { TaleplerAPIService } from '@ikweb-services/apis/talepler-api.service';
import { SharedHelperService } from '@ikweb-shared/services/helper/shared-helper.service';
import { GridOptionsBuilder, IGridColumnExt, LibGrids, LibModulesRootLangKeys, MockGridComponent } from '@lib-common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ikweb-tedarik-talepleri-detay',
  templateUrl: './tedarik-talepleri-detay.component.html',
  styleUrl: './tedarik-talepleri-detay.component.scss'
})
export class TedarikTalepleriDetayComponent implements OnInit, AfterViewInit {
  @ViewChild('tedarikTalepleriDetayGrid', { static: false }) tedarikTalepleriDetayGrid: MockGridComponent;
  @ViewChild('gridCellActionTemp', { read: TemplateRef, static: true }) gridCellActionTemp: TemplateRef<any>;

  bc$: BehaviorSubject<Array<PageLink>> = new BehaviorSubject<Array<PageLink>>([
    { title: 'Talepler.Title' },
    { title: 'Talepler.TedarikTalepleri.Title', path: '/talepler/tedarik-talepleri' }
  ]);

  private tedarikTalepID: string;
  projeAdi: string;

  constructor(
    readonly _sharedHelper: SharedHelperService,
    private _route: ActivatedRoute,
    private _taleplerApiService: TaleplerAPIService,
  ) { }

  ngOnInit(): void {
    this._sharedHelper.initScrollComponent();
    this.tedarikTalepID = this._route.snapshot.paramMap.get('tedarikTalepID');
    this.projeAdi = history.state?.projeAdi;
  }

  ngAfterViewInit(): void {
    this.buildGrid();
    this.addExtraColumns();
  }

  buildGrid() {
    if (!this.tedarikTalepleriDetayGrid) return;

    this._taleplerApiService.getTedarikTalepleriDetay(this.tedarikTalepID).subscribe((data: any) => {
      this.tedarikTalepleriDetayGrid.data = data;
      this.tedarikTalepleriDetayGrid.totalCount = data.length;
    });

    this.tedarikTalepleriDetayGrid.gridOption = new GridOptionsBuilder()
      .forGrid(LibGrids.IKWeb_Talepler_TedarikTalepleriDetay)
      .inModule(LibModulesRootLangKeys.IKWEB)
      .withPageSize(50)
      .build();

    this.tedarikTalepleriDetayGrid.columnField = [
      { field: 'Islem', colRef: null, append: false, width: '' },
      { field: 'talepNo', colRef: null, append: false, width: '' },
      { field: 'talepTarihi', colRef: null, append: false, width: '' },
      { field: 'donem', colRef: null, append: false, width: '' },
      { field: 'talepTuru', colRef: null, append: false, width: '' },
      { field: 'talepDurumu', colRef: null, append: false, width: '' },
      { field: 'aciklama', colRef: null, append: false, width: '' },
      { field: 'segmentB', colRef: null, append: false, width: '' },
      { field: 'segment1', colRef: null, append: false, width: '' },
      { field: 'segment2', colRef: null, append: false, width: '' },
      { field: 'bolgeBaskani', colRef: null, append: false, width: '' },
      { field: 'dosyaSayisi', colRef: null, append: false, width: '' },
    ];
  }

  addExtraColumns() {
    const extOpt: IGridColumnExt[] = [];

    extOpt.push({
      field: 'Islem',
      colRef: this.gridCellActionTemp,
      append: true,
      width: '80',
    });

    this.tedarikTalepleriDetayGrid.extraColOpt = extOpt;
  }
}
