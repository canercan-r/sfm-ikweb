import { NgModule } from '@angular/core';
import { SharedModule } from '@ikweb-shared/shared.module';
import { LibCommonModule } from '@lib-common';
import { CoreUIModule } from '@lib-core';
import { TaleplerRoutingModule } from './talepler-routing.module';
import { TedarikTalepleriDetayComponent } from './tedarik/tedarik-talepleri-detay/tedarik-talepleri-detay.component';
import { TedarikComponent } from './tedarik/tedarik.component';

@NgModule({
  declarations: [
    TedarikComponent,
    TedarikTalepleriDetayComponent
  ],
  imports: [
    CoreUIModule,
    LibCommonModule,
    SharedModule,
    TaleplerRoutingModule
  ]
})
export class TaleplerModule { }
