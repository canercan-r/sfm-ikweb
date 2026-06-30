import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageLink } from '@ikweb-layout/core/page-info.service';
import { IGunlukPuantaj, IPuantaj } from '@ikweb-models/components';
import { PuantajAPIService } from '@ikweb-services/apis/puantaj-api.service';
import { PuantajStoreService } from '@ikweb-services/store/puantaj-store.service';
import { SharedHelperService } from '@ikweb-shared/services/helper/shared-helper.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { GunlukPuantajFazlaMesaiComponent } from './modal/gunluk-puantaj-fazla-mesai/gunluk-puantaj-fazla-mesai.component';
import { GunlukPuantajParmakiziKaydiComponent } from './modal/gunluk-puantaj-parmakizi-kaydi/gunluk-puantaj-parmakizi-kaydi.component';

@Component({
  selector: 'ikweb-gunluk-puantaj',
  templateUrl: './gunluk-puantaj.component.html',
  styleUrl: './gunluk-puantaj.component.scss',
})
export class GunlukPuantajComponent implements OnInit {
  gunlukPuantaj: any[] = [];
  gunSayisi = 0;
  gunKolonlari: number[] = [];
  normalKolonlar: string[] = [];

  seciliGunIndex: number | null = null;

  bc$: BehaviorSubject<Array<PageLink>> = new BehaviorSubject<
    Array<PageLink>
  >([
    { title: 'Puantaj.ProjePuantajlari.GunlukPuantajCizelgesi' }
  ]);

  puantaj: IPuantaj

  constructor(
    private route: ActivatedRoute,
    private _puantajApi: PuantajAPIService,
    readonly _sharedHelper: SharedHelperService,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _modal: NgbModal,
    private _puantajStore: PuantajStoreService,
  ) { }

  ngOnInit(): void {
    const puantajID = this.route.snapshot.paramMap.get('puantajID');

    this.puantaj = this._puantajStore.getSelectedPuantaj();

    if (!this.puantaj) {
      this._puantajApi.getPuantajByID(puantajID).subscribe(res => {
        this.puantaj = res;
        this._puantajStore.setSelectedPuantaj(res);
      });
    }

    const now = new Date();
    this.gunSayisi = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    this.gunKolonlari = Array.from({ length: this.gunSayisi }, (_, i) => i + 1);

    this._puantajApi.getGunlukPuantaj(puantajID).subscribe({
      next: (res) => {

        this.normalKolonlar = Object.keys(res[0]).filter(k => k !== 'gunler' && k !== 'puantajID' && k !== 'gunlukPuantajID' && k !== 'kisiFoto' && k !== 'haklarinBaslangicTarihi');
        this.gunlukPuantaj = res.map(item => {
          const gunMap = Object.assign({}, ...item.gunler);
          const gunler = this.gunKolonlari.map(gun => gunMap[gun] || '');

          return {
            ...item,
            gunlerUi: gunler
          };
        });

        this._cdr.detectChanges();
      }
    });
  }

  gunleriDuzenle(row: any, gunIndex: number, durum: string) {
    if (gunIndex == null) return;

    row.gunlerUi[gunIndex] = durum;
  }

  fazlaMesaiGir(row: IGunlukPuantaj) {
    const modal = this._modal.open(GunlukPuantajFazlaMesaiComponent, {
      centered: true,
      windowClass: 'modal-offcanvas modal-offcanvas-xl'
    });
    modal.componentInstance.gunlukPuantajID = row.gunlukPuantajID
  }

  parmakIziKaydiGoster(row: IGunlukPuantaj) {
    const modal = this._modal.open(GunlukPuantajParmakiziKaydiComponent, {
      centered: true,
      windowClass: 'modal-offcanvas modal-offcanvas-xl'
    });
    modal.componentInstance.gunlukPuantaj = row
  }
}
