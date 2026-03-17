import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, Injector } from '@angular/core';
import { WINDOW } from '@ng-web-apis/common';
import { Observable } from 'rxjs';
import { ConfigurationService } from '../configuration/configuration.service';
import { TenantProvider } from '../models/provider-types';
import { TENANT_PROVIDER } from '../providers/tenant-provider';
import { UserInfoService } from '../services/user-info.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  private userInfo: UserInfoService;

  constructor(
    private conf: ConfigurationService,
    private injector: Injector,
    @Inject(TENANT_PROVIDER) tenantProvider: TenantProvider,
    @Inject(WINDOW) _window: any
  ) {
    this.userInfo = this.injector.get(UserInfoService);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const project = this.conf.getProject()

    switch (project) {
      case "ik-login":
      case "ik-login-web":
        request = request.clone({
          setHeaders: {
            "from-kiosk": "true",
          },
        });
        break;
      default:
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.userInfo.getAccessToken()}`,
            "mobile-app": "true",
            "user-id": this.userInfo.getUserID(),
          },
        });
        break;
    }

    return next.handle(request);
  }
}
