import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {
  ConnectedPositioningStrategy,
  DateRange,
  HorizontalAlignment,
  ISelectionEventArgs,
  IgxDropDownComponent,
  NoOpScrollStrategy,
  VerticalAlignment,
} from '@infragistics/igniteui-angular';
import { DATE_FILTER, DATE_GROUP, DATE_STATUS, IDropDown } from '@lib-common';
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from 'date-fns';

@Component({
  selector: 'ikweb-date-range-select',
  templateUrl: './date-range-select.component.html',
  styleUrls: ['./date-range-select.component.scss'],
})
export class DateRangeSelectComponent implements OnInit {
  @ViewChild('dropDownRangeSelect', { static: true })
  public dropDownRangeSelect: IgxDropDownComponent;

  @Output() onDateTypeSelected = new EventEmitter<DateRange>();
  @Input() buttonLabel: string;
  @Input() buttonClass: string;
  @Input() clearButton: boolean;
  @Input() filterKey: Array<DATE_FILTER>;
  @Input() isGroup: boolean;
  @Input() isDivider: boolean;
  @Input() isRange: boolean;

  dateRange: string;
  dateStatus: string;

  _filterKey = DATE_FILTER;
  _groupKey = DATE_GROUP;

  dropdownItems: IDropDown[] = [
    {
      valueKey: DATE_STATUS.BUGUN,
      displayKey: 'Bugun',
      groupKey: DATE_GROUP.GUN,
      filterKey: DATE_FILTER.BU,
    },
    {
      valueKey: DATE_STATUS.DUN,
      displayKey: 'Dun',
      groupKey: DATE_GROUP.GUN,
      filterKey: DATE_FILTER.GECEN,
    },
    {
      valueKey: DATE_STATUS.YARIN,
      displayKey: 'Yarin',
      groupKey: DATE_GROUP.GUN,
      filterKey: DATE_FILTER.GELECEK,
    },
    {
      valueKey: DATE_STATUS.BU_HAFTA,
      displayKey: 'BuHafta',
      groupKey: DATE_GROUP.HAFTA,
      filterKey: DATE_FILTER.BU,
    },
    {
      valueKey: DATE_STATUS.GECEN_HAFTA,
      displayKey: 'GecenHafta',
      groupKey: DATE_GROUP.HAFTA,
      filterKey: DATE_FILTER.GECEN,
    },
    {
      valueKey: DATE_STATUS.GELECEK_HAFTA,
      displayKey: 'GelecekHafta',
      groupKey: DATE_GROUP.HAFTA,
      filterKey: DATE_FILTER.GELECEK,
    },
    {
      valueKey: DATE_STATUS.BU_AY,
      displayKey: 'BuAy',
      groupKey: DATE_GROUP.AY,
      filterKey: DATE_FILTER.BU,
    },
    {
      valueKey: DATE_STATUS.GECEN_AY,
      displayKey: 'GecenAy',
      groupKey: DATE_GROUP.AY,
      filterKey: DATE_FILTER.GECEN,
    },
    {
      valueKey: DATE_STATUS.GELECEK_AY,
      displayKey: 'GelecekAy',
      groupKey: DATE_GROUP.AY,
      filterKey: DATE_FILTER.GELECEK,
    },
    {
      valueKey: DATE_STATUS.BU_YIL,
      displayKey: 'BuYil',
      groupKey: DATE_GROUP.YIL,
      filterKey: DATE_FILTER.BU,
    },
    {
      valueKey: DATE_STATUS.GECEN_YIL,
      displayKey: 'GecenYil',
      groupKey: DATE_GROUP.YIL,
      filterKey: DATE_FILTER.GECEN,
    },
    {
      valueKey: DATE_STATUS.GELECEK_YIL,
      displayKey: 'GelecekYil',
      groupKey: DATE_GROUP.YIL,
      filterKey: DATE_FILTER.GELECEK,
    },
  ];

  overlaySettings = {
    positionStrategy: new ConnectedPositioningStrategy({
      horizontalDirection: HorizontalAlignment.Left,
      horizontalStartPoint: HorizontalAlignment.Right,
      verticalStartPoint: VerticalAlignment.Bottom,
    }),
    scrollStrategy: new NoOpScrollStrategy(),
  };

  callbackFilterKey(item: IDropDown) {
    const key = this.filterKey ? this.filterKey : DATE_FILTER.BU;
    return item.filterKey == key;
  }

