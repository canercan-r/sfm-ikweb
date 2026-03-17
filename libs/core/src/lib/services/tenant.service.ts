import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { TenantProvider } from '@lib-core';

@Injectable({
  providedIn: 'root'
})
export class TenantService implements TenantProvider {
  constructor(@Inject(DOCUMENT) private _doc: Document) { }

  provideTenant(): string {
    const url = this._doc.location.hostname;
    const subdomain = url.includes('.') ? url.split('.')[0] : 'senkron';
    return subdomain.includes('-') ? subdomain.split('-')[0] : subdomain;
  }
}
