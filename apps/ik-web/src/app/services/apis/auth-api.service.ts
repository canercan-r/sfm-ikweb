import { Injectable } from '@angular/core';
import { ILoginRequest } from '@ikweb-models/auth';
import { BaseAPIService } from '@ikweb-shared/services/apis/base-api.service';
import { DataService, UrlBuilderService } from '@lib-core';
import { Auth, AuthHTTPService, AuthService, UserType } from '@mock-api';
import { BehaviorSubject, catchError, finalize, map, Observable, of, switchMap } from 'rxjs';

enum AuthAPI {
  LOGIN = 'WebLogin',
}
@Injectable({
  providedIn: 'root',
})

export class AuthAPIService extends BaseAPIService<AuthAPI> {
  isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  isLoggedInSubject$ = new BehaviorSubject(this._auth.isAuthenticated());
  isLoggedIn$ = this.isLoggedInSubject$.asObservable();

  constructor(
    _url: UrlBuilderService,
    protected readonly _backend: DataService,
    private readonly _auth: AuthService,
    private readonly _autHTTP: AuthHTTPService
  ) {
    super(_url, _backend, 'AuthURL');
  }

  login(req: ILoginRequest): Observable<UserType> {
    this.isLoadingSubject.next(true);
    return this._autHTTP.login(req).pipe(
      map((auth: Auth) => {
        const result = this._auth.setAuthFromLocalStorage(auth);
        return result;
      }),
      switchMap(() => this._auth.getUserByToken()),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
}
