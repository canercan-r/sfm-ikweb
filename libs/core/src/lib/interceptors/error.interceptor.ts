import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from '@lib-core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private _userInfo: UserInfoService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        // this can go to sentry for logging
        let errorMessage = `URL: ${err.url}
          `;
        if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          errorMessage += `An error occurred: ${err.error.message}`;
        } else {
          // this needs checking. maybe a global wrapper response would be good
          errorMessage += `Api returned code: ${err.status},
            error message is: ${err.message}
            exp is: ${err.error ? err.error.message || JSON.stringify(err.error) : 'no error data provided'}`;
        }
        console.error(errorMessage);

        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this._userInfo.logout();

          // belirtilen yol yok ise son çare location reload yap
          this.router
            .navigate(['auth/login'], {
              replaceUrl: true,
              skipLocationChange: true,
              state: {
                unauthorized: true
              }
            })
            .catch(() => {
              location.reload()
            });
        }

        return throwError(() => err);
      })
    );
  }
}
