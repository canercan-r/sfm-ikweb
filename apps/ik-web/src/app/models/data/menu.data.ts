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
            title: 'Puantaj.ProjePuantajlari.ParmakIzi.ParmakIzi',
            link: '',
            submenu: [
              {
                id: 211,
                order: 1,
                title: 'Puantaj.ProjePuantajlari.ParmakIzi.PiCihazlari.Title',
                link: '/puantaj/parmak-izi/pi-cihazlari'
              },
              {
                id: 212,
                order: 2,
                title: 'Puantaj.ProjePuantajlari.ParmakIzi.ProjePuantajParmakIziRaporu',
                link: '/puantaj/parmak-izi-raporu'
              },
              {
                id: 213,
                order: 3,
                title: 'Puantaj.ProjePuantajlari.ParmakIzi.GunlukCalismaSaatiTakibi.Title',
                link: '/puantaj/parmak-izi/gunluk-calisma-saati-takibi'
              },
              {
                id: 214,
                order: 4,
                title: 'Puantaj.ProjePuantajlari.ParmakIzi.IseBaslayanlarRaporu.Title',
                link: '/puantaj/parmak-izi/ise-baslayanlar-raporu'
              }
            ]
          },
          {
            id: 22,
            order: 2,
            title: 'Puantaj.ProjePuantajlari.Vardiya',
            link: '/puantaj/vardiya',
          },
          {
            id: 23,
            order: 3,
            title: 'Puantaj.ProjePuantajlari.GunlukPuantaj.Title',
            link: '/puantaj/proje-puantajlari/gunluk',
          },
          {
            id: 24,
            order: 4,
            title: 'Puantaj.ProjePuantajlari.AylikPuantaj.Title',
            link: '/puantaj/proje-puantajlari/aylik',
          }
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
        title: 'Talepler.Tedarik.Title',
        icon: 'fa fa-clipboard-list',
        link: 'tedarik',
        submenu: [
          {
            id: 41,
            order: 1,
            title: 'Talepler.Siparisler.Title',
            link: '/tedarik/siparisler',
          },
          {
            id: 42,
            order: 2,
            title: 'Talepler.Title',
            link: '/tedarik/tedarik-talepleri',
          },
          {
            id: 43,
            order: 3,
            title: 'Talepler.GonderiKaydi.Title',
            link: '/tedarik/gonderi-kaydi',
          },
          {
            id: 44,
            order: 4,
            title: 'Talepler.GirdiHizmetTakibi.Title',
            link: '/tedarik/girdi-hizmet-takibi',
          },
        ],
      },
    ],
    asideMenu: [],
  };
}
