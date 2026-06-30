import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ikweb-gunluk-calisma-filtre',
  templateUrl: './gunluk-calisma-filtre.component.html',
  styleUrl: './gunluk-calisma-filtre.component.scss',
})
export class GunlukCalismaFiltreComponent implements OnInit {
  form: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this._fb.group({
      personel: '',
      proje: '',
      baslangicTarihi: '',
      bitisTarihi: '',
    });
  }

  filtrele() {
    this._activeModal.close(this.form.value);
  }

  temizle() {
    this.form.reset();
  }

  dismiss() {
    this._activeModal.dismiss();
  }
}
