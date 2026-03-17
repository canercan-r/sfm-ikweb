import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ikweb-personel-ekle',
  templateUrl: './personel-ekle.component.html',
  styleUrl: './personel-ekle.component.scss',
})
export class PersonelEkleComponent implements OnInit {
  form: FormGroup

  constructor(
    private _fb: FormBuilder,
    private _activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.form = this._fb.group({
      tcKimlikNo: '',
      adi: '',
      soyadi: '',
      ucret: '',
      girisTarihi: '',
      pozisyon: [],
      calismaSekli: [],
      odemeTipi: [],
      cikisGiris: true,
      cikisTarihi: ''
    })
  }

  dismiss() {
    this._activeModal.dismiss()
  }
}
