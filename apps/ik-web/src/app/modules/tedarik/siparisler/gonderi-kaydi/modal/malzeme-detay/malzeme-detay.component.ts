import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaleplerAPIService } from '@ikweb-services/apis/tedarik-api.service';
import { SharedHelperService } from '@ikweb-shared/services/helper/shared-helper.service';
import { GridOptionsBuilder, LibGrids, LibModulesRootLangKeys, MockGridComponent } from '@lib-common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ikweb-malzeme-detay',
  templateUrl: './malzeme-detay.component.html',
  styleUrl: './malzeme-detay.component.scss',
})
export class MalzemeDetayComponent implements OnInit, AfterViewInit {
  @ViewChild('malzemeGrid', { static: true }) malzemeGrid: MockGridComponent;

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
      malzemeKodu: [''],
      malzemeTuru: [''],
      malzemeAdi: [''],
      malzemeGrubu: [''],
      talepEdilmeyenleriGoster: [false],
      kullanimDisindaOlanlariGoster: [false],
    });

    this.buildGrid();
  }

  ngAfterViewInit(): void { }

  buildGrid(): void {
    if (!this.malzemeGrid) return;

    const opts = new GridOptionsBuilder()
      .forGrid(LibGrids.IKWeb_Tedarik_Siparisler_GonderiKaydi_MalzemeDetay)
      .inModule(LibModulesRootLangKeys.IKWEB)
      .withPageSize(50)
      .build();

    this.malzemeGrid.gridOption = opts;
    this.malzemeGrid.columnField = [
      { field: 'kodu', colRef: null, append: false, width: '' },
      { field: 'adi', colRef: null, append: false, width: '200' },
      { field: 'uretici', colRef: null, append: false, width: '' },
      { field: 'ureticiKodu', colRef: null, append: false, width: '' },
      { field: 'malzemeTuru', colRef: null, append: false, width: '' },
      { field: 'malzemeGrubu', colRef: null, append: false, width: '' },
      { field: 'barkodu', colRef: null, append: false, width: '' },
    ];

    this._tedarikApi.getTedarikSiparisGonderiKaydiMalzeme().subscribe((data) => {
      this.malzemeGrid.data = data;
      this.malzemeGrid.totalCount = data.length;
    });
  }

  listele(): void {
    if (!this.malzemeGrid) return;
    this._tedarikApi.getTedarikSiparisGonderiKaydiMalzeme().subscribe((data) => {
      this.malzemeGrid.data = data;
      this.malzemeGrid.totalCount = data.length;
    });
  }

  rowSelected(row: any): void {
    this._activeModal.close(row);
  }

  dismiss(): void {
    this._activeModal.dismiss();
  }
}
