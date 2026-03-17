import { Injectable } from '@angular/core';
import { ICountry } from '@ikweb-shared/models';
import { DataService, UrlBuilderService } from '@lib-core';
import { Observable } from 'rxjs';
import { BaseAPIService } from './base-api.service';

enum SharedAPI {
  GET_ULKELER = 'Countries'
}

@Injectable({
  providedIn: 'root',
})
export class SharedAPIService extends BaseAPIService<SharedAPI> {

  constructor(
    _url: UrlBuilderService,
    protected readonly _backend: DataService,
  ) {
    super(_url, _backend, 'SharedURL');
  }

  getUlkeler(): Observable<ICountry[]> {
    return this.get<ICountry[]>(SharedAPI.GET_ULKELER);
  }
}
