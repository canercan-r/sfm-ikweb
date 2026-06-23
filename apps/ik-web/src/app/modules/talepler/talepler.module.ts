import { NgModule } from '@angular/core';
import { SharedModule } from '@ikweb-shared/shared.module';
import { ConfirmService, LibCommonModule } from '@lib-common';
import { CoreUIModule } from '@lib-core';
import { TaleplerRoutingModule } from './talepler-routing.module';
import { DosyaEkleComponent } from './tedarik/tedarik-talepleri-detay/modal/dosya-ekle/dosya-ekle.component';
import { YeniKayitComponent } from './tedarik/tedarik-talepleri-detay/modal/yeni-kayit/yeni-kayit.component';
import { TedarikTaleplerFormComponent } from './tedarik/tedarik-talepleri-detay/tedarik-talepler-form/tedarik-talepler-form.component';
import { TedarikTalepleriDetayComponent } from './tedarik/tedarik-talepleri-detay/tedarik-talepleri-detay.component';
import { TedarikComponent } from './tedarik/tedarik.component';

@NgModule({
  declarations: [
    TedarikComponent,
    TedarikTalepleriDetayComponent,
    TedarikTaleplerFormComponent,
    YeniKayitComponent,
    DosyaEkleComponent
  ],
  imports: [
    CoreUIModule,
    LibCommonModule,
    SharedModule,
    TaleplerRoutingModule
  ],
  providers: [
    ConfirmService
  ]
})
export class TaleplerModule { }
