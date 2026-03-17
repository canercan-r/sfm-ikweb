import { NgModule } from '@angular/core';

import { ComponentsModule } from '@cv-components/components.module';
import { LayoutModule } from '@cv-layout/layout.module';
import { SharedModule } from '@cv-shared/shared.module';
import { LibCommonModule } from '@lib-common';
import { CoreUIModule } from '@lib-core';
import { JobRoutingModule } from './job-routing.module';
import { JobComponent } from './job.component';
import { RegisterComponent } from './register/register.component';
import { ResultComponent } from './result/result.component';
import { StepsComponent } from './steps/steps.component';


@NgModule({
  declarations: [
    JobComponent,
    RegisterComponent,
    StepsComponent,
    ResultComponent
  ],
  imports: [
    LibCommonModule,
    CoreUIModule,
    ComponentsModule,
    JobRoutingModule,
    SharedModule, LayoutModule
  ]
})
export class JobModule { }
