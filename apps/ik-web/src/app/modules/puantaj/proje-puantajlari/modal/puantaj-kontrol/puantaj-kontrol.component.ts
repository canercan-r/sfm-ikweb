import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IPuantaj } from '@ikweb-models/components';
import { PuantajAPIService } from '@ikweb-services/apis/puantaj-api.service';
import { SharedHelperService } from '@ikweb-shared/services/helper/shared-helper.service';
import { GridOptionsBuilder, LibGrids, LibModulesRootLangKeys, MockGridComponent } from '@lib-common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ikweb-puantaj-kontrol',
  templateUrl: './puantaj-kontrol.component.html',
  styleUrl: './puantaj-kontrol.component.scss',
})
export class PuantajKontrolComponent implements OnInit {
  @ViewChild('puantajKontrolGrid', { static: true }) puantajKontrolGrid: MockGridComponent;
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
      yil: [],
      ay: [],
      masrafMerkeziKodu: [],
      masrafMerkeziAdi: []
    })
  }

  dismiss() {
    this._activeModal.dismiss()
  }

  buildGrid() {
    if (!this.puantajKontrolGrid) return;

    this._puantajApi.getPuantajKontrol(this.puantajInfo.puantajID).subscribe((data) => {
      this.puantajKontrolGrid.data = data
      this.puantajKontrolGrid.totalCount = data.length
    })
    this.puantajKontrolGrid.gridOption = new GridOptionsBuilder()
      .forGrid(LibGrids.IKWeb_Puantaj_PuantajKontrol)
      .inModule(LibModulesRootLangKeys.IKWEB)
      .withPageSize(50)
      .build();
    this.puantajKontrolGrid.columnField = [
      { field: 'turu', colRef: null, append: false, width: '' },
      { field: 'kayitNo', colRef: null, append: false, width: '' },
      { field: 'personelSayisi', colRef: null, append: false, width: '' },
      { field: 'calisanTutari', colRef: null, append: false, width: '' },
      { field: 'fazlaMesaiTutari', colRef: null, append: false, width: '' }
    ];
  }

  kaydet() {
    this._activeModal.dismiss()
  }
}
