import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, EnvironmentInjector, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@ikweb-env/environment';
import { ILoginRequest } from '@ikweb-models/auth/interfaces';
import { AuthAPIService } from '@ikweb-services/apis/auth-api.service';
import { ELogoTurleri, EncrDecrService, getLogoSafe } from '@lib-common';
import { UserInfoService } from '@lib-core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { first, Observable, Subscription } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'ikweb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  // SenkronThemes mock, change it to:
  defaultAuth: ILoginRequest = {
    email: 'caner.can@senkron.net',
    password: 'senkron',
  };

  isLogoSvgOrNot: boolean | null = environment.isLogoSvgOrNot;
  logoTypeEnum = ELogoTurleri;

  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;

  brandName: string;

  private unsubscribe: Subscription[] = [];

  constructor(
    private _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _fb: FormBuilder,
    private readonly _api: AuthAPIService,
    private readonly _user: UserInfoService,
    private readonly _translate: TranslateService,
    private _cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document,
    private _encr: EncrDecrService,
    private _environmentInjector: EnvironmentInjector,
  ) {
    this.isLoading$ = this._api.isLoading$;

    // redirect to home if already logged in
    if (_user.CurrentUser) {
      this._router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initForm();

    const rememberMe = this.convertBoolean(this.getUserCookie('remember'));

    if (rememberMe) {
      const encryptedEmail = this.getUserCookie('email');
      const email = encryptedEmail ? this._encr.decrypt(encryptedEmail) : '';

      this.loginForm.patchValue({
        email,
        remember: true
      });
    }

    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get ctrl() {
    return this.loginForm.controls;
  }

  forgotPassword() {
    // this._router.navigate(['auth/forgot-password'])
  }

  initForm() {
    this.loginForm = this._fb.group({
      email: [
        this.defaultAuth.email,
        Validators.compose([Validators.required]),
      ],
      password: [
        this.defaultAuth.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ]),
      ],
      remember: false,
    });
  }

  login() {
    this.hasError = false;

    const req: ILoginRequest = {
      email: this.ctrl['email'].value,
      password: this.ctrl['password'].value,
      remember: this.ctrl['remember'].value
    }

    const loginSubscr = this._api
      .login(req)
      .pipe(first())
      .subscribe((user) => {
        if (user) {
          this._user.insertUser(user as any);
          this._translate.use(user.language.replace('-', ''));
          this.document.documentElement.setAttribute('lang', user?.language?.replace('-', '').substring(0, 2));
          // this.router.navigate([this.returnUrl]);
          this.setUserCookie();
          this._router.navigate([this._route.snapshot.queryParams['redirect'] || '/home'], { replaceUrl: true });
        } else {
          this.hasError = true;
        }
      });
    this.unsubscribe.push(loginSubscr);
  }

  setUserCookie(): void {
    const remember = this.loginForm.get('remember').value;

    if (remember) {
      document.cookie =
        'email=' +
        this._encr.encrypt(this.loginForm.get('email').value) +
        ';expires=Thu, 18 Dec 2040 12:00:00 UTC; path=/';

      document.cookie =
        'remember=true;expires=Thu, 18 Dec 2040 12:00:00 UTC; path=/';
    } else {
      // Email cookie’sini boşalt
      document.cookie =
        'email=;expires=Thu, 18 Dec 2040 12:00:00 UTC; path=/';

      // remember cookie’sini temizle
      document.cookie =
        'remember=;expires=Thu, 18 Dec 2040 12:00:00 UTC; path=/';
    }
  }

  getUserCookie(key: string): string {
    const name = key + '=';
    const ca = document.cookie.split(';');
    for (let c of ca) {
      c = c.trim();
      if (c.startsWith(name)) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  convertBoolean(stringValue: string): boolean {
    if (stringValue === 'true') return true;
    if (stringValue === 'false') return false;
    return false;
  }

  getLogo(logoType: ELogoTurleri): string {
    return getLogoSafe(this._environmentInjector, logoType, this.isLogoSvgOrNot, () => {
      this._cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
