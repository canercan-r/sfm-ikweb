import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@lib-core';

export const routes: Routes = [

  // Layout.childRoutes([
  //   {
  //     path: 'job',
  //     loadChildren: () =>
  //       import('./modules/job/job.module').then((m) => m.JobModule),
  //   },
  // ]),

  {
    path: 'home',
    loadChildren: () =>
      import('./modules/job/job.module').then((m) => m.JobModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./layout/layout.module').then((m) => m.LayoutModule),
  },
  // {
  //   path: '',
  //   canActivate: [AuthGuard],
  //   loadChildren: () =>
  //     import('./layout/layout.module').then((m) => m.LayoutModule),
  // },
  { path: '**', redirectTo: 'error/404' },
  { path: 'auth/login', redirectTo: 'home' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
