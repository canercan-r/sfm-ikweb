import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, Validators } from '@angular/forms';
import { DefaultLayoutConfig } from '@ikweb-layout/core/default-layout.config';
import { IgxInputGroupType, PickerInteractionMode } from '@infragistics/igniteui-angular';
import { DATE_VIEW, LanguageService } from '@lib-common';
import { endOfWeek, format, startOfWeek } from 'date-fns';

const noop = () => { };
@Component({
  selector: 'ikweb-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePickerComponent implements OnInit, ControlValueAccessor {
  @Output() dateChange = new EventEmitter<Date>();

  private format = 'dd.MM.yyyy';
  private stringToDateFormat = 'dd.MMMM.yyyy';
  private dayFormatter: Intl.DateTimeFormat;
  private monthFormatter: Intl.DateTimeFormat;

  @Input() viewDate: Date;
  @Input() label: string;
  @Input() inputFormat?: string = this.format;
  @Input() mode?: PickerInteractionMode = PickerInteractionMode.DropDown;
  @Input() autocomplete?: string;
  @Input() weekStart?: number = 1;
  @Input() viewType: DATE_VIEW;
  @Input() todayLabel?: string = 'Global.Bugun';
  @Input() readonly?: boolean;
  @Input() required?: boolean;
  @Input() inputGroupType?: IgxInputGroupType = DefaultLayoutConfig.main.inputGroupType;

  @Input() formatter = (date: Date) => {
    if (this.viewType === DATE_VIEW.HAFTALIK) {
      const _startDate = startOfWeek(date, { weekStartsOn: 1 });
      const _endDate = endOfWeek(date, { weekStartsOn: 1 });
      return `${_startDate.getDate()} ${'-'} ${_endDate.getDate()} ${this.monthFormatter.format(_startDate)}`;
    } else if (this.inputFormat == this.stringToDateFormat) {
      return `${date.getDate()} ${this.monthFormatter.format(date)},${this.dayFormatter.format(date)}`;
    } else {
      return format(date, this.format);
    }
  };

  control: FormControl;

  Validators = Validators;

  private _value: any;

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  get value(): any {
    return this._value;
  };

  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChangeCallback(v);
    }
  }

  constructor(@Optional() @Self() private readonly ngCtrl: NgControl, readonly _lang: LanguageService) {
    if (!ngCtrl) {
      throw new Error('ikweb-date-picker component formcontrolname veya ngmodel olmadan kullanılamaz');
    }
    ngCtrl.valueAccessor = this;
    this.dayFormatter = new Intl.DateTimeFormat(_lang.locale.code, { weekday: 'long' });
    this.monthFormatter = new Intl.DateTimeFormat(_lang.locale.code, { month: 'long' });
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

  dtpClose(event) {
    if (event.owner.value !== this.viewDate) {
      this.dateChange.emit(event.owner.value);
    }
  }
}
