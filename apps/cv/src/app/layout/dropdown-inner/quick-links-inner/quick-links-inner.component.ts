import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'cv-quick-links-inner',
  templateUrl: './quick-links-inner.component.html',
  styleUrls: ['./quick-links-inner.component.scss']
})
export class QuickLinksInnerComponent {
  @HostBinding('class') class =
    'menu menu-sub menu-sub-dropdown menu-column w-250px w-lg-325px';
  @HostBinding('attr.data-st-menu') dataStMenu = 'true';

  constructor() { }
}
