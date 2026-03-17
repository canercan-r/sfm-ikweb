import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CustomValidators, IFormAlanDTO } from '@lib-common';

@Injectable()
export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export const setupForm = (formInputs: IFormAlanDTO[], form: FormGroup): void => {
  Object.keys(form.controls).forEach((controlName) => {
    const input = formInputs.find((inp) => inp.alanAdi === controlName);
    if (input) {
      const formControl = form.controls[input.alanAdi];
      const newVals = [];
      if (input.zorunluMu) {
        newVals.push(Validators.required);
      }
      const turVal = CustomValidators.getValidationForTur(input.validationTuru);
      if (turVal) {
        newVals.push(turVal);
      }

      if (formControl.validator && newVals.length > 0) {
        formControl.setValidators([formControl.validator, ...newVals]);
      } else if (newVals.length > 0) {
        formControl.setValidators([...newVals]);
      }
      form.controls[controlName].updateValueAndValidity();
    } else {
      form.controls[controlName].disable();
      // form.removeControl(controlName);
    }
  });
};
