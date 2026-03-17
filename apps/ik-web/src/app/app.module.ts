import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiConfiguration } from '@ikweb-shared/utils/api-config';
import { LanguageService, LibCommonModule } from '@lib-common';
import { CoreServiceModule, CoreUIModule, UserInfoService } from '@lib-core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import function to register Swiper custom elements
import { LocationStrategy, PathLocationStrategy, registerLocaleData } from '@angular/common';
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
import { HttpClientModule } from '@angular/common/http';
import localeEN from '@angular/common/locales/en';
import localeTR from '@angular/common/locales/tr';
import { environment } from '@ikweb-env/environment';
import { AppService } from '@ikweb-services/app.service';
import { SharedModule } from '@ikweb-shared/shared.module';
import { AuthService, MockAPIService } from '@mock-api';
import { TranslateService } from '@ngx-translate/core';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// register Swiper custom elements
register();

registerLocaleData(localeEN);
registerLocaleData(localeTR);

function appInitializer(
  authService: AuthService,
  translate: TranslateService
) {
  return () => {
    return new Promise((resolve: any) => {
      authService.getUserByToken().subscribe().add(resolve);
      const navigatorLanguage = navigator.language.length > 2 ? navigator.language.replace('-', '') : 'trTR';
      const defaultLang = environment?.defaultLanguage ?? navigatorLanguage;
      translate.use(defaultLang);
      translate.setDefaultLang(defaultLang);
    });
  };
}

export function initLocale(userService: UserInfoService) {
  const user = userService.CurrentUser;

  const varsayilan = navigator.language.includes('tr') ? 'tr-TR' : 'en-US';

  return user ? user.language.slice(0, 2) + '-' + user.language.slice(2) : varsayilan;
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // #mock-start#
    environment.isMockEnabled
      ? HttpClientInMemoryWebApiModule.forRoot(MockAPIService, {
        passThruUnknownUrl: true,
        dataEncapsulation: false,
      })
      : [],
    // #mock-end#

    // Libs of your application
    CoreServiceModule.forRoot(ApiConfiguration),
    CoreUIModule,
    LibCommonModule,
    SharedModule,

    AppRoutingModule, // must be imported as the last module as it contains the fallback route
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: LOCALE_ID, useFactory: initLocale, deps: [UserInfoService] },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService, LanguageService, TranslateService],
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: function initializeRoutes(appService: AppService) {
        return () => appService.ngOnAppInit();
      },
      deps: [AppService],
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }

