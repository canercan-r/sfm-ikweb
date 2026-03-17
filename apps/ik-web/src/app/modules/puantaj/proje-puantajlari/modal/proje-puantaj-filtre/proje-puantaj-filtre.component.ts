import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ikweb-proje-puantaj-filtre',
  templateUrl: './proje-puantaj-filtre.component.html',
  styleUrl: './proje-puantaj-filtre.component.scss',
})
export class ProjePuantajFiltreComponent implements OnInit {
  form: FormGroup

  constructor(
    private _fb: FormBuilder,
    private _activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.form = this._fb.group({
      baslangicTarihi: '',
      bitisTarihi: '',
      onaylayacaklarim: false
    })
  }

  dismiss() {
    this._activeModal.dismiss()
  }
}