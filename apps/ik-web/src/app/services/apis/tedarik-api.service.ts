import { Injectable } from "@angular/core";
import { ITedarikSiparisGonderiKaydi, ITedarikSiparisGonderiKaydiFatura, ITedarikSiparisGonderiKaydiIrsaliye, ITedarikSiparisGonderiKaydiMalzemeDetay, ITedarikSiparisler, ITedarikSiparisMalzemeleri, ITedarikSiparisTeslimFisleri, ITedarikSiparisUygunsuzluklar, ITedarikSiparisUygunsuzlukMalzemeGirisleri, ITedarikTaleplerDosyalar, ITedarikTalepleri, ITedarikTalepleriDetay, ITedarikTalepleriMalzemeler } from "@ikweb-models/components/interfaces";
import { BaseAPIService } from "@ikweb-shared/services/apis/base-api.service";
import { DataService, UrlBuilderService } from "@lib-core";
import { Observable } from "rxjs";

enum TedarikAPI {
    GET_TEDARIK_TALEPLERI = 'Talepler',
    GET_TEDARIK_TALEPLERI_DETAY = 'TedarikTalepleriDetay',
    GET_TEDARIK_TALEPLERI_MALZEMELER = 'TedarikTalepleri_Malzemeler',
    GET_TEDARIK_TALEPLERI_DOSYALAR = 'TedarikTalepleri_Dosyalar',

    GET_TEDARIK_SIPARISLER = 'Siparisler',
    GET_TEDARIK_SIPARISLER_SIPARISMALZEMELERI = 'Siparisler_SiparisMalzemeleri',
    GET_TEDARIK_SIPARISLER_UYGUNSUZLUKLAR = 'Siparisler_Uygunsuzluklar',
    GET_TEDARIK_SIPARISLER_TESLIMFISLERI = 'Siparisler_TeslimFisleri',
    GET_TEDARIK_SIPARISLER_UYGUNSUZLUKMALZEMEGIRISLERI = 'Siparisler_UygunsuzlukMalzemeGirisleri',

    GET_TEDARIK_SIPARISLER_GONDERIKAYDI = 'Siparisler_GonderiKaydi',
    GET_TEDARIK_SIPARISLER_GONDERIKAYDI_MALZEMEDETAY = 'Siparisler_GonderiKaydi_MalzemeDetay',
    GET_TEDARIK_SIPARISLER_GONDERIKAYDI_FATURA = 'Siparisler_GonderiKaydi_Fatura',
    GET_TEDARIK_SIPARISLER_GONDERIKAYDI_IRSALIYE = 'Siparisler_GonderiKaydi_Irsaliye',
}

@Injectable({
    providedIn: 'root',
})
export class TaleplerAPIService extends BaseAPIService<TedarikAPI> {

    constructor(
        _url: UrlBuilderService,
        protected readonly _backend: DataService,
    ) {
        super(_url, _backend, 'TedarikURL');
    }

    getTedarikTalepleri(): Observable<ITedarikTalepleri[]> {
        return this.get<ITedarikTalepleri[]>(TedarikAPI.GET_TEDARIK_TALEPLERI);
    }

    getTedarikTalepleriDetay(tedarikTalepID: string): Observable<ITedarikTalepleriDetay[]> {
        return this.get<ITedarikTalepleriDetay[]>(
            TedarikAPI.GET_TEDARIK_TALEPLERI_DETAY,
            { tedarikTalepID }
        );
    }

    getTedarikTalepleriMalzemeler(): Observable<ITedarikTalepleriMalzemeler[]> {
        return this.get<ITedarikTalepleriMalzemeler[]>(TedarikAPI.GET_TEDARIK_TALEPLERI_MALZEMELER);
    }

    getTedarikTalepleriDosyalar(): Observable<ITedarikTaleplerDosyalar[]> {
        return this.get<ITedarikTaleplerDosyalar[]>(TedarikAPI.GET_TEDARIK_TALEPLERI_DOSYALAR);
    }

    getTedarikSiparisler(): Observable<ITedarikSiparisler[]> {
        return this.get<ITedarikSiparisler[]>(TedarikAPI.GET_TEDARIK_SIPARISLER);
    }

    getTedarikSiparisMalzemeleri(): Observable<ITedarikSiparisMalzemeleri[]> {
        return this.get<ITedarikSiparisMalzemeleri[]>(TedarikAPI.GET_TEDARIK_SIPARISLER_SIPARISMALZEMELERI);
    }

    getTedarikSiparisUygunsuzluklar(): Observable<ITedarikSiparisUygunsuzluklar[]> {
        return this.get<ITedarikSiparisUygunsuzluklar[]>(TedarikAPI.GET_TEDARIK_SIPARISLER_UYGUNSUZLUKLAR);
    }

    getTedarikSiparisTeslimFisleri(): Observable<ITedarikSiparisTeslimFisleri[]> {
        return this.get<ITedarikSiparisTeslimFisleri[]>(TedarikAPI.GET_TEDARIK_SIPARISLER_TESLIMFISLERI);
    }

    getTedarikSiparisUygunsuzlukMalzemeGirisleri(): Observable<ITedarikSiparisUygunsuzlukMalzemeGirisleri[]> {
        return this.get<ITedarikSiparisUygunsuzlukMalzemeGirisleri[]>(TedarikAPI.GET_TEDARIK_SIPARISLER_UYGUNSUZLUKMALZEMEGIRISLERI);
    }

    getTedarikSiparisGonderiKaydi(): Observable<ITedarikSiparisGonderiKaydi[]> {
        return this.get<ITedarikSiparisGonderiKaydi[]>(TedarikAPI.GET_TEDARIK_SIPARISLER_GONDERIKAYDI);
    }

    getTedarikSiparisGonderiKaydiMalzeme(): Observable<ITedarikSiparisGonderiKaydiMalzemeDetay[]> {
        return this.get<ITedarikSiparisGonderiKaydiMalzemeDetay[]>(TedarikAPI.GET_TEDARIK_SIPARISLER_GONDERIKAYDI_MALZEMEDETAY);
    }

    getTedarikSiparisGonderiKaydiFatura(): Observable<ITedarikSiparisGonderiKaydiFatura[]> {
        return this.get<ITedarikSiparisGonderiKaydiFatura[]>(TedarikAPI.GET_TEDARIK_SIPARISLER_GONDERIKAYDI_FATURA);
    }

    getTedarikSiparisGonderiKaydiIrsaliye(): Observable<ITedarikSiparisGonderiKaydiIrsaliye[]> {
        return this.get<ITedarikSiparisGonderiKaydiIrsaliye[]>(TedarikAPI.GET_TEDARIK_SIPARISLER_GONDERIKAYDI_IRSALIYE);
    }

}