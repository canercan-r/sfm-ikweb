import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@ikweb-env/environment.prod';
import { MenuComponent } from '@ikweb-scripts/components';
import { LanguageService } from '@lib-common';
import { IUser, UserInfoService } from '@lib-core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'ikweb-user-inner',
  templateUrl: './user-inner.component.html',
  styleUrls: ['./user-inner.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserInnerComponent implements OnInit, OnDestroy {
  @Input() innerId: string;
  @Input() triggerId: string;

  user$: Observable<IUser>;
  public version: string;

  private unsubscribe: Subscription[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private readonly _userInfo: UserInfoService,
    private readonly _lang: LanguageService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.version = environment.version;
    this.user$ = this._userInfo.currentUser$;
  }

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
    this._userInfo.logout();
  }

  dismiss(e?: Event) {
    let itemEl = this.document.querySelector(`#${this.innerId}`) as HTMLElement;
    let triggerEl = this.document.querySelector(`#${this.triggerId}`) as HTMLElement;

    let menu = MenuComponent.getInstance(itemEl);
    e ? menu.dismiss(itemEl, e) : menu.hide(itemEl);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  tesisSecim() {
    this.router.navigate(['tesis-secim']);
  }
}
