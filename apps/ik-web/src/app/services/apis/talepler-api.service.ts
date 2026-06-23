import { Injectable } from "@angular/core";
import { ITedarikTaleplerDosyalar, ITedarikTalepleri, ITedarikTalepleriDetay, ITedarikTalepleriMalzemeler } from "@ikweb-models/components/interfaces";
import { BaseAPIService } from "@ikweb-shared/services/apis/base-api.service";
import { DataService, UrlBuilderService } from "@lib-core";
import { Observable } from "rxjs";

enum TaleplerAPI {
    GET_TEDARIK_TALEPLERI = 'Tedarik',
    GET_TEDARIK_TALEPLERI_DETAY = 'TedarikTalepleriDetay',
    GET_TEDARIK_TALEPLERI_MALZEMELER = 'TedarikTalepleri_Malzemeler',
    GET_TEDARIK_TALEPLERI_DOSYALAR = 'TedarikTalepleri_Dosyalar',
}

@Injectable({
    providedIn: 'root',
})
export class TaleplerAPIService extends BaseAPIService<TaleplerAPI> {

    constructor(
        _url: UrlBuilderService,
        protected readonly _backend: DataService,
    ) {
        super(_url, _backend, 'TaleplerURL');
    }

    getTedarikTalepleri(): Observable<ITedarikTalepleri[]> {
        return this.get<ITedarikTalepleri[]>(TaleplerAPI.GET_TEDARIK_TALEPLERI);
    }

    getTedarikTalepleriDetay(tedarikTalepID: string): Observable<ITedarikTalepleriDetay[]> {
        return this.get<ITedarikTalepleriDetay[]>(
            TaleplerAPI.GET_TEDARIK_TALEPLERI_DETAY,
            { tedarikTalepID }
        );
    }

    getTedarikTalepleriMalzemeler(): Observable<ITedarikTalepleriMalzemeler[]> {
        return this.get<ITedarikTalepleriMalzemeler[]>(TaleplerAPI.GET_TEDARIK_TALEPLERI_MALZEMELER);
    }

    getTedarikTalepleriDosyalar(): Observable<ITedarikTaleplerDosyalar[]> {
        return this.get<ITedarikTaleplerDosyalar[]>(TaleplerAPI.GET_TEDARIK_TALEPLERI_DOSYALAR);
    }

}