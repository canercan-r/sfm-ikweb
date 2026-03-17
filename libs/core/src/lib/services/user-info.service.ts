import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { IGridConfig } from "@lib-common";
import { BehaviorSubject } from "rxjs";
import { ConfigurationService } from "../configuration/configuration.service";
import { IUser } from "../models/interfaces";
import { B64OperationsManagerService } from "./b64-operations-manager.service";

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  UserPermissions = this.conf.UserPermissions;

  currentUserSubject = new BehaviorSubject<IUser>(this.CurrentUser);
  currentUser$ = this.currentUserSubject.asObservable();

  get CurrentUser(): IUser {
    try {
      const raw = localStorage.getItem(this.UserPermissions.CurrentUser);
      return raw ? JSON.parse(raw) as IUser : null;
    } catch {
      return null;
    }
  }
  set CurrentUser(user: IUser) {
    if (user) localStorage.setItem(this.UserPermissions.CurrentUser, JSON.stringify(user));
    else localStorage.removeItem(this.UserPermissions.CurrentUser);
    this.currentUserSubject.next(user);
  }

  get UserGridSettings(): IGridConfig[] {
    return this.CurrentUser?.kullaniciGridSettings;
  }

  set UserGridSettings(newGridSettings: IGridConfig[]) {
    const user = this.CurrentUser;
    if (user) {
      user.kullaniciGridSettings = newGridSettings;
      this.CurrentUser = user;
    }
  }

  constructor(
    private router: Router,
    private conf: ConfigurationService,
    private b64Op: B64OperationsManagerService,
    @Inject(DOCUMENT) private document: Document,
  ) { }

  insertUser(user: IUser): void {
    localStorage.setItem(
      this.UserPermissions.AutAccessKey,
      this.b64Op.b64EncodeUnicode(String(user.accessToken ?? ''))
    );
    user.accessToken = null;
    localStorage.setItem(this.UserPermissions.CurrentUser, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  resetUser(): void {
    localStorage.clear();
    this.currentUserSubject.next(this.CurrentUser);
  }

  getAccessToken(): string {
    const tokenB64 = localStorage.getItem(this.UserPermissions.AutAccessKey);
    if (!tokenB64) return null;
    const raw = this.b64Op.b64DecodeUnicode(tokenB64);
    const t = raw?.startsWith('"') && raw.endsWith('"') ? raw.slice(1, -1) : raw;
    return t && t.trim().length > 0 ? t : null;
  }



  getUserID(): string {
    let user = this.CurrentUser;
    return user?.userID ? user.userID.toString() : ''
  }

  getKurumID(): number {
    let user = this.CurrentUser;
    return user?.instituteID ? user.instituteID : null;
  }

  setAccessToken(accessToken: string | null) {
    if (!accessToken) {
      localStorage.removeItem(this.UserPermissions.AutAccessKey);
      return null;
    }
    localStorage.setItem(
      this.UserPermissions.AutAccessKey,
      this.b64Op.b64EncodeUnicode(String(accessToken))
    );
  }

  logout(): void {
    this.resetUser();
    this.router.navigate(['/auth/login']).then(() => this.document.location.reload());
  }

  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    return !!token;
  }

  private tokenNotExpired(key: string) {
    return key !== null;
  }

  changeProfilePicUrl(image: string) {
    const user = this.CurrentUser;
    if (!user) return;
    user.image = image;
    this.CurrentUser = user; // setter subject’i tetikliyor
  }
}
