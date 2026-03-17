import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { mergeDeep } from '@lib-common';
import { TranslateLoader } from '@ngx-translate/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_CONFIG_PROVIDER } from '../providers';

export class BrandedTranslateHttpLoader implements TranslateLoader {
  private _brand: string;
  private _brandedAssets: string;

  constructor(
    private http: HttpClient,
    @Inject(API_CONFIG_PROVIDER) private config: any,
    private prefix: string = '/assets/i18n/',
    private suffix: string = '.json',
  ) {
    const brandName = config.BrandName;
    if (brandName) {
      this._brand = brandName;
      this._brandedAssets = `/assets/branding/${this._brand}/i18n/`;
    }
  }

  /**
   * Gets the translations from the server
   */
  public getTranslation(lang: string): Observable<object> {
    const defaultTrans$ = this.http.get(`${this.prefix}${lang}${this.suffix}`);
    const brandedTrans$ = this._brandedAssets
      ? this.http.get(`${this._brandedAssets}${lang}${this.suffix}`).pipe(catchError(() => of({})))
      : of({});

    return forkJoin({
      defaultTrans: defaultTrans$,
      brandedTrans: brandedTrans$
    }).pipe(
      map(({ defaultTrans, brandedTrans }) => {
        return mergeDeep(defaultTrans, brandedTrans);
      })
    );
  }
}
