import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ikweb-dosya-ekle',
  templateUrl: './dosya-ekle.component.html',
  styleUrl: './dosya-ekle.component.scss'
})
export class DosyaEkleComponent implements OnInit {

  form: FormGroup

  constructor(
    private _activeModal: NgbActiveModal,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  dismiss() {
    this._activeModal.dismiss();
  }

  initForm() {
    this.form = this._fb.group({
      gecerlilikTarihi: '',
      dosyaTuru: '',
      dosyaLink: ''
    })
  }
}
