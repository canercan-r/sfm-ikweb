import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GunlukCalismaSaatiTakibiComponent } from './parmak-izi/gunluk-calisma-saati-takibi/gunluk-calisma-saati-takibi.component';
import { IseBaslayanlarRaporuComponent } from './parmak-izi/ise-baslayanlar-raporu/ise-baslayanlar-raporu.component';
import { PiCihazlariComponent } from './parmak-izi/pi-cihazlari/pi-cihazlari.component';
import { PiCihazlariDetayComponent } from './parmak-izi/pi-cihazlari/pi-cihazlari-detay/pi-cihazlari-detay.component';
import { AylikPuantajComponent } from './proje-puantajlari/aylik-puantaj/aylik-puantaj.component';
import { EksikKayitlarComponent } from './proje-puantajlari/aylik-puantaj/eksik-kayitlar/eksik-kayitlar.component';
import { ParmakIziRaporuComponent } from './proje-puantajlari/aylik-puantaj/parmak-izi-raporu/parmak-izi-raporu.component';
import { YillikIzinRaporuComponent } from './proje-puantajlari/aylik-puantaj/yillik-izin-raporu/yillik-izin-raporu.component';
import { GunlukPuantajComponent } from './proje-puantajlari/gunluk-puantaj/gunluk-puantaj.component';
import { ProjePuantajlariComponent } from './proje-puantajlari/proje-puantajlari.component';

const routes: Routes = [
  {
    path: 'parmak-izi/gunluk-calisma-saati-takibi',
    component: GunlukCalismaSaatiTakibiComponent,
    data: { title: 'Puantaj.ProjePuantajlari.ParmakIzi.GunlukCalismaSaatiTakibi.Title' }
  },
  {
    path: 'parmak-izi/ise-baslayanlar-raporu',
    component: IseBaslayanlarRaporuComponent,
    data: { title: 'Puantaj.ProjePuantajlari.ParmakIzi.IseBaslayanlarRaporu.Title' }
  },
  {
    path: 'parmak-izi/pi-cihazlari',
    component: PiCihazlariComponent,
    data: { title: 'Puantaj.ProjePuantajlari.ParmakIzi.PiCihazlari.Title' }
  },
  {
    path: 'parmak-izi/pi-cihazlari/yeni-kayit',
    component: PiCihazlariDetayComponent,
    data: { title: 'Puantaj.ProjePuantajlari.ParmakIzi.PiCihazlari.YeniKayit' }
  },
  {
    path: 'parmak-izi/pi-cihazlari/:id',
    component: PiCihazlariDetayComponent,
    data: { title: 'Puantaj.ProjePuantajlari.ParmakIzi.PiCihazlari.Duzenle' }
  },
  {
    path: 'proje-puantajlari',
    component: ProjePuantajlariComponent,
    data: { title: 'Puantaj.ProjePuantajlari.Title' }
  },
  {
    path: 'proje-puantajlari/gunluk',
    component: ProjePuantajlariComponent,
    data: { mod: 'gunluk', title: 'Puantaj.ProjePuantajlari.Title' }
  },
  {
    path: 'proje-puantajlari/aylik',
    component: ProjePuantajlariComponent,
    data: { mod: 'aylik', title: 'Puantaj.ProjePuantajlari.Title' }
  },
  {
    path: 'gunluk-puantaj/:puantajID',
    component: GunlukPuantajComponent
  },
  { path: 'aylik-puantaj/:puantajID', component: AylikPuantajComponent },
  {
    path: 'eksik-kayitlar',
    component: EksikKayitlarComponent,
    data: { title: 'Puantaj.ProjePuantajlari.AylikPuantaj.EksikKayitlar' }
  },
  {
    path: 'parmak-izi-raporu',
    component: ParmakIziRaporuComponent,
    data: { title: 'Puantaj.ProjePuantajlari.AylikPuantaj.ProjeParmakIziRaporu' }
  },
  {
    path: 'yillik-izin-raporu',
    component: YillikIzinRaporuComponent,
    data: { title: 'Puantaj.ProjePuantajlari.AylikPuantaj.YillikIzinDurumu.YillikIzinDurumu' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PuantajRoutingModule { }
