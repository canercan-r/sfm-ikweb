import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationCancel, NavigationEnd, Router } from '@angular/router';
import { MenuComponent } from '@ikweb-scripts/components';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subscription } from 'rxjs';
import { LayoutInitService } from './core/layout-init.service';
import { LayoutService } from './core/layout.service';

@Component({
  selector: 'ikweb-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, AfterViewInit {
  selfLayout = 'default';
  asideSelfDisplay: true;
  asideMenuStatic: true;
  contentClasses = '';
  contentContainerClasses = '';
  toolbarDisplay = true;
  toolbarBg = true;
  contentExtended: false;
  asideCSSClasses: string;
  asideHTMLAttributes: any = {};
  headerMobileClasses = '';
  headerMobileAttributes = {};
  footerDisplay: boolean;
  footerCSSClasses: string;
  headerCSSClasses: string;
  headerHTMLAttributes: any = {};
  extrasSearchOffcanvasDisplay = false;
  extrasNotificationsOffcanvasDisplay = false;
  extrasQuickActionsOffcanvasDisplay = false;
  extrasCartOffcanvasDisplay = false;
  extrasUserOffcanvasDisplay = false;
  extrasQuickPanelDisplay = false;
  extrasScrollTopDisplay = false;
  asideDisplay: boolean;

  @ViewChild('stAside', { static: true }) stAside: ElementRef;
  @ViewChild('stSidebar', { static: true }) stSidebar: ElementRef;
  @ViewChild('stHeaderMobile', { static: true }) stHeaderMobile: ElementRef;
  @ViewChild('stHeader', { static: true }) stHeader: ElementRef;

  private unsubscribe: Subscription[] = [];

  isHome: boolean = true;

  constructor(
    private _device: DeviceDetectorService,
    private initService: LayoutInitService,
    private layout: LayoutService,
    private router: Router
  ) {
    this.initService.init();
  }

  ngOnInit(): void {
    this.asideDisplay = this.layout.getProp('aside.display') as boolean;
    this.toolbarDisplay = this.layout.getProp('toolbar.display') as boolean;
    this.footerDisplay = this.layout.getProp('footer.display') as boolean;
    this.contentContainerClasses = this.layout.getStringCSSClasses('contentContainer');
    this.asideCSSClasses = this.layout.getStringCSSClasses('aside');
    this.headerCSSClasses = this.layout.getStringCSSClasses('header');
    this.headerHTMLAttributes = this.layout.getHTMLAttributes('headerMenu');
    this.toolbarBg = this.layout.getProp('toolbar.toolbarBg') as boolean;
  }

  ngAfterViewInit(): void {
    if (this.stHeader) {
      for (const key in this.headerHTMLAttributes) {
        if (this.headerHTMLAttributes.hasOwnProperty(key)) {
          this.stHeader.nativeElement.attributes[key] = this.headerHTMLAttributes[key];
        }
      }
    }
  }

  routingChanges() {
    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        this.menuReinitialization();
        this.isHome = ['/home', '/'].includes(event.url);
      }
    });
    this.unsubscribe.push(routerSubscription);
  }

  menuReinitialization() {
    setTimeout(() => {
      MenuComponent.reinitialization();
    }, 50);
  }

  get device(): string {
    return this._device.deviceType;
  }
}
