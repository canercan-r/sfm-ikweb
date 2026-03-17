import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conversionFormat',
})
export class ConversionPipe implements PipeTransform {
  transform(value: number, type: string, decimals: number): string {
    if (!value) {
      return ' - ';
    }
    return `${value.toFixed(decimals) ?? 0}${type}`;
  }
}
