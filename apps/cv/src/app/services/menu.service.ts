import { Injectable } from '@angular/core';
import { MenuData } from '@cv-models/data/menu.data';
import { IMenu, IMenuData } from '@cv-models/shared';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menu: IMenuData;

  constructor(app: MenuData) {
    this.menu = app.menu;
  }

  getHeaderMenu(): Observable<IMenu[]> {
    return of(this.menu.headerMenu.sort((a: any, b: any) => a.id - b.id));
  }

  getAsideMenu(): Observable<IMenu[]> {
    return of(this.menu.asideMenu.sort((a: any, b: any) => a.id - b.id));
  }
}
