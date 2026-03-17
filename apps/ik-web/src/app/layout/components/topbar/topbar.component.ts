import { Component, OnInit } from '@angular/core';
import { LayoutService } from '@ikweb-layout/core/layout.service';
import { IUser, UserInfoService } from '@lib-core';
import { Observable } from 'rxjs';

@Component({
  selector: 'ikweb-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  toolbarButtonMarginClass = 'ms-1 ms-lg-3';
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px';
  toolbarUserAvatarHeightClass = 'symbol-25px symbol-md-30px symbol-circle';
  toolbarButtonIconSizeClass = 'fs-3';
  toolbarSeparatorClass =
    'w-1px border-end border-gray-700 my-5 my-lg-3 d-none d-lg-block' +
    ' ' +
    this.toolbarButtonMarginClass;
  headerLeft: string = 'menu';
  departman: string = '';
  user$: Observable<IUser> = this._userInfo.currentUser$;

  constructor(
    private readonly _layout: LayoutService,
    private readonly _userInfo: UserInfoService,
  ) { }

  ngOnInit(): void {
    this.headerLeft = this._layout.getProp('header.left') as string;
    this.departman = this._userInfo.CurrentUser.departman;
  }
}
