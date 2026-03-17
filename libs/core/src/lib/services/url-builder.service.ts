import { Inject, Injectable } from '@angular/core';
import { API_CONFIG_PROVIDER, IApiBaseConfig } from '@lib-core';

@Injectable({
  providedIn: 'root',
})
export class UrlBuilderService {
  constructor(@Inject(API_CONFIG_PROVIDER) private _backendConfig: IApiBaseConfig) { }

  buildActionUrlForController(apiController: string): (method: string) => string {
    return (apiMethod: string): string => `${this._backendConfig[apiController]}${apiMethod}`;
  }
}
