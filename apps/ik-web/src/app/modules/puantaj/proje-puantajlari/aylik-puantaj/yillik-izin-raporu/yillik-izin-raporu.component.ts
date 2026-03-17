import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PageLink } from '@ikweb-layout/core/page-info.service';
import { PuantajAPIService } from '@ikweb-services/apis/puantaj-api.service';
import { PuantajStoreService } from '@ikweb-services/store/puantaj-store.service';
import { SharedHelperService } from '@ikweb-shared/services/helper/shared-helper.service';
import { GridOptionsBuilder, LibGrids, LibModulesRootLangKeys, MockGridComponent } from '@lib-common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { YillikIzinFiltreComponent } from './modal/yillik-izin-filtre/yillik-izin-filtre.component';

@Component({
  selector: 'ikweb-yillik-izin-raporu',
  templateUrl: './yillik-izin-raporu.component.html',
  styleUrl: './yillik-izin-raporu.component.scss',
})
export class YillikIzinRaporuComponent implements OnInit, AfterViewInit {
  @ViewChild('yillikIzinRaporuGrid', { static: false }) yillikIzinRaporuGrid: MockGridComponent;

  puantajID: string;

  bc$: BehaviorSubject<Array<PageLink>> = new BehaviorSubject<
    Array<PageLink>
  >([
    { title: 'Puantaj.ProjePuantajlari.AylikPuantajCizelgesi' }
  ]);

  constructor(
    private _puantajApi: PuantajAPIService,
    readonly _sharedHelper: SharedHelperService,
    private readonly _modal: NgbModal,
    private _puantajStore: PuantajStoreService,
  ) { }

  ngOnInit(): void {
    this._sharedHelper.initScrollComponent();

    this.puantajID = this._puantajStore.getPuantajID();
  }

  ngAfterViewInit(): void {
    this.buildGrid();
  }

  buildGrid() {
    if (!this.yillikIzinRaporuGrid) return;

    this._puantajApi.getAylikPuantajYillikIzinDurumu(this.puantajID).subscribe((data) => {
      this.yillikIzinRaporuGrid.data = data;
      this.yillikIzinRaporuGrid.totalCount = data.length;
    });

    this.yillikIzinRaporuGrid.gridOption = new GridOptionsBuilder()
      .forGrid(LibGrids.IKWeb_Puantaj_AylikPuantaj_YillikIzinDurumu)
      .inModule(LibModulesRootLangKeys.IKWEB)
      .withPageSize(50)
      .build();

    this.yillikIzinRaporuGrid.columnField = [
      { field: 'calismaSekli', colRef: null, append: false, width: '' },
      { field: 'sicilNo', colRef: null, append: false, width: '' },
      { field: 'tcKimlik', colRef: null, append: false, width: '' },
      { field: 'personel', colRef: null, append: false, width: '' },
      { field: 'pozisyon', colRef: null, append: false, width: '' },
      { field: 'pt', colRef: null, append: false, width: '' },
      { field: 'kurum', colRef: null, append: false, width: '' },
      { field: 'projeKodu', colRef: null, append: false, width: '' },
      { field: 'projeAdi', colRef: null, append: false, width: '200' },
      { field: 'operasyonBaskani', colRef: null, append: false, width: '' },
      { field: 'direktor', colRef: null, append: false, width: '' },
      { field: 'direktorYardimcisi', colRef: null, append: false, width: '' }
    ];
  }

  openFilterModal() {
    const modal = this._modal.open(YillikIzinFiltreComponent, {
      windowClass: 'modal-offcanvas modal-offcanvas-end'
    });
  }

}
