import { Component, EventEmitter, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { IChangeCheckboxEventArgs } from '@infragistics/igniteui-angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ikweb-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent<T extends object> implements ControlValueAccessor, OnInit {
  @Output() readonly changed = new EventEmitter<any>();

  @Input() disabled = false;
  @Input() valueKey?: keyof T;
  @Input() displayKey?: keyof T;
  @Input() name?: string;
  @Input() label?: string;
  @Input() itemlist?: 'row' | 'column' = 'row';

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

  constructor(@Optional() @Self() private readonly ngCtrl: NgControl) {
    if (!ngCtrl) {
      throw new Error('ikweb-radio component formcontrolname veya ngmodel olmadan kullanılamaz');
    }
    ngCtrl.valueAccessor = this;
  }

  change(eventArgs: IChangeCheckboxEventArgs) {
    const data = eventArgs;
    // this.value = Array.isArray(data) ? data.map((e) => this.#getValue(e)) : this.#getValue(data);
    // console.log('this.eventArgs', data)
    this.changed.emit(data);
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
