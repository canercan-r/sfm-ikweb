import { Inject, Injectable } from '@angular/core';
import { IApiBaseConfig } from '../models/interfaces';
import { API_CONFIG_PROVIDER } from '../providers/configuration-provider';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  constructor(@Inject(API_CONFIG_PROVIDER) private conf: IApiBaseConfig) { }

  public getAppSettings(): IApiBaseConfig {
    return this.conf;
  }

  buildMethodUrlForApiController(apiController: string): (method: string) => string {
    return (apiMethod: string): string => `${this.conf[apiController]}${apiMethod}`;
  }

  UserPermissions = {
    AutAccessKey: `${this.conf.ProjectName}_${this.conf.AppVersion}_AutAccessKey`,
    KullaniciGridSettings: `${this.conf.ProjectName}_${this.conf.AppVersion}_KullaniciGridSettings`,
    CurrentUser: `${this.conf.ProjectName}_${this.conf.AppVersion}_CurrentUser`,
    CurentRole: `${this.conf.ProjectName}_${this.conf.AppVersion}_CurrentRole`,
    SharedUrl: `Shared/`,
  };

  getProject(): string {
    return this.conf.ProjectName
  }
}
