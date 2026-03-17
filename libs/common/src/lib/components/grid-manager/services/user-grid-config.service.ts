import { Injectable } from '@angular/core';
import {
  ConfigurationService,
  DataService,
  IResponseWrapper,
  IUser,
  KullaniciParametreleri,
  UserInfoService,
} from '@lib-core';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { IGridConfig, IGridUserColSettings, IGridYetkileri, LibGrids } from '../models';
@Injectable()
export class GridConfigService {
  private _user: IUser;
  private _currentConfigs: IGridConfig[];
  private _gridConfig$: ReplaySubject<IGridConfig[]>;
  configChanged$ = new Subject<void>();

  constructor(
    private _networkService: DataService,
    private _config: ConfigurationService,
    private _userInfo: UserInfoService
  ) {
    this._gridConfig$ = new ReplaySubject(1);

    this._userInfo.currentUser$.pipe().subscribe((user) => {
      this._user = user;
      ////debugger;
      if (user == null) {
        //SEN-1795 (14.Madde)
        return;
      }
      if (!this._user?.kullaniciGridSettings) {
        ////debugger;
        this.initConfig();
      } else {
        this._currentConfigs = this._user.kullaniciGridSettings;
        //console.log("this._user.kullaniciGridSettings)", this._user.kullaniciGridSettings);
        this._gridConfig$.next(this._user.kullaniciGridSettings);
      }
    });

    // this._userInfo.gridSettings$.pipe(filter(() => this._config.getAppSettings().AppID === '1')).subscribe(kullaniciGridSettings => {
    //   // console.log("kullanıcı grid settings", kullaniciGridSettings);
    //   if (kullaniciGridSettings == null || kullaniciGridSettings == undefined) {
    //     this.initConfig();
    //   } else {
    //     this._currentConfigs = kullaniciGridSettings;
    //     this._gridConfig$.next(kullaniciGridSettings);
    //   }
    // })

    this._userInfo.currentUser$.subscribe((user) => {
      this._user = user;
    });

    this.configChanged$.subscribe((_) => {
      this.initConfig();
    });
  }

  get Config$(): Observable<IGridConfig[]> {
    return this._gridConfig$.asObservable();
  }

  get UserGridRights(): KullaniciParametreleri {
    // return this._userInfo.getKullaniciParametreleri();
    const a = new KullaniciParametreleri();
    a.ExcelAktarabilme = true;
    return a;
  }

  private initConfig(): void {
    const reqParams = {
      kullaniciID: this._user?.userID ?? 20117,
    };

    this._networkService
      .get<IGridConfig[]>(`${this._config.UserPermissions.SharedUrl}UserGridAyarlar`, reqParams)
      .subscribe((remoteGridConfig) => {
        this._currentConfigs = remoteGridConfig;
        this._userInfo.UserGridSettings = remoteGridConfig;
        this._gridConfig$.next(remoteGridConfig);
      });
  }

  public saveGridConfig(
    gridId: LibGrids,
    configJson: IGridUserColSettings,
    isNew = false,
    saveToLocalStorage = false
  ): Observable<boolean> {
    const reqPayload = {
      kullaniciId: this._user?.userID,
      gridId,
      configJson: JSON.stringify(configJson),
    };

    const gridYetkileri: IGridYetkileri = {
      gridId,
      canExport: false,
      canFilter: false,
      canSelectRow: true,
      unAuthrizedColmns: [] as string[],
    };

    if (isNew) {
      const newGrid: IGridConfig = {
        properties: gridYetkileri,
        columnsConfig: configJson,
        firstLevelColumnsConfig: null,
      };

      this._currentConfigs.push(newGrid);
    }

    return this._networkService
      .post<boolean>(`${this._config.UserPermissions.SharedUrl}SaveGridSettings`, reqPayload)
      .pipe(
        tap((res) => {
          if (res && this._userInfo.isAuthenticated()) {
            const ind = this._userInfo.UserGridSettings?.findIndex(
              (x) => x.properties.gridId === gridId
            );
            if (ind > -1) {
              this._userInfo.UserGridSettings[ind] = {
                properties: gridYetkileri,
                columnsConfig: configJson,
                firstLevelColumnsConfig: null,
              };
              this._userInfo.UserGridSettings = [...this._userInfo.UserGridSettings];
            }
          }
        })
      );
  }

  deleteKullaniciGridSetting(gridID: number) {
    return this._networkService
      .post<IResponseWrapper<boolean>>(
        `${this._config.getAppSettings()['SharedUrl']}}DeleteKullaniciGridSetting`,
        gridID
      )
      .pipe(this._networkService.unboxError);
  }

  getDefaultGridSetting(gridID: number) {
    return this._networkService.get<IGridUserColSettings>(
      `${this._config.UserPermissions.SharedUrl}DefaultGridSettings`,
      { gridID }
    );
  }
}
