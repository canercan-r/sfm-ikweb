import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PhoneNumber, PhoneNumberUtil } from 'google-libphonenumber';
import { tcKimlikNoValidator } from './lib-utils';

// @dynamic
export class CustomValidators {
  static validationTurleri = {
    email: Validators.email,
    required: Validators.required,
    default: null
  };

  static TurkMobileTel = CustomValidators.telValidator('tr');
  static TCK = CustomValidators.tckValidator();
  static EmailMatcher = (field1: string, field2: string) => CustomValidators.fieldsMatchValidator(field1, field2);
  static getValidationForTur = (tur: string) =>
    CustomValidators.validationTurleri[tur] || CustomValidators.validationTurleri.default;

  /**
   * HELPERS
   */
  static fieldsMatchValidator(field1: string, field2: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const input1 = control.get(field1);
      const input2 = control.get(field2);
      return input1 && input2 && input1.value === input2.value ? null : { mismatch: true };
    };
  }

  static tckValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const tcIsValid = tcKimlikNoValidator(control.value);
      return tcIsValid ? null : { tcNotValid: true };
    };
  }

  static telValidator(country: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === '') {
        return { telNotValid: true };
      }
      let telIsValid: boolean;
      try {
        const numberProto: PhoneNumber = PhoneNumberUtil.getInstance().parse(control.value, country);
        telIsValid = PhoneNumberUtil.getInstance().isValidNumberForRegion(numberProto, country);
      } catch {
        telIsValid = false;
      }
      return telIsValid ? null : { telNotValid: true };
    };
  }
}
