import { Injectable } from '@angular/core';
import { IInsanKaynaklariPersonel } from '@ikweb-models/components';
import { BaseAPIService } from '@ikweb-shared/services/apis/base-api.service';
import { DataService, UrlBuilderService } from '@lib-core';
import { Observable } from 'rxjs';

enum PersonellerAPI {
  GET_PERSONELLER = 'Personel',
}

@Injectable({
  providedIn: 'root',
})
export class PersonellerAPIService extends BaseAPIService<PersonellerAPI> {

  constructor(
    _url: UrlBuilderService,
    protected readonly _backend: DataService,
  ) {
    super(_url, _backend, 'InsanKaynaklariURL');
  }

  getPersoneller(): Observable<IInsanKaynaklariPersonel[]> {
    return this.get<IInsanKaynaklariPersonel[]>(PersonellerAPI.GET_PERSONELLER);
  }

  getPersonel(id: string): Observable<IInsanKaynaklariPersonel> {
    return this.get<IInsanKaynaklariPersonel>(
      PersonellerAPI.GET_PERSONELLER,
      null,
      id
    );
  }

}
