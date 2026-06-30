import { Component, OnInit, ViewChild } from '@angular/core';
import { PageLink } from '@ikweb-layout/core/page-info.service';
import { ITedarikSiparisler, ITedarikSiparisMalzemeleri, ITedarikSiparisTeslimFisleri, ITedarikSiparisUygunsuzluklar } from '@ikweb-models/components';
import { TaleplerAPIService } from '@ikweb-services/apis/tedarik-api.service';
import { SharedHelperService } from '@ikweb-shared/services/helper/shared-helper.service';
import { AbsoluteScrollStrategy, AutoPositionStrategy, IgxCsvExporterService, IgxExcelExporterService, IgxGridComponent, VerticalAlignment } from '@infragistics/igniteui-angular';
import { LanguageService } from '@lib-common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { SiparislerFiltreComponent } from './modal/siparisler-filtre/siparisler-filtre.component';

@Component({
  selector: 'ikweb-siparisler',
  templateUrl: './siparisler.component.html',
  styleUrl: './siparisler.component.scss',
  providers: [IgxExcelExporterService, IgxCsvExporterService],
})
export class SiparislerComponent implements OnInit {
  @ViewChild('siparisGrid') siparisGrid: IgxGridComponent;
  bc$ = new BehaviorSubject<Array<PageLink>>([{ title: 'Talepler.Tedarik.Title' }]);

  siparisler: ITedarikSiparisler[] = [];
  malzemeleri: ITedarikSiparisMalzemeleri[] = [];
  uygunsuzluklar: ITedarikSiparisUygunsuzluklar[] = [];
  teslimFisleri: ITedarikSiparisTeslimFisleri[] = [];

  perPage = 50;
  selectOptions = [5, 10, 15, 20, 25, 50, 100, 1000, 10000];

  positionStrategyAuto = new AutoPositionStrategy({ verticalDirection: VerticalAlignment.Top });
  overlaySettingsAuto = {
    positionStrategy: this.positionStrategyAuto,
    scrollStrategy: new AbsoluteScrollStrategy(),
    modal: false,
    closeOnEscape: false,
  };

  columns = [
    { field: 'siparisNo', width: '' },
    { field: 'tarih', width: '' },
    { field: 'donem', width: '' },
    { field: 'tedarikci', width: '' },
    { field: 'projeKodu', width: '' },
    { field: 'projeAdi', width: '25' },
    { field: 'talepNo', width: '' },
    { field: 'talepTuru', width: '' },
    { field: 'uygunsuzlukSayisi', width: '' },
    { field: 'acikUygunsuzlukSayisi', width: '' },
    { field: 'teslimTarihi', width: '' },
    { field: 'siparisDurumu', width: '' },
    { field: 'tedarikciOnayi', width: '' },
  ];

  constructor(
    readonly _sharedHelper: SharedHelperService,
    public langService: LanguageService,
    private _tedarikApi: TaleplerAPIService,
    private _modal: NgbModal,
  ) { }

  ngOnInit(): void {
    this._sharedHelper.initScrollComponent();
    this._tedarikApi.getTedarikSiparisler().subscribe(d => this.siparisler = d);
    this._tedarikApi.getTedarikSiparisMalzemeleri().subscribe(d => this.malzemeleri = d);
    this._tedarikApi.getTedarikSiparisUygunsuzluklar().subscribe(d => this.uygunsuzluklar = d);
    this._tedarikApi.getTedarikSiparisTeslimFisleri().subscribe(d => this.teslimFisleri = d);
  }

  onPageSizeChange(newSize: number): void {
    if (this.perPage !== newSize) {
      this.perPage = newSize;
      if (this.siparisGrid) {
        this.siparisGrid.reflow();
      }
    }
  }

  colHeader(field: string): string {
    return `IKWEB.Gridler.IKWeb_Tedarik_Siparisler.${field}`;
  }

  openFilterModal() {
    this._modal.open(SiparislerFiltreComponent, {
      windowClass: 'modal-offcanvas modal-offcanvas-end'
    });
  }
}
