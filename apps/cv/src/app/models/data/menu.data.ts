import { Injectable } from '@angular/core';
import { IMenuData } from '@cv-models/shared';

@Injectable({ providedIn: 'root' })
export class MenuData {
  menu: IMenuData = {
    headerMenu: [
      {
        id: 2,
        title: 'Musteriler.Title',
        icon: 'fa-solid fa-users',
        link: 'musteriler',
      },
      {
        id: 3,
        title: 'Rezervasyon.Title',
        icon: 'fa-solid fa-calendar',
        link: 'rezervasyon',
        submenu: [
          {
            id: 9,
            title: 'Rezervasyon.RezervasyonList.Title',
            link: 'rezervasyon/rezervasyon-listesi',
            starred: true,
          },
          {
            id: 58,
            title: 'Rezervasyon.FixPlanlar.Title',
            link: 'rezervasyon/fix-planlar',
            starred: true,
          },
          {
            id: 10,
            title: 'Rezervasyon.HizliServisArama.Title',
            link: 'rezervasyon/hizli-servis-arama',
          },
          {
            id: 11,
            title: 'Rezervasyon.Raporlar.Title',
            link: 'rezervasyon/raporlar',
            indention: true,
            submenu: [
              {
                id: 12,
                title: 'Rezervasyon.Raporlar.ServisPrimleri.Title',
                link: 'rezervasyon/raporlar/servis-primleri',
              },
              {
                id: 13,
                title: 'Rezervasyon.Raporlar.RezervasyonListesi.Title',
                link: 'rezervasyon/raporlar/rezervasyon-listesi',
              },
              {
                id: 75,
                title: 'Rezervasyon.Raporlar.ServislerinZamanaGoreDagilimRaporu.Title',
                link: 'rezervasyon/raporlar/servislerin-zamana-gore-dagilim-raporu',
                starred: true,
              },
              {
                id: 76,
                title: 'Rezervasyon.Raporlar.MekanDoluluklari.Title',
                link: 'rezervasyon/raporlar/mekan-doluluklari',
                starred: true,
              },
            ],
          },
        ],
      },
      {
        id: 4,
        title: 'Satis.Title',
        icon: 'fa-solid fa-credit-card',
        link: 'satis',
        submenu: [
          {
            id: 14,
            title: 'Satis.YeniSatis.Title',
            link: 'satis/yeni-satis',
          },
        ],
      },
    ],
    asideMenu: [
      {
        id: 2,
        title: 'Musteriler.Title',
        icon: 'fa-solid fa-users',
        link: 'musteriler',
      },
      {
        id: 3,
        title: 'Rezervasyon.RezervasyonList.Title',
        icon: 'fa-solid fa-calendar',
        link: 'rezervasyon/rezervasyon-listesi',
        submenu: [
          {
            id: 9,
            title: 'Rezervasyon.RezervasyonList.Title',
            link: 'rezervasyon/rezervasyon-listesi',
            starred: true,
          },
          {
            id: 58,
            title: 'Rezervasyon.FixPlanlar.Title',
            link: 'rezervasyon/fix-planlar',
            starred: true,
          },
          {
            id: 10,
            title: 'Rezervasyon.HizliServisArama.Title',
            link: 'rezervasyon/hizli-servis-arama',
          },
          {
            id: 11,
            title: 'Rezervasyon.Raporlar.Title',
            link: 'rezervasyon/raporlar',
          },
          {
            id: 12,
            title: 'Rezervasyon.Raporlar.ServisPrimleri.Title',
            link: 'rezervasyon/raporlar/servis-primleri',
          },
          {
            id: 13,
            title: 'Rezervasyon.Raporlar.RezervasyonListesi.Title',
            link: 'rezervasyon/raporlar/rezervasyon-listesi',
          },
          {
            id: 75,
            title: 'Rezervasyon.Raporlar.ServislerinZamanaGoreDagilimRaporu.Title',
            link: 'rezervasyon/raporlar/servislerin-zamana-gore-dagilim-raporu',
            starred: true,
          },
          {
            id: 76,
            title: 'Rezervasyon.Raporlar.MekanDoluluklari.Title',
            link: 'rezervasyon/raporlar/mekan-doluluklari',
            starred: true,
          },
        ],
      },
    ],
  };
}
