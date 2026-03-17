import { Component, EventEmitter, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, Validators } from '@angular/forms';
import { DefaultLayoutConfig } from '@ikweb-layout/core/default-layout.config';
import { IgxInputGroupType } from '@infragistics/igniteui-angular';
import { CustomValidators, ICountry } from '@lib-common';
import { noop } from 'rxjs';

@Component({
  selector: 'ikweb-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() label: string;
  @Input() labelButtonText: string;
  @Input() type?: string;
  @Input() name?: string;
  @Input() className?: string;
  @Input() autocomplete? = 'off';
  @Input() placeholder?: string;
  @Input() maxlength?: number | string;
  @Input() minlength?: number | string;
  @Input() min?: number | string;
  @Input() max?: number | string;
  @Input() phoneMask?: string;
  @Input() prefix?: boolean;
  @Input() readonly?: boolean;
  @Input() required?: boolean;
  @Input() formButton?: boolean;
  @Input() disabled?: boolean;
  @Input() suffix?: boolean;
  @Input() allowDecimals?: boolean;
  @Input() allowSign?: boolean;
  @Input() whiteSpaceValidator?: boolean;
  @Input() autocompleteTarget: any;
  @Input() inputGroupType?: IgxInputGroupType = DefaultLayoutConfig.main.inputGroupType;

  @Input() innerId: string;
  @Input() triggerId: string;

  @Output() labelButtonClicked = new EventEmitter<void>();
  @Output() inputChange = new EventEmitter<any>();
  @Output() blurChange = new EventEmitter<any>();
  @Output() focusChange = new EventEmitter<any>();
  @Output() keyupChange = new EventEmitter<any>();
  @Output() keypressChange = new EventEmitter<{ event: Event; maxLength: number }>();

  showPassword = false;

  control: FormControl;

  Validators = Validators;

  private _value: any;

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  get value(): any {
    return this._value;
  }

  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChangeCallback(v);
    }
  }

  constructor(@Optional() @Self() private readonly ngCtrl: NgControl) {
    if (!ngCtrl) {
      throw new Error('lib-input component formcontrolname veya ngmodel olmadan kullanılamaz');
    }
    ngCtrl.valueAccessor = this;
  }

  onBlur() {
    this.onTouchedCallback();
  }

  writeValue(value: any) {
    if (value !== this._value) {
      this._value = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setDisabledState?(isDisabled: boolean): void { }

  ngOnInit(): void {
    this.control = this.ngCtrl.control as FormControl;
  }

  get togglePasswordVisibility() {
    return !this.showPassword ? 'eye-slash' : 'eye';
  }

  labelButtonClick() {
    this.labelButtonClicked.emit();
  }

  inputHandler(event) {
    this.inputChange.emit(event);
  }

  keypressHandler(event, maxLength) {
    this.keypressChange.emit({ event, maxLength });
  }

  blurHandler(event) {
    this.blurChange.emit(event);
  }

  focusHandler(event) {
    this.focusChange.emit(event);
  }

  keyupHandler(event) {
    this.keyupChange.emit(event);
  }

  countryChange(country: ICountry) {
    if (country) {
      this.phoneMask = country.phoneMask;

      if (this.type === 'tel') {
        const ulkeKodu = country.langCode.toLowerCase();
        this.control.setValidators(ulkeKodu ? CustomValidators.telValidator(ulkeKodu) : CustomValidators.TurkMobileTel);
      }
    }
  }
}
