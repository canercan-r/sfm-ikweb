import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IPuantaj } from '@ikweb-models/components';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ikweb-gecikmeli-giris',
  templateUrl: './gecikmeli-giris.component.html',
  styleUrl: './gecikmeli-giris.component.scss',
})
export class GecikmeliGirisComponent implements OnInit {
  @Input() puantajInfo: IPuantaj

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
      gecmisGun: false,
      gecmisGunSayisi: '',
      butunAyGecmis: false,
      projedeVarsayilanGecikme: true
    })
  }

  dismiss() {
    this._activeModal.dismiss()
  }
}
