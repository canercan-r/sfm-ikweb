import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const paraBirimiMap = new Map([
  [1, 'TRY'],
  [2, 'USD'],
  [3, 'EUR'],
  [4, 'GBP'],
  [5, 'JPY'],
  [6, 'ALL'],
]);

@Pipe({
  name: 'currencyFormat',
})
export class CurrencyFormatPipe implements PipeTransform {
  constructor(private _translateService: TranslateService) { }

  transform(value: number | string, paraBirimiID = 1, shiftPlaces = true): string {
    if (value == null || isNaN(+value)) return '';

    const numericValue = +value;
    const currencyCode = paraBirimiMap.get(paraBirimiID) || 'TRY';
    const locale = this._translateService.currentLang.substring(0, 2);

    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

    const parts = formatter.formatToParts(numericValue);
    const currencySymbol = parts.find(p => p.type === 'currency')?.value || '';
    const numberOnly = parts.filter(p => p.type !== 'currency').map(p => p.value).join('');

    let result = '';

    if (shiftPlaces) {
      result = `${currencySymbol}${numberOnly}`;
    } else {
      result = formatter.format(numericValue);
    }

    return result;
  }
}
