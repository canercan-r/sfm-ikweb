import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageLink } from '@ikweb-layout/core/page-info.service';
import { ITedarikTalepleriMalzemeler } from '@ikweb-models/components/interfaces';
import { TaleplerAPIService } from '@ikweb-services/apis/tedarik-api.service';
import { SharedHelperService } from '@ikweb-shared/services/helper/shared-helper.service';
import { GridOptionsBuilder, LibGrids, LibModulesRootLangKeys, MockGridComponent, PageStackService, PagingTypes } from '@lib-common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { DosyaEkleComponent } from '../modal/dosya-ekle/dosya-ekle.component';

export type TalepFormMod = 'yeni' | 'degistir' | 'incele' | 'sil';

interface IMalzemeRow extends ITedarikTalepleriMalzemeler {
  _selected: boolean;
}

@Component({
  selector: 'ikweb-tedarik-talepler-form',
  templateUrl: './tedarik-talepler-form.component.html',
  styleUrl: './tedarik-talepler-form.component.scss',
})
export class TedarikTaleplerFormComponent implements OnInit, AfterViewInit {
  @ViewChild('malzemelerGrid', { static: false }) malzemelerGrid: MockGridComponent;
  @ViewChild('secilenMalzemelerGrid', { static: false }) secilenMalzemelerGrid: MockGridComponent;
  @ViewChild('donemDosyalarGrid', { static: false }) donemDosyalarGrid: MockGridComponent;
  @ViewChild('dosyalarGrid', { static: false }) dosyalarGrid: MockGridComponent;
  @ViewChild('malzemelerIslemTemp', { read: TemplateRef, static: true }) malzemelerIslemTemp: TemplateRef<any>;
  @ViewChild('secilenGeriTemp', { read: TemplateRef, static: true }) secilenGeriTemp: TemplateRef<any>;
  @ViewChild('secilenTanımsızTemp', { read: TemplateRef, static: true }) secilenTanımsızTemp: TemplateRef<any>;
  @ViewChild('dosyalarIslemTemp', { read: TemplateRef, static: true }) dosyalarIslemTemp: TemplateRef<any>;

  mod: TalepFormMod = 'yeni';
  activeTab = 1;
  titleKey: string;

  form: FormGroup;

  private _malzemelerData: IMalzemeRow[] = [];
  private _dosyalarData: any[] = [];

  bc$: BehaviorSubject<Array<PageLink>> = new BehaviorSubject<Array<PageLink>>([
    { title: 'Talepler.Tedarik.Title' },
    { title: 'Talepler.Title', path: '/talepler/tedarik-talepleri' },
  ]);

  constructor(
    readonly _sharedHelper: SharedHelperService,
    private _taleplerApi: TaleplerAPIService,
    public _pageStack: PageStackService,
    private _modal: NgbModal,
    private _fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this._sharedHelper.initScrollComponent();
    const state = history.state as { mod?: TalepFormMod };
    if (state?.mod) {
      this.mod = state.mod;
    }
    this._updateTitle();
    this._initForm();
  }

  ngAfterViewInit(): void {
    this._taleplerApi.getTedarikTalepleriMalzemeler().subscribe((data) => {
      this._malzemelerData = data.map(d => ({ ...d, _selected: false }));
      this._refreshMalzemelerGrid();
      this._refreshSecilenMalzemelerGrid();
    });

    this._taleplerApi.getTedarikTalepleriDosyalar().subscribe((data) => {
      this._dosyalarData = data;
      this._refreshDosyalarGrids();
    });

    setTimeout(() => {
      this.buildMalzemelerGrid();
      this.buildSecilenMalzemelerGrid();
    }, 250);
  }

  onTabChange(tabId: number): void {
    this._sharedHelper.initScrollComponent();
    setTimeout(() => {
      if (tabId === 1) {
        this.buildSecilenMalzemelerGrid();
      } else if (tabId === 2) {
        this.buildDosyalarGrid(this.donemDosyalarGrid);
      } else if (tabId === 3) {
        this.buildDosyalarGrid(this.dosyalarGrid);
      }
    });
    setTimeout(() => {
      if (tabId === 1) this.secilenMalzemelerGrid?.libGrid?.reflow();
      else if (tabId === 2) this.donemDosyalarGrid?.libGrid?.reflow();
      else if (tabId === 3) this.dosyalarGrid?.libGrid?.reflow();
    }, 250);
  }

  toggleMalzeme(row: IMalzemeRow): void {
    const item = this._malzemelerData.find(x => x.id === row.id);
    if (item) {
      item._selected = !item._selected;
      this._refreshMalzemelerGrid();
      this._refreshSecilenMalzemelerGrid();
    }
  }

  geriAl(row: IMalzemeRow): void {
    const item = this._malzemelerData.find(x => x.id === row.id);
    if (item) {
      item._selected = false;
      this._refreshMalzemelerGrid();
      this._refreshSecilenMalzemelerGrid();
    }
  }

  goBack(): void {
    this._pageStack.goBack();
  }

  dosyaEkleModal(): void {
    this._modal.open(DosyaEkleComponent, {
      windowClass: 'modal-offcanvas modal-offcanvas-end'
    });
  }

