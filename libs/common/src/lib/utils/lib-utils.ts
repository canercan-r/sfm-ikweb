/**
 * @hidden
 * reference:
 * @link  https://www.oreilly.com/library/view/regular-expressions-cookbook/9780596802837/ch04s07.html
 */

import { EnvironmentInjector, inject, runInInjectionContext } from "@angular/core";
import { CINSIYET_TURLERI, ELogoTurleri } from "@lib-common";
import { ConfigurationService } from "@lib-core";

export const MY_DATE_API_FORMAT = 'dd.MM.yyyy HH:mm';
export const MILLISECONDS_IN_A_MIN = 60 * 1000;
export const MILLISECONDS_IN_A_HOUR = 60 * MILLISECONDS_IN_A_MIN;
export const MILLISECONDS_IN_A_DAY = 24 * MILLISECONDS_IN_A_HOUR;

const regexDateIso8601 =
  /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[0-1]|0[1-9]|[1-2][0-9])T(2[0-3]|[0-1][0-9]):([0-5][0-9]):([0-5][0-9])(\.[0-9]+)?(Z|[+-](?:2[0-3]|[0-1][0-9]):[0-5][0-9])?$/;

const regexEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const regexDigit = /^\d+$/;

const turkMobilRegex = /^((\+|00)?90)?5\d{9}$/;

function _isUndefined(value: any): boolean {
  return typeof value === 'undefined';
}
function _isNil(value: any): boolean {
  return value === null || typeof value === 'undefined';
}
function _isObject(value: any): boolean {
  return value !== null && typeof value === 'object';
}
function _isNumber(value: any): boolean {
  return typeof value === 'number';
}
function _isString(value: any): boolean {
  return typeof value === 'string';
}
function _isFunction(value: any): boolean {
  return typeof value === 'function';
}
function _isBoolean(value: any): boolean {
  return typeof value === 'boolean';
}
function _isValidIso8601Date(dateString: string): boolean {
  return regexDateIso8601.test(dateString);
}
function _isDateObjValid(date: any): boolean {
  return date != null && date instanceof Date && !isNaN(date.getTime());
}
function _isArray(value: any): boolean {
  return Array.isArray(value);
}

function _isArrayEmpty(value: any): boolean {
  return _isArray(value) && value.length === 0;
}

function _firstItem<T>(source: T[]): T | undefined {
  return [].concat(source).shift();
}
function _emailIsValid(email: string): boolean {
  return regexEmail.test(email);
}

function _tcKimlikIsValid(tcNo: string): boolean {
  if (regexDigit.test(tcNo) && tcNo.length === 11 && !tcNo.startsWith('0')) {
    const _tcNo = tcNo.split('').map(Number);

    let _oddnumberTotal = 0;
    let _evenNumberTotal = 0;
    let _tenValueTotal = 0;

    _tcNo.forEach((x, index) => {
      if (index < 9) {
        if (index % 2 === 0) {
          _oddnumberTotal += x;
        } else {
          _evenNumberTotal += x;
        }
      }

      if (index < 10) {
        _tenValueTotal += x;
      }
    });

    const _tenthValueCalc = Math.abs((_oddnumberTotal * 7 - _evenNumberTotal) % 10);
    if (_tcNo[9] !== _tenthValueCalc) {
      return false;
    }
    const _eleventhValueCalc = _tenValueTotal % 10;
    if (_tcNo[10] !== _eleventhValueCalc) {
      return false;
    }

    return true;
  }

  return false;
}

function _extractValueFromArray<T, K extends keyof T>(
  source: T[],
  predicate: (item: T) => boolean,
  extractField: K,
): T[K] {
  const search = source.find(predicate);
  return search ? search[extractField] : undefined;
}

function _nameInitials(fullnameString: string): string {
  const initials = fullnameString.match(/\b\w/g) || [];
  return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
}

