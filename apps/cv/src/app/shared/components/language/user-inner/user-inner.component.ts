import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuComponent } from '@cv-scripts/components';

@Component({
  selector: 'cv-user-inner',
  templateUrl: './user-inner.component.html',
  styleUrls: ['./user-inner.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserInnerComponent implements OnInit {
  @Input() innerId: string;
  @Input() triggerId: string;

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void { }

  dismiss(e?: Event) {
    let itemEl = this.document.querySelector(`#${this.innerId}`) as HTMLElement;
    let triggerEl = this.document.querySelector(`#${this.triggerId}`) as HTMLElement;
    let menu = MenuComponent.getInstance(itemEl);
    e ? menu.dismiss(itemEl, e) : menu.hide(itemEl);
  }
}