  buildMalzemelerGrid(): void {
    if (!this.malzemelerGrid) return;

    this.malzemelerGrid.gridOption = new GridOptionsBuilder()
      .forGrid(LibGrids.IKWeb_Talepler_Malzemeler)
      .inModule(LibModulesRootLangKeys.IKWEB)
      .withPagingType(PagingTypes.NONE)
      .build();

    this.malzemelerGrid.columnField = [
      { field: 'Islem', colRef: null, append: false, width: '70' },
      { field: 'malzemeKodu', colRef: null, append: false, width: '' },
      { field: 'malzemeAdi', colRef: null, append: false, width: '200' },
      { field: 'birimi', colRef: null, append: false, width: '' },
    ];

    this.malzemelerGrid.extraColOpt = [
      { field: 'Islem', colRef: this.malzemelerIslemTemp, append: true, width: '70' },
    ];

    this._refreshMalzemelerGrid();
  }

  buildSecilenMalzemelerGrid(): void {
    if (!this.secilenMalzemelerGrid) return;

    this.secilenMalzemelerGrid.gridOption = new GridOptionsBuilder()
      .forGrid(LibGrids.IKWeb_Talepler_SecilenMalzemeler)
      .inModule(LibModulesRootLangKeys.IKWEB)
      .withPagingType(PagingTypes.NONE)
      .build();

    this.secilenMalzemelerGrid.columnField = [
      { field: 'Geri', colRef: null, append: false, width: '60' },
      { field: 'Tanımsız', colRef: null, append: false, width: '120' },
      { field: 'malzemeKodu', colRef: null, append: false, width: '' },
      { field: 'malzemeAdi', colRef: null, append: false, width: '200' },
      { field: 'miktar', colRef: null, append: false, width: '' },
      { field: 'birimi', colRef: null, append: false, width: '' },
      { field: 'urunResmi', colRef: null, append: false, width: '' },
    ];

    this.secilenMalzemelerGrid.extraColOpt = [
      { field: 'Tanımsız', colRef: this.secilenTanımsızTemp, append: true, width: '120' },
      { field: 'Geri', colRef: this.secilenGeriTemp, append: true, width: '60' },
    ];

    this._refreshSecilenMalzemelerGrid();
  }

  buildDosyalarGrid(grid: MockGridComponent): void {
    if (!grid) return;

    grid.gridOption = new GridOptionsBuilder()
      .forGrid(LibGrids.IKWeb_Talepler_Dosyalar)
      .inModule(LibModulesRootLangKeys.IKWEB)
      .withPagingType(PagingTypes.NONE)
      .build();

    grid.columnField = [
      { field: 'Islem', colRef: null, append: false, width: '70' },
      { field: 'eklemeTarihi', colRef: null, append: false, width: '' },
      { field: 'dosyaAdi', colRef: null, append: false, width: '200' },
      { field: 'dosyaBoyutu', colRef: null, append: false, width: '' },
      { field: 'dosyaTuru', colRef: null, append: false, width: '' },
      { field: 'aciklama', colRef: null, append: false, width: '' },
      { field: 'path', colRef: null, append: false, width: '' },
      { field: 'gecerlilikTarihi', colRef: null, append: false, width: '' },
    ];

    grid.extraColOpt = [
      { field: 'Islem', colRef: this.dosyalarIslemTemp, append: true, width: '70' },
    ];

    this._refreshDosyalarGrids();
  }

  private _updateTitle(): void {
    this.titleKey = this.mod === 'yeni'
      ? 'Talepler.Tedarik.Form.YeniTalep'
      : this.mod === 'degistir'
        ? 'Talepler.Tedarik.Form.Degistir'
        : this.mod === 'incele'
          ? 'Talepler.Tedarik.Form.Incele'
          : 'Global.Sil';
  }

  private _initForm(): void {
    this.form = this._fb.group({
      donem: [null],
      talepNo: [null],
      tarih: [null],
      talepTuru: [null],
      teslimAlacakKisi1: [null],
      teslimAlacakKisi2: [null],
      teslimAlacakKisi3: [null],
      aciklama: [null],
      telNo1: [null],
      telNo2: [null],
      telNo3: [null],
      projeKodu: [null],
      projeAdi: [null],
      teslimAdresi: [null],
    });
  }

  private _refreshMalzemelerGrid(): void {
    if (!this.malzemelerGrid) return;
    this.malzemelerGrid.data = [...this._malzemelerData];
    this.malzemelerGrid.totalCount = this._malzemelerData.length;
  }

  private _refreshSecilenMalzemelerGrid(): void {
    if (!this.secilenMalzemelerGrid) return;
    const secilen = this._malzemelerData.filter(x => x._selected);
    this.secilenMalzemelerGrid.data = [...secilen];
    this.secilenMalzemelerGrid.totalCount = secilen.length;
  }

  private _refreshDosyalarGrids(): void {
    [this.donemDosyalarGrid, this.dosyalarGrid].forEach(grid => {
      if (!grid) return;
      grid.data = [...this._dosyalarData];
      grid.totalCount = this._dosyalarData.length;
    });
  }
}
