import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PageLink } from '@ikweb-layout/core/page-info.service';
import { IParmakIziPiCihazlari } from '@ikweb-models/components';
import { PuantajAPIService } from '@ikweb-services/apis/puantaj-api.service';
import { SharedHelperService } from '@ikweb-shared/services/helper/shared-helper.service';
import { ConfirmService, GridOptionsBuilder, IGridColumnExt, LibGrids, LibModulesRootLangKeys, MockGridComponent } from '@lib-common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { PiCihazlariFiltreComponent } from './modal/pi-cihazlari-filtre/pi-cihazlari-filtre.component';

@Component({
  selector: 'ikweb-pi-cihazlari',
  templateUrl: './pi-cihazlari.component.html',
  styleUrl: './pi-cihazlari.component.scss',
})
export class PiCihazlariComponent implements OnInit {
  @ViewChild('piCihazlariGrid', { static: true }) piCihazlariGrid: MockGridComponent;
  @ViewChild('gridCellActionTemp', { read: TemplateRef, static: true }) gridCellActionTemp: TemplateRef<any>;

  bc$: BehaviorSubject<Array<PageLink>> = new BehaviorSubject<Array<PageLink>>([
    { title: 'Puantaj.Title' }
  ]);

  constructor(
    readonly _sharedHelper: SharedHelperService,
    private _puantajApi: PuantajAPIService,
    private _router: Router,
    private _modal: NgbModal,
    private _confirmService: ConfirmService,
  ) { }

  ngOnInit(): void {
    this._sharedHelper.initScrollComponent();
    setTimeout(() => {
      this.buildGrid();
      this.addExtraColumns();
    });
  }

  buildGrid() {
    if (!this.piCihazlariGrid) return;

    this._puantajApi.getParmakIziPiCihazlari().subscribe((data) => {
      this.piCihazlariGrid.data = data;
      this.piCihazlariGrid.totalCount = data.length;
    });

    this.piCihazlariGrid.gridOption = new GridOptionsBuilder()
      .forGrid(LibGrids.IKWeb_Puantaj_ParmakIzi_PiCihazlari)
      .inModule(LibModulesRootLangKeys.IKWEB)
      .withPageSize(50)
      .build();

    this.piCihazlariGrid.columnField = [
      { field: 'Islem', colRef: null, append: false, width: '' },
      { field: 'cihazNo', colRef: null, append: false, width: '' },
      { field: 'cihazAdi', colRef: null, append: false, width: '' },
      { field: 'cihazIP', colRef: null, append: false, width: '' },
      { field: 'cihazPort', colRef: null, append: false, width: '' },
      { field: 'sonOkumaTarihi', colRef: null, append: false, width: '' },
      { field: 'giris', colRef: null, append: false, width: '' },
      { field: 'cikis', colRef: null, append: false, width: '' },
      { field: 'masterCihaz', colRef: null, append: false, width: '' },
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
    this.piCihazlariGrid.extraColOpt = extOpt;
  }

  yeniKayit() {
    this._router.navigate(['/puantaj/parmak-izi/pi-cihazlari/yeni-kayit']);
  }

  duzenle(cell: IParmakIziPiCihazlari) {
    this._router.navigate(['/puantaj/parmak-izi/pi-cihazlari', cell.id]);
  }

  sil(_cell: IParmakIziPiCihazlari) {
    this._confirmService.open({
      title: '',
      message: 'Global.SilOnay',
      buttons: {
        confirm: { show: true, label: 'Global.Evet', color: 'primary' },
        cancel: { show: true, label: 'Global.Hayir' },
      },
    });
  }

  openFilterModal() {
    this._modal.open(PiCihazlariFiltreComponent, {
      windowClass: 'modal-offcanvas modal-offcanvas-end'
    });
  }
}
