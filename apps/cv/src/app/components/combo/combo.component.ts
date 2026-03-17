import { Component, EventEmitter, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { IComboSelectionChangingEventArgs } from '@infragistics/igniteui-angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cv-combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.scss']
})
export class ComboComponent<T extends object> implements ControlValueAccessor, OnInit {
  @Output() readonly changed = new EventEmitter<any>();

  @Input() disabled = false;
  @Input() label: string;
  @Input() valueKey?: string;
  @Input() displayKey?: string;
  @Input() className?: string;
  @Input() placeholder?: string;
  @Input() searchPlaceholder?: string;
  @Input() isButton?: boolean;
  @Input() inputGroupType?: 'line' | 'box' | 'border' = 'border';
  @Input() name?: string;
  @Input() formButton?: boolean;

  #data: T[] = [];
  #dataMap: Map<T | T[keyof T], T> = new Map();

  get data() {
    return this.#data;
  }

  @Input() set data(value: T[]) {
    this.#data = value;

    if (this.data?.length > 0) {
      this.#dataMap = new Map(value.map((e) => [this.#getValue(e), e]));
      this.#setDisplayValue();
    }
  }

  #value: any;
  #onChange = (val: any) => { };
  #onTouch = (val: any) => { };

  control: FormControl;
  displayValue$ = new BehaviorSubject('');

  get value() {
    return this.#value;
  }

  set value(val: any) {
    this.#value = val;
    this.#onChange(val);
    this.#onTouch(val);

    if (this.data?.length > 0) {
      this.#setDisplayValue();
    }
  }

  constructor(
    @Optional() @Self() private readonly ngCtrl: NgControl,
  ) {
    if (!ngCtrl) {
      throw new Error('lib combo component formcontrolname veya ngmodel olmadan kullanılamaz');
    }
    ngCtrl.valueAccessor = this;
  }

  get isEmptyRequired() {
    return this.control.hasError('required') && !this.control.value;
  }

  change(eventArgs: IComboSelectionChangingEventArgs) {
    this.changed.emit(eventArgs);
  }

  ngOnInit(): void {
    this.control = this.ngCtrl.control as FormControl;
  }

  writeValue(obj: any): void {
    this.value = obj;
    this.#setDisplayValue();
  }
  registerOnChange(fn: any): void {
    this.#onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.#onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  #getValue(e: T) {
    if (!e) {
      return e;
    }

    return this.valueKey ? e[this.valueKey] : e;
  }

  #getDisplay(e: T) {
    if (!e) {
      return '';
    }
    return this.displayKey ? e[this.displayKey] : e;
  }

  #setDisplayValue() {
    if (Array.isArray(this.value)) {
      const data = this.value.map((e) => this.#dataMap.get(e));
      this.displayValue$.next(data.map((e) => this.#getDisplay(e)).join());
    } else {
      const data = this.#dataMap.get(this.value);
      let displayVal = this.#getDisplay(data).toString();
      if ((!displayVal || displayVal === '') && this.value && this.value !== '') {
        displayVal = this.value;
      }
      this.displayValue$.next(displayVal);
    }
  }
}
