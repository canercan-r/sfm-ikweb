import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '@lib-common';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  activeRequests = 0;

  /**
   * URLs for which the loading screen should not be enabled
   */
  skippUrls = ['/authrefresh'];

  constructor(private loadingScreenService: LoadingService, private readonly router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let displayLoadingScreen = !request.headers.get('no-loading');

    if (!displayLoadingScreen) {
      request.headers.delete('no-loading');
      return next.handle(request);
    }

    for (const skippUrl of this.skippUrls) {
      if (new RegExp(skippUrl).test(request.url)) {
        displayLoadingScreen = false;
        break;
      }
    }

    if (displayLoadingScreen) {
      if (this.activeRequests === 0) {
        this.loadingScreenService.setLoadingOnly(true);
      }
      this.activeRequests++;

      return next.handle(request).pipe(
        finalize(() => {
          this.activeRequests--;
          if (this.activeRequests === 0) {
            this.loadingScreenService.setLoadingOnly(false);
          }
        }),
      );
    } else {
      return next.handle(request);
    }
  }
}
