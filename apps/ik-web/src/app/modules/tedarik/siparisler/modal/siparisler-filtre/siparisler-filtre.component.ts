import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ikweb-siparisler-filtre',
  templateUrl: './siparisler-filtre.component.html',
  styleUrl: './siparisler-filtre.component.scss',
})
export class SiparislerFiltreComponent implements OnInit {
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
      baslangicTarihi: '',
      bitisTarihi: '',
      proje: '',
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
