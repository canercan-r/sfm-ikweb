import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PageLink } from '@ikweb-layout/core/page-info.service';
import { IPuantaj } from '@ikweb-models/components';
import { PuantajAPIService } from '@ikweb-services/apis/puantaj-api.service';
import { PuantajStoreService } from '@ikweb-services/store/puantaj-store.service';
import { SharedHelperService } from '@ikweb-shared/services/helper/shared-helper.service';
import { GridOptionsBuilder, IGridColumnExt, LibGrids, LibModulesRootLangKeys, MockGridComponent } from '@lib-common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { EkipmanSayimiComponent } from './modal/ekipman-sayimi/ekipman-sayimi.component';
import { GecikmeliGirisComponent } from './modal/gecikmeli-giris/gecikmeli-giris.component';
import { KidemKontrolComponent } from './modal/kidem-kontrol/kidem-kontrol.component';
import { ProjePuantajFiltreComponent } from './modal/proje-puantaj-filtre/proje-puantaj-filtre.component';
import { PuantajKontrolComponent } from './modal/puantaj-kontrol/puantaj-kontrol.component';
import { VardiyaBilgiComponent } from './modal/vardiya-bilgi/vardiya-bilgi.component';

@Component({
  selector: 'ikweb-proje-puantajlari',
  templateUrl: './proje-puantajlari.component.html',
  styleUrl: './proje-puantajlari.component.scss',
})
export class ProjePuantajlariComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollContentPuantajNav', { read: ElementRef }) public scrollContentPuantajNav: ElementRef<any>;
  @ViewChild('projePuantajlariGrid', { static: false }) projePuantajlariGrid: MockGridComponent;
  @ViewChild('gridCellActionTemp', { read: TemplateRef, static: true }) gridCellActionTemp: TemplateRef<any>;

  bc$: BehaviorSubject<Array<PageLink>> = new BehaviorSubject<
    Array<PageLink>
  >([
    { title: 'Puantaj.Title' },
  ]);

  constructor(
    private _puantajApi: PuantajAPIService,
    readonly _sharedHelper: SharedHelperService,
    private readonly _cdr: ChangeDetectorRef,
    private _router: Router,
    private readonly _modal: NgbModal,
    private _puantajStore: PuantajStoreService,
  ) { }

  ngOnInit(): void {
    this._sharedHelper.initScrollComponent();
  }

  ngAfterViewInit(): void {
    this.buildGrid();
    this.addExtraColumns();
  }

  buildGrid() {
    if (!this.projePuantajlariGrid) return;

    this._puantajApi.getPuantaj().subscribe((data) => {
      this.projePuantajlariGrid.data = data
      this.projePuantajlariGrid.totalCount = data.length
    })
    this.projePuantajlariGrid.gridOption = new GridOptionsBuilder()
      .forGrid(LibGrids.IKWeb_Puantaj)
      .inModule(LibModulesRootLangKeys.IKWEB)
      .withPageSize(50)
      .build();
    this.projePuantajlariGrid.columnField = [
      { field: 'Islem', colRef: null, append: false, width: '' },
      { field: 'kurum', colRef: null, append: false, width: '' },
      { field: 'projeKodu', colRef: null, append: false, width: '' },
      { field: 'projeAdi', colRef: null, append: false, width: '200' },
      { field: 'hizmetTuru', colRef: null, append: false, width: '' },
      { field: 'ay', colRef: null, append: false, width: '' },
      { field: 'yil', colRef: null, append: false, width: '' },
      { field: 'durumu', colRef: null, append: false, width: '' },
      { field: 'tam', colRef: null, append: false, width: '' },
      { field: 'kisiSayisi', colRef: null, append: false, width: '' },
      { field: 'segment', colRef: null, append: false, width: '' },
      { field: 'segmentYonetici', colRef: null, append: false, width: '' },
      { field: 'operasyonBaskani', colRef: null, append: false, width: '' },
      { field: 'sfmSorumlusu', colRef: null, append: false, width: '' }
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

    this.projePuantajlariGrid.extraColOpt = extOpt;
  }

  gunlukPuantajaGit(cell: IPuantaj) {
    this._puantajStore.setSelectedPuantaj(cell);

    this._router.navigate(['puantaj/gunluk-puantaj', cell.puantajID]);
  }

  aylikPuantajaGit(cell: IPuantaj) {
    this._puantajStore.setSelectedPuantaj(cell);

    this._router.navigate(['puantaj/aylik-puantaj', cell.puantajID]);
  }

  gecikmeliGunSayisiniDegistir(cell: IPuantaj) {
    const modal = this._modal.open(GecikmeliGirisComponent, {
      windowClass: 'modal-offcanvas modal-offcanvas-end'
    });
    modal.componentInstance.puantajInfo = cell
  }

  puantajKontrol(cell: IPuantaj) {
    const modal = this._modal.open(PuantajKontrolComponent, {
      centered: true,
      windowClass: 'modal-offcanvas modal-offcanvas-xl'
    });
    modal.componentInstance.puantajInfo = cell
  }

  ekipmanSayimi(cell: IPuantaj) {
    const modal = this._modal.open(EkipmanSayimiComponent, {
      centered: true,
      windowClass: 'modal-offcanvas modal-offcanvas-xl'
    });
    modal.componentInstance.puantajInfo = cell
  }

  vardiyaBilgiGuncellemesi(cell: IPuantaj) {
    const modal = this._modal.open(VardiyaBilgiComponent, {
      centered: true,
      windowClass: 'modal-offcanvas modal-offcanvas-xl'
    });
    modal.componentInstance.puantajInfo = cell
  }

  kidemKontrolEkrani(cell: IPuantaj) {
    const modal = this._modal.open(KidemKontrolComponent, {
      centered: true,
      windowClass: 'modal-offcanvas modal-offcanvas-xl'
    });
    modal.componentInstance.puantajInfo = cell
  }

  openFilterModal() {
    const modal = this._modal.open(ProjePuantajFiltreComponent, {
      windowClass: 'modal-offcanvas modal-offcanvas-end'
    });
  }

}
