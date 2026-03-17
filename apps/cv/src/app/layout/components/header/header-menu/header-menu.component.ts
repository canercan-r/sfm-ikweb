import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMenu } from '@cv-models/shared';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'cv-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements OnInit {
  @Input() menu: IMenu[];
  @Input() icon: 'svg' | 'font';
  @Input() favorite: boolean;

  constructor(
    private router: Router,
    private _device: DeviceDetectorService,
  ) { }

  ngOnInit(): void { }

  calculateMenuItemCssClass(url: string): string {
    return checkIsActive(this.router.url, url) ? 'active' : '';
  }

  calculateMenuItemHereClass(url: string): string {
    return checkIsActive(this.router.url, url) ? 'here' : '';
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
}

const getCurrentUrl = (pathname: string): string => {
  return pathname.split(/[?#]/)[0];
};

const checkIsActive = (pathname: string, link: string) => {
  const current = getCurrentUrl(pathname);
  if (!current || !link) {
    return false;
  }

  if (current === link) {
    return true;
  }

  if (current.indexOf(link) > -1) {
    return true;
  }

  return false;
};
