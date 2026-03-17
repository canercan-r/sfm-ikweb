import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'cv-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent implements OnInit {
  @HostBinding('class') class =
    'menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg fw-bold w-200px';
  @HostBinding('attr.data-st-menu') dataStMenu = 'true';

  constructor() { }

  ngOnInit(): void {
  }

}
