import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageLink } from '@ikweb-layout/core/page-info.service';
import { IPuantaj } from '@ikweb-models/components';
import { PuantajAPIService } from '@ikweb-services/apis/puantaj-api.service';
import { PuantajStoreService } from '@ikweb-services/store/puantaj-store.service';
import { SharedHelperService } from '@ikweb-shared/services/helper/shared-helper.service';
import { GridOptionsBuilder, LibGrids, LibModulesRootLangKeys, MockGridComponent } from '@lib-common';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { IGridCellEventArgs } from 'igniteui-angular';
import { BehaviorSubject } from 'rxjs';
import { DosyaEkleComponent } from './modal/dosya-ekle/dosya-ekle.component';
import { EkOdemelerDetayComponent } from './modal/ek-odemeler-detay/ek-odemeler-detay.component';
import { PersonelEkleComponent } from './modal/personel-ekle/personel-ekle.component';

@Component({
  selector: 'ikweb-aylik-puantaj',
  templateUrl: './aylik-puantaj.component.html',
  styleUrl: './aylik-puantaj.component.scss',
})
export class AylikPuantajComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollContentAylikPuantajNav', { read: ElementRef }) public scrollContentAylikPuantajNav: ElementRef<any>;

  @ViewChild('aylikPuantajGrid', { static: false }) aylikPuantajGrid: MockGridComponent;
  @ViewChild('aylikPuantajEvrakKontroluGrid', { static: false }) aylikPuantajEvrakKontroluGrid: MockGridComponent;
  @ViewChild('aylikPuantajDosyalarGrid', { static: false }) aylikPuantajDosyalarGrid: MockGridComponent;
  @ViewChild('aylikPuantajPuantajDurumDegisiklikleriGrid', { static: false }) aylikPuantajPuantajDurumDegisiklikleriGrid: MockGridComponent;
  @ViewChild('aylikPuantajEkOdemelerGrid', { static: false }) aylikPuantajEkOdemelerGrid: MockGridComponent;
  @ViewChild('aylikPuantajFazlaMesaiBilgileriGrid', { static: false }) aylikPuantajFazlaMesaiBilgileriGrid: MockGridComponent;

  @ViewChild('gridCellActionTemp', { read: TemplateRef, static: true }) gridCellActionTemp: TemplateRef<any>;
  @ViewChild('gridCellActionFileTemp', { read: TemplateRef, static: true }) gridCellActionFileTemp: TemplateRef<any>;
  @ViewChild('gridCellBrutTemp', { read: TemplateRef, static: true }) gridCellBrutTemp: TemplateRef<any>;
  @ViewChild('cellDateTemp', { read: TemplateRef, static: true }) cellDateTemp: TemplateRef<any>;
  @ViewChild('cellAciklamaTemp', { read: TemplateRef, static: true }) cellAciklamaTemp: TemplateRef<any>;


  navItems = [
    'Puantaj',
    'EvrakKontrolu',
    'Aciklama',
    "Dosyalar",
    "PuantajDurumDegisiklikleri",
    "EkOdemeler",
    "FazlaMesaiBilgileri"
  ]

  navActiveId = this.navItems[0];

  puantajID: string;
  puantaj: IPuantaj

  bc$: BehaviorSubject<Array<PageLink>> = new BehaviorSubject<
    Array<PageLink>
  >([
    { title: 'Puantaj.ProjePuantajlari.AylikPuantajCizelgesi' }
  ]);

  constructor(
    private _puantajApi: PuantajAPIService,
    readonly _sharedHelper: SharedHelperService,
    private readonly _cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private readonly _modal: NgbModal,
    private _puantajStore: PuantajStoreService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.puantajID = this.route.snapshot.paramMap.get('puantajID');

    this.puantaj = this._puantajStore.getSelectedPuantaj();

    if (!this.puantaj) {
      this._puantajApi.getPuantajByID(this.puantajID).subscribe(res => {
        this.puantaj = res;
        this._puantajStore.setSelectedPuantaj(res);
      });
    }

    this._sharedHelper.initScrollComponent();
  }

  ngAfterViewInit() {
    if (!this.puantaj) {
      const interval = setInterval(() => {
        if (this.puantaj) {
          clearInterval(interval);
          this.navChanged({ nextId: this.navActiveId } as any);
        }
      });
      return;
    }

    this.navChanged({ nextId: this.navActiveId } as any);
  }

  controlPrev(element: Element) {
    element.scrollTo({ left: (this.scrollContentAylikPuantajNav.nativeElement.scrollLeft - 150), behavior: 'smooth' });
  }

  controlNext(element: Element) {
    element.scrollTo({ left: (this.scrollContentAylikPuantajNav.nativeElement.scrollLeft + 150), behavior: 'smooth' });
  }

  navChanged(event: NgbNavChangeEvent) {
    this.navActiveId = event.nextId;
    this._cdr.detectChanges();

    setTimeout(() => {
      switch (this.navActiveId) {
        case 'Puantaj':
          this.buildPuantajGrid();
          this._sharedHelper.initScrollComponent();
          break;

        case 'EvrakKontrolu':
          this.buildEvrakKontroluGrid();
          this._sharedHelper.initScrollComponent();
          break;

        case 'Dosyalar':
          this.buildDosyalarGrid();
          this._sharedHelper.initScrollComponent();
          break;

        case 'PuantajDurumDegisiklikleri':
          this.buildPuantajDurumDegisiklikleriGrid();
          this._sharedHelper.initScrollComponent();
          break;

        case 'EkOdemeler':
          this.buildEkOdemelerGrid();
          this._sharedHelper.initScrollComponent();
          break;

        case 'FazlaMesaiBilgileri':
          this.buildFazlaMesaiBilgileriGrid();
          this._sharedHelper.initScrollComponent();
          break;
      }
    })
  }

  buildPuantajGrid() {
    if (!this.aylikPuantajGrid) return;

    this._puantajApi.getAylikPuantaj(this.puantajID).subscribe((data) => {
      this.aylikPuantajGrid.data = data
      this.aylikPuantajGrid.totalCount = data.length
    })
    this.aylikPuantajGrid.gridOption = new GridOptionsBuilder()
      .forGrid(LibGrids.IKWeb_Puantaj_AylikPuantaj)
      .inModule(LibModulesRootLangKeys.IKWEB)
      .withPageSize(50)
      .build();

    this.aylikPuantajGrid.columnField = [
      { field: 'Islem', colRef: this.gridCellActionTemp, append: false, width: '' },
      { field: 'adi', colRef: null, append: false, width: '' },
      { field: 'soyadi', colRef: null, append: false, width: '' },
      { field: 'calismaSekli', colRef: null, append: false, width: '' },
      { field: 'odemeTipi', colRef: null, append: false, width: '' },
      { field: 'pozisyonu', colRef: null, append: false, width: '' },
      { field: 'girisTarihi', colRef: null, append: false, width: '' },
      { field: 'cikisTarihi', colRef: null, append: false, width: '' },
      { field: 'toplamKazanc', colRef: null, append: false, width: '' },
      { field: 'brutMaas', colRef: this.gridCellBrutTemp, append: false, width: '' },
      { field: 'hesaplamaSekli', colRef: null, append: false, width: '' },
      { field: 'brutYol', colRef: null, append: false, width: '' },
      { field: 'brutEkOdeme', colRef: null, append: false, width: '' },
      { field: 'yaklasikNet', colRef: null, append: false, width: '' }
    ];
  }

  buildEvrakKontroluGrid() {
    if (!this.aylikPuantajEvrakKontroluGrid) return;

    this._puantajApi.getAylikPuantajEvrakKontrol(this.puantajID).subscribe((data) => {
      this.aylikPuantajEvrakKontroluGrid.data = data
      this.aylikPuantajEvrakKontroluGrid.totalCount = data.length
    })
    this.aylikPuantajEvrakKontroluGrid.gridOption = new GridOptionsBuilder()
      .forGrid(LibGrids.IKWeb_Puantaj_AylikPuantaj_EvrakKontrolu)
      .inModule(LibModulesRootLangKeys.IKWEB)
      .withPageSize(50)
      .build();
    this.aylikPuantajEvrakKontroluGrid.columnField = [
      { field: 'Islem', colRef: this.gridCellActionTemp, append: false, width: '' },
      { field: 'adi', colRef: null, append: false, width: '' },
      { field: 'soyadi', colRef: null, append: false, width: '' },
      { field: 'evrakTuru', colRef: null, append: false, width: '' },
      { field: 'gun', colRef: null, append: false, width: '' },
      { field: 'projeEvrakKontrol', colRef: null, append: false, type: "boolean", width: '' },
      { field: 'muhasebeEvrakKontrol', colRef: null, append: false, type: "boolean", width: '' },
      { field: 'aciklama', colRef: this.cellAciklamaTemp, append: false, width: '' },
      { field: 'operasyonNot', colRef: null, append: false, width: '' },
      { field: 'muhasebeNot', colRef: null, append: false, width: '' },
    ];
  }

  buildDosyalarGrid() {
    if (!this.aylikPuantajDosyalarGrid) return;

    this._puantajApi.getAylikPuantajDosyalar(this.puantajID).subscribe((data) => {
      this.aylikPuantajDosyalarGrid.data = data
      this.aylikPuantajDosyalarGrid.totalCount = data.length
    })
    this.aylikPuantajDosyalarGrid.gridOption = new GridOptionsBuilder()
      .forGrid(LibGrids.IKWeb_Puantaj_AylikPuantaj_Dosyalar)
      .inModule(LibModulesRootLangKeys.IKWEB)
      .withPageSize(50)
      .build();
    this.aylikPuantajDosyalarGrid.columnField = [
      { field: 'Islem', colRef: this.gridCellActionFileTemp, append: false, width: '' },
      { field: 'eklenmeTarihi', colRef: null, append: false, width: '' },
      { field: 'dosyaAdi', colRef: null, append: false, width: '' },
      { field: 'dosyaBoyutu', colRef: null, append: false, width: '' },
      { field: 'dosyaTuru', colRef: null, append: false, width: '' },
      { field: 'aciklama', colRef: null, append: false, width: '' },
      { field: 'path', colRef: null, append: false, width: '' },
      { field: 'gecerlilikTarihi', colRef: null, append: false, width: '' },
      { field: 'ekleyen', colRef: null, append: false, width: '' }
    ];
  }

  buildPuantajDurumDegisiklikleriGrid() {
    if (!this.aylikPuantajPuantajDurumDegisiklikleriGrid) return;

    this._puantajApi.getAylikPuantajDurumDegisiklikleri(this.puantajID).subscribe((data) => {
      this.aylikPuantajPuantajDurumDegisiklikleriGrid.data = data
      this.aylikPuantajPuantajDurumDegisiklikleriGrid.totalCount = data.length
    })
    this.aylikPuantajPuantajDurumDegisiklikleriGrid.gridOption = new GridOptionsBuilder()
      .forGrid(LibGrids.IKWeb_Puantaj_AylikPuantaj_DurumDegisiklikleri)
      .inModule(LibModulesRootLangKeys.IKWEB)
      .withPageSize(50)
      .build();
    this.aylikPuantajPuantajDurumDegisiklikleriGrid.columnField = [
      { field: 'Islem', colRef: this.gridCellActionTemp, append: false, width: '' },
      { field: 'personel', colRef: null, append: false, width: '' },
      { field: 'tarihi', colRef: null, append: false, width: '200' },
      { field: 'projePuantajDurumu', colRef: null, append: false, width: '' }
    ];
  }

  buildEkOdemelerGrid() {
    if (!this.aylikPuantajEkOdemelerGrid) return;

    this._puantajApi.getAylikPuantajEkOdemeler(this.puantajID).subscribe((data) => {
      this.aylikPuantajEkOdemelerGrid.data = data
      this.aylikPuantajEkOdemelerGrid.totalCount = data.length
    })
    this.aylikPuantajEkOdemelerGrid.gridOption = new GridOptionsBuilder()
      .forGrid(LibGrids.IKWeb_Puantaj_AylikPuantaj_EkOdemeler)
      .inModule(LibModulesRootLangKeys.IKWEB)
      .withPageSize(50)
      .build();
    this.aylikPuantajEkOdemelerGrid.columnField = [
      { field: 'Islem', colRef: this.gridCellActionTemp, append: false, width: '' },
      { field: 'sicilNo', colRef: null, append: false, width: '' },
      { field: 'personel', colRef: null, append: false, width: '' },
      { field: 'ekOdemeTuruKodu', colRef: null, append: false, width: '' },
      { field: 'ekOdemeTuru', colRef: null, append: false, width: '' },
      { field: 'brut', colRef: null, append: false, width: '' },
      { field: 'aciklama', colRef: null, append: false, width: '' }
    ];
  }

  buildFazlaMesaiBilgileriGrid() {
    if (!this.aylikPuantajFazlaMesaiBilgileriGrid) return;

    this._puantajApi.getAylikPuantajFazlaMesaiBilgileri(this.puantajID).subscribe((data) => {
      this.aylikPuantajFazlaMesaiBilgileriGrid.data = data
      this.aylikPuantajFazlaMesaiBilgileriGrid.totalCount = data.length
    })
    this.aylikPuantajFazlaMesaiBilgileriGrid.gridOption = new GridOptionsBuilder()
      .forGrid(LibGrids.IKWeb_Puantaj_AylikPuantaj_FazlaMesaiBilgileri)
      .inModule(LibModulesRootLangKeys.IKWEB)
      .withPageSize(50)
      .build();
    this.aylikPuantajFazlaMesaiBilgileriGrid.columnField = [
      { field: 'Islem', colRef: this.gridCellActionTemp, append: false, width: '' },
      { field: 'sicilNo', colRef: null, append: false, width: '' },
      { field: 'adiSoyadi', colRef: null, append: false, width: '' },
      { field: 'calismaSekli', colRef: null, append: false, width: '' },
      { field: 'fazlaMesaiNedeni', colRef: null, append: false, width: '' },
      { field: 'musteriyeFaturalanacak', colRef: null, append: false, type: "boolean", width: '' },
      { field: 'fazlaMesaiTuru', colRef: null, append: false, width: '' },
      { field: 'oran', colRef: null, append: false, width: '' },
      { field: 'sureSaat', colRef: null, append: false, width: '' },
      { field: 'fazlaMesaiTutar', colRef: null, append: false, width: '' },
      { field: 'sgkStatusu', colRef: null, append: false, width: '' }
    ];
  }

  gridEkOdemelerClick(clickEvent: IGridCellEventArgs) {
    const modal = this._modal.open(EkOdemelerDetayComponent, {
      centered: true,
      windowClass: 'modal-offcanvas modal-offcanvas-xl'
    });
    modal.componentInstance.ekOdemeler = clickEvent.cell.row.data
  }

  eksikKayitlar() {
    this._puantajStore.setPuantajID(this.puantajID);
    this._router.navigate(
      ['/puantaj/eksik-kayitlar']
    );
  }

  parmakIziRaporu() {
    this._puantajStore.setPuantajID(this.puantajID);
    this._router.navigate(
      ['/puantaj/parmak-izi-raporu']
    );
  }

  yillikIzinRaporu() {
    this._puantajStore.setPuantajID(this.puantajID);
    this._router.navigate(
      ['/puantaj/yillik-izin-raporu']
    );
  }

  personelEkle() {
    const modal = this._modal.open(PersonelEkleComponent, {
      windowClass: 'modal-offcanvas modal-offcanvas-end'
    });
  }

  dosyaEkle() {
    const modal = this._modal.open(DosyaEkleComponent, {
      windowClass: 'modal-offcanvas modal-offcanvas-end'
    });
  }
}
