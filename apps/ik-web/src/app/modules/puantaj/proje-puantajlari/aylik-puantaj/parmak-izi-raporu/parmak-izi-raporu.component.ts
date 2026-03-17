import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PageLink } from '@ikweb-layout/core/page-info.service';
import { PuantajAPIService } from '@ikweb-services/apis/puantaj-api.service';
import { SharedHelperService } from '@ikweb-shared/services/helper/shared-helper.service';
import { GridOptionsBuilder, LibGrids, LibModulesRootLangKeys, MockGridComponent } from '@lib-common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { ParmakIziFiltreComponent } from './modal/parmak-izi-filtre/parmak-izi-filtre.component';

@Component({
  selector: 'ikweb-parmak-izi-raporu',
  templateUrl: './parmak-izi-raporu.component.html',
  styleUrl: './parmak-izi-raporu.component.scss',
})
export class ParmakIziRaporuComponent implements OnInit, AfterViewInit {
  @ViewChild('parmakIziRaporuGrid', { static: false }) parmakIziRaporuGrid: MockGridComponent;

  bc$: BehaviorSubject<Array<PageLink>> = new BehaviorSubject<
    Array<PageLink>
  >([
    { title: 'Puantaj.ProjePuantajlari.AylikPuantajCizelgesi' }
  ]);

  constructor(
    private _puantajApi: PuantajAPIService,
    readonly _sharedHelper: SharedHelperService,
    private readonly _modal: NgbModal,
  ) { }

  ngOnInit(): void {
    this._sharedHelper.initScrollComponent();
  }

  ngAfterViewInit(): void {
    this.buildGrid();
  }

  buildGrid() {
    if (!this.parmakIziRaporuGrid) return;

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    const maxGun = new Date(currentYear, currentMonth, 0).getDate();

    const dayColumns = Array.from({ length: maxGun }, (_, i) => ({
      field: `${i + 1}`,
      header: `${i + 1}`,
      colRef: null,
      append: false,
      width: ''
    }));

    this._puantajApi.getGunlukPuantajParmakIziHepsi().subscribe((data) => {

      const transformed = data.map(p => {
        const mergedGunler = Object.assign({}, ...(p.gunler ?? []));

        const gunMapping = Array.from({ length: maxGun }, (_, i) => ({
          [`${i + 1}`]: mergedGunler[i + 1] ?? ''
        })).reduce((a, b) => ({ ...a, ...b }), {});

        return {
          ...p,
          ...gunMapping
        };
      });

      this.parmakIziRaporuGrid.data = transformed;
      this.parmakIziRaporuGrid.totalCount = transformed.length;
    });

    this.parmakIziRaporuGrid.gridOption = new GridOptionsBuilder()
      .forGrid(LibGrids.IKWeb_Puantaj_AylikPuantaj_ParmakIziRaporu)
      .inModule(LibModulesRootLangKeys.IKWEB)
      .withPageSize(50)
      .build();

    this.parmakIziRaporuGrid.columnField = [
      { field: 'adi', colRef: null, append: false, width: '' },
      { field: 'soyadi', colRef: null, append: false, width: '' },
      { field: 'sicilNo', colRef: null, append: false, width: '' },
      { field: 'girisTarihi', colRef: null, append: false, width: '' },
      { field: 'cikisTarihi', colRef: null, append: false, width: '' },
      ...dayColumns
    ];
  }

  openFilterModal() {
    const modal = this._modal.open(ParmakIziFiltreComponent, {
      windowClass: 'modal-offcanvas modal-offcanvas-end'
    });
  }

}

