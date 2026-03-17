import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringtoFormatTime',
  pure: true
})
export class StringtoFormatTimePipe implements PipeTransform {
  transform(value: number, format = 'hh:MM:ss'): string {
    const hours = Math.floor(value / 60 / 60);
    const minutes = Math.floor(value / 60) % 60;
    const seconds = value % 60;
    const hoursPart = format.search('hh') >= 0 ? `${this.padding(hours)}${hours}` : '';
    const minPart = format.search('MM') >= 0 ? `${this.padding(minutes)}${minutes}` : '';
    const secondsPart = format.search('ss') >= 0 ? `${this.padding(seconds)}${seconds}` : '';
    return format.replace('hh', hoursPart).replace('MM', minPart).replace('ss', secondsPart);
  }

  private padding(time: number): string {
    return time < 10 ? '0' : '';
  }
}
