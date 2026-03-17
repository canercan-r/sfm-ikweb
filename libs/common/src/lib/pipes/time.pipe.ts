import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  pure: true,
})
export class TimeFormatPipe implements PipeTransform {
  constructor(private readonly datePipe: DatePipe) {}

  transform(date: Date | string) {
    const newDate = this.datePipe.transform(date, 'HH:mm');
    return newDate;
  }
}
