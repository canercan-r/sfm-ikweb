import { Injectable, Optional } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AlertDisplayService, IAlert } from '../models/interfaces';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private keepAfterNavigationChange = false;

  constructor(
    @Optional() router: Router,
    private translate: TranslateService,
    private displayService: AlertDisplayService
  ) {
    // clear alert message on route change
    router?.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
        }
      }
    });
  }

  show(
    { title = '', text = '', type = 'info', textTrusted = false,
      delay = 3000, overlayClose = true, position = 'down' }: Partial<IAlert>,
    keepAfterNavigationChange = false,
    infinite = false
  ) {
    delay = infinite ? 10 * 60 * 1000 : delay;
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    title = title != '' ? this.translate.instant(title) : title;
    text = this.translate.instant(text);
    return this.displayService.show({ title, text, type, textTrusted, delay, overlayClose, position });
  }

  removeAll() {
    this.displayService.removeAll();
  }
}
