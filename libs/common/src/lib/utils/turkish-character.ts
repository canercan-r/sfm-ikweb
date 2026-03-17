const languageKey = 'language';

declare global {
  interface String {
    toTurkishLowerCase(): string;
    toTurkishUpperCase(): string;
    toCapitalize(): string;
  }
}
String.prototype.toTurkishLowerCase = function (): string {
  const letters = { İ: 'i', I: 'ı', i: 'i', ı: 'ı' };
  return this.replace(/(([İIiı]))/g, function (letter: string) {
    return letters[letter];
  }).toLocaleLowerCase();
};
String.prototype.toTurkishUpperCase = function (): string {
  const letters = { i: 'İ', ı: 'I', İ: 'İ', I: 'I' };
  return this.replace(/(([İIiı]))/g, function (letter: string) {
    return letters[letter];
  }).toLocaleUpperCase();
};
export { };

export function toLocaleUpperCase(letter: string) {
  //Turkish alphabets
  const turkish_toCapital_letters: Map<string, string> = new Map([
    ['ç', 'Ç'],
    ['ğ', 'Ğ'],
    ['i', 'İ'],
    ['ı', 'I'],
    ['ö', 'Ö'],
    ['ş', 'Ş'],
    ['ü', 'Ü'],
    ['Ç', 'Ç'],
    ['Ğ', 'Ğ'],
    ['İ', 'İ'],
    ['I', 'I'],
    ['Ö', 'Ö'],
    ['Ş', 'Ş'],
    ['Ü', 'Ü'],
  ]);
  if (turkish_toCapital_letters.has(letter)) return turkish_toCapital_letters.get(letter);
  return letter.toUpperCase();
}

export function localeSort(letter1: string, letter2: string) {
  const alphabets = [
    'A',
    'B',
    'C',
    'Ç',
    'D',
    'E',
    'F',
    'G',
    'Ğ',
    'H',
    'I',
    'İ',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'Ö',
    'P',
    'Q',
    'R',
    'S',
    'Ş',
    'T',
    'U',
    'Ü',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  const len = letter1.length >= letter2.length ? letter1.length : letter2.length;
  for (let i = 0; i < len; ++i) {
    const ind1 = alphabets.indexOf(toLocaleUpperCase(letter1.charAt(i)));
    const ind2 = alphabets.indexOf(toLocaleUpperCase(letter2.charAt(i)));
    if (ind1 > ind2) return 1;
    else if (ind1 < ind2) return -1;
  }
  return 1;
}
