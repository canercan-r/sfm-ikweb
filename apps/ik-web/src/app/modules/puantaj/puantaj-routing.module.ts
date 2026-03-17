import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AylikPuantajComponent } from './proje-puantajlari/aylik-puantaj/aylik-puantaj.component';
import { EksikKayitlarComponent } from './proje-puantajlari/aylik-puantaj/eksik-kayitlar/eksik-kayitlar.component';
import { ParmakIziRaporuComponent } from './proje-puantajlari/aylik-puantaj/parmak-izi-raporu/parmak-izi-raporu.component';
import { YillikIzinRaporuComponent } from './proje-puantajlari/aylik-puantaj/yillik-izin-raporu/yillik-izin-raporu.component';
import { GunlukPuantajComponent } from './proje-puantajlari/gunluk-puantaj/gunluk-puantaj.component';
import { ProjePuantajlariComponent } from './proje-puantajlari/proje-puantajlari.component';

const routes: Routes = [
  {
    path: 'proje-puantajlari',
    component: ProjePuantajlariComponent,
    data: { title: 'Puantaj.ProjePuantajlari.Title' }
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
