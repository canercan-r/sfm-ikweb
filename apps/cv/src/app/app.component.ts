import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from '@cv-env/environment';
import { SharedService } from '@cv-services/shared.service';
import { LanguageService, LoadingService, ThemeType, ThemingService } from '@lib-common';
import { Logger, UserInfoService } from '@lib-core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, filter, map, merge, switchMap } from 'rxjs';

const log = new Logger('App');

@UntilDestroy()
@Component({
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'var';
  public isLoading = false;

  currentDateStr: string = new Date().getFullYear().toString();

  private themingSubscription?: Subscription;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _title: Title,
    private _translate: TranslateService,
    private _language: LanguageService,
    private readonly _loading: LoadingService,
    private readonly _userInfo: UserInfoService,
    private readonly cdr: ChangeDetectorRef,
    private zone: NgZone,
    public sharedService: SharedService,
    private readonly _theming: ThemingService,
    @Inject(DOCUMENT) private _document: Document,
  ) {

  }

  ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }
    const source = this._activatedRoute.snapshot.params['source'] ?? null;

    log.debug('init');

    this.initializeThemeFromEnvironment();

    this.themingSubscription = this._theming.theme$.subscribe((theme: ThemeType) => {
      this.applyTheme(theme);
    });

    // Setup translations
    this._language.init(environment.defaultLanguage, environment.supportedLanguages);

    const onNavigationEnd = this._router.events.pipe(filter((event) => event instanceof NavigationEnd));

    // Change page title on navigation or language change, based on route data
    merge(this._translate.onLangChange, onNavigationEnd)
      .pipe(
        map(() => {
          let route = this._activatedRoute;
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
          this._title.setTitle(this._translate.instant(title));
        }
      });

  }

  ngAfterViewInit(): void {
    this._loading.isLoading$
      .pipe(untilDestroyed(this))
      .subscribe((loading) => {
        Promise.resolve().then(() => {
          this.isLoading = loading;
          document.body.setAttribute(
            'data-st-page-loading',
            loading ? 'true' : 'false'
          );
          this.cdr.markForCheck();
        });
      });
  }
  ngOnDestroy() {
    this._language.destroy();
  }

  private initializeThemeFromEnvironment() {
    const envTheme = (environment.theme || 'DEFAULT').toUpperCase();

    if (envTheme === 'LIGHT') {
      this._theming.setTheme('light');
    } else if (envTheme === 'DARK') {
      this._theming.setTheme('dark');
    } else if (envTheme === 'DEFAULT') {
      // DEFAULT → sistem tercihine göre ayarla
      const darkModeOn = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this._theming.setTheme(darkModeOn ? 'dark' : 'light');

      // Sistem değişikliğini dinle
      window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (event) => {
          if ((environment.theme || 'DEFAULT').toUpperCase() === 'DEFAULT') {
            this._theming.setTheme(event.matches ? 'dark' : 'light');
          }
        });
    }
  }

  private async applyTheme(theme: ThemeType) {
    // body attribute ayarla
    this._document.body.setAttribute('data-st-theme', theme);
  }



}
