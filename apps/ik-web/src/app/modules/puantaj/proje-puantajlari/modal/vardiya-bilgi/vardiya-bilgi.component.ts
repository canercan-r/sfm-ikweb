import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IPuantaj } from '@ikweb-models/components';
import { PuantajAPIService } from '@ikweb-services/apis/puantaj-api.service';
import { SharedHelperService } from '@ikweb-shared/services/helper/shared-helper.service';
import { GridOptionsBuilder, LibGrids, LibModulesRootLangKeys, MockGridComponent } from '@lib-common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ikweb-vardiya-bilgi',
  templateUrl: './vardiya-bilgi.component.html',
  styleUrl: './vardiya-bilgi.component.scss',
})
export class VardiyaBilgiComponent implements OnInit {
  @ViewChild('vardiyaBilgiGrid', { static: true }) vardiyaBilgiGrid: MockGridComponent;
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
      proje: '',
      projeninAdresi: ''
    })
  }

  dismiss() {
    this._activeModal.dismiss()
  }

  buildGrid() {
    if (!this.vardiyaBilgiGrid) return;

    this._puantajApi.getVardiyaBilgi(this.puantajInfo.puantajID).subscribe((data) => {
      this.vardiyaBilgiGrid.data = data
      this.vardiyaBilgiGrid.totalCount = data.length
    })
    this.vardiyaBilgiGrid.gridOption = new GridOptionsBuilder()
      .forGrid(LibGrids.IKWeb_Puantaj_VardiyaBilgi)
      .inModule(LibModulesRootLangKeys.IKWEB)
      .withPageSize(50)
      .build();
    this.vardiyaBilgiGrid.columnField = [
      { field: 'adi', colRef: null, append: false, width: '' },
      { field: 'soyadi', colRef: null, append: false, width: '' },
      { field: 'adresi', colRef: null, append: false, width: '200' },
      { field: 'il', colRef: null, append: false, width: '' },
      { field: 'ilce', colRef: null, append: false, width: '' },
      { field: 'vardiyaTuru', colRef: null, append: false, width: '' },
      { field: 'isBasiSaati', colRef: null, append: false, width: '' }
    ];
  }

  kaydet() {
    this._activeModal.dismiss()
  }
}

