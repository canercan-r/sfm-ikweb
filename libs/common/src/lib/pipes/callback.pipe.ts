import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'callback',
  pure: false,
})
export class CallBackPipe implements PipeTransform {
  transform(items: any[], callback: (item: any) => boolean): any {
    if (!items || !callback) {
      return items;
    }
    return items.filter((item) => callback(item));
  }
}
