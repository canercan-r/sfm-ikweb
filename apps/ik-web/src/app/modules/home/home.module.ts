import { NgModule } from '@angular/core';
import { LayoutModule } from '@ikweb-layout/layout.module';
import { SharedModule } from '@ikweb-shared/shared.module';
import { LibCommonModule } from '@lib-common';
import { CoreUIModule } from '@lib-core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CoreUIModule,
    SharedModule,
    HomeRoutingModule,
    LibCommonModule,
    LayoutModule,
  ],
})
export class HomeModule { }
