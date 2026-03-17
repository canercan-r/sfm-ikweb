import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PageInfoService, PageLink } from '@ikweb-layout/core/page-info.service';
import { IInsanKaynaklariPersonel } from '@ikweb-models/components';
import { PersonellerAPIService } from '@ikweb-services/apis/personeller-api.service';
import { SharedHelperService } from '@ikweb-shared/services/helper/shared-helper.service';
import { GridOptionsBuilder, IGridColumnExt, LibGrids, LibModulesRootLangKeys, MockGridComponent } from '@lib-common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ikweb-personeller',
  templateUrl: './personeller.component.html',
  styleUrl: './personeller.component.scss',
})
export class PersonellerComponent implements OnInit {
  @ViewChild('personellerGrid', { static: true }) personellerGrid: MockGridComponent;
  @ViewChild('gridCellActionTemp', { read: TemplateRef, static: true }) gridCellActionTemp: TemplateRef<any>;
  @ViewChild('cellDateTemp', { read: TemplateRef, static: true }) cellDateTemp: TemplateRef<any>;

  bc$: BehaviorSubject<Array<PageLink>> = new BehaviorSubject<
    Array<PageLink>
  >([
    { title: 'InsanKaynaklari.Title' },
  ]);

  constructor(
    private _personelApi: PersonellerAPIService,
    private _router: Router,
    readonly _sharedHelper: SharedHelperService,
    private page: PageInfoService
  ) { }

  ngOnInit(): void {
    this.page.setBreadcrumbs([
      { title: "Personeller", path: "insan-kaynaklari/personel-detay/:personelID", isActive: false }
    ]);

    this._sharedHelper.initScrollComponent();

    this.buildGrid();
    this.addExtraColumns();
  }

  buildGrid() {
    if (!this.personellerGrid) return;

    this._personelApi.getPersoneller().subscribe((data) => {
      this.personellerGrid.data = data
      this.personellerGrid.totalCount = data.length
    })
    this.personellerGrid.gridOption = new GridOptionsBuilder()
      .forGrid(LibGrids.IKWeb_InsanKaynaklari_Personeller)
      .inModule(LibModulesRootLangKeys.IKWEB)
      .withPageSize(50)
      .build();
    this.personellerGrid.columnField = [
      { field: 'Islem', colRef: null, append: true, width: '' },
      { field: 'kurum', colRef: null, append: false, width: '' },
      { field: 'projeKodu', colRef: null, append: false, width: '' },
      { field: 'projeAdi', colRef: null, append: false, width: '' },
      { field: 'sicilNo', colRef: null, append: false, width: '' },
      { field: 'adi', colRef: null, append: false, width: '' },
      { field: 'soyadi', colRef: null, append: false, width: '' },
      { field: 'haklarinBaslangicTarihi', colRef: null, append: false, width: '' },
      { field: 'calismaSekli', colRef: null, append: false, width: '' },
      { field: 'pozTipi', colRef: null, append: false, width: '' },
      { field: 'pozKodu', colRef: null, append: false, width: '' },
      { field: 'pozisyon', colRef: null, append: false, width: '' }
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

    this.personellerGrid.extraColOpt = extOpt;
  }

  detayPersonel(cell: IInsanKaynaklariPersonel) {
    this._router.navigate(['insan-kaynaklari/personel-detay', cell.id]);
  }

}
