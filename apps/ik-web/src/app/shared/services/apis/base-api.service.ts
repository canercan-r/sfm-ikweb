import { ApiConfiguration } from '@ikweb-shared/utils/api-config';
import { DataService, IHttpOptions, IResponseWrapper, UrlBuilderService } from '@lib-core';
import { Observable, map } from 'rxjs';

export abstract class BaseAPIService<T extends string> {
  protected urlForMethod: (apiMethod: T) => string;

  constructor(
    urlBuilderService: UrlBuilderService,
    private readonly http: DataService,
    controllerPrefix: keyof typeof ApiConfiguration,
  ) {
    this.urlForMethod = urlBuilderService.buildActionUrlForController(controllerPrefix);
  }

  protected get<U>(method: T, param?: any, query?: string, options?: IHttpOptions) {
    query = query ? '/' + query : "";
    return this.http.get<U>(this.urlForMethod(method) + query, param, options);
  }

  protected post<U>(method: T, param?: any, options?: IHttpOptions) {
    return this.http.post<U>(this.urlForMethod(method), param, options);
  }

  protected put<U>(method: T, param?: any, query?: string, options?: IHttpOptions) {
    query = query ? '/' + query : "";
    return this.http.put<U>(this.urlForMethod(method) + query, param, options);
  }

  protected delete<U>(method: T, param: any, options?: IHttpOptions) {
    return this.http.delete<U>(this.urlForMethod(method), param);
  }

  protected unboxError<T>(sorceObs: Observable<IResponseWrapper<T>>) {
    return sorceObs.pipe(
      map((result) => {
        if (result?.hasError) {
          throw new Error(result.errors.join('\n'));
        }
        return result.response;
      }),
    );
  }
}
