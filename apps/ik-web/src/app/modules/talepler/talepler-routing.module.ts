import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TedarikTalepleriDetayComponent } from './tedarik/tedarik-talepleri-detay/tedarik-talepleri-detay.component';
import { TedarikComponent } from './tedarik/tedarik.component';

const routes: Routes = [
  {
    path: 'tedarik-talepleri',
    component: TedarikComponent,
    data: { title: 'Talepler.TedarikTalepleri.Title' }
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
export class TaleplerRoutingModule { }
