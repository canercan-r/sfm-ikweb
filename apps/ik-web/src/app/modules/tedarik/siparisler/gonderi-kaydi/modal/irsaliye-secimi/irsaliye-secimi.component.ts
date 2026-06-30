import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaleplerAPIService } from '@ikweb-services/apis/tedarik-api.service';
import { SharedHelperService } from '@ikweb-shared/services/helper/shared-helper.service';
import { GridOptionsBuilder, LibGrids, LibModulesRootLangKeys, MockGridComponent } from '@lib-common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ikweb-irsaliye-secimi',
  templateUrl: './irsaliye-secimi.component.html',
  styleUrl: './irsaliye-secimi.component.scss',
})
export class IrsaliyeSecimiComponent implements OnInit {
  @ViewChild('irsaliyeGrid', { static: true }) irsaliyeGrid: MockGridComponent;

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
      kurum: [''],
      eIrsaliyeSorgula: [''],
      tarih1: [''],
    });

    this.buildGrid();
  }

  buildGrid(): void {
    if (!this.irsaliyeGrid) return;

    const opts = new GridOptionsBuilder()
      .forGrid(LibGrids.IKWeb_Tedarik_Siparisler_GonderiKaydi_Irsaliye)
      .inModule(LibModulesRootLangKeys.IKWEB)
      .withPageSize(50)
      .build();

    this.irsaliyeGrid.gridOption = opts;
    this.irsaliyeGrid.columnField = [
      { field: 'irsaliyeNo', colRef: null, append: false, width: '' },
      { field: 'gonderenUnvani', colRef: null, append: false, width: '200' },
      { field: 'ETTN', colRef: null, append: false, width: '' },
      { field: 'durum', colRef: null, append: false, width: '' },
      { field: 'duzenlemeTarihi', colRef: null, append: false, width: '' },
      { field: 'sevkTarihi', colRef: null, append: false, width: '' },
      { field: 'eIrsaliyeSiparisNo', colRef: null, append: false, width: '' },
    ];

    this._tedarikApi.getTedarikSiparisGonderiKaydiIrsaliye().subscribe((data) => {
      this.irsaliyeGrid.data = data;
      this.irsaliyeGrid.totalCount = data.length;
    });
  }

  listele(): void {
    if (!this.irsaliyeGrid) return;
    this._tedarikApi.getTedarikSiparisGonderiKaydiIrsaliye().subscribe((data) => {
      this.irsaliyeGrid.data = data;
      this.irsaliyeGrid.totalCount = data.length;
    });
  }

  rowSelected(row: any): void {
    this._activeModal.close(row);
  }

  dismiss(): void {
    this._activeModal.dismiss();
  }
}
