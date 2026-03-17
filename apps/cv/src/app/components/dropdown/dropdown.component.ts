import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '@cv-services/shared.service';
import { IDropDown } from '@lib-common';

@Component({
  selector: 'cv-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() dropdownItems: IDropDown[] = [];

  constructor(
    public _shared: SharedService,
  ) { }

  ngOnInit(): void {
  }

}
