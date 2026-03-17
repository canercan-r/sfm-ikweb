import { Component, Input, OnInit } from '@angular/core';
import { IMenu } from '@cv-models/shared';
import { ApiConfiguration } from '@cv-shared/utils/api-config';

@Component({
  selector: 'cv-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss'],
})
export class AsideMenuComponent implements OnInit {
  appAngularVersion: string = ApiConfiguration.ThemeVersion;
  appPreviewChangelogUrl: string = 'environment.appPreviewChangelogUrl';

  @Input() menu: IMenu[];
  @Input() icon: 'svg' | 'font';
  @Input() favorite: boolean;

  constructor() { }

  toggleStar(ev, item: IMenu) {
    ev.stopPropagation();
    item.starred = !item.starred;
  }

  ngOnInit(): void { }
}
