import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { IAylikPuantajEkOdemeler } from '@ikweb-models/components';
import { PuantajAPIService } from '@ikweb-services/apis/puantaj-api.service';
import { SharedHelperService } from '@ikweb-shared/services/helper/shared-helper.service';
import { GridOptionsBuilder, LibGrids, LibModulesRootLangKeys, MockGridComponent } from '@lib-common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ikweb-ek-odeme-turu-kodu',
  templateUrl: './ek-odeme-turu-kodu.component.html',
  styleUrl: './ek-odeme-turu-kodu.component.scss',
})
export class EkOdemeTuruKoduComponent implements OnInit {
  @ViewChild('aylikPuantajEkOdemelerGrid', { static: true }) aylikPuantajEkOdemelerGrid: MockGridComponent;
  @Input() ekOdemeler: IAylikPuantajEkOdemeler

  constructor(
    private _puantajApi: PuantajAPIService,
    readonly _sharedHelper: SharedHelperService,
    private _activeModal: NgbActiveModal,
    private _cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.buildGrid()

    this._sharedHelper.initScrollComponent();
  }

  buildGrid() {
    if (!this.aylikPuantajEkOdemelerGrid) return;

    this._puantajApi.getAylikPuantajEkOdemeTuruKodu(this.ekOdemeler.puantajID, this.ekOdemeler.personelID, this.ekOdemeler.id).subscribe((data) => {
      this.aylikPuantajEkOdemelerGrid.data = data
      this.aylikPuantajEkOdemelerGrid.totalCount = data.length
      this._cdr.detectChanges();
    })
    this.aylikPuantajEkOdemelerGrid.gridOption = new GridOptionsBuilder()
      .forGrid(LibGrids.IKWeb_Puantaj_AylikPuantaj_EkOdemeTuruKodu)
      .inModule(LibModulesRootLangKeys.IKWEB)
      .withPageSize(50)
      .build();
    this.aylikPuantajEkOdemelerGrid.columnField = [
      { field: 'puantajEkOdemeTuruKodu', colRef: null, append: false, width: '' },
      { field: 'puantajEkOdemeTuruAdi', colRef: null, append: false, width: '' },
      { field: 'negatifDegerGirilebilir', colRef: null, append: false, type: "boolean", width: '' },
      { field: 'aciklamaMecburi', colRef: null, append: false, type: "boolean", width: '' },
      { field: 'yillikIzin', colRef: null, append: false, type: "boolean", width: '' }
    ];
  }

  dismiss() {
    this._activeModal.dismiss()
  }
}
