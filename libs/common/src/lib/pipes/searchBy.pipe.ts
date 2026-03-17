import { Pipe, PipeTransform } from '@angular/core';

function compareFunc(element: string, value: string) {
  return element?.toLocaleLowerCase().includes(value.toLocaleLowerCase());
}

function resolvePath(path: string | string[], obj: unknown, separator = '.') {
  const properties = Array.isArray(path) ? path : path.split(separator);
  return properties.reduce((prev, curr) => prev && prev[curr], obj);
}

@Pipe({
  name: 'searchBy',
})
export class SearchByPipe implements PipeTransform {
  transform<T extends object>(array: T[], key: string | string[], value?: string): T[] {
    return value
      ? array.filter((e) =>
        Array.isArray(key)
          ? key.some((k) => compareFunc(resolvePath(k, e) as string, value))
          : compareFunc(resolvePath(key, e) as string, value),
      )
      : array;
  }
}
