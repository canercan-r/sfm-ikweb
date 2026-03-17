import { Injectable } from '@angular/core';
import { IAylikPuantaj, IAylikPuantajDosyalar, IAylikPuantajDurumDegisiklikleri, IAylikPuantajEkOdemeler, IAylikPuantajEkOdemeTuruKodu, IAylikPuantajEksikKayitlar, IAylikPuantajEvrakKontrol, IAylikPuantajFazlaMesaiBilgileri, IAylikPuantajYillikIzinDurumu, IEkipmanSayim, IGunlukPuantaj, IGunlukPuantajFazlaMesai, IGunlukPuantajParmakIzi, IKidemKontrol, IPuantaj, IVardiyaBilgi } from '@ikweb-models/components';
import { BaseAPIService } from '@ikweb-shared/services/apis/base-api.service';
import { DataService, UrlBuilderService } from '@lib-core';
import { Observable } from 'rxjs';

enum PuantajAPI {
  GET_PUANTAJ = 'ProjePuantajlari',
  GET_PUANTAJ_PUANTAJKONTROL = 'ProjePuantajlari_PuantajKontrol',
  GET_PUANTAJ_EKIPMANSAYIM = 'ProjePuantajlari_EkipmanSayim',
  GET_PUANTAJ_VARDIYABILGI = 'ProjePuantajlari_VardiyaBilgi',
  GET_PUANTAJ_KIDEMKONTROL = 'ProjePuantajlari_KidemKontrol',

  GET_GUNLUKPUANTAJ = 'GunlukPuantaj',
  GET_GUNLUKPUANTAJ_FAZLAMESAI = 'GunlukPuantaj_FazlaMesai',
  GET_GUNLUKPUANTAJ_PARMAKIZI = 'GunlukPuantaj_ParmakIzi',

  GET_AYLIKPUANTAJ_PUANTAJ = 'AylikPuantaj_Puantaj',
  GET_AYLIKPUANTAJ_EKSIKKAYITLAR = 'AylikPuantaj_EksikKayitlar',
  GET_AYLIKPUANTAJ_EVRAKKONTROL = 'AylikPuantaj_EvrakKontrol',
  GET_AYLIKPUANTAJ_DOSYALAR = 'AylikPuantaj_Dosyalar',
  GET_AYLIKPUANTAJ_DURUMDEGISIKLIKLERI = 'AylikPuantaj_DurumDegisiklikleri',
  GET_AYLIKPUANTAJ_EKODEMELER = 'AylikPuantaj_EkOdemeler',
  GET_AYLIKPUANTAJ_EKODEMELERTURUKODU = 'AylikPuantaj_EkOdemeTuruKodu',
  GET_AYLIKPUANTAJ_FAZLAMESAIBILGILERI = 'AylikPuantaj_FazlaMesai',
  GET_AYLIKPUANTAJ_YILLIKIZINDURUMU = 'AylikPuantaj_YillikIzinDurumu'
}

@Injectable({
  providedIn: 'root',
})
export class PuantajAPIService extends BaseAPIService<PuantajAPI> {

  constructor(
    _url: UrlBuilderService,
    protected readonly _backend: DataService,
  ) {
    super(_url, _backend, 'PuantajURL');
  }

  getPuantaj(): Observable<IPuantaj[]> {
    return this.get<IPuantaj[]>(PuantajAPI.GET_PUANTAJ);
  }

  getPuantajByID(puantajID: string): Observable<IPuantaj> {
    return this.get<IPuantaj>(
      PuantajAPI.GET_PUANTAJ,
      null,
      puantajID
    );
  }

  getPuantajKontrol(puantajID: number): Observable<IPuantaj[]> {
    return this.get<IPuantaj[]>(PuantajAPI.GET_PUANTAJ_PUANTAJKONTROL, { puantajID });
  }

  getEkipmanSayim(puantajID: number): Observable<IEkipmanSayim[]> {
    return this.get<IEkipmanSayim[]>(PuantajAPI.GET_PUANTAJ_EKIPMANSAYIM, { puantajID });
  }

  getVardiyaBilgi(puantajID: number): Observable<IVardiyaBilgi[]> {
    return this.get<IVardiyaBilgi[]>(PuantajAPI.GET_PUANTAJ_VARDIYABILGI, { puantajID });
  }

