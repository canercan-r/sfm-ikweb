import { NgModule } from '@angular/core';
import { SharedModule } from '@ikweb-shared/shared.module';
import { LibCommonModule } from '@lib-common';
import { CoreUIModule } from '@lib-core';
import { InsanKaynaklariRoutingModule } from './insan-kaynaklari-routing.module';
import { PersonelDetayGenelComponent } from './personeller/personel-detay/personel-detay-genel/personel-detay-genel.component';
import { PersonelDetayComponent } from './personeller/personel-detay/personel-detay.component';
import { PersonellerComponent } from './personeller/personeller.component';



@NgModule({
  declarations: [
    PersonellerComponent,
    PersonelDetayComponent,
    PersonelDetayGenelComponent
  ],
  imports: [
    CoreUIModule,
    LibCommonModule,
    SharedModule,
    InsanKaynaklariRoutingModule
  ]
})
export class InsanKaynaklariModule { }