function _getProperty(value: { [key: string]: any }, key: string): any {
  if (_isNil(value) || !_isObject(value)) {
    return undefined;
  }
  if (_isNil(key)) {
    return undefined;
  }
  const keys: string[] = key.split('.');
  let result: any = value[keys.shift()];
  for (const _key of keys) {
    if (_isNil(result) || !_isObject(result)) {
      return undefined;
    }
    result = result[_key];
  }

  return result;
}

function _pluck<T, K extends keyof T>(source: T[], key: K): T[K][] {
  return source.reduce((values, current) => {
    values.push(current[key]);
    return values;
  }, []);
}

function _distinctForKey<T, K extends keyof T>(source: T[], theField: K): T[K][] {
  return [...new Set(_pluck(source, theField).filter(Boolean))];
}

const _uniqBy = <T, K extends keyof T>(
  arr: T[],
  uniqKey: K,
  projectionKeys?: K[],
): {
  [P in K]: T[P];
}[] => [
    ...arr
      .filter(Boolean)
      .reduce((map, item) => {
        const distinctKey = item[uniqKey];

        if (map.has(distinctKey)) {
          return map;
        }

        let obj: Partial<T> = {};
        if (projectionKeys) {
          projectionKeys.forEach((key) => {
            obj[key] = item[key];
          });
        } else {
          obj = item;
        }

        return map.set(distinctKey, obj);
      }, new Map())
      .values(),
  ];

function _buildRange(range: number, startVal = 0, step = 1): number[] {
  return Array.from({ length: range }, (_, i) => i * step + startVal);
}

function _chunkify<T>(source: T[], chunkSize = 10): T[][] {
  return Array.from({ length: Math.ceil(source.length / chunkSize) }, (_, i) => {
    const start = chunkSize * i;
    return source.slice(start, start + chunkSize);
  });
}

function freeze<T>(obj: T): Readonly<T> {
  return obj as Readonly<T>;
}

const groupByHighOrderFunc =
  <T, K extends keyof T>(arraySource: T[]) =>
    (keys: K[]) =>
      arraySource.reduce((acc, cur) => {
        keys.forEach((key) => {
          acc[cur[key]] = (acc[cur[key]] || []).concat(cur);
        });
        return acc;
      }, Object.create(null));

function getFirstLast<T>(arraySource: T[]): { first: T; last: T } {
  const { 0: first, length: len, [len - 1]: last } = arraySource;
  return { first, last };
}

const pipe =
  (...fns) =>
    (x) =>
      fns.reduce((acc, curr) => curr(acc), x);
const objToList: <T, K extends keyof T>(obj: T) => T[K][] = (obj) => Object.values(obj);

/**
 * Functional style switchcase
 */
type Value<T> = T | (() => T);
type CaseOfDefault<C, V> = (key: keyof C) => V | (() => V);

const findCaseValue = <C, V>(cases: C, defaultCase: V): CaseOfDefault<C, V> =>
  ((key: keyof C) => cases[key] || defaultCase) as CaseOfDefault<C, V>;

const switchCase =
  <V, C extends Record<string, Value<V>>>(cases: C, defaultCase: V) =>
    (key: keyof C) => {
      const f = findCaseValue(cases, defaultCase)(key);
      return f instanceof Function ? f() : f;
    };

const removeEmpty = <T>(obj: T): NonNullable<T> =>
  Object.keys(obj)
    .filter((k) => obj[k] != null)
    .reduce(
      (newObj, k) =>
        typeof obj[k] === 'object' ? { ...newObj, [k]: removeEmpty(obj[k]) } : { ...newObj, [k]: obj[k] },
      {},
    ) as NonNullable<T>;

function removeTimeZonePart(date: Date): string {
  let finalDate = '';
  const dateString = date.toISOString();

  if (dateString.split('+').length > 1) {
    const b = dateString.split('+');

    finalDate = b[0];
  } else {
    const b = dateString.split('-');

    if (b.length > 1) {
      b.pop();
      finalDate = b.join('-');
    }
  }

  return finalDate;
}

// ref http://www.broofa.com/Tools/Math.uuid.js
export const _generateGUID = (len?: number, radix?: number) => {
  const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

  const chars = CHARS;
  const uuid = [];
  let i: number;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) {
      uuid[i] = chars[0 | (Math.random() * radix)];
    }
  } else {
    // rfc4122, version 4 form
    let r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('');
};

const _genRandomNumber = (length = 6): number => {
  const exp = Math.pow(10, length);
  return Math.floor(exp + Math.random() * 9 * exp);
};

const _IsValidturkMobile = (candidate: string): boolean => turkMobilRegex.test(candidate);

export function isObject(item: any): boolean {
  return item && typeof item === 'object' && !Array.isArray(item);
}

export function mergeDeep(target: any, source: any): any {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key: any) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = mergeDeep(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

type Predicate<T> = (x: T) => boolean;
type Transformation<T> = (x: T) => any;
interface IMatchContext<T> {
  on: (pred?: Predicate<T>, fn?: Transformation<T>) => IMatchContext<T | any>;
  otherwise: (fn: Transformation<T>) => any;
}

function matched<T>(x: T): IMatchContext<T> {
  return {
    on: () => matched(x),
    otherwise: () => x,
  };
}

export function formatCurrency(value: number): string {
  const hasFraction = value % 1 !== 0;

  return new Intl.NumberFormat('tr-TR', {
    style: 'decimal',
    minimumFractionDigits: hasFraction ? 2 : 0,
    maximumFractionDigits: hasFraction ? 2 : 0
  }).format(value);
}

export function parseCurrency(value: string): number {
  if (!value) return NaN;
  return parseFloat(value.replace(/\./g, '').replace(',', '.'));
}

export function match<T>(x: T): IMatchContext<T> {
  return {
    on: (pred, fn) => (pred(x) ? matched(fn(x)) : match(x)),
    otherwise: (fn) => fn(x),
  };
}

export const Utils = {
  isNumber: _isNumber,
  isArray: _isArray,
  isEmptyArray: _isArrayEmpty,
  isUndefined: _isUndefined,
  isString: _isString,
  isFunction: _isFunction,
  isBoolean: _isBoolean,
  firstItem: _firstItem,
  getSingleValue: _extractValueFromArray,
  isValidEmail: _emailIsValid,
  isValidIsoDate: _isValidIso8601Date,
  nameInitials: _nameInitials,
  getProperty: _getProperty,
  getUniqeForKey: _distinctForKey,
  pluck: _pluck,
  isValidDateObj: _isDateObjValid,
  rangeArray: _buildRange,
  divideArray: _chunkify,
  isValidTcKimlik: _tcKimlikIsValid,
  getFirstLast,
  pipe,
  toList: objToList,
  removeEmpty,
  removeTimeZonePart,
  uniqBy: _uniqBy,
  groupByHighOrderFunc,
  isValidturkMobil: _IsValidturkMobile,
  switchCase,
  generateGUID: _generateGUID,
  genRandomNumber: _genRandomNumber,
};

export const tcKimlikNoValidator = (value: string): boolean => {
  if (!value || value.length !== 11 || value[0] === '0') {
    return false;
  }

  let md = 0; // Tek sıra
  let mc = 0; // Çift sıra

  for (let i = 0; i < 9; i++) {
    const digit = parseInt(value.charAt(i), 10);
    if (isNaN(digit)) return false;
    if (i % 2 === 0) {
      md += digit;
    } else {
      mc += digit;
    }
  }

  const digit10 = parseInt(value.charAt(9), 10);
  if (((md * 7 - mc) % 10) !== digit10) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < 10; i++) {
    const digit = parseInt(value.charAt(i), 10);
    if (isNaN(digit)) return false;
    sum += digit;
  }

  const digit11 = parseInt(value.charAt(10), 10);
  if ((sum % 10) !== digit11) {
    return false;
  }

  return true;
};

export function resolvePath(path: string | string[], obj: unknown, separator = '.') {
  const properties = Array.isArray(path) ? path : path.split(separator);
  return properties.reduce((prev, curr) => prev && prev[curr], obj);
}

