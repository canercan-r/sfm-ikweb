import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IPuantaj } from '@ikweb-models/components';
import { PuantajAPIService } from '@ikweb-services/apis/puantaj-api.service';
import { SharedHelperService } from '@ikweb-shared/services/helper/shared-helper.service';
import { GridOptionsBuilder, LibGrids, LibModulesRootLangKeys, MockGridComponent } from '@lib-common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ikweb-kidem-kontrol',
  templateUrl: './kidem-kontrol.component.html',
  styleUrl: './kidem-kontrol.component.scss',
})
export class KidemKontrolComponent implements OnInit {
  @ViewChild('kidemKontrolGrid', { static: true }) kidemKontrolGrid: MockGridComponent;
  @Input() puantajInfo: IPuantaj

  form: FormGroup

  constructor(
    private _fb: FormBuilder,
    private _activeModal: NgbActiveModal,
    private _puantajApi: PuantajAPIService,
    readonly _sharedHelper: SharedHelperService,
  ) { }

  ngOnInit(): void {
    this._sharedHelper.initScrollComponent();

    this.initForm()
    this.buildGrid()
  }

  initForm() {
    this.form = this._fb.group({
      hesaplamaTuru: [],
      detaylariGoster: true
    })
  }

  dismiss() {
    this._activeModal.dismiss()
  }

  buildGrid() {
    if (!this.kidemKontrolGrid) return;

    this._puantajApi.getKidemKontrol(this.puantajInfo.puantajID).subscribe((data) => {
      this.kidemKontrolGrid.data = data
      this.kidemKontrolGrid.totalCount = data.length
    })
    this.kidemKontrolGrid.gridOption = new GridOptionsBuilder()
      .forGrid(LibGrids.IKWeb_Puantaj_KidemKontrol)
      .inModule(LibModulesRootLangKeys.IKWEB)
      .withPageSize(50)
      .build();
    this.kidemKontrolGrid.columnField = [
      { field: 'kurumAdi', colRef: null, append: false, width: '' },
      { field: 'personel', colRef: null, append: false, width: '' },
      { field: 'projeAdi', colRef: null, append: false, width: '' },
      { field: 'pozisyon', colRef: null, append: false, width: '' },
      { field: 'calismaSekli', colRef: null, append: false, width: '' },
      { field: 'hakBaslangicTarihi', colRef: null, append: false, width: '' },
      { field: 'cikisTarihi', colRef: null, append: false, width: '' },
      { field: 'brutMaas', colRef: null, append: false, width: '' },
      { field: 'digerHaklar', colRef: null, append: false, width: '' },
      { field: 'toplamKidemGunu', colRef: null, append: false, width: '' },
      { field: 'brutKidemTazminati', colRef: null, append: false, width: '' },
      { field: 'kidem', colRef: null, append: false, width: '' }
    ];
  }

  kaydet() {
    this._activeModal.dismiss()
  }
}