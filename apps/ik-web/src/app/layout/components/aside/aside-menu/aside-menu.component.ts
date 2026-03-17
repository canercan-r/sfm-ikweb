import { Component, Input, OnInit } from '@angular/core';
import { IMenu } from '@ikweb-shared/models';
import { ApiConfiguration } from '@ikweb-shared/utils/api-config';

@Component({
  selector: 'ikweb-aside-menu',
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

  toggleStar(ev: Event, item: IMenu) {
    ev.stopPropagation();
    item.starred = !item.starred;
  }

  ngOnInit(): void { }
}
