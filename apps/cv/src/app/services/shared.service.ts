import { Location } from '@angular/common';
import { EnvironmentInjector, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '@cv-env/environment';
import { IKVKK } from '@cv-models/cv';
import { AbsoluteScrollStrategy, AutoPositionStrategy, VerticalAlignment } from '@infragistics/igniteui-angular';
import { ELogoTurleri, LanguageService, pngForLogo, svgForLogo } from '@lib-common';
import { TranslateService } from '@ngx-translate/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BehaviorSubject, catchError, filter, map, of } from 'rxjs';
import { JobAPIService } from './apis/job-api.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  contentSpacing: string

  isLogoSvgOrNot: boolean | null = environment.isLogoSvgOrNot;
  logoTypeEnum = ELogoTurleri;

  positionStrategyAuto = new AutoPositionStrategy({
    verticalDirection: VerticalAlignment.Bottom,
  });

  overlaySettingsAuto = {
    positionStrategy: this.positionStrategyAuto,
    scrollStrategy: new AbsoluteScrollStrategy(),
    modal: false,
    closeOnEscape: false,
  };

  private readonly _logo$ = new BehaviorSubject<string>(null);
  private readonly _title$ = new BehaviorSubject<string>(null);
  private readonly _rigthPanel$ = new BehaviorSubject<string>(null);
  private readonly _kvkkTexts$ = new BehaviorSubject<IKVKK>(null);

  readonly logo$ = this._logo$.asObservable();
  readonly title$ = this._title$.asObservable();
  readonly rigthPanel$ = this._rigthPanel$.asObservable();
  readonly kvkkText$ = this._kvkkTexts$.asObservable().pipe(filter(texts => !!texts), map(texts => {
    return this.langService.language == 'trTR' ? texts.kvkkMetniTR : texts.kvkkMetniEN;
  }));

  constructor(
    private _device: DeviceDetectorService,
    private _api: JobAPIService,
    private location: Location,
    private langService: LanguageService,
    private _title: Title,
    private _environmentInjector: EnvironmentInjector,
    private translate: TranslateService
  ) {
    this.contentSpacing = (this.device === 'mobile' || (this.device === 'tablet' && this.orientation === 'portrait')) ?
      '-48px' : '0px';
    const path = this.location.path();
    const source = path.substring(path.lastIndexOf("/") + 1);
    this.getBrandingDatas(source);
  }

  get device(): string {
    return this._device.deviceType;
  }

  get orientation(): string {
    return this._device.orientation;
  }

  getBrandingDatas(source) {
    this._api.getBrandingDatas({
      sourceCode: source
    }).pipe(
      catchError(err => of(null)),
      // filter(res => !!res)
    ).subscribe(brandDatas => {
      const logoBase64 = brandDatas?.logoBase64 ?? this.getLogo(this.logoTypeEnum.LogoOnDark);
      const title = brandDatas?.baslik ?? 'Splash.Title';

      const rigthPanel = brandDatas?.panelBase64 ?? null;
      let customColor = brandDatas?.renkKodu ?? '#773dbd';

      this._logo$.next(logoBase64);
      this._title$.next(brandDatas.girisMetni);
      this._title.setTitle(this.translate.instant(title));

      this._rigthPanel$.next(rigthPanel);
      this._kvkkTexts$.next(
        {
          ...brandDatas
        }
      );

      const primary = customColor;
      const primary_active = brandDatas.primary_active;
      const primary_light = brandDatas.primary_light;
      const primary_light_dark = brandDatas.primary_light_dark;
      const primary_inverse = brandDatas.primary_inverse;
      const primary_light_active = brandDatas.primary_light_active;

      document.body.style.setProperty('--st-primary-inverse', primary_inverse);
      document.body.style.setProperty('--st-primary', primary);
      document.body.style.setProperty('--st-primary-light-dark', primary_light_dark);
      document.body.style.setProperty('--st-primary-light', primary_light);
      document.body.style.setProperty('--st-primary-active', primary_active);
      document.body.style.setProperty('--st-primary-light-active', primary_light_active);

      document.body.style.setProperty('--st-component-hover-color', primary);
      document.body.style.setProperty('--st-component-hover-bg', primary_light);

      document.body.style.setProperty('--st-component-active-color', primary_inverse);
      document.body.style.setProperty('--st-component-active-bg', primary);

      document.body.style.setProperty('--st-component-focus-color', primary_active);
      document.body.style.setProperty('--st-component-focus-bg', primary_light);


      document.body.style.setProperty('--st-menu-link-color-hover', primary);
      document.body.style.setProperty('--st-menu-link-color-show', primary);
      document.body.style.setProperty('--st-menu-link-color-here', primary);
      document.body.style.setProperty('--st-menu-link-color-active', primary);
      document.body.style.setProperty('--st-menu-link-bg-color-hover', primary_light);
      document.body.style.setProperty('--st-menu-link-bg-color-show', primary_light);
      document.body.style.setProperty('--st-menu-link-bg-color-here', primary_light);
      document.body.style.setProperty('--st-menu-link-bg-color-active', primary_light);

      document.body.style.setProperty('--st-text-primary', primary);
    });
  }

  getLogo(logoType: ELogoTurleri) {
    return this.isLogoSvgOrNot
      ? svgForLogo(this._environmentInjector, logoType)
      : pngForLogo(this._environmentInjector, logoType);
  }

  getRigthPanel() {
    return 'assets/misc/auth-bg.svg';
  }
  shadeColor(color, percent) {

    var R = parseInt(color.substring(1, 3), 16);
    var G = parseInt(color.substring(3, 5), 16);
    var B = parseInt(color.substring(5, 7), 16);

    R = R * (100 + percent) / 100;
    G = G * (100 + percent) / 100;
    B = B * (100 + percent) / 100;

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    R = Math.round(R)
    G = Math.round(G)
    B = Math.round(B)

    var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
    var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
    var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

    return "#" + RR + GG + BB;
  }

  invertHex(hex) {
    return "#" + (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase();
  }
}

