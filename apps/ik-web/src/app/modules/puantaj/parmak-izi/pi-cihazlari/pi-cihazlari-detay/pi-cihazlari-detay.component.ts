import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PageLink } from '@ikweb-layout/core/page-info.service';
import { IParmakIziProje } from '@ikweb-models/components';
import { PuantajAPIService } from '@ikweb-services/apis/puantaj-api.service';
import { SharedHelperService } from '@ikweb-shared/services/helper/shared-helper.service';
import { GridOptionsBuilder, IGridColumnExt, LibGrids, LibModulesRootLangKeys, MockGridComponent } from '@lib-common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { ParmakIziProjeSecimiComponent } from './modal/parmak-izi-proje-secimi/parmak-izi-proje-secimi.component';

@Component({
  selector: 'ikweb-pi-cihazlari-detay',
  templateUrl: './pi-cihazlari-detay.component.html',
  styleUrl: './pi-cihazlari-detay.component.scss',
})
export class PiCihazlariDetayComponent implements OnInit {
  @ViewChild('projelerGrid', { static: true }) projelerGrid: MockGridComponent;
  @ViewChild('gridCellActionTemp', { read: TemplateRef, static: true }) gridCellActionTemp: TemplateRef<any>;

  bc$: BehaviorSubject<Array<PageLink>> = new BehaviorSubject<Array<PageLink>>([
    { title: 'Puantaj.Title' }
  ]);

  form: FormGroup;
  secilenProjeler: IParmakIziProje[] = [];
  isEdit = false;

  constructor(
    readonly _sharedHelper: SharedHelperService,
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _puantajApi: PuantajAPIService,
    private _modal: NgbModal,
  ) { }

  ngOnInit(): void {
    this._sharedHelper.initScrollComponent();
    this.initForm();
    setTimeout(() => {
      this.buildGrid();
      this.addExtraColumns();
    });
  }

  initForm() {
    this.form = this._fb.group({
      cihazNo: '',
      cihazAdi: '',
      cihazIP: '',
      cihazPort: '',
      pasif: true,
      giris: false,
      cikis: false,
      cihazTuru: '',
      sonOkumaTarihi: '',
      masterCihaz: '',
      cihazKullanimTipi: '',
    });
  }

  buildGrid() {
    if (!this.projelerGrid) return;

    this.projelerGrid.data = this.secilenProjeler;
    this.projelerGrid.totalCount = this.secilenProjeler.length;

    this.projelerGrid.gridOption = new GridOptionsBuilder()
      .forGrid(LibGrids.IKWeb_Puantaj_ParmakIzi_PiCihazlari_Projeler)
      .inModule(LibModulesRootLangKeys.IKWEB)
      .withPageSize(50)
      .build();

    this.projelerGrid.columnField = [
      { field: 'Islem', colRef: null, append: false, width: '100' },
      { field: 'projeKodu', colRef: null, append: false, width: '' },
      { field: 'projeAdi', colRef: null, append: false, width: '' },
    ];
  }

  addExtraColumns() {
    const extOpt: IGridColumnExt[] = [];
    extOpt.push({
      field: 'Islem',
      colRef: this.gridCellActionTemp,
      append: true,
      width: '80',
    });
    this.projelerGrid.extraColOpt = extOpt;
  }

  projeEkle() {
    const modal = this._modal.open(ParmakIziProjeSecimiComponent, {
      centered: true,
      windowClass: 'modal-offcanvas modal-offcanvas-xl'
    });

    modal.result.then((secilen: IParmakIziProje) => {
      if (secilen && !this.secilenProjeler.find(p => p.id === secilen.id)) {
        this.secilenProjeler = [...this.secilenProjeler, secilen];
        this.projelerGrid.data = this.secilenProjeler;
        this.projelerGrid.totalCount = this.secilenProjeler.length;
      }
    }).catch(() => { });
  }

  projeSil(proje: IParmakIziProje) {
    this.secilenProjeler = this.secilenProjeler.filter(p => p.id !== proje.id);
    this.projelerGrid.data = this.secilenProjeler;
    this.projelerGrid.totalCount = this.secilenProjeler.length;
  }

  kaydet() {
  }
}
