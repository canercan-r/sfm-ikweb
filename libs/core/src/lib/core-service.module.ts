import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { API_CONFIG_PROVIDER } from './providers/configuration-provider';
import { DefaultTenantProvider } from './providers/tenant-provider';
import { WINDOW_PROVIDERS } from './providers/window.provider';

import localeArSA from '@angular/common/locales/ar-SA';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import localeKa from '@angular/common/locales/ka';
import localeRo from '@angular/common/locales/ro';
import localeRu from '@angular/common/locales/ru';
import localeSr from '@angular/common/locales/sr';
import localeTr from '@angular/common/locales/tr';
import { AlertDisplayService, ConfirmService, GridConfigService, GridUtils, PNotifyService } from '@lib-common';
import { BrandedTranslateHttpLoader } from './loaders/branded-lang-loader';

registerLocaleData(localeEn);
registerLocaleData(localeTr, 'trTR');
registerLocaleData(localeTr, 'tr');
registerLocaleData(localeSr);
registerLocaleData(localeArSA);
registerLocaleData(localeDe);
registerLocaleData(localeRo);
registerLocaleData(localeRu);
registerLocaleData(localeKa);
registerLocaleData(localeKa, 'geGE');
registerLocaleData(localeKa, 'ge-GE');

export function createTranslateLoader(http: HttpClient, config: any) {
  if (config && config.UseBrandTranslationLoader) {
    return new BrandedTranslateHttpLoader(http, config);
  } else {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient, API_CONFIG_PROVIDER],
      },
    }),
  ],
})

export class CoreServiceModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreServiceModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }

  static forRoot(configuration: any): ModuleWithProviders<CoreServiceModule> {
    return {
      ngModule: CoreServiceModule,
      providers: [
        DefaultTenantProvider,
        WINDOW_PROVIDERS,
        ConfirmService,
        GridUtils,
        GridConfigService,
        {
          provide: API_CONFIG_PROVIDER,
          useValue: configuration
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoadingInterceptor,
          multi: true,
        },
        {
          provide: AlertDisplayService,
          useClass: PNotifyService,
          multi: false
        }
      ],
    };
  }
}
