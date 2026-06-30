import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PageLink } from '@ikweb-layout/core/page-info.service';
import { ITedarikSiparisUygunsuzlukMalzemeGirisleri } from '@ikweb-models/components/interfaces';
import { TaleplerAPIService } from '@ikweb-services/apis/tedarik-api.service';
import { SharedHelperService } from '@ikweb-shared/services/helper/shared-helper.service';
import { GridOptionsBuilder, LibGrids, LibModulesRootLangKeys, MockGridComponent, PageStackService } from '@lib-common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ikweb-uygunsuzluk-formu',
  templateUrl: './uygunsuzluk-formu.component.html',
  styleUrl: './uygunsuzluk-formu.component.scss',
})
export class UygunsuzlukFormuComponent implements OnInit, AfterViewInit {
  @ViewChild('malzemeGrid', { static: false }) malzemeGrid: MockGridComponent;
  @ViewChild('islemTemp', { read: TemplateRef, static: true }) islemTemp: TemplateRef<any>;

  activeTab = 1;
  titleKey: string;
  form: FormGroup;
  malzemeler: ITedarikSiparisUygunsuzlukMalzemeGirisleri[] = [];

  bc$: BehaviorSubject<Array<PageLink>> = new BehaviorSubject<Array<PageLink>>([
    { title: 'Talepler.Tedarik.Title' },
    { title: 'Talepler.Siparisler.Title', path: '/talepler/siparisler' },
  ]);

  private readonly _titleMap: Record<string, string> = {
    teslimat: 'Talepler.Siparisler.UygunsuzlukFormu.TeslimatUygunsuzluguFormu',
    hizmet: 'Talepler.Siparisler.UygunsuzlukFormu.HizmetUygunsuzluguFormu',
    kalite: 'Talepler.Siparisler.UygunsuzlukFormu.KaliteUygunsuzluguFormu',
  };

  constructor(
    readonly _sharedHelper: SharedHelperService,
    public _pageStack: PageStackService,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _tedarikApi: TaleplerAPIService,
  ) { }

  ngOnInit(): void {
    this._sharedHelper.initScrollComponent();

    const type = this._route.snapshot.paramMap.get('type') ?? '';
    this.titleKey = this._titleMap[type] ?? 'Talepler.Siparisler.UygunsuzlukFormu.Title';

    this.form = this._fb.group({
      formNo: [''],
      projeAdi: [''],
      uygunsuzlukTuru: [''],
      tarih: [''],
      tedarikciAdi: [''],
      aciklama: [''],
      durumu: [''],
      siparisNo: [''],
    });

    this._tedarikApi.getTedarikSiparisUygunsuzlukMalzemeGirisleri().subscribe((data) => {
      this.malzemeGrid.data = data
      this.malzemeGrid.totalCount = data.length
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.buildMalzemeGrid());
  }

  buildMalzemeGrid(): void {
    if (!this.malzemeGrid) return;
    const opts = new GridOptionsBuilder()
      .forGrid(LibGrids.IKWeb_Tedarik_Siparisler_UygunsuzlukMalzemeGirisleri)
      .inModule(LibModulesRootLangKeys.IKWEB)
      .withPageSize(50)
      .build();

    this.malzemeGrid.gridOption = opts;
    this.malzemeGrid.columnField = [
      { field: 'Islem', colRef: null, append: false, width: '70' },
      { field: 'malzemeKodu', colRef: null, append: false, width: '' },
      { field: 'malzemeAdi', colRef: null, append: false, width: '200' },
      { field: 'siparisMiktari', colRef: null, append: false, width: '' },
      { field: 'uygunsuzMiktar', colRef: null, append: false, width: '' },
      { field: 'birimi', colRef: null, append: false, width: '' },
      { field: 'aciklama', colRef: null, append: false, width: '' },
    ];
    this.malzemeGrid.extraColOpt = [
      { field: 'Islem', colRef: this.islemTemp, append: true, width: '70' },
    ];
  }

  removeRow(row: ITedarikSiparisUygunsuzlukMalzemeGirisleri): void {
    this.malzemeler = this.malzemeler.filter(m => m.id !== row.id);
    this.buildMalzemeGrid();
  }

  goBack(): void {
    this._pageStack.goBack();
  }
}
