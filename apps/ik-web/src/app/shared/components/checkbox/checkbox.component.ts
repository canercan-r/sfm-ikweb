import { Component, EventEmitter, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, Validators } from '@angular/forms';
import { IChangeCheckboxEventArgs } from '@infragistics/igniteui-angular';
import { noop } from 'rxjs';

@Component({
  selector: 'ikweb-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit, ControlValueAccessor {
  @Input() disabled = false;
  @Input() label: string;
  @Input() class: string;
  @Input() checked = false;
  @Input() disableTransitions = false;
  @Input() isContract = false;
  @Input() formButton: boolean;
  @Input() name?: string;
  @Input() readonly = false;

  @Output() readonly changed = new EventEmitter<IChangeCheckboxEventArgs>();

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
      throw new Error('lib-checkbox component formcontrolname veya ngmodel olmadan kullanılamaz');
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

  change(eventArgs: IChangeCheckboxEventArgs) {
    const data = eventArgs;
    this.changed.emit(data);
  }
}
