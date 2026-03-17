import { Injectable } from '@angular/core';
import { ConfigurationService } from '@lib-core';
import { B64OperationsManagerService } from './b64-operations-manager.service';

@Injectable({ providedIn: 'root' })
export class UserPermissionService {
  constructor(
    private b64Op: B64OperationsManagerService,
    private conf: ConfigurationService
  ) { }

  private get keys() {
    return this.conf.UserPermissions as any;
  }
  private get legacy() {
    return (this.conf as any).LegacyUserPermissions ?? {};
  }

  private get autoKeyName(): string {
    return this.keys.AutoAccessKey ?? this.keys.AutAccessKey;
  }

  setPermissions(user: { AutAccessKey?: string; accessToken?: string; KullaniciGridSettings?: any; userID?: number }): void {
    const raw = user?.AutAccessKey ?? user?.accessToken ?? '';
    const normalized = String(raw ?? '');

    localStorage.setItem(this.autoKeyName, this.b64Op.b64EncodeUnicode(normalized));

    if (this.keys.AutoAccessKey && this.keys.AutAccessKey && this.keys.AutoAccessKey !== this.keys.AutAccessKey) {
      localStorage.removeItem(this.keys.AutAccessKey);
    }

    if (user?.KullaniciGridSettings != null) {
      const gridKey = this.userScopedGridKey(user?.userID);
      localStorage.setItem(gridKey, JSON.stringify(user.KullaniciGridSettings));
    }
  }

  getAutoAccessKey(): string | null {
    const b64 = localStorage.getItem(this.autoKeyName)
      ?? localStorage.getItem(this.keys.AutAccessKey)
      ?? localStorage.getItem(this.legacy?.AutAccessKey);

    if (!b64) return null;
    const raw = this.b64Op.b64DecodeUnicode(b64);
    if (!raw) return null;
    return raw.startsWith('"') && raw.endsWith('"') ? raw.slice(1, -1) : raw;
  }

  private userScopedGridKey(userID?: number): string {
    const base = this.keys.KullaniciGridSettings;
    return userID ? `${base}:${userID}` : base;
  }

  getGridSettings(userID?: number): any {
    const raw = localStorage.getItem(this.userScopedGridKey(userID));
    try { return raw ? JSON.parse(raw) : null; } catch { return null; }
  }

  clearAutoAccessKey() {
    localStorage.removeItem(this.autoKeyName);
    if (this.keys.AutAccessKey && this.keys.AutAccessKey !== this.autoKeyName) {
      localStorage.removeItem(this.keys.AutAccessKey);
    }
  }

  clearGridSettings(userID?: number) {
    localStorage.removeItem(this.userScopedGridKey(userID));
  }
}
