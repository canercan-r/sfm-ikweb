import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IInsanKaynaklariPersonel } from '@ikweb-models/components';

@Component({
  selector: 'ikweb-personel-detay-genel',
  templateUrl: './personel-detay-genel.component.html',
  styleUrl: './personel-detay-genel.component.scss',
})
export class PersonelDetayGenelComponent implements OnInit {
  @Input() personel: IInsanKaynaklariPersonel

  form: FormGroup

  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.form = this._fb.group({
      yillikIzinBasTarihi: '',
      dogumYeri: '',
      sskNo: '',
      babaAdi: '',
      cariHesapKodu: '',
      projesi: '',
      pozisyonu: '',
      kadroKodu: '',
      projeTel: '',
      girisTarihi: '',
      cikisTarihi: '',
      ehliyetSinifi: [],
      ehliyetTarihi: '',
      cepTel: '',
      telefonYok: false,
      ePosta: '',
      kurumEPosta: '',
      ikametgahIli: [],
      ikametgahIlcesi: [],
      ikametgahSemti: '',
      ikametgahAdresi: '',
      kanGrubu: '',
      boy: [],
      kilo: [],
      pantolonOlcusu: [],
      gomlekOlcusu: [],
      kabanOlcusu: [],
      ceketOlcusu: [],
      ayakkabıNo: [],
      acilDurumlardaAranacakKisi: '',
      acilDurumdaAranacakKisiTel: '',
      calismaGrubu: [],
      uyruk: [],
      medeniHali: [],
      ozelKodu: '',
      POKSID: '',
      haklarinBaslangicTarihiDogruMu: false,
      acilDurumlardaKanVerirMisiniz: false,
      sigaraKullaniyorMusunuz: false,
      onemliBirRahatsizlikGecirdinizMi: false,
      fizikselRahatsizliginizVarMi: false
    })
  }
}
