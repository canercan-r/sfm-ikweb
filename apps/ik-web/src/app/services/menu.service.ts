import { Injectable } from '@angular/core';
import { MenuData } from '@ikweb-models/data/menu.data';
import { IMenu, IMenuData } from '@ikweb-shared/models';
import { UserInfoService } from '@lib-core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable, of } from 'rxjs';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menu: IMenuData;

  constructor(app: MenuData, private creds: UserInfoService) {
    this.menu = app.menu;
  }

  getHeaderMenu(): Observable<IMenu[]> {
    return of(this.menu.headerMenu.sort((a: any, b: any) => a.order - b.order));
  }

  getAsideMenu(): Observable<IMenu[]> {
    return of(this.menu.asideMenu.sort((a: any, b: any) => a.order - b.order));
  }
}
