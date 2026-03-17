import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CALISMA_STATE } from '@ikweb-models/components';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ikweb-yillik-izin-filtre',
  templateUrl: './yillik-izin-filtre.component.html',
  styleUrl: './yillik-izin-filtre.component.scss',
})
export class YillikIzinFiltreComponent implements OnInit {
  form: FormGroup

  calismaState = CALISMA_STATE

  calismaDurumArr = Object.values(CALISMA_STATE)
    .filter((e): e is CALISMA_STATE => typeof e === 'number')
    .map((e) => ({
      id: e,
      name: this._translate.instant(`Global.${CALISMA_STATE[e]}`),
    }
    ));

  constructor(
    private _fb: FormBuilder,
    private _activeModal: NgbActiveModal,
    private _translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.form = this._fb.group({
      calismaSekli: [],
      calismaDurumID: this.calismaState.Calisanlar
    })
  }

  dismiss() {
    this._activeModal.dismiss()
  }
}
