import { Component } from '@angular/core';
import { SharedService } from '@cv-services/shared.service';

@Component({
  selector: 'cv-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  toolbarButtonMarginClass = 'me-5 me-lg-1';
  toolbarButtonHeightClass = 'w-60px h-60px';

  constructor(public sharedService: SharedService
  ) { }
}
