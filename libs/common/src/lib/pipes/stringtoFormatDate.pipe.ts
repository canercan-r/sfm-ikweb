import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'stringtoFormatDate',
})
export class StringtoFormatDatePipe implements PipeTransform {
  constructor(private readonly translateService: TranslateService, private readonly datePipe: DatePipe) {}

  transform(date: Date | string, format = 'dd MMMM yyyy'): any {
    const newDate = this.datePipe.transform(date, format);
    return newDate;
  }
}
