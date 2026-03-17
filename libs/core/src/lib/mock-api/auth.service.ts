import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationService } from '@lib-core';
import { Auth, AuthHTTPService, ILoginRequest, User } from '@mock-api';
import { BehaviorSubject, Observable, Subscription, of } from 'rxjs';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';

export type UserType = User | undefined;

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  private authLocalStorageToken = `${this._configuration.getAppSettings().ProjectName}_${this._configuration.getAppSettings().ThemeVersion}`;

  // public fields
  isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  currentUserSubject = new BehaviorSubject<UserType>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  get currentUserValue(): UserType {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserType) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private _authHTTP: AuthHTTPService,
    private router: Router,
    private _configuration: ConfigurationService,
    @Inject(DOCUMENT) private document: Document,
  ) {
    const subscr = this.getUserByToken().subscribe();
    this.unsubscribe.push(subscr);
  }

  // public methods
  login(req: ILoginRequest): Observable<UserType> {
    this.isLoadingSubject.next(true);
    return this._authHTTP.login(req).pipe(
      map((auth: Auth) => {
        const result = this.setAuthFromLocalStorage(auth);
        return result;
      }),
      switchMap(() => this.getUserByToken()),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  resetUser(): void {
    localStorage.clear();
    // localStorage.removeItem(this.authLocalStorageToken);
    this.currentUserSubject.next(this.currentUserValue);
  }

  logout() {
    this.resetUser();
    this.document.location.reload();
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  getUserByToken(): Observable<UserType> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth || !auth.accessToken) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    return this._authHTTP.getUserByToken(auth.accessToken).pipe(
      map((user: UserType) => {
        if (user) {
          this.currentUserSubject.next(user);
        } else {
          this.logout();
        }
        return user;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  // need create new user then login
  registration(user: User): Observable<any> {
    this.isLoadingSubject.next(true);

    const req: ILoginRequest = {
      email: user.email,
      password: user.password
    }

    return this._authHTTP.createUser(user).pipe(
      map(() => {
        this.isLoadingSubject.next(false);
      }),
      switchMap(() => this.login(req)),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  forgotPassword(email: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return this._authHTTP
      .forgotPassword(email)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  // private methods
  setAuthFromLocalStorage(auth: Auth): boolean {
    // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.accessToken) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  private getAuthFromLocalStorage(): Auth | undefined {
    try {
      const lsValue = localStorage.getItem(this.authLocalStorageToken);
      if (!lsValue) {
        return undefined;
      }

      const authData = JSON.parse(lsValue);
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.authLocalStorageToken);
    return this.tokenNotExpired(token);
  }

  private tokenNotExpired(key: string) {
    return key !== null;
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
