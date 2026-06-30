import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageLink } from '@ikweb-layout/core/page-info.service';
import { TaleplerAPIService } from '@ikweb-services/apis/tedarik-api.service';
import { SharedHelperService } from '@ikweb-shared/services/helper/shared-helper.service';
import { ConfirmService, GridOptionsBuilder, IGridColumnExt, LibGrids, LibModulesRootLangKeys, MockGridComponent } from '@lib-common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { YeniKayitComponent } from './modal/yeni-kayit/yeni-kayit.component';

@Component({
  selector: 'ikweb-tedarik-talepleri-detay',
  templateUrl: './tedarik-talepleri-detay.component.html',
  styleUrl: './tedarik-talepleri-detay.component.scss'
})
export class TedarikTalepleriDetayComponent implements OnInit, AfterViewInit {
  @ViewChild('tedarikTalepleriDetayGrid', { static: false }) tedarikTalepleriDetayGrid: MockGridComponent;
  @ViewChild('gridCellActionTemp', { read: TemplateRef, static: true }) gridCellActionTemp: TemplateRef<any>;

  bc$: BehaviorSubject<Array<PageLink>> = new BehaviorSubject<Array<PageLink>>([
    { title: 'Talepler.Tedarik.Title' },
    { title: 'Talepler.Title', path: '/talepler/tedarik-talepleri' }
  ]);

  private tedarikTalepID: string;
  projeAdi: string;

  constructor(
    readonly _sharedHelper: SharedHelperService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _taleplerApiService: TaleplerAPIService,
    private _confirmService: ConfirmService,
    private _modal: NgbModal,
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

  onGonderimiIptalEt(_cell: any): void {
    this._confirmService.open({
      title: '',
      message: 'Talepler.Tedarik.GonderimiIptalEtConfirm',
      buttons: {
        confirm: { show: true, label: 'Global.Evet', color: 'primary' },
        cancel: { show: true, label: 'Global.Hayir' },
      },
    });
  }

  onYeniKayit(_cell: any): void {
    this._modal.open(YeniKayitComponent, {
      windowClass: 'modal-offcanvas modal-offcanvas-end'
    });
  }

  onDetayGit(cell: any, mod: 'degistir' | 'incele' | 'sil'): void {
    this._router.navigate(['/tedarik/tedarik-talepleri/talep-form'], {
      state: { mod, row: cell?.row?.data }
    });
  }
}
