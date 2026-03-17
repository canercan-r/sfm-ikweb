import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'dateFormat',
  pure: true,
})

export class DateFormatPipe implements PipeTransform {
  constructor(private readonly translateService: TranslateService) { }

  transform(date: Date | string) {
    const d = new DatePipe(this.translateService.currentLang);
    const newDate = d.transform(date, 'dd.MM.yyyy');
    return newDate;
  }

}
