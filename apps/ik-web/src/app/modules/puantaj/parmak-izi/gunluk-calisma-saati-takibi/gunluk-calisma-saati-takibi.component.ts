import { Component, OnInit, ViewChild } from '@angular/core';
import { PageLink } from '@ikweb-layout/core/page-info.service';
import { IParmakIziGunlukCalisma } from '@ikweb-models/components';
import { PuantajAPIService } from '@ikweb-services/apis/puantaj-api.service';
import { SharedHelperService } from '@ikweb-shared/services/helper/shared-helper.service';
import { GridOptionsBuilder, LibGrids, LibModulesRootLangKeys, MockGridComponent } from '@lib-common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { GunlukCalismaFiltreComponent } from './modal/gunluk-calisma-filtre/gunluk-calisma-filtre.component';

@Component({
  selector: 'ikweb-gunluk-calisma-saati-takibi',
  templateUrl: './gunluk-calisma-saati-takibi.component.html',
  styleUrl: './gunluk-calisma-saati-takibi.component.scss',
})
export class GunlukCalismaSaatiTakibiComponent implements OnInit {
  @ViewChild('gunlukCalismaGrid', { static: true }) gunlukCalismaGrid: MockGridComponent;

  bc$: BehaviorSubject<Array<PageLink>> = new BehaviorSubject<Array<PageLink>>([
    { title: 'Puantaj.Title' }
  ]);

  constructor(
    readonly _sharedHelper: SharedHelperService,
    private _puantajApi: PuantajAPIService,
    private _modal: NgbModal,
  ) { }

  ngOnInit(): void {
    this._sharedHelper.initScrollComponent();
    setTimeout(() => {
      this.buildGrid();
    });
  }

  buildGrid() {
    if (!this.gunlukCalismaGrid) return;

    this._puantajApi.getParmakIziGunlukCalisma().subscribe((data: IParmakIziGunlukCalisma[]) => {
      this.gunlukCalismaGrid.data = data;
      this.gunlukCalismaGrid.totalCount = data.length;
    });

    this.gunlukCalismaGrid.gridOption = new GridOptionsBuilder()
      .forGrid(LibGrids.IKWeb_Puantaj_ParmakIzi_GunlukCalisma)
      .inModule(LibModulesRootLangKeys.IKWEB)
      .withPageSize(50)
      .build();

    this.gunlukCalismaGrid.columnField = [
      { field: 'siraNo', colRef: null, append: false, width: '' },
      { field: 'tarih', colRef: null, append: false, width: '' },
      { field: 'sicilNo', colRef: null, append: false, width: '' },
      { field: 'adiSoyadi', colRef: null, append: false, width: '' },
      { field: 'pozisyon', colRef: null, append: false, width: '' },
      { field: 'vardiyaPlani', colRef: null, append: false, width: '' },
      { field: 'giris', colRef: null, append: false, width: '' },
      { field: 'cikis', colRef: null, append: false, width: '' },
      { field: 'erkenGiris', colRef: null, append: false, width: '' },
      { field: 'gecGiris', colRef: null, append: false, width: '' },
      { field: 'gecCikis', colRef: null, append: false, width: '' },
      { field: 'gunlukCalisma', colRef: null, append: false, width: '' },
    ];
  }

  openFilterModal() {
    this._modal.open(GunlukCalismaFiltreComponent, {
      windowClass: 'modal-offcanvas modal-offcanvas-end'
    });
  }
}
