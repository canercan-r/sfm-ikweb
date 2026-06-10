import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { IAylikPuantajEkOdemeler, IInsanKaynaklariPersonel } from '@ikweb-models/components';
import { PersonellerAPIService } from '@ikweb-services/apis/personeller-api.service';
import { PuantajAPIService } from '@ikweb-services/apis/puantaj-api.service';
import { SharedHelperService } from '@ikweb-shared/services/helper/shared-helper.service';
import { GridOptionsBuilder, LibGrids, LibModulesRootLangKeys, MockGridComponent } from '@lib-common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IGridCellEventArgs } from 'igniteui-angular';
import { EkOdemeTuruKoduComponent } from '../ek-odeme-turu-kodu/ek-odeme-turu-kodu.component';

@Component({
  selector: 'ikweb-ek-odemeler-detay',
  templateUrl: './ek-odemeler-detay.component.html',
  styleUrl: './ek-odemeler-detay.component.scss',
})
export class EkOdemelerDetayComponent implements OnInit {
  @ViewChild('aylikPuantajEkOdemelerGrid', { static: true }) aylikPuantajEkOdemelerGrid: MockGridComponent;
  @Input() ekOdemeler: IAylikPuantajEkOdemeler

  personel: IInsanKaynaklariPersonel

  constructor(
    private _personelApi: PersonellerAPIService,
    private _puantajApi: PuantajAPIService,
    readonly _sharedHelper: SharedHelperService,
    private _activeModal: NgbActiveModal,
    private _cdr: ChangeDetectorRef,
    private readonly _modal: NgbModal,
  ) { }

  ngOnInit(): void {
    this._personelApi.getPersonel(this.ekOdemeler.personelID).subscribe({
      next: (res) => {
        this.personel = res;
      }
    });

    this.buildEkOdemelerGrid()

    this._sharedHelper.initScrollComponent();
  }

  buildEkOdemelerGrid() {
    if (!this.aylikPuantajEkOdemelerGrid) return;

    this._puantajApi.getAylikPuantajEkOdemeler(this.ekOdemeler.puantajID).subscribe((data) => {
      this.aylikPuantajEkOdemelerGrid.data = data
      this.aylikPuantajEkOdemelerGrid.totalCount = data.length
      this._cdr.detectChanges();
    })
    this.aylikPuantajEkOdemelerGrid.gridOption = new GridOptionsBuilder()
      .forGrid(LibGrids.IKWeb_Puantaj_AylikPuantaj_EkOdemelerDetay)
      .inModule(LibModulesRootLangKeys.IKWEB)
      .withPageSize(50)
      .build();
    this.aylikPuantajEkOdemelerGrid.columnField = [
      { field: 'ekOdemeTuruKodu', colRef: null, append: false, width: '' },
      { field: 'ekOdemeTuru', colRef: null, append: false, width: '' },
      { field: 'brut', colRef: null, append: false, width: '' },
      { field: 'aciklama', colRef: null, append: false, width: '' }
    ];
  }

  dismiss() {
    this._activeModal.dismiss()
  }

  gridEkOdemeTuruKoduClick(clickEvent: IGridCellEventArgs) {
    const modal = this._modal.open(EkOdemeTuruKoduComponent, {
      centered: true,
      windowClass: 'modal-offcanvas modal-offcanvas-xl'
    });
    modal.componentInstance.ekOdemeler = clickEvent.cell.row.data
  }
}
