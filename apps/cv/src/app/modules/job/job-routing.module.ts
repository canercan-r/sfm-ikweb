import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobComponent } from './job.component';
import { RegisterComponent } from './register/register.component';
import { ResultComponent } from './result/result.component';
import { StepsComponent } from './steps/steps.component';

const routes: Routes = [
  {
    path: '',
    component: JobComponent,
    children: [
      // {
      //   path: '',
      //   redirectTo: 'register',
      //   pathMatch: 'full',
      // },
      {
        path: '',
        component: RegisterComponent,
        data: { returnUrl: window.location.pathname },
      },
      {
        path: ':source',
        component: RegisterComponent,
        data: { returnUrl: window.location.pathname },
      },
      {
        path: 'register/steps',
        component: StepsComponent
      },
      {
        path: 'register/formSaved',
        component: ResultComponent
      },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRoutingModule { }
