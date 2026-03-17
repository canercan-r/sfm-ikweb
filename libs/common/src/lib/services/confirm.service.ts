import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IConfirm } from '@lib-common';
import { merge } from 'lodash';
import { ConfirmComponent } from '../components/confirm.component';

@Injectable()
export class ConfirmService {
  private _defaultConfig: IConfirm = {
    title: 'Global.IslemiOnaylayin',
    message: 'Global.IslemiOnaylamakIstediginizdenEminmisiniz',
    icon: {
      show: true,
      name: 'fa-solid fa-warning',
      color: 'warning',
    },
    buttons: {
      confirm: {
        show: true,
        label: 'Global.Onayla',
        color: 'primary',
      },
      cancel: {
        show: true,
        label: 'Global.Iptal',
      },
    },
    dismissible: false,
  };

  constructor(private _dialog: MatDialog) { }

  async promise(config: IConfirm): Promise<boolean> {
    // Merge the user config with the default config
    const userConfig = merge({}, this._defaultConfig, config);

    const dialog = this._dialog.open(ConfirmComponent, {
      autoFocus: false,
      disableClose: !userConfig.dismissible,
      data: userConfig,
      panelClass: 'confirmation-dialog-panel',
    });

    // Open the dialog
    const result = await dialog.afterClosed();
    return;
  }

  open(config: IConfirm): MatDialogRef<ConfirmComponent> {
    // Merge the user config with the default config
    const userConfig = merge({}, this._defaultConfig, config);

    return this._dialog.open(ConfirmComponent, {
      autoFocus: false,
      disableClose: !userConfig.dismissible,
      data: userConfig,
      panelClass: 'confirmation-dialog-panel',
    });
  }
}
