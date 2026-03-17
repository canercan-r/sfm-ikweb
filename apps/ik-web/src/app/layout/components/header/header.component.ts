import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EnvironmentInjector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationCancel, NavigationEnd, Router } from '@angular/router';
import { environment } from '@ikweb-env/environment';
import { LayoutService } from '@ikweb-layout/core/layout.service';
import { MenuComponent } from '@ikweb-scripts/components';
import { MenuService } from '@ikweb-services/menu.service';
import { IMenu } from '@ikweb-shared/models';
import { ELogoTurleri, getLogoSafe } from '@lib-common';
import { UserInfoService } from '@lib-core';
import { DeviceDetectorService, DeviceType } from 'ngx-device-detector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ikweb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  headerContainerCssClasses: string = '';
  asideDisplay: boolean = true;
  headerLeft: string = 'menu';
  pageTitleCssClasses: string = '';
  pageTitleAttributes: {
    [attrName: string]: string | boolean;
  };
  isLogoSvgOrNot: boolean | null = environment.isLogoSvgOrNot;
  logoTypeEnum = ELogoTurleri;

  headerMenu: IMenu[];
  headerIcon: 'svg' | 'font';
  headerFavorite: boolean;

  @ViewChild('stPageTitle', { static: true }) stPageTitle: ElementRef;
  private unsubscribe: Subscription[] = [];

  isHome: boolean = true;
  departman: string = '';

  DeviceType = DeviceType;

  constructor(
    private layout: LayoutService,
    private router: Router,
    private _device: DeviceDetectorService,
    private _menu: MenuService,
    private _cdr: ChangeDetectorRef,
    private _environmentInjector: EnvironmentInjector,
    private readonly _userInfo: UserInfoService
  ) {
    this.routingChanges();
  }

  ngOnInit(): void {
    this.departman = this._userInfo.CurrentUser.departman;
    this.headerContainerCssClasses = this.layout.getStringCSSClasses('headerContainer');
    this.asideDisplay = this.layout.getProp('aside.display') as boolean;
    this.headerIcon = this.layout.getProp('header.menuIcon') as 'svg' | 'font';
    this.headerFavorite = this.layout.getProp('header.menuFavorite') as boolean;
    this.headerLeft = this.layout.getProp('header.left') as string;
    this.pageTitleCssClasses = this.layout.getStringCSSClasses('pageTitle');
    this.pageTitleAttributes = this.layout.getHTMLAttributes('pageTitle');
    this.getHeaderMenu();
  }

  getHeaderMenu() {
    this._menu.getHeaderMenu().subscribe((menu) => (this.headerMenu = menu));
  }

  ngAfterViewInit() {
    if (this.stPageTitle) {
      for (const key in this.pageTitleAttributes) {
        if (this.pageTitleAttributes.hasOwnProperty(key)) {
          this.stPageTitle.nativeElement.attributes[key] = this.pageTitleAttributes[key];
        }
      }
    }
  }

  routingChanges() {
    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        MenuComponent.reinitialization();
        this.isHome = ['/home', '/'].includes(event.url);
      }
    });
    this.unsubscribe.push(routerSubscription);
  }

  ngOnDestroy() { }

  get device(): string {
    return this._device.deviceType;
  }

  get orientation(): string {
    return this._device.orientation;
  }

  getLogo(logoType: ELogoTurleri): string {
    return getLogoSafe(this._environmentInjector, logoType, this.isLogoSvgOrNot, () => {
      this._cdr.detectChanges();
    });
  }
}
