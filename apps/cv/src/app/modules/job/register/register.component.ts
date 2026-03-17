import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CalismaTercihleri, IRegisterFormData } from '@cv-models/cv';
import { JobAPIService } from '@cv-services/apis/job-api.service';
import { SharedService } from '@cv-services/shared.service';
import { ISelectionEventArgs } from '@infragistics/igniteui-angular';
import { AlertService } from '@lib-common';
import { TranslateService } from '@ngx-translate/core';
import { catchError, firstValueFrom, map, of, shareReplay } from 'rxjs';

@Component({
  selector: 'cv-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  mekanSelected;
  departmanlar = [];
  gorevTanimlari = [];
  readonly calismaTercihi = this._jobAPI.getCalismaTercihleri();
  readonly mekanlar$ = this._jobAPI.getMekanlar$.pipe(shareReplay(1));
  readonly gorevTanimlari$ = this._jobAPI.getGorevTanimlari$.pipe(
    shareReplay(1),
  );

  calismaTercihiArr = CalismaTercihleri.map((item) => ({
    id: `calisma-${item.id}`,
    value: item.id,
    name: this._translate.instant(item.name),
  }));

  get mekanCtrl() {
    return this.registerForm.get('mekanID') as FormControl;
  }

  get departmanCtrl() {
    return this.registerForm.get('departmanID') as FormControl;
  }

  get gorevTanimCtrl() {
    return this.registerForm.get('gorevTanimID') as FormControl;
  }

  registerForm = this._fb.group({
    ad: new FormControl({ value: '', disabled: false }, [Validators.required]),
    soyad: new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ]),
    idNo: new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ]),
    telefon: new FormControl({ value: '', disabled: false }, [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
    ]),
    mekanID: new FormControl({ value: null, disabled: false }, [
      Validators.required,
    ]),
    departmanID: new FormControl({ value: null, disabled: true }, [
      Validators.required,
    ]),
    gorevTanimID: new FormControl({ value: null, disabled: true }, [
      Validators.required,
    ]),
    calismaTercihi: new FormControl({ value: null, disabled: false }, [
      Validators.required,
    ]),
    source: null,
  });

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _router: Router,
    private readonly _jobAPI: JobAPIService,
    private readonly _alert: AlertService,
    private _actr: ActivatedRoute,
    public sharedService: SharedService,
    private _translate: TranslateService,
  ) {
    const source = this._actr.snapshot.params['source'] ?? null;

    if (source == null) {
      this._alert.show(
        {
          text: 'Global.SourceNotValid',
          type: 'error',
          overlayClose: false,
        },
        true,
        true,
      );
    } else {
      this._jobAPI
        .getFormDatas({
          sourceCode: source,
        })
        .pipe(
          catchError((err) => {
            const msg = err?.message ?? 'Global.DataNotGet';
            this._alert.show(
              {
                text: msg,
                type: 'error',
                overlayClose: false,
              },
              true,
              true,
            );
            return of(null);
          }),
        )
        .subscribe();
      this.registerForm.get('source').setValue(source);
    }
  }

  async ngOnInit() {
    this.mekanCtrl.valueChanges.subscribe((makanID) =>
      makanID ? this.departmanCtrl.enable() : this.departmanCtrl.disable(),
    );
    this.departmanCtrl.valueChanges.subscribe((departmanID) =>
      departmanID
        ? this.gorevTanimCtrl.enable()
        : this.gorevTanimCtrl.disable(),
    );
  }

  async mekanChanged(event: ISelectionEventArgs) {
    this.mekanCtrl.setValue(event.newSelection.value);
    this.departmanlar = await firstValueFrom(
      this._jobAPI.getDepartmanlar$.pipe(
        map((v) => v.filter((el) => el.mekanID === event.newSelection.value)),
      ),
    );
    // // const departmanID = departmanlar.find((v) => v.mekanID === value)?.departmanID;
    this.departmanCtrl.setValue(null);
    this.gorevTanimCtrl.setValue(null);
    // console.log("ended:", value);
  }

  async departmanChanged(event: ISelectionEventArgs) {
    this.departmanCtrl.setValue(event.newSelection.value);
    const mekanID = this.mekanCtrl.value;
    this.gorevTanimlari = await firstValueFrom(
      this.gorevTanimlari$.pipe(
        map((v) =>
          v.filter(
            (el) =>
              el.mekanID === mekanID &&
              el.departmanID === event.newSelection.value,
          ),
        ),
      ),
    );
    this.gorevTanimCtrl.setValue(null);
  }

  nextPage() {
    if (!this.registerForm.invalid) {
      var formVal = this.registerForm.getRawValue() as IRegisterFormData;
      formVal.telefon = formVal.telefon?.toString().replace(/\D+/g, '');

      this._router.navigate(['home/register/steps'], {
        state: { data: formVal },
      });
    } else {
      this.registerForm.markAsTouched();
    }
  }
}