  getKidemKontrol(puantajID: number): Observable<IKidemKontrol[]> {
    return this.get<IKidemKontrol[]>(PuantajAPI.GET_PUANTAJ_KIDEMKONTROL, { puantajID });
  }

  getGunlukPuantaj(puantajID: string): Observable<IGunlukPuantaj[]> {
    return this.get<IGunlukPuantaj[]>(PuantajAPI.GET_GUNLUKPUANTAJ, { puantajID });
  }

  getGunlukPuantajFazlaMesai(gunlukPuantajID: string): Observable<IGunlukPuantajFazlaMesai[]> {
    return this.get<IGunlukPuantajFazlaMesai[]>(PuantajAPI.GET_GUNLUKPUANTAJ_FAZLAMESAI, { gunlukPuantajID });
  }

  getGunlukPuantajParmakIziHepsi(): Observable<IGunlukPuantaj[]> {
    return this.get<IGunlukPuantaj[]>(PuantajAPI.GET_GUNLUKPUANTAJ);
  }

  getGunlukPuantajParmakIzi(gunlukPuantajID: number): Observable<IGunlukPuantajParmakIzi[]> {
    return this.get<IGunlukPuantajParmakIzi[]>(PuantajAPI.GET_GUNLUKPUANTAJ_PARMAKIZI, { gunlukPuantajID });
  }

  getAylikPuantaj(puantajID: string): Observable<IAylikPuantaj[]> {
    return this.get<IAylikPuantaj[]>(PuantajAPI.GET_AYLIKPUANTAJ_PUANTAJ, { puantajID });
  }

  getAylikPuantajEksikKayitlar(puantajID: string): Observable<IAylikPuantajEksikKayitlar[]> {
    return this.get<IAylikPuantajEksikKayitlar[]>(PuantajAPI.GET_AYLIKPUANTAJ_EKSIKKAYITLAR, { puantajID });
  }

  getAylikPuantajEvrakKontrol(puantajID: string): Observable<IAylikPuantajEvrakKontrol[]> {
    return this.get<IAylikPuantajEvrakKontrol[]>(PuantajAPI.GET_AYLIKPUANTAJ_EVRAKKONTROL, { puantajID });
  }

  getAylikPuantajDosyalar(puantajID: string): Observable<IAylikPuantajDosyalar[]> {
    return this.get<IAylikPuantajDosyalar[]>(PuantajAPI.GET_AYLIKPUANTAJ_DOSYALAR, { puantajID });
  }

  getAylikPuantajDurumDegisiklikleri(puantajID: string): Observable<IAylikPuantajDurumDegisiklikleri[]> {
    return this.get<IAylikPuantajDurumDegisiklikleri[]>(PuantajAPI.GET_AYLIKPUANTAJ_DURUMDEGISIKLIKLERI, { puantajID });
  }

  getAylikPuantajEkOdemeler(puantajID: string): Observable<IAylikPuantajEkOdemeler[]> {
    return this.get<IAylikPuantajEkOdemeler[]>(PuantajAPI.GET_AYLIKPUANTAJ_EKODEMELER, { puantajID });
  }

  getAylikPuantajEkOdemeTuruKodu(puantajID: string, personelID: string, ekOdemeID: number): Observable<IAylikPuantajEkOdemeTuruKodu[]> {
    return this.get<IAylikPuantajEkOdemeTuruKodu[]>(PuantajAPI.GET_AYLIKPUANTAJ_EKODEMELERTURUKODU, { puantajID, personelID, ekOdemeID });
  }

  getAylikPuantajFazlaMesaiBilgileri(puantajID: string): Observable<IAylikPuantajFazlaMesaiBilgileri[]> {
    return this.get<IAylikPuantajFazlaMesaiBilgileri[]>(PuantajAPI.GET_AYLIKPUANTAJ_FAZLAMESAIBILGILERI, { puantajID });
  }

  getAylikPuantajYillikIzinDurumu(puantajID: string): Observable<IAylikPuantajYillikIzinDurumu[]> {
    return this.get<IAylikPuantajYillikIzinDurumu[]>(PuantajAPI.GET_AYLIKPUANTAJ_YILLIKIZINDURUMU, { puantajID });
  }

}
