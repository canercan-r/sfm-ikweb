import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IParmakIziProje } from '@ikweb-models/components';
import { PuantajAPIService } from '@ikweb-services/apis/puantaj-api.service';
import { SharedHelperService } from '@ikweb-shared/services/helper/shared-helper.service';
import { IGridCellEventArgs } from '@infragistics/igniteui-angular';
import { GridOptionsBuilder, LibGrids, LibModulesRootLangKeys, MockGridComponent } from '@lib-common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ikweb-parmak-izi-proje-secimi',
  templateUrl: './parmak-izi-proje-secimi.component.html',
  styleUrl: './parmak-izi-proje-secimi.component.scss',
})
export class ParmakIziProjeSecimiComponent implements OnInit {
  @ViewChild('projeSecimiGrid', { static: true }) projeSecimiGrid: MockGridComponent;

  form: FormGroup;
  projeler: IParmakIziProje[] = [];
  aktifDurumArr = [
    { id: true, name: 'Aktif Olanlar' },
    { id: false, name: 'Aktif Olmayanlar' },
  ];

  constructor(
    private _fb: FormBuilder,
    private _activeModal: NgbActiveModal,
    private _puantajApi: PuantajAPIService,
    readonly _sharedHelper: SharedHelperService,
  ) { }

  ngOnInit(): void {
    this._sharedHelper.initScrollComponent();
    this.initForm();
    setTimeout(() => {
      this.buildGrid();
      this.listele();
    });
  }

  initForm() {
    this.form = this._fb.group({
      kurum: 'Tümü',
      aktifMi: true,
    });
  }

  buildGrid() {
    if (!this.projeSecimiGrid) return;

    this.projeSecimiGrid.gridOption = new GridOptionsBuilder()
      .forGrid(LibGrids.IKWeb_Puantaj_ParmakIzi_ProjeSecimi)
      .inModule(LibModulesRootLangKeys.IKWEB)
      .withPageSize(50)
      .build();

    this.projeSecimiGrid.columnField = [
      { field: 'kurumAdi', colRef: null, append: false, width: '' },
      { field: 'projeKodu', colRef: null, append: false, width: '' },
      { field: 'projeAdi', colRef: null, append: false, width: '' },
      { field: 'hizmetTuru', colRef: null, append: false, width: '' },
      { field: 'segment', colRef: null, append: false, width: '' },
      { field: 'segmentYoneticileri', colRef: null, append: false, width: '' },
    ];
  }

  listele() {
    if (!this.projeSecimiGrid) return;

    this._puantajApi.getParmakIziProjeler().subscribe((data) => {
      this.projeler = data;
      this.projeSecimiGrid.data = data;
      this.projeSecimiGrid.totalCount = data.length;
    });
  }

  onRowDoubleClick(event: IGridCellEventArgs) {
    const proje = event?.cell?.row?.data as IParmakIziProje;
    if (proje) {
      this._activeModal.close(proje);
    }
  }

  dismiss() {
    this._activeModal.dismiss();
  }
}
