import { Pipe, PipeTransform } from '@angular/core';

type KeyGenerator<T> = (a: T) => any;

/**
 *
 *  Anahtar null ise tüm eleman gruplarına eklenir
 */

@Pipe({
  name: 'groupBy',
})
export class GroupByPipe implements PipeTransform {
  transform<T extends object>(array: T[], keyGenerator: KeyGenerator<T>) {
    if (!array) {
      return new Map<string, T[]>();
    }

    const addToAll: T[] = [];
    const res = array.reduce((acc, curr) => {
      const key = keyGenerator(curr);
      if (!key) {
        addToAll.push(curr);
        return acc;
      }
      const group = acc.get(key);
      if (group) {
        group.push(curr);
      } else {
        acc.set(key, [curr]);
      }
      return acc;
    }, new Map<any, T[]>());

    res.forEach((g) => g.unshift(...addToAll));
    return res;
  }
}
