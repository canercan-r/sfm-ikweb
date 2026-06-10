import { Injectable } from '@angular/core';
import { IMenuData } from '@ikweb-shared/models';

@Injectable({ providedIn: 'root' })
export class MenuData {
  menu: IMenuData = {
    headerMenu: [
      {
        id: 1,
        order: 1,
        title: 'Home.Title',
        icon: 'fa-solid fa-house',
        link: '/home',
      },
      {
        id: 2,
        order: 2,
        title: 'Puantaj.Title',
        icon: 'fa fa-stopwatch',
        link: 'puantaj',
        submenu: [
          {
            id: 21,
            order: 1,
            title: 'Puantaj.ProjePuantajlari.Title',
            link: '/puantaj/proje-puantajlari',
          },
        ],
      },
      {
        id: 3,
        order: 3,
        title: 'InsanKaynaklari.Title',
        icon: 'fa fa-user-tie',
        link: 'insan-kaynaklari',
        submenu: [
          {
            id: 31,
            order: 1,
            title: 'InsanKaynaklari.Personeller.Title',
            link: '/insan-kaynaklari/personeller',
          },
        ],
      },
      {
        id: 4,
        order: 4,
        title: 'Talepler.Title',
        icon: 'fa fa-clipboard-list',
        link: 'talepler',
        submenu: [
          {
            id: 41,
            order: 1,
            title: 'Talepler.TedarikTalepleri.Title',
            link: '/talepler/tedarik-talepleri',
          },
        ],
      },
    ],
    asideMenu: [],
  };
}