  groupKey(id: string | number) {
    return this.dropdownItems.filter((fi) => fi.groupKey === id).length !== 0;
  }

  constructor() { }

  ngOnInit(): void { }

  select(dateStatus: string | number) {
    if (dateStatus === DATE_STATUS.BUGUN) {
      this.dateStatus = 'Bugun';
      this.onDateTypeSelected.emit({
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
      } as DateRange);
    } else if (dateStatus === DATE_STATUS.DUN) {
      this.dateStatus = 'Dun';
      this.onDateTypeSelected.emit({
        start: startOfDay(subDays(new Date(), 1)),
        end: endOfDay(subDays(new Date(), 1)),
      } as DateRange);
    } else if (dateStatus === DATE_STATUS.YARIN) {
      this.dateStatus = 'Yarin';
      this.onDateTypeSelected.emit({
        start: startOfDay(addDays(new Date(), 1)),
        end: endOfDay(addDays(new Date(), 1)),
      } as DateRange);
    } else if (dateStatus === DATE_STATUS.BU_HAFTA) {
      this.dateStatus = 'BuHafta';
      this.onDateTypeSelected.emit({
        start: startOfWeek(new Date()),
        end: endOfWeek(new Date()),
      } as DateRange);
    } else if (dateStatus === DATE_STATUS.GECEN_HAFTA) {
      this.dateStatus = 'GecenHafta';
      this.onDateTypeSelected.emit({
        start: startOfWeek(subWeeks(new Date(), 1)),
        end: endOfWeek(subWeeks(new Date(), 1)),
      } as DateRange);
    } else if (dateStatus === DATE_STATUS.GELECEK_HAFTA) {
      this.dateStatus = 'GelecekHafta';
      this.onDateTypeSelected.emit({
        start: startOfWeek(addWeeks(new Date(), 1)),
        end: endOfWeek(addWeeks(new Date(), 1)),
      } as DateRange);
    } else if (dateStatus === DATE_STATUS.BU_AY) {
      this.dateStatus = 'BuAy';
      this.onDateTypeSelected.emit({
        start: startOfMonth(new Date()),
        end: endOfMonth(new Date()),
      } as DateRange);
    } else if (dateStatus === DATE_STATUS.GECEN_AY) {
      this.dateStatus = 'GecenAy';
      this.onDateTypeSelected.emit({
        start: startOfMonth(subMonths(new Date(), 1)),
        end: endOfMonth(subMonths(new Date(), 1)),
      } as DateRange);
    } else if (dateStatus === DATE_STATUS.GELECEK_AY) {
      this.dateStatus = 'GelecekAy';
      this.onDateTypeSelected.emit({
        start: startOfMonth(addMonths(new Date(), 1)),
        end: endOfMonth(addMonths(new Date(), 1)),
      } as DateRange);
    } else if (dateStatus === DATE_STATUS.BU_YIL) {
      this.dateStatus = 'BuYil';
      this.onDateTypeSelected.emit({
        start: startOfYear(new Date()),
        end: endOfYear(new Date()),
      } as DateRange);
    } else if (dateStatus === DATE_STATUS.GECEN_YIL) {
      this.dateStatus = 'GecenYil';
      this.onDateTypeSelected.emit({
        start: startOfYear(subYears(new Date(), 1)),
        end: endOfYear(subYears(new Date(), 1)),
      } as DateRange);
    } else if (dateStatus === DATE_STATUS.GELECEK_YIL) {
      this.dateStatus = 'GelecekYil';
      this.onDateTypeSelected.emit({
        start: startOfYear(addYears(new Date(), 1)),
        end: endOfYear(addYears(new Date(), 1)),
      } as DateRange);
    }
  }

  onSelectionChange(event: ISelectionEventArgs) {
    if (event.newSelection.value == this._filterKey.OZEL) {
      event.cancel = true;
    } else {
      this.dateRange = '';
    }
  }

  onDateSelectedChange(event: DateRange) {
    this.dateRange = event.start + '-' + event.end;

    if (this.dateRange) {
      this.dropDownRangeSelect.clearSelection();
      this.dropDownRangeSelect.toggle();
    }
  }

  clear(event: MouseEvent) {
    event.stopPropagation();
    this.dropDownRangeSelect.clearSelection();
    this.dateStatus = '';
    this.dateRange = '';
  }
}
