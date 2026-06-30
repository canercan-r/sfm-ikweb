import { NgModule } from '@angular/core';
import { SharedModule } from '@ikweb-shared/shared.module';
import { ConfirmService, LibCommonModule } from '@lib-common';
import { CoreUIModule } from '@lib-core';
import { GonderiKaydiComponent } from './siparisler/gonderi-kaydi/gonderi-kaydi.component';
import { MalzemeDetayComponent } from './siparisler/gonderi-kaydi/modal/malzeme-detay/malzeme-detay.component';
import { FaturaSecimiComponent } from './siparisler/gonderi-kaydi/modal/fatura-secimi/fatura-secimi.component';
import { IrsaliyeSecimiComponent } from './siparisler/gonderi-kaydi/modal/irsaliye-secimi/irsaliye-secimi.component';
import { UygunsuzlukFormuComponent } from './siparisler/uygunsuzluk-formu/uygunsuzluk-formu.component';
import { SiparislerComponent } from './siparisler/siparisler.component';
import { SiparisDetayComponent } from './siparisler/siparis-detay/siparis-detay.component';
import { SiparislerFiltreComponent } from './siparisler/modal/siparisler-filtre/siparisler-filtre.component';
import { TaleplerComponent } from './talepler/talepler.component';
import { DosyaEkleComponent } from './talepler/tedarik-talepleri-detay/modal/dosya-ekle/dosya-ekle.component';
import { YeniKayitComponent } from './talepler/tedarik-talepleri-detay/modal/yeni-kayit/yeni-kayit.component';
import { TedarikTaleplerFormComponent } from './talepler/tedarik-talepleri-detay/tedarik-talepler-form/tedarik-talepler-form.component';
import { TedarikTalepleriDetayComponent } from './talepler/tedarik-talepleri-detay/tedarik-talepleri-detay.component';
import { TedarikRoutingModule } from './tedarik-routing.module';
@NgModule({
  declarations: [
    SiparislerComponent,
    SiparisDetayComponent,
    UygunsuzlukFormuComponent,
    SiparislerFiltreComponent,
    GonderiKaydiComponent,
    MalzemeDetayComponent,
    FaturaSecimiComponent,
    IrsaliyeSecimiComponent,
    TaleplerComponent,
    TedarikTalepleriDetayComponent,
    TedarikTaleplerFormComponent,
    YeniKayitComponent,
    DosyaEkleComponent
  ],
  imports: [
    CoreUIModule,
    LibCommonModule,
    SharedModule,
    TedarikRoutingModule
  ],
  providers: [
    ConfirmService
  ]
})
export class TedarikModule { }
