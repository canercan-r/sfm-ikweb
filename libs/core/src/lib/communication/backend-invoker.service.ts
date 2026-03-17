import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MY_DATE_API_FORMAT } from '@lib-common';
import { ConfigurationService, IHttpOptions, IResponseWrapper } from '@lib-core';
import { format, isDate } from 'date-fns';
import { Observable, map } from 'rxjs';

const defaultHttpOptions: IHttpOptions = {
  loading: true,
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private _http: HttpClient, private _conf: ConfigurationService) { }

  public get<T>(url: string, param?: any, options = defaultHttpOptions): Observable<T> {
    const actionUrl: string = this._conf.getAppSettings().ServerWithApiURL + url;
    let params = new HttpParams();
    const headers = this.#optionsMapper(options);

    if (param) {
      Object.entries(param)
        .filter(([_, value]) => !!value)

        .forEach(([key, value]) => {
          const val = isDate(value) ? format(value as Date, MY_DATE_API_FORMAT) : value.toString();

          params = params.append(key, val);
        });
    }

    return this._http.get<T>(actionUrl, { params, headers });
  }

  public post<T>(url: string, param: any, options = defaultHttpOptions): Observable<T> {
    const actionUrl: string = this._conf.getAppSettings().ServerWithApiURL + url;
    return this._http.post<T>(actionUrl, param, { headers: this.#optionsMapper(options) });
  }

  public delete<T>(url: string, param: any): Observable<T> {
    const actionUrl: string = this._conf.getAppSettings().ServerWithApiURL + url;
    let params = new HttpParams();

    if (param) {
      Object.entries(param)
        .filter(([_, value]) => !!value)
        .forEach(([key, value]) => {
          const val = isDate(value) ? format(value as Date, MY_DATE_API_FORMAT) : value.toString();

          params = params.append(key, val);
        });
    }

    return this._http.delete<T>(actionUrl, { params });
  }

  public put<T>(url: string, param: any, options = defaultHttpOptions): Observable<T> {
    const actionUrl: string = this._conf.getAppSettings().ServerWithApiURL + url;

    return this._http.put<T>(actionUrl, param, { headers: this.#optionsMapper(options) });
  }

  #optionsMapper(options: IHttpOptions) {
    let headers = new HttpHeaders();
    if (!options.loading) {
      headers = headers.set('no-loading', 'true');
    }

    return headers;
  }

  public unboxError<T>(sorceObs: Observable<IResponseWrapper<T>>): Observable<T> {
    return sorceObs.pipe(
      map((result) => {
        if (result.hasError) {
          throw new Error(result.errors.join('\n'));
        }
        return result.response;
      }),
    );
  }
}
