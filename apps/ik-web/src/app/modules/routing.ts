import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'insan-kaynaklari',
    loadChildren: () =>
      import('./insan-kaynaklari/insan-kaynaklari.module').then((m) => m.InsanKaynaklariModule),
  },
  {
    path: 'puantaj',
    loadChildren: () =>
      import('./puantaj/puantaj.module').then((m) => m.PuantajModule),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };

