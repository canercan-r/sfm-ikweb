import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConnectedPositioningStrategy, DateRange, HorizontalAlignment, NoOpScrollStrategy, VerticalAlignment } from '@infragistics/igniteui-angular';
import { DATE_FILTER, DATE_GROUP, DATE_STATUS, IDropDown } from '@lib-common';
import { addDays, addMonths, addWeeks, addYears, endOfDay, endOfMonth, endOfWeek, endOfYear, startOfDay, startOfMonth, startOfWeek, startOfYear, subDays, subMonths, subWeeks, subYears } from 'date-fns';

@Component({
  selector: 'lib-dropdown-date-range',
  templateUrl: './dropdown-date-range.component.html',
  styleUrls: ['./dropdown-date-range.component.scss']
})
export class DropdownDateRangeComponent implements OnInit {
  @Output() onDateTypeSelected = new EventEmitter<DateRange>();
  @Input() buttonLabel: string;
  @Input() buttonClass: string;
  @Input() clearButton: boolean;
  @Input() filterKey: DATE_FILTER;
  @Input() isGroup = true;
  @Input() isDivider = true;

  tarihTipi = 'Bugun';

  dropdownItems: IDropDown[] = [
    { valueKey: DATE_STATUS.BUGUN, displayKey: 'Bugun', groupKey: DATE_GROUP.GUN, filterKey: DATE_FILTER.BU },
    { valueKey: DATE_STATUS.DUN, displayKey: 'Dun', groupKey: DATE_GROUP.GUN, filterKey: DATE_FILTER.GECEN },
    { valueKey: DATE_STATUS.YARIN, displayKey: 'Yarin', groupKey: DATE_GROUP.GUN, filterKey: DATE_FILTER.GELECEK },
    { valueKey: DATE_STATUS.BU_HAFTA, displayKey: 'BuHafta', groupKey: DATE_GROUP.HAFTA, filterKey: DATE_FILTER.BU },
    { valueKey: DATE_STATUS.GECEN_HAFTA, displayKey: 'GecenHafta', groupKey: DATE_GROUP.HAFTA, filterKey: DATE_FILTER.GECEN },
    { valueKey: DATE_STATUS.GELECEK_HAFTA, displayKey: 'GelecekHafta', groupKey: DATE_GROUP.HAFTA, filterKey: DATE_FILTER.GELECEK },
    { valueKey: DATE_STATUS.BU_AY, displayKey: 'BuAy', groupKey: DATE_GROUP.AY, filterKey: DATE_FILTER.BU },
    { valueKey: DATE_STATUS.GECEN_AY, displayKey: 'GecenAy', groupKey: DATE_GROUP.AY, filterKey: DATE_FILTER.GECEN },
    { valueKey: DATE_STATUS.GELECEK_AY, displayKey: 'GelecekAy', groupKey: DATE_GROUP.AY, filterKey: DATE_FILTER.GELECEK },
    { valueKey: DATE_STATUS.BU_YIL, displayKey: 'BuYil', groupKey: DATE_GROUP.YIL, filterKey: DATE_FILTER.BU },
    { valueKey: DATE_STATUS.GECEN_YIL, displayKey: 'GecenYil', groupKey: DATE_GROUP.YIL, filterKey: DATE_FILTER.GECEN },
    { valueKey: DATE_STATUS.GELECEK_YIL, displayKey: 'GelecekYil', groupKey: DATE_GROUP.YIL, filterKey: DATE_FILTER.GELECEK },
  ];

  overlaySettings = {
    positionStrategy: new ConnectedPositioningStrategy({
      horizontalDirection: HorizontalAlignment.Left,
      horizontalStartPoint: HorizontalAlignment.Right,
      verticalStartPoint: VerticalAlignment.Bottom
    }),
    scrollStrategy: new NoOpScrollStrategy()
  };

  callbackFilterKey(item: IDropDown) {
    const asd = this.filterKey ? this.filterKey : DATE_FILTER.BU
    return item.filterKey == asd;
  }

  groupKey(id: string | number) {
    return (
      this.dropdownItems.filter((fi) => fi.groupKey === id).length !== 0
    );
  }

  constructor() { }

  ngOnInit(): void { }

  select(tarihTipi: string | number) {
    if (tarihTipi === DATE_STATUS.BUGUN) {
      this.tarihTipi = 'Bugun';
      this.onDateTypeSelected.emit({
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
      } as DateRange);
    } else if (tarihTipi === DATE_STATUS.DUN) {
      this.tarihTipi = 'Dun';
      this.onDateTypeSelected.emit({
        start: startOfDay(subDays(new Date(), 1)),
        end: endOfDay(subDays(new Date(), 1)),
      } as DateRange);
    } else if (tarihTipi === DATE_STATUS.YARIN) {
      this.tarihTipi = 'Yarin';
      this.onDateTypeSelected.emit({
        start: startOfDay(addDays(new Date(), 1)),
        end: endOfDay(addDays(new Date(), 1)),
      } as DateRange);
    } else if (tarihTipi === DATE_STATUS.BU_HAFTA) {
      this.tarihTipi = 'BuHafta';
      this.onDateTypeSelected.emit({
        start: startOfWeek(new Date()),
        end: endOfWeek(new Date()),
      } as DateRange);
    } else if (tarihTipi === DATE_STATUS.GECEN_HAFTA) {
      this.tarihTipi = 'GecenHafta';
      this.onDateTypeSelected.emit({
        start: startOfWeek(subWeeks(new Date(), 1)),
        end: endOfWeek(subWeeks(new Date(), 1)),
      } as DateRange);
    } else if (tarihTipi === DATE_STATUS.GELECEK_HAFTA) {
      this.tarihTipi = 'GelecekHafta';
      this.onDateTypeSelected.emit({
        start: startOfWeek(addWeeks(new Date(), 1)),
        end: endOfWeek(addWeeks(new Date(), 1)),
      } as DateRange);
    } else if (tarihTipi === DATE_STATUS.BU_AY) {
      this.tarihTipi = 'BuAy';
      this.onDateTypeSelected.emit({
        start: startOfMonth(new Date()),
        end: endOfMonth(new Date()),
      } as DateRange);
    } else if (tarihTipi === DATE_STATUS.GECEN_AY) {
      this.tarihTipi = 'GecenAy';
      this.onDateTypeSelected.emit({
        start: startOfMonth(subMonths(new Date(), 1)),
        end: endOfMonth(subMonths(new Date(), 1)),
      } as DateRange);
    } else if (tarihTipi === DATE_STATUS.GELECEK_AY) {
      this.tarihTipi = 'GelecekAy';
      this.onDateTypeSelected.emit({
        start: startOfMonth(addMonths(new Date(), 1)),
        end: endOfMonth(addMonths(new Date(), 1)),
      } as DateRange);
    } else if (tarihTipi === DATE_STATUS.BU_YIL) {
      this.tarihTipi = 'BuYil';
      this.onDateTypeSelected.emit({
        start: startOfYear(new Date()),
        end: endOfYear(new Date()),
      } as DateRange);
    } else if (tarihTipi === DATE_STATUS.GECEN_YIL) {
      this.tarihTipi = 'GecenYil';
      this.onDateTypeSelected.emit({
        start: startOfYear(subYears(new Date(), 1)),
        end: endOfYear(subYears(new Date(), 1)),
      } as DateRange);
    } else if (tarihTipi === DATE_STATUS.GELECEK_YIL) {
      this.tarihTipi = 'GelecekYil';
      this.onDateTypeSelected.emit({
        start: startOfYear(addYears(new Date(), 1)),
        end: endOfYear(addYears(new Date(), 1)),
      } as DateRange);
    }
  }

  clear(event: MouseEvent) {
    this.tarihTipi = '';
    event.stopPropagation();
  }
}
