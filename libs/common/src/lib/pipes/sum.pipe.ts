import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sum'
})
export class SumPipe implements PipeTransform {
  transform(items: any[], field: string): number {
    if (!Array.isArray(items)) return 0;

    return items.reduce((acc, item) => {
      const value = parseFloat(item?.[field]) || 0;
      return acc + value;
    }, 0);
  }
}
