import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageLink } from '@ikweb-layout/core/page-info.service';
import { ITedarikSiparisGonderiKaydi } from '@ikweb-models/components/interfaces';
import { TaleplerAPIService } from '@ikweb-services/apis/tedarik-api.service';
import { SharedHelperService } from '@ikweb-shared/services/helper/shared-helper.service';
import { GridOptionsBuilder, LibGrids, LibModulesRootLangKeys, MockGridComponent, PageStackService } from '@lib-common';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { MalzemeDetayComponent } from './modal/malzeme-detay/malzeme-detay.component';
import { FaturaSecimiComponent } from './modal/fatura-secimi/fatura-secimi.component';
import { IrsaliyeSecimiComponent } from './modal/irsaliye-secimi/irsaliye-secimi.component';

@Component({
  selector: 'ikweb-gonderi-kaydi',
  templateUrl: './gonderi-kaydi.component.html',
  styleUrl: './gonderi-kaydi.component.scss',
})
export class GonderiKaydiComponent implements OnInit, AfterViewInit {
  @ViewChild('gonderiKaydiGrid', { static: false }) gonderiKaydiGrid: MockGridComponent;

  navActiveId = 'GonderiKaydi';
  form: FormGroup;
  aliciBilgileriForm: FormGroup;
  malzemeler: ITedarikSiparisGonderiKaydi[] = [];

  bc$: BehaviorSubject<Array<PageLink>> = new BehaviorSubject<Array<PageLink>>([
    { title: 'Talepler.Tedarik.Title' },
    { title: 'Talepler.Siparisler.Title', path: '/tedarik/siparisler' },
  ]);

  constructor(
    readonly _sharedHelper: SharedHelperService,
    public _pageStack: PageStackService,
    private _fb: FormBuilder,
    private _tedarikApi: TaleplerAPIService,
    private _modal: NgbModal,
  ) { }

  ngOnInit(): void {
    this._sharedHelper.initScrollComponent();

    this.form = this._fb.group({
      kayitNo: [''],
      alisSiparisNo: [''],
      tarih: [''],
      proje: [''],
      alisIrsaliyeFaturaNo: [''],
      eIrsaliyeNo: [''],
      eIrsaliyeTarihi: [''],
      turu: [''],
      evrakTuru: [''],
      eIrsaliyeDurumu: [''],
      gonderimsekli: [''],
      eIrsaliyeOnayDurumu: [''],
      firmaKodu: [''],
      firmaAdi: [''],
      aliciTuru: [''],
      kayitliAlici: [''],
      digerAlici: [''],
    });

    this.aliciBilgileriForm = this._fb.group({
      unvan: [''],
      vergiDairesi: [''],
      vergiKimlikNo: [''],
      mahalle: [''],
      binaAdi: [''],
      binaNoKapiNo: [''],
      sehir: [''],
      bulvar: [''],
      postaKodu: [''],
      ulkeKodu: [''],
      ulke: [''],
    });

    this._tedarikApi.getTedarikSiparisGonderiKaydi().subscribe((data) => {
      this.malzemeler = data;
      if (this.gonderiKaydiGrid) {
        this.gonderiKaydiGrid.data = data;
        this.gonderiKaydiGrid.totalCount = data.length;
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.buildGonderiKaydiGrid());
  }

  navChanged(event: NgbNavChangeEvent): void {
    this.navActiveId = event.nextId;
    if (event.nextId === 'GonderiKaydi') {
      this._sharedHelper.initScrollComponent();
    }
  }

  buildGonderiKaydiGrid(): void {
    if (!this.gonderiKaydiGrid) return;
    const opts = new GridOptionsBuilder()
      .forGrid(LibGrids.IKWeb_Tedarik_Siparisler_GonderiKaydi)
      .inModule(LibModulesRootLangKeys.IKWEB)
      .withPageSize(50)
      .build();

    this.gonderiKaydiGrid.gridOption = opts;
    this.gonderiKaydiGrid.columnField = [
      { field: 'malzemeKodu', colRef: null, append: false, width: '' },
      { field: 'malzemeAdi', colRef: null, append: false, width: '200' },
      { field: 'miktar', colRef: null, append: false, width: '' },
      { field: 'birim', colRef: null, append: false, width: '' },
    ];
  }

  openMalzemeDetay(): void {
    this._modal.open(MalzemeDetayComponent, {
      size: 'xl',
      centered: true,
    });
  }

  openFaturaSecimi(): void {
    const modal = this._modal.open(FaturaSecimiComponent, {
      size: 'xl',
      centered: true,
    });
    modal.result.then((row) => {
      if (row) {
        this.form.patchValue({ alisIrsaliyeFaturaNo: row.faturaNo });
      }
    }).catch(() => { });
  }

  openIrsaliyeSecimi(): void {
    const modal = this._modal.open(IrsaliyeSecimiComponent, {
      size: 'xl',
      centered: true,
    });
    modal.result.then((row) => {
      if (row) {
        this.form.patchValue({ eIrsaliyeNo: row.irsaliyeNo });
      }
    }).catch(() => { });
  }

  goBack(): void {
    this._pageStack.goBack();
  }
}
