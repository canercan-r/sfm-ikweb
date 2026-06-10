import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

export interface IToastDialogContent {
  header: string;
  message: string;
  duration: number;
  cssClass: string | string[] | undefined;
  position: 'top' | 'middle' | 'bottom';
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastCtrl: ToastController, private translateService: TranslateService) { }

  async create({
    header = '',
    message = '',
    cssClass,
    duration = 3000,
    position = 'bottom',
  }: Partial<IToastDialogContent>) {
    this.translateService.get([header, message]).subscribe((container: { [key: string]: string }) => {
      header = container[header] || header;
      message = container[message] || message;
    });

    const toast = await this.toastCtrl.create({
      header,
      message,
      duration,
      cssClass,
      position,
    });
    await toast.present();
  }
}
