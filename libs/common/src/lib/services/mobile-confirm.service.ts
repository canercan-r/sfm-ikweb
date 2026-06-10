import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

export interface IConfirmDialogContent {
  header: string;
  subHeader?: string;
  message: string;
  backdropDismiss?: boolean;
  buttons: {
    text: string;
    role?: '' | 'cancel';
    cssClass?: string;
    handler?: () => void;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class MobileConfirmService {
  constructor(private alertController: AlertController, private translateService: TranslateService) { }

  async create({
    header = '',
    message = '',
    buttons,
    subHeader = '',
    backdropDismiss = true,
  }: Partial<IConfirmDialogContent>) {
    const buttonsTrans = buttons.map((it) => it.text);
    this.translateService.get(buttonsTrans).subscribe((container: { [key: string]: string }) => {
      buttons = buttons.map((it) => {
        it.text = container[it.text] || it.text;
        return it;
      });
    });

    var container: { [key: string]: string } = await firstValueFrom(this.translateService.get([header, message, subHeader]));
    header = container[header] || header;
    message = container[message] || message;
    subHeader = container[subHeader] || subHeader;

    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      buttons,
      backdropDismiss,

    });

    await alert.present();
    return alert;
  }
}
