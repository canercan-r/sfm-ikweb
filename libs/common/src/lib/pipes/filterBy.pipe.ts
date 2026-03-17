import { Pipe, PipeTransform } from '@angular/core';

function resolvePath(path: string | string[], obj: unknown, separator = '.') {
  const properties = Array.isArray(path) ? path : path.split(separator);
  return properties.reduce((prev, curr) => prev && prev[curr], obj);
}

export interface IFilterOptions {
  key: string | string[];
  value?: unknown;
  compareFunc?: (a: any, b: any) => boolean;
}

@Pipe({
  name: 'filterBy',
})
export class FilterByPipe implements PipeTransform {
  transform<T extends object>(
    array: T[],
    key: string | string[],
    value?: unknown | unknown[],
    compareFunc = Object.is,
  ): T[] {
    if (!array) {
      return [];
    }

    if (Array.isArray(value)) {
      return value.length > 0
        ? array.filter((e) =>
          Array.isArray(key)
            ? key.some((k) => value.some((el) => compareFunc(el, resolvePath(k, e))))
            : value.some((el) => compareFunc(el, resolvePath(key, e))),
        )
        : array;
    }

    return value
      ? array.filter((e) =>
        Array.isArray(key)
          ? key.some((k) => compareFunc(resolvePath(k, e), value))
          : compareFunc(resolvePath(key, e), value),
      )
      : array;
  }
}
