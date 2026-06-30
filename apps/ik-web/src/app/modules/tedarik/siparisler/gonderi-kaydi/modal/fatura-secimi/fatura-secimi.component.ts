import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaleplerAPIService } from '@ikweb-services/apis/tedarik-api.service';
import { SharedHelperService } from '@ikweb-shared/services/helper/shared-helper.service';
import { GridOptionsBuilder, LibGrids, LibModulesRootLangKeys, MockGridComponent } from '@lib-common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ikweb-fatura-secimi',
  templateUrl: './fatura-secimi.component.html',
  styleUrl: './fatura-secimi.component.scss',
})
export class FaturaSecimiComponent implements OnInit {
  @ViewChild('faturaGrid', { static: true }) faturaGrid: MockGridComponent;

  form: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _activeModal: NgbActiveModal,
    private _tedarikApi: TaleplerAPIService,
    readonly _sharedHelper: SharedHelperService,
  ) { }

  ngOnInit(): void {
    this._sharedHelper.initScrollComponent();

    this.form = this._fb.group({
      tarih1: [''],
      donem: [''],
      aktarimDurumu: [''],
    });

    this.buildGrid();
  }

  buildGrid(): void {
    if (!this.faturaGrid) return;

    const opts = new GridOptionsBuilder()
      .forGrid(LibGrids.IKWeb_Tedarik_Siparisler_GonderiKaydi_Fatura)
      .inModule(LibModulesRootLangKeys.IKWEB)
      .withPageSize(50)
      .build();

    this.faturaGrid.gridOption = opts;
    this.faturaGrid.columnField = [
      { field: 'faturaNo', colRef: null, append: false, width: '' },
      { field: 'faturaTuru', colRef: null, append: false, width: '' },
      { field: 'tarih', colRef: null, append: false, width: '' },
      { field: 'kurum', colRef: null, append: false, width: '' },
      { field: 'projeDirektoru', colRef: null, append: false, width: '' },
      { field: 'tedarikci', colRef: null, append: false, width: '' },
      { field: 'projeAdi', colRef: null, append: false, width: '200' },
      { field: 'tutar', colRef: null, append: false, width: '' },
    ];

    this._tedarikApi.getTedarikSiparisGonderiKaydiFatura().subscribe((data) => {
      this.faturaGrid.data = data;
      this.faturaGrid.totalCount = data.length;
    });
  }

  listele(): void {
    if (!this.faturaGrid) return;
    this._tedarikApi.getTedarikSiparisGonderiKaydiFatura().subscribe((data) => {
      this.faturaGrid.data = data;
      this.faturaGrid.totalCount = data.length;
    });
  }

  rowSelected(row: any): void {
    this._activeModal.close(row);
  }

  dismiss(): void {
    this._activeModal.dismiss();
  }
}
