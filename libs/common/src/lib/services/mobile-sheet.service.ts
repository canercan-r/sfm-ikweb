import { Injectable } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

export interface IActionSheetContent {
  header?: string;
  subHeader?: string;
  backdropDismiss?: boolean;
  buttons: {
    text: string;
    icon?: string;
    role?: '' | 'cancel';
    cssClass?: string;
    handler?: () => void;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class MobileSheetService {
  constructor(private _actionSheetCtrl: ActionSheetController, private _translateService: TranslateService) { }

  async create({ header = '', buttons, subHeader = '' }: Partial<IActionSheetContent>) {

    const buttonsTrans = buttons.length > 0 ? buttons.map((it) => it.text) : [''];

    header = header ? this._translateService.instant(header) : header;
    subHeader = subHeader ? this._translateService.instant(subHeader) : subHeader;

    buttons = buttons.map((it) => {
      it.text = this._translateService.instant(it.text);
      return it;
    });

    const actionSheet = await this._actionSheetCtrl.create({
      header,
      subHeader,
      buttons,
    });

    await actionSheet.present();

    return actionSheet;
  }
}
