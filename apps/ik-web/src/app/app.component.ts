import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from '@ikweb-env/environment';
import { BrandingService, LanguageService, LoadingService, ThemeType, ThemingService } from '@lib-common';
import { ConfigurationService, Logger } from '@lib-core';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { filter, fromEvent, map, merge, Subscription, switchMap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  private themingSubscription?: Subscription;

  title = 'ikweb';
  isLoading = false;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private readonly _title: Title,
    private readonly _translate: TranslateService,
    private readonly _lang: LanguageService,
    private readonly _loading: LoadingService,
    private readonly _theming: ThemingService,
    private cdr: ChangeDetectorRef,
    private _branding: BrandingService,
    private _modalService: NgbModal,
    private _offcanvasService: NgbOffcanvas,
    private _conf: ConfigurationService,
    @Inject(DOCUMENT) private _document: Document,
  ) { }

  ngOnInit() {
    if (environment.production) {
      Logger.enableProductionMode();
    }

    this._branding.applyBranding();

    this._loading.isLoading$.subscribe((loading) => {
      this.isLoading = loading;
      document.body.setAttribute('data-st-page-loading', loading ? 'true' : 'false');
      this.cdr.detectChanges();
    });

    this.initializeThemeFromEnvironment();

    this.themingSubscription = this._theming.theme$.subscribe((theme: ThemeType) => {
      this.applyTheme(theme);
    });
    this._lang.init(environment.defaultLanguage, environment.supportedLanguages);

    const onNavigationEnd = this._router.events.pipe(filter((event) => event instanceof NavigationEnd));
    merge(this._translate.onLangChange, onNavigationEnd)
      .pipe(
        map(() => {
          let route = this._route;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        switchMap((route) => route.data),
        untilDestroyed(this)
      )
      .subscribe((event) => {
        const title = event['title'];
        if (title) {
          this._title.setTitle(this._translate.instant(title) + ' | ' + this._conf.getAppSettings().AppName);
        }
      });

    fromEvent(window, 'popstate').subscribe((e) => {
      if (this._modalService.hasOpenModals()) {
        this._modalService.dismissAll();
      }

      if (this._offcanvasService.hasOpenOffcanvas()) {
        this._offcanvasService.dismiss();
      }
    });
  }

  private initializeThemeFromEnvironment() {
    const envTheme = (environment.theme || 'DEFAULT').toUpperCase();

    if (envTheme === 'LIGHT') {
      this._theming.setTheme('light');
    } else if (envTheme === 'DARK') {
      this._theming.setTheme('dark');
    } else if (envTheme === 'DEFAULT') {
      this._theming.setTheme('light');
    }
  }

  private async applyTheme(theme: ThemeType) {
    this._document.body.setAttribute('data-st-theme', theme);
  }

  ngOnDestroy() {
    this._lang.destroy();
  }
}
