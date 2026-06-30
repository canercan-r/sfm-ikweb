import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ikweb-yeni-kayit',
  templateUrl: './yeni-kayit.component.html',
  styleUrl: './yeni-kayit.component.scss'
})
export class YeniKayitComponent {
  constructor(
    private _activeModal: NgbActiveModal,
    private _router: Router,
  ) { }

  dismiss() {
    this._activeModal.dismiss();
  }

  onKaydet() {
    this._activeModal.dismiss();
    this._router.navigate(['/tedarik/tedarik-talepleri/talep-form'], {
      state: { mod: 'yeni' }
    });
  }
}
