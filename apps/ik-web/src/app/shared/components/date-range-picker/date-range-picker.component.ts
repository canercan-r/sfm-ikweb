import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {
  ConnectedPositioningStrategy,
  DateRange,
  HorizontalAlignment,
  IgxDateRangePickerComponent,
  IgxDropDownComponent,
  NoOpScrollStrategy,
  VerticalAlignment,
} from '@infragistics/igniteui-angular';
import { LanguageService } from '@lib-common';
import { format } from 'date-fns';

@Component({
  selector: 'ikweb-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
})
export class DateRangePickerComponent implements OnInit {
  @ViewChild('rangePicker', { static: true }) public rangePicker: IgxDateRangePickerComponent;

  @Input() startDate = new Date(Date.now());
  @Input() endDate = new Date();
  @Output() onDateSelected = new EventEmitter<DateRange>();
  @Input() positionLeft: boolean;

  public range: DateRange = { start: new Date(2020, 4, 20), end: new Date(2020, 4, 25) };

  leftOverlaySettings = {
    positionStrategy: new ConnectedPositioningStrategy({
      horizontalDirection: HorizontalAlignment.Left,
      horizontalStartPoint: HorizontalAlignment.Right,
      verticalStartPoint: VerticalAlignment.Bottom,
    }),
    scrollStrategy: new NoOpScrollStrategy(),
  };

  overlaySettings = {
    positionStrategy: new ConnectedPositioningStrategy({
      horizontalDirection: HorizontalAlignment.Center,
      horizontalStartPoint: HorizontalAlignment.Center,
      verticalStartPoint: VerticalAlignment.Bottom,
    }),
    scrollStrategy: new NoOpScrollStrategy(),
  };

  private dateFormat = 'dd.MM.yyyy';
  //   public startDate: Date = new Date(Date.now());
  //   public endDate: Date = new Date();
  public inputStartDate: string = format(this.startDate, this.dateFormat);
  public inputEndDate: string = format(this.endDate, this.dateFormat);
  public slash = ' - ';
  public isClickedTwice: boolean;

  constructor(readonly _lang: LanguageService) { }

  public ngOnInit() {
    // console.log('_lang.locale.code', this._lang.locale.code);
    // this.calendar.disabledDates = [{ type: DateRangeType.Before, dateRange: [new Date(Date.now())] }];
    // const dataRange = this.rangePicker.select(this.startDate, this.endDate);
    // console.log(dataRange)
    this.inputStartDate = format(this.startDate, this.dateFormat);
    this.inputEndDate = format(this.endDate, this.dateFormat);
  }

  public verifyRange(dates: Date | Date[]) {
    this.startDate = Array.isArray(dates) ? dates[0] : dates;
    this.isClickedTwice = false;
    if (Array.isArray(dates) && this.startDate !== dates[dates.length - 1]) {
      this.endDate = dates[dates.length - 1];
      this.isClickedTwice = true;
    }

    this.inputStartDate = format(this.startDate, this.dateFormat);
    this.slash = ' - ';
    this.inputEndDate = '';
    if (this.isClickedTwice) {
      this.inputEndDate = format(this.endDate, this.dateFormat);
    }
  }

  public onDoneSelected(dropDownRangePicker: IgxDropDownComponent) {
    dropDownRangePicker.close();
    this.onDateSelected.emit({
      start: format(this.startDate, this.dateFormat),
      end: format(this.endDate, this.dateFormat),
    } as DateRange);
  }

  public selectDays(count: number) {
    const today: Date = new Date();
    this.range = {
      start: new Date(new Date().setDate(today.getDate() - count + 1)),
      end: today,
    };
  }

  public onClosing() {
    // if (!this.isClickedTwice) {
    //   this.inputEndDate = this.inputStartDate;
    //   this.calendar.selectDate(this.startDate);
    // }
  }
}
