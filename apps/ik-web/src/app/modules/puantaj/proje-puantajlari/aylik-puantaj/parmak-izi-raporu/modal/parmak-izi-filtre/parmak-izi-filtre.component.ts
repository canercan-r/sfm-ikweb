import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ikweb-parmak-izi-filtre',
  templateUrl: './parmak-izi-filtre.component.html',
  styleUrl: './parmak-izi-filtre.component.scss',
})
export class ParmakIziFiltreComponent implements OnInit {
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
      search: '',
      yil: [],
      ay: []
    })
  }

  dismiss() {
    this._activeModal.dismiss()
  }
}
