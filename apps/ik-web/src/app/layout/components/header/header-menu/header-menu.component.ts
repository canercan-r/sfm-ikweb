import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IMenu } from '@ikweb-shared/models';
import { PageStackService } from '@lib-common';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'ikweb-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent {
  @Input() menu: IMenu[];
  @Input() icon: 'svg' | 'font';
  @Input() favorite: boolean;

  constructor(public _page: PageStackService, private _router: Router, private _device: DeviceDetectorService) { }

  calculateMenuItemCssClass(menuItem: IMenu): string {
    return this.checkIsActive(menuItem, this._router.url) ? 'active' : '';
  }

  calculateMenuItemHereClass(menuItem: IMenu): string {
    return this.checkIsActive(menuItem, this._router.url) ? 'here' : '';
  }

  toggleStar(ev, item: IMenu) {
    ev.stopPropagation();
    item.starred = !item.starred;
  }

  get device(): string {
    return this._device.deviceType;
  }

  get orientation(): string {
    return this._device.orientation;
  }

  routerLink(link: string) {
    this._page.navigateForward(link);
  }

  isActive(path: string): boolean {
    return this._router.isActive(path, {
      paths: 'exact',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored'
    });
  }


  checkIsActive(menuItem: IMenu, currentPath: string): boolean {
    const current = getCurrentUrl(currentPath);

    if (current === '/' + menuItem.link) {
      return true;
    }

    if (menuItem.submenu && menuItem.submenu.length > 0) {
      return menuItem.submenu.some(sub => this.checkIsActive(sub, currentPath));
    }

    return false;
  }
}

const getCurrentUrl = (pathname: string): string => {
  return pathname.split(/[?#]/)[0];
};
