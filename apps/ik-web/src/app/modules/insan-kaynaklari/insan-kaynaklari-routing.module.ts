import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonelDetayComponent } from './personeller/personel-detay/personel-detay.component';
import { PersonellerComponent } from './personeller/personeller.component';

const routes: Routes = [
  {
    path: 'personeller',
    component: PersonellerComponent,
    data: { title: 'InsanKaynaklari.Personeller.Title' }
  },
  {
    path: 'personel-detay/:personelID',
    component: PersonelDetayComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsanKaynaklariRoutingModule { }
