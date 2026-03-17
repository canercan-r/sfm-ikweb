import { Pipe, PipeTransform } from '@angular/core';
import { UserInfoService } from '@lib-core';

@Pipe({ name: 'localeTitleCase' })
export class LocaleTitleCasePipe implements PipeTransform {
  lang: string;

  constructor(_user: UserInfoService) {
    this.lang = _user.CurrentUser.language.substring(0, 2);
  }

  public transform(value: string) {
    if (!value) {
      return value;
    }

    const locale = this.lang === 'tr' ? this.lang : 'en-US';

    const splitStr = value.toLocaleLowerCase(locale).split(' ');
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toLocaleUpperCase(locale) + splitStr[i].substring(1);
    }

    return splitStr.join(' ');
  }
}
