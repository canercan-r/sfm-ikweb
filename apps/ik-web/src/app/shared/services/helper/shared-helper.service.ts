import { formatDate } from '@angular/common';
import { ElementRef, Injectable } from '@angular/core';
import { LayoutService } from '@ikweb-layout/core/layout.service';
import { MenuComponent, ScrollComponent, StickyComponent } from '@ikweb-scripts/components';
import { ICountry } from '@ikweb-shared/models';
import {
  AbsoluteScrollStrategy,
  AutoPositionStrategy,
  ConnectedPositioningStrategy,
  HorizontalAlignment,
  NoOpScrollStrategy,
  VerticalAlignment,
} from '@infragistics/igniteui-angular';
import { CINSIYET_TURLERI } from '@lib-common';
import { IUser } from '@lib-core';
import { TranslateService } from '@ngx-translate/core';
import { DeviceDetectorService, DeviceType, OrientationType } from 'ngx-device-detector';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedHelperService {
  contentSpacing: string;
  contentSpacingFull: string;
  headerHeight: string;
  toolbarHeight: string;
  headerAndToolbarHeight: string;

  user$ = new BehaviorSubject<IUser>(null);

  countries: ICountry[];

  DeviceType = DeviceType;

  overlaySettingsRightBottom = {
    positionStrategy: new ConnectedPositioningStrategy({
      horizontalDirection: HorizontalAlignment.Right,
      horizontalStartPoint: HorizontalAlignment.Right,
      verticalStartPoint: VerticalAlignment.Bottom,
    }),
    scrollStrategy: new NoOpScrollStrategy(),
  };

  overlaySettingsLeftBottom = {
    positionStrategy: new ConnectedPositioningStrategy({
      horizontalDirection: HorizontalAlignment.Left,
      horizontalStartPoint: HorizontalAlignment.Right,
      verticalStartPoint: VerticalAlignment.Bottom,
    }),
    scrollStrategy: new NoOpScrollStrategy(),
  };

  overlaySettingsLeftLeftBottom = {
    positionStrategy: new ConnectedPositioningStrategy({
      horizontalDirection: HorizontalAlignment.Left,
      horizontalStartPoint: HorizontalAlignment.Left,
      verticalStartPoint: VerticalAlignment.Bottom,
    }),
    scrollStrategy: new NoOpScrollStrategy(),
  };

  positionStrategyAuto = new AutoPositionStrategy({
    verticalDirection: VerticalAlignment.Bottom,
    closeAnimation: undefined
  });

  overlaySettingsAuto = {
    positionStrategy: this.positionStrategyAuto,
    scrollStrategy: new AbsoluteScrollStrategy(),
    modal: false,
    closeOnEscape: false
  };

  constructor(
    private _device: DeviceDetectorService,
    private _layout: LayoutService,
    private readonly _translate: TranslateService,

  ) {
    this.contentSpacing =
      [DeviceType.Mobile, DeviceType.Tablet].includes(this.device as DeviceType) &&
        this.orientation === OrientationType.Portrait
        ? '14px'
        : '50px';

    this.contentSpacingFull =
      [DeviceType.Mobile, DeviceType.Tablet].includes(this.device as DeviceType) &&
        this.orientation === OrientationType.Portrait
        ? '14px'
        : '-2';

    const headerHeightDesktop = this._layout.getProp('header.height.desktop') as string;

    const headerHeightTabletAndMobile = this._layout.getProp(
      'header.height.tabletAndMobile'
    ) as string;

    this.headerHeight =
      [DeviceType.Mobile, DeviceType.Tablet].includes(this.device as DeviceType) &&
        this.orientation === OrientationType.Portrait
        ? headerHeightTabletAndMobile
        : headerHeightDesktop;

    const toolbarHeightDesktop = this._layout.getProp('toolbar.layouts.toolbar1.height') as string;
    const toolbarHeightTabletAndMobile = this._layout.getProp(
      'toolbar.layouts.toolbar1.heightAndTabletMobileMode'
    ) as string;

    this.toolbarHeight =
      [DeviceType.Mobile, DeviceType.Tablet].includes(this.device as DeviceType) &&
        this.orientation === OrientationType.Portrait
        ? toolbarHeightTabletAndMobile
        : toolbarHeightDesktop;

    this.headerAndToolbarHeight = this.headerHeight + this.toolbarHeight + 'px';
  }

  get _deviceDetector(): any {
    return this._device;
  }

  get device(): string {
    return this._device.deviceType;
  }

  get orientation(): string {
    return this._device.orientation;
  }

  get width() {
    return window.innerWidth;
  }

  animateCSS(element: ElementRef, animationName: string, keepAnimated = false) {
    const node = element?.nativeElement;
    node?.classList.add('animated', animationName);

    function handleAnimationEnd() {
      if (!keepAnimated) {
        node?.classList.remove('animated', animationName);
      }
    }
    node?.addEventListener('animationend', handleAnimationEnd, { once: true });
    node?.classList.remove('ion-hide');
  }

  initScrollComponent() {
    setTimeout(() => {
      ScrollComponent.bootstrap();
    }, 200);
  }

  updateAllScrollComponent() {
    setTimeout(() => {
      ScrollComponent.updateAll();
    }, 200);
  }

  initMenuComponent() {
    setTimeout(() => {
      MenuComponent.reinitialization();
    }, 200);
  }

  initStickyComponent() {
    setTimeout(() => {
      StickyComponent.bootstrap();
    }, 200);
  }

  getCountryFlags(code: string) {
    const codeLowerCase = code?.toLowerCase()
    if (code) {
      if (codeLowerCase === 'an' || codeLowerCase === 'ac') {
        return `assets/flags/base.png`;
      } else {
        return `assets/flags/${codeLowerCase}.png`;
      }
    }
    else {
      return `assets/flags/base.png`;
    }
  }

  get cinsiyetListesi() {
    return Object.keys(CINSIYET_TURLERI)
      .filter(key => Number.isNaN(Number(key)))
      .map(key => ({
        CinsiyetID: CINSIYET_TURLERI[key as keyof typeof CINSIYET_TURLERI],
        Cinsiyet: this._translate.instant(`Global.Cinsiyet.${key}`)
      }));
  }

  formatDate(value: any): string {
    if (!value) return '';

    return formatDate(value, 'dd.MM.yyyy', 'tr-TR');
  }
}
