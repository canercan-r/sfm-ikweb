import { ChangeDetectorRef, Component, EnvironmentInjector, OnDestroy, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, Router } from '@angular/router';
import { environment } from '@ikweb-env/environment';
import { MenuComponent } from '@ikweb-scripts/components';
import { AuthAPIService } from '@ikweb-services/apis/auth-api.service';
import { AuthBGEnabledBrands } from '@ikweb-shared/models';
import { SharedHelperService } from '@ikweb-shared/services/helper/shared-helper.service';
import { ELogoTurleri, getLogoSafe, LanguageService } from '@lib-common';
import { ConfigurationService } from '@lib-core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ikweb-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLogoSvgOrNot: boolean | null = environment.isLogoSvgOrNot;
  logoTypeEnum = ELogoTurleri;

  isLogin: boolean = true;

  tesisLogo: string;
  hasAuthBg = false;
  authBG = '';

  private unsubscribe: Subscription[] = [];

  constructor(
    private _router: Router,
    private readonly _lang: LanguageService,
    readonly _sharedHelper: SharedHelperService,
    private _environmentInjector: EnvironmentInjector,
    private _auth: AuthAPIService,
    private _cdr: ChangeDetectorRef,
    private _conf: ConfigurationService,
  ) {
    this.routingChanges();
  }

  ngOnInit(): void {
    document.body.classList.add('bg-body');
    this.menuReinitialization();
    this.setAuthBackground();
  }

  ngOnDestroy() {
    document.body.classList.remove('bg-body');
  }

  setLanguage(language: string) {
    this._lang.language = language;
  }

  get currentLanguage(): string {
    return this._lang.language;
  }

  get languages(): string[] {
    return this._lang.supportedLanguages;
  }

  getLogo(logoType: ELogoTurleri): string {
    return getLogoSafe(this._environmentInjector, logoType, this.isLogoSvgOrNot, () => {
      this._cdr.detectChanges();
    });
  }

  routingChanges() {
    const routerSubscription = this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd || event instanceof NavigationCancel) {

        MenuComponent.reinitialization();

        const url = event instanceof NavigationEnd ? (event.urlAfterRedirects ?? event.url) : event.url;

        this.isLogin = url.startsWith('/auth/login') || url === '/';
      }
    });
    this.unsubscribe.push(routerSubscription);
  }

  private async setAuthBackground() {
    const brandPath = `assets/branding/${this._conf.getAppSettings().BrandName}/misc/auth-bg.jpg`;

    this.hasAuthBg = await this.checkImageExists(brandPath);
    if (AuthBGEnabledBrands.includes(this._conf.getAppSettings().BrandName)) {
      this.authBG = this.hasAuthBg ? brandPath : undefined;
    }


    this._cdr.detectChanges();
  }

  private checkImageExists(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }

  login() {
    this._router.navigate(['auth/login'])
  }

  menuReinitialization() {
    setTimeout(() => {
      MenuComponent.reinitialization();
    }, 150);
  }
}
