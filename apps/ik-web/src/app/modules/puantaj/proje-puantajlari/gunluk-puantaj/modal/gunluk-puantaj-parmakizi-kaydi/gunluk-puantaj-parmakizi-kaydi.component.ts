import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AKTIF_STATE, IGunlukPuantaj } from '@ikweb-models/components';
import { PuantajAPIService } from '@ikweb-services/apis/puantaj-api.service';
import { SharedHelperService } from '@ikweb-shared/services/helper/shared-helper.service';
import { GridOptionsBuilder, LibGrids, LibModulesRootLangKeys, MockGridComponent } from '@lib-common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ikweb-gunluk-puantaj-parmakizi-kaydi',
  templateUrl: './gunluk-puantaj-parmakizi-kaydi.component.html',
  styleUrl: './gunluk-puantaj-parmakizi-kaydi.component.scss',
})
export class GunlukPuantajParmakiziKaydiComponent implements OnInit {
  @ViewChild('gunlukPuantajParmakIziGrid', { static: true }) gunlukPuantajParmakIziGrid: MockGridComponent;
  @Input() gunlukPuantaj: IGunlukPuantaj

  form: FormGroup

  aktifState = AKTIF_STATE

  aktifDurumArr = Object.values(AKTIF_STATE)
    .filter((e): e is AKTIF_STATE => typeof e === 'number')
    .map((e) => ({
      id: e,
      name: this._translate.instant(`Global.${AKTIF_STATE[e]}`),
    }
    ));

  constructor(
    private _puantajApi: PuantajAPIService,
    readonly _sharedHelper: SharedHelperService,
    private _activeModal: NgbActiveModal,
    private readonly _fb: FormBuilder,
    private _translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this._sharedHelper.initScrollComponent();

    this.initForm()
    this.buildGrid()
  }

  initForm() {
    this.form = this._fb.group({
      aktifDurumID: this.aktifState.Aktif
    });
  }

  buildGrid() {
    if (!this.gunlukPuantajParmakIziGrid) return;

    this._puantajApi.getGunlukPuantajParmakIzi(this.gunlukPuantaj.gunlukPuantajID).subscribe((data) => {
      this.gunlukPuantajParmakIziGrid.data = data
      this.gunlukPuantajParmakIziGrid.totalCount = data.length
    })
    this.gunlukPuantajParmakIziGrid.gridOption = new GridOptionsBuilder()
      .forGrid(LibGrids.IKWeb_Puantaj_GunlukPuantaj_ParmakIzi)
      .inModule(LibModulesRootLangKeys.IKWEB)
      .withPageSize(50)
      .build();
    this.gunlukPuantajParmakIziGrid.columnField = [
      { field: 'vardiyaTuru', colRef: null, append: false, width: '' },
      { field: 'turu', colRef: null, append: false, width: '' },
      { field: 'saat', colRef: null, append: false, width: '' },
      { field: 'kayitDurumu', colRef: null, append: false, width: '' },
      { field: 'cihaz', colRef: null, append: false, width: '' },
      { field: 'fotograf', colRef: null, append: false, width: '' }
    ];
  }

  dismiss() {
    this._activeModal.dismiss()
  }

  aktifDurumChange(event: any) { }
}
