import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GonderiKaydiComponent } from './siparisler/gonderi-kaydi/gonderi-kaydi.component';
import { UygunsuzlukFormuComponent } from './siparisler/uygunsuzluk-formu/uygunsuzluk-formu.component';
import { SiparislerComponent } from './siparisler/siparisler.component';
import { TaleplerComponent } from './talepler/talepler.component';
import { TedarikTaleplerFormComponent } from './talepler/tedarik-talepleri-detay/tedarik-talepler-form/tedarik-talepler-form.component';
import { TedarikTalepleriDetayComponent } from './talepler/tedarik-talepleri-detay/tedarik-talepleri-detay.component';

const routes: Routes = [
  {
    path: 'siparisler',
    component: SiparislerComponent,
    data: { title: 'Talepler.Siparisler.Title' }
  },
  {
    path: 'siparisler/uygunsuzluk-formu/:type',
    component: UygunsuzlukFormuComponent,
  },
  {
    path: 'gonderi-kaydi',
    component: GonderiKaydiComponent,
    data: { title: 'Talepler.GonderiKaydi.Title' }
  },
  {
    path: 'tedarik-talepleri',
    component: TaleplerComponent,
    data: { title: 'Talepler.Title' }
  },
  {
    path: 'tedarik-talepleri/talep-form',
    component: TedarikTaleplerFormComponent,
  },
  {
    path: 'tedarik-talepleri/:tedarikTalepID',
    component: TedarikTalepleriDetayComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TedarikRoutingModule { }
