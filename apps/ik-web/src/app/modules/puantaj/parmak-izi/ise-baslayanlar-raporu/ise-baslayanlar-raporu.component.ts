import { Component, OnInit, ViewChild } from '@angular/core';
import { PageLink } from '@ikweb-layout/core/page-info.service';
import { IParmakIziIseBaslayanlar } from '@ikweb-models/components';
import { PuantajAPIService } from '@ikweb-services/apis/puantaj-api.service';
import { SharedHelperService } from '@ikweb-shared/services/helper/shared-helper.service';
import { GridOptionsBuilder, LibGrids, LibModulesRootLangKeys, MockGridComponent } from '@lib-common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { IseBaslayanlarFiltreComponent } from './modal/ise-baslayanlar-filtre/ise-baslayanlar-filtre.component';

@Component({
  selector: 'ikweb-ise-baslayanlar-raporu',
  templateUrl: './ise-baslayanlar-raporu.component.html',
  styleUrl: './ise-baslayanlar-raporu.component.scss',
})
export class IseBaslayanlarRaporuComponent implements OnInit {
  @ViewChild('iseBaslayanlarGrid', { static: true }) iseBaslayanlarGrid: MockGridComponent;

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
    if (!this.iseBaslayanlarGrid) return;

    this._puantajApi.getParmakIziIseBaslayanlar().subscribe((data: IParmakIziIseBaslayanlar[]) => {
      this.iseBaslayanlarGrid.data = data;
      this.iseBaslayanlarGrid.totalCount = data.length;
    });

    this.iseBaslayanlarGrid.gridOption = new GridOptionsBuilder()
      .forGrid(LibGrids.IKWeb_Puantaj_ParmakIzi_IseBaslayanlar)
      .inModule(LibModulesRootLangKeys.IKWEB)
      .withPageSize(50)
      .build();

    this.iseBaslayanlarGrid.columnField = [
      { field: 'sicilNo', colRef: null, append: false, width: '' },
      { field: 'adiSoyadi', colRef: null, append: false, width: '' },
      { field: 'projeAdi', colRef: null, append: false, width: '' },
      { field: 'kurumKodu', colRef: null, append: false, width: '' },
      { field: 'tcKimlik', colRef: null, append: false, width: '' },
      { field: 'sskNo', colRef: null, append: false, width: '' },
      { field: 'dogumTarihi', colRef: null, append: false, width: '' },
      { field: 'babaAdi', colRef: null, append: false, width: '' },
      { field: 'girisTarihi', colRef: null, append: false, width: '' },
      { field: 'cikisTarihi', colRef: null, append: false, width: '' },
      { field: 'turu', colRef: null, append: false, width: '' },
    ];
  }

  openFilterModal() {
    this._modal.open(IseBaslayanlarFiltreComponent, {
      windowClass: 'modal-offcanvas modal-offcanvas-end'
    });
  }
}
