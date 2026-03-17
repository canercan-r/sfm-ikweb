import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { LanguageService } from '@lib-common';
import { IUser, UserInfoService } from '@lib-core';
import { User } from '@mock-api';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cv-user-inner',
  templateUrl: './user-inner.component.html',
  styleUrls: ['./user-inner.component.scss']
})
export class UserInnerComponent implements OnInit, OnDestroy {
  @HostBinding('class')
  class = `menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px`;
  @HostBinding('attr.data-st-menu') dataStMenu = 'true';

  user$: Observable<IUser | User> = this._user.currentUser$;

  private unsubscribe: Subscription[] = [];

  constructor(
    private readonly _lang: LanguageService,
    private readonly _user: UserInfoService,
  ) { }

  ngOnInit(): void { }

  setLanguage(language: string) {
    this._lang.language = language;
  }

  get currentLanguage(): string {
    return this._lang.language;
  }

  get languages(): string[] {
    return this._lang.supportedLanguages;
  }

  logout() {
    this._user.logout();
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
