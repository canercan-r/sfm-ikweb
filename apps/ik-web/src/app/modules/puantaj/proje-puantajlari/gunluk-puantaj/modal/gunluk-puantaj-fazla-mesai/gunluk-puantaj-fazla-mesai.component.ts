import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PuantajAPIService } from '@ikweb-services/apis/puantaj-api.service';
import { SharedHelperService } from '@ikweb-shared/services/helper/shared-helper.service';
import { GridOptionsBuilder, LibGrids, LibModulesRootLangKeys, MockGridComponent } from '@lib-common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ikweb-gunluk-puantaj-fazla-mesai',
  templateUrl: './gunluk-puantaj-fazla-mesai.component.html',
  styleUrl: './gunluk-puantaj-fazla-mesai.component.scss',
})
export class GunlukPuantajFazlaMesaiComponent implements OnInit {
  @ViewChild('gunlukPuantajFazlaMesaiGrid', { static: true }) gunlukPuantajFazlaMesaiGrid: MockGridComponent;
  @Input() gunlukPuantajID: string

  gunlukFazlaMesaiForm: FormGroup

  constructor(
    private _puantajApi: PuantajAPIService,
    readonly _sharedHelper: SharedHelperService,
    private _fb: FormBuilder,
    private _activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this._sharedHelper.initScrollComponent();

    this.initForm()
    this.buildGrid()
  }

  initForm() {
    this.gunlukFazlaMesaiForm = this._fb.group({
      fazlaMesaiNedeni: [],
      fazlaMesaiTuru: [],
      fazlaMesaiOrani: '',
      musteriyeFaturalanacak: false,
      fazlaMesaiSuresi: '',
    })
  }

  buildGrid() {
    if (!this.gunlukPuantajFazlaMesaiGrid) return;

    this._puantajApi.getGunlukPuantajFazlaMesai(this.gunlukPuantajID).subscribe((data) => {
      this.gunlukPuantajFazlaMesaiGrid.data = data
      this.gunlukPuantajFazlaMesaiGrid.totalCount = data.length
    })
    this.gunlukPuantajFazlaMesaiGrid.gridOption = new GridOptionsBuilder()
      .forGrid(LibGrids.IKWeb_Puantaj_GunlukPuantaj_FazlaMesai)
      .inModule(LibModulesRootLangKeys.IKWEB)
      .setMultipleRowSelection(true)
      .withPageSize(50)
      .build();
    this.gunlukPuantajFazlaMesaiGrid.columnField = [
      { field: 'kayitNo', colRef: null, append: false, width: '' },
      { field: 'turu', colRef: null, append: false, width: '' }
    ];
  }

  kaydet() {
    this._activeModal.dismiss()
  }
}
