import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ikweb-pi-cihazlari-filtre',
  templateUrl: './pi-cihazlari-filtre.component.html',
  styleUrl: './pi-cihazlari-filtre.component.scss',
})
export class PiCihazlariFiltreComponent implements OnInit {
  form: FormGroup;
  cihazDurumArr = [
    { id: true, name: 'Aktif' },
    { id: false, name: 'Pasif' },
  ];

  constructor(
    private _fb: FormBuilder,
    private _activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this._fb.group({
      aktifMi: true,
    });
  }

  filtrele() {
    this._activeModal.close(this.form.value);
  }

  temizle() {
    this.form.reset({ aktifMi: true });
  }

  dismiss() {
    this._activeModal.dismiss();
  }
}
