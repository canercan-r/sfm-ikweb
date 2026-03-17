import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IPuantaj } from '@ikweb-models/components';
import { PuantajAPIService } from '@ikweb-services/apis/puantaj-api.service';
import { SharedHelperService } from '@ikweb-shared/services/helper/shared-helper.service';
import { GridOptionsBuilder, LibGrids, LibModulesRootLangKeys, MockGridComponent } from '@lib-common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ikweb-ekipman-sayimi',
  templateUrl: './ekipman-sayimi.component.html',
  styleUrl: './ekipman-sayimi.component.scss',
})
export class EkipmanSayimiComponent implements OnInit {
  @ViewChild('ekipmanSayimiGrid', { static: true }) ekipmanSayimiGrid: MockGridComponent;
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
      tarih: '',
      proje: [],
      personel: [],
      aciklama: ''
    })
  }

  dismiss() {
    this._activeModal.dismiss()
  }

  buildGrid() {
    if (!this.ekipmanSayimiGrid) return;

    this._puantajApi.getEkipmanSayim(this.puantajInfo.puantajID).subscribe((data) => {
      this.ekipmanSayimiGrid.data = data
      this.ekipmanSayimiGrid.totalCount = data.length
    })
    this.ekipmanSayimiGrid.gridOption = new GridOptionsBuilder()
      .forGrid(LibGrids.IKWeb_Puantaj_EkipmanSayim)
      .inModule(LibModulesRootLangKeys.IKWEB)
      .withPageSize(50)
      .build();
    this.ekipmanSayimiGrid.columnField = [
      { field: 'ekipmanNo', colRef: null, append: false, width: '' },
      { field: 'malzemeGrubu', colRef: null, append: false, width: '' },
      { field: 'ekipmanAdi', colRef: null, append: false, width: '' },
      { field: 'ekipmanDetayi', colRef: null, append: false, width: '' },
      { field: 'durumBilgisi', colRef: null, append: false, width: '' },
      { field: 'aciklama', colRef: null, append: false, width: '' },
      { field: 'projeKodu', colRef: null, append: false, width: '' }
    ];
  }

  kaydet() {
    this._activeModal.dismiss()
  }
}