export function groupBy<T>(array: T[], key: keyof T) {
  if (!array) {
    return new Map<any, T[]>();
  }
  return array.reduce((acc, curr) => {
    const group = acc.get(curr[key]);
    if (group) {
      group.push(curr);
    } else {
      acc.set(curr[key], [curr]);
    }
    return acc;
  }, new Map<any, T[]>());
}

function genderSwitch(gender?: CINSIYET_TURLERI) {
  switch (gender) {
    case CINSIYET_TURLERI.ERKEK:
      return 'user-a.svg';

    case CINSIYET_TURLERI.KADIN:
      return 'user-a.svg';

    default:
      return 'user-a.svg';
  }
}

export function imgForGender(gender?: CINSIYET_TURLERI): string {
  const genderBasedAvatar: string = genderSwitch(gender);
  return `assets/icons/${genderBasedAvatar}`;
}

/**
 * Markaya göre logo path'ini döndürür.
 * Eksikse otomatik olarak varsayılan `Logo` dosyasına düşer.
 * HTML içinde direkt [src]="getLogoSafe(...)" şeklinde kullanılabilir.
 */
const logoCache: Record<string, string> = {};

export function getLogoSafe(
  environmentInjector: EnvironmentInjector,
  logoType: ELogoTurleri,
  isSvg: boolean,
  onFallback?: () => void
): string {
  const brandName = getBrandName(environmentInjector);
  const ext = isSvg ? 'svg' : 'png';
  const logoFile = logoSwitch(logoType);
  const path = `assets/branding/${brandName}/logos/${logoFile}.${ext}`;

  if (logoCache[path]) return logoCache[path];

  preloadLogo(path, logoType, ext, brandName, onFallback);

  return path;
}

function preloadLogo(
  path: string,
  logoType: ELogoTurleri,
  ext: string,
  brandName: string,
  onFallback?: () => void
): void {
  const img = new Image();

  img.onerror = () => {
    if (logoType !== ELogoTurleri.Logo) {
      const fallbackPath = `assets/branding/${brandName}/logos/${logoSwitch(ELogoTurleri.Logo)}.${ext}`;
      logoCache[path] = fallbackPath;
      onFallback?.();
    }
  };

  img.onload = () => {
    logoCache[path] = path;
  };

  img.src = path;
}

function logoSwitch(logo?: ELogoTurleri) {
  switch (logo) {
    case ELogoTurleri.LogoTextOnDark:
      return 'logo-text-on-dark';

    case ELogoTurleri.LogoTextOnLight:
      return 'logo-text-on-light';

    case ELogoTurleri.LogoTextInverse:
      return 'logo-text-inverse';

    case ELogoTurleri.LogoText:
      return 'logo-text';

    case ELogoTurleri.LogoOnDark:
      return 'logo-on-dark';

    case ELogoTurleri.LogoOnLight:
      return 'logo-on-light';

    default:
      return 'logo';
  }
}

export function getBrandName(environmentInjector: EnvironmentInjector) {
  return runInInjectionContext(environmentInjector, () => {
    const conf = inject(ConfigurationService);
    return conf.getAppSettings().BrandName;
  });
}

export function svgForLogo(environmentInjector: EnvironmentInjector, logo?: ELogoTurleri): string {
  const logoBasedImg: string = logoSwitch(logo);
  const brandName: string = getBrandName(environmentInjector);

  if (brandName) {
    return `assets/branding/${brandName}/logos/${logoBasedImg}.svg`;
  } else {
    return `assets/logos/${logoBasedImg}.svg`;
  }
}

export function pngForLogo(environmentInjector: EnvironmentInjector, logo?: ELogoTurleri): string {
  const logoBasedImg: string = logoSwitch(logo);
  const brandName: string = getBrandName(environmentInjector);

  if (brandName) {
    return `assets/branding/${brandName}/logos/${logoBasedImg}.png`;
  } else {
    return `assets/logos/${logoBasedImg}.png`;
  }
}

export function cmp<T>(a: T, b: T) {
  if (a > b) return +1;
  if (a < b) return -1;
  return 0;
}
