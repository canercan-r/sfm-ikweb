import { Injectable } from '@angular/core';
import { AlertDisplayService, IAlert, Utils } from '@lib-common';
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';
import PNotifyConfirm from 'pnotify/dist/es/PNotifyConfirm';
import PNotifyStyleMaterial from 'pnotify/dist/es/PNotifyStyleMaterial';

@Injectable({
  providedIn: 'root'
})
export class PNotifyService implements AlertDisplayService {
  private pnotify: any;

  constructor() {
    this.pnotify = this.buildPNotify();
  }

  show(message: IAlert): void {
    if (message) {
      const stackBottom = {
        //to make stack vertically centered, pass null to dir1
        dir1: message.position, // With a dir1 of "up", the stacks will start appearing at the bottom.
        // Without a `dir2`, this stack will be horizontally centered, since the `dir1` axis is vertical.
        // dir2: "right",
        firstpos1: 50, // The notices will appear 25 pixels from the bottom of the context.
        // Without a `spacing1`, this stack's notices will be placed 25 pixels apart.
        push: "bottom", // Each new notice will appear at the bottom of the screen, which is where the "top" of the stack is. Other notices will be pushed up.
        modal: true, // When a notice appears in this stack, a modal overlay will be created.
        overlayClose: message.overlayClose, // When the user clicks on the overlay, all notices in this stack will be closed.
        context: document.getElementById("page-container") // The notices will be placed in the "page-container" element.
      };

      let alertConfig = {
        title: message.title || undefined,
        text: message.text || undefined,
        textTrusted: message.textTrusted,
        type: message.type,
        stack: stackBottom,
        delay: message.delay
      };

      alertConfig = Utils.removeEmpty(alertConfig);

      return this.pnotify.alert(alertConfig);
    }
    return null;
  }

  private buildPNotify(): void {
    PNotifyButtons;
    PNotifyConfirm;
    PNotifyStyleMaterial;
    PNotify.defaults.styling = 'brighttheme';
    PNotify.defaults.icons = 'fontawesome5';
    return PNotify;
  }

  removeAll(): void {
    this.pnotify.removeAll();
  }
}
