import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeEn from '@angular/common/locales/en';
import localeTr from '@angular/common/locales/tr';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '@cv-env/environment';
import { ApiConfiguration } from '@cv-shared/utils/api-config';
import { LanguageService, LibCommonModule } from '@lib-common';
import { CoreServiceModule, CoreUIModule, UserInfoService } from '@lib-core';
import { AuthService, MockAPIService } from '@mock-api';
import { TranslateService } from '@ngx-translate/core';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

registerLocaleData(localeEn);
registerLocaleData(localeTr, 'trTR');
registerLocaleData(localeTr, 'tr');

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

    AppRoutingModule, // must be imported as the last module as it contains the fallback route
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService, LanguageService, TranslateService],
    },
    { provide: LOCALE_ID, useFactory: initLocale, deps: [UserInfoService] },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
