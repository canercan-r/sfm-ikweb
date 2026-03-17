import { NgModule } from '@angular/core';
import { SharedModule } from '@ikweb-shared/shared.module';
import { LibCommonModule } from '@lib-common';
import { CoreUIModule } from '@lib-core';
import { AylikPuantajComponent } from './proje-puantajlari/aylik-puantaj/aylik-puantaj.component';
import { EksikKayitlarComponent } from './proje-puantajlari/aylik-puantaj/eksik-kayitlar/eksik-kayitlar.component';
import { DosyaEkleComponent } from './proje-puantajlari/aylik-puantaj/modal/dosya-ekle/dosya-ekle.component';
import { EkOdemeTuruKoduComponent } from './proje-puantajlari/aylik-puantaj/modal/ek-odeme-turu-kodu/ek-odeme-turu-kodu.component';
import { EkOdemelerDetayComponent } from './proje-puantajlari/aylik-puantaj/modal/ek-odemeler-detay/ek-odemeler-detay.component';
import { PersonelEkleComponent } from './proje-puantajlari/aylik-puantaj/modal/personel-ekle/personel-ekle.component';
import { ParmakIziFiltreComponent } from './proje-puantajlari/aylik-puantaj/parmak-izi-raporu/modal/parmak-izi-filtre/parmak-izi-filtre.component';
import { ParmakIziRaporuComponent } from './proje-puantajlari/aylik-puantaj/parmak-izi-raporu/parmak-izi-raporu.component';
import { YillikIzinFiltreComponent } from './proje-puantajlari/aylik-puantaj/yillik-izin-raporu/modal/yillik-izin-filtre/yillik-izin-filtre.component';
import { YillikIzinRaporuComponent } from './proje-puantajlari/aylik-puantaj/yillik-izin-raporu/yillik-izin-raporu.component';
import { GunlukPuantajComponent } from './proje-puantajlari/gunluk-puantaj/gunluk-puantaj.component';
import { GunlukPuantajFazlaMesaiComponent } from './proje-puantajlari/gunluk-puantaj/modal/gunluk-puantaj-fazla-mesai/gunluk-puantaj-fazla-mesai.component';
import { GunlukPuantajParmakiziKaydiComponent } from './proje-puantajlari/gunluk-puantaj/modal/gunluk-puantaj-parmakizi-kaydi/gunluk-puantaj-parmakizi-kaydi.component';
import { EkipmanSayimiComponent } from './proje-puantajlari/modal/ekipman-sayimi/ekipman-sayimi.component';
import { GecikmeliGirisComponent } from './proje-puantajlari/modal/gecikmeli-giris/gecikmeli-giris.component';
import { KidemKontrolComponent } from './proje-puantajlari/modal/kidem-kontrol/kidem-kontrol.component';
import { ProjePuantajFiltreComponent } from './proje-puantajlari/modal/proje-puantaj-filtre/proje-puantaj-filtre.component';
import { PuantajKontrolComponent } from './proje-puantajlari/modal/puantaj-kontrol/puantaj-kontrol.component';
import { VardiyaBilgiComponent } from './proje-puantajlari/modal/vardiya-bilgi/vardiya-bilgi.component';
import { ProjePuantajlariComponent } from './proje-puantajlari/proje-puantajlari.component';
import { PuantajRoutingModule } from './puantaj-routing.module';



@NgModule({
  declarations: [
    ProjePuantajlariComponent,
    GunlukPuantajComponent,
    GunlukPuantajFazlaMesaiComponent,
    GunlukPuantajParmakiziKaydiComponent,
    AylikPuantajComponent,
    EkOdemelerDetayComponent,
    EkOdemeTuruKoduComponent,
    GecikmeliGirisComponent,
    PuantajKontrolComponent,
    EkipmanSayimiComponent,
    VardiyaBilgiComponent,
    KidemKontrolComponent,
    ProjePuantajFiltreComponent,
    EksikKayitlarComponent,
    ParmakIziRaporuComponent,
    ParmakIziFiltreComponent,
    YillikIzinRaporuComponent,
    YillikIzinFiltreComponent,
    PersonelEkleComponent,
    DosyaEkleComponent
  ],
  imports: [
    CoreUIModule,
    LibCommonModule,
    SharedModule,
    PuantajRoutingModule
  ]
})
export class PuantajModule { }
