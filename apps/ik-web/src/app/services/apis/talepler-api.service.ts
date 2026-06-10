import { Injectable } from "@angular/core";
import { ITedarikTalepleri, ITedarikTalepleriDetay } from "@ikweb-models/components/interfaces";
import { BaseAPIService } from "@ikweb-shared/services/apis/base-api.service";
import { DataService, UrlBuilderService } from "@lib-core";
import { Observable } from "rxjs";

enum TaleplerAPI {
    GET_TEDARIK_TALEPLERI = 'Tedarik',
    GET_TEDARIK_TALEPLERI_DETAY = 'TedarikTalepleriDetay',
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

}