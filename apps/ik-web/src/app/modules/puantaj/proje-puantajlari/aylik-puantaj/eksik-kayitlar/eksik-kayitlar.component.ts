import { Location } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageLink } from '@ikweb-layout/core/page-info.service';
import { PuantajAPIService } from '@ikweb-services/apis/puantaj-api.service';
import { PuantajStoreService } from '@ikweb-services/store/puantaj-store.service';
import { SharedHelperService } from '@ikweb-shared/services/helper/shared-helper.service';
import { AlertService, GridOptionsBuilder, LibGrids, LibModulesRootLangKeys, MockGridComponent } from '@lib-common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ikweb-eksik-kayitlar',
  templateUrl: './eksik-kayitlar.component.html',
  styleUrl: './eksik-kayitlar.component.scss',
})
export class EksikKayitlarComponent implements OnInit, AfterViewInit {
  @ViewChild('eksikKayitlarGrid', { static: false }) eksikKayitlarGrid: MockGridComponent;
  puantajID: string;

  bc$: BehaviorSubject<Array<PageLink>> = new BehaviorSubject<
    Array<PageLink>
  >([
    { title: 'Puantaj.ProjePuantajlari.AylikPuantajCizelgesi' }
  ]);


  constructor(
    private _puantajApi: PuantajAPIService,
    readonly _sharedHelper: SharedHelperService,
    private route: ActivatedRoute,
    private _location: Location,
    private _puantajStore: PuantajStoreService,
    private readonly _alert: AlertService,
  ) { }

  ngOnInit(): void {
    this._sharedHelper.initScrollComponent();

    this.puantajID = this._puantajStore.getPuantajID();

    this._alert.show({ title: '', text: 'Puantaj.ProjePuantajlari.AylikPuantaj.EksikKayitlarUyari', type: 'notice', position: 'up' });
  }

  ngAfterViewInit(): void {
    this.buildGrid();
  }

  goBack() {
    this._location.back();
  }

  buildGrid() {
    if (!this.eksikKayitlarGrid) return;

    this._puantajApi.getAylikPuantajEksikKayitlar(this.puantajID).subscribe((data) => {
      this.eksikKayitlarGrid.data = data
      this.eksikKayitlarGrid.totalCount = data.length
    })
    this.eksikKayitlarGrid.gridOption = new GridOptionsBuilder()
      .forGrid(LibGrids.IKWeb_Puantaj_AylikPuantaj_EksikKayitlar)
      .inModule(LibModulesRootLangKeys.IKWEB)
      .withPageSize(50)
      .build();
    this.eksikKayitlarGrid.columnField = [
      { field: 'adi', colRef: null, append: false, width: '' },
      { field: 'soyadi', colRef: null, append: false, width: '' },
      { field: 'eksikGun', colRef: null, append: false, width: '' }
    ];
  }
}
