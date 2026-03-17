import {
  Component,
  ElementRef,
  EnvironmentInjector,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { NavigationCancel, NavigationEnd, Router } from '@angular/router';
import { environment } from '@cv-env/environment';
import { LayoutService } from '@cv-layout/core/layout.service';
import { IMenu } from '@cv-models/shared';
import {
  DrawerComponent, MenuComponent, ScrollComponent,
  ToggleComponent
} from '@cv-scripts/components';
import { MenuService } from '@cv-services/menu.service';
import { ELogoTurleri, pngForLogo, svgForLogo } from '@lib-common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cv-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit, OnDestroy {
  asideTheme: string = '';
  asideMinimize: boolean = false;
  asideLogo: boolean = false;
  asideMenuCSSClasses: string = '';

  isLogoSvgOrNot: boolean | null = environment.isLogoSvgOrNot;
  logoTypeEnum = ELogoTurleri;

  asideMenu: IMenu[];
  asideIcon: 'svg' | 'font';
  asideFavorite: boolean;

  @ViewChild('stAsideScroll', { static: true }) stAsideScroll: ElementRef;
  private unsubscribe: Subscription[] = [];

  constructor(
    private layout: LayoutService,
    private router: Router,
    private _menu: MenuService,
    private _environmentInjector: EnvironmentInjector,
  ) { }

  ngOnInit(): void {
    this.asideTheme = this.layout.getProp('aside.theme') as string;
    this.asideMinimize = this.layout.getProp('aside.minimize') as boolean;
    this.asideLogo = this.layout.getProp('aside.logo') as boolean;
    this.asideMenuCSSClasses = this.layout.getStringCSSClasses('asideMenu');
    this.asideIcon = this.layout.getProp('aside.menuIcon') as 'svg' | 'font';
    this.asideFavorite = this.layout.getProp('aside.menuFavorite') as boolean;
    this.routingChanges();
    this.getAsideMenu();
  }

  getAsideMenu() {
    this._menu.getAsideMenu().subscribe((menu) => (this.asideMenu = menu));
  }

  routingChanges() {
    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        this.menuReinitialization();
      }
    });
    this.unsubscribe.push(routerSubscription);
  }

  menuReinitialization() {
    setTimeout(() => {
      MenuComponent.reinitialization();
      DrawerComponent.reinitialization();
      ToggleComponent.reinitialization();
      ScrollComponent.reinitialization();
      if (this.stAsideScroll && this.stAsideScroll.nativeElement) {
        this.stAsideScroll.nativeElement.scrollTop = 0;
      }
    }, 50);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  getLogo(logoType: ELogoTurleri) {
    return this.isLogoSvgOrNot
      ? svgForLogo(this._environmentInjector, logoType)
      : pngForLogo(this._environmentInjector, logoType);
  }
}
