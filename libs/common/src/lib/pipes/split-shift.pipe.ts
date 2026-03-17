import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitShift',
  pure: true
})
export class SplitShiftPipe implements PipeTransform {
  transform(value: string, numberVal: string): string {
    const numberStartIndex = value.indexOf(numberVal);
    return `${value.substring(numberStartIndex)} ${value.substring(0, numberStartIndex)}`;
  }
}
