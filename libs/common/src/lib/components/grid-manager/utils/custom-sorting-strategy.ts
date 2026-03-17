import { ISortingStrategy, SortingDirection } from '@infragistics/igniteui-angular';
import { GridColumnSortTypes } from '../models';

//Custom sorting for formatted date strings
export class CustomSortingStrategy implements ISortingStrategy {
  sortType: GridColumnSortTypes;
  constructor(sortType: GridColumnSortTypes) {
    this.sortType = sortType;
  }
  public sort(data: any[], fieldName: string, dir: SortingDirection, ignoreCase: boolean) {
    if (dir === SortingDirection.None) {
      return data;
    } else {
      const cmpFunc = (a, b) => {
        return this.compareObjects(a, b, ignoreCase, dir, fieldName);
      };
      const result = data.sort(cmpFunc);
      return result;
    }
  }

  protected compareObjects(obj1: any, obj2: any, ignoreCase: boolean, dir: number, fieldName: string) {
    let a = obj1[fieldName];
    let b = obj2[fieldName];

    if (ignoreCase) {
      a = a ? a.toLowerCase() : a;
      b = b ? b.toLowerCase() : b;
    }
    return this.sortType === GridColumnSortTypes.StringTypeDate
      ? this.sortByParityStringDateValues(a, b, dir)
      : this.sortByParityStringNumberValues(a, b, dir);
  }

  protected sortByParityStringDateValues(a: any, b: any, dir: number) {
    const timeA = a ? a.split('.').reverse().join('') : a;
    const timeB = b ? b.split('.').reverse().join('') : b;

    if (dir === SortingDirection.Asc) {
      return timeA === timeB ? 0 : timeA < timeB ? -1 : 1;
    } else if (dir === SortingDirection.Desc) {
      return timeA === timeB ? 0 : timeA > timeB ? -1 : 1;
    }
  }

  protected sortByParityStringNumberValues(a: any, b: any, dir: number) {
    if (dir === SortingDirection.Asc) {
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    } else if (dir === SortingDirection.Desc) {
      return b.localeCompare(a, undefined, { numeric: true, sensitivity: 'base' });
    }
  }
}
