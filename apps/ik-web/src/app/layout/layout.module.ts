import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibCommonModule } from '@lib-common';
import { CoreUIModule } from '@lib-core';
import { Routing } from '../modules/routing';
import { SharedModule } from '../shared/shared.module';
import { AsideMenuComponent } from './components/aside/aside-menu/aside-menu.component';
import { AsideComponent } from './components/aside/aside.component';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderMenuComponent } from './components/header/header-menu/header-menu.component';
import { HeaderComponent } from './components/header/header.component';
import { PageTitleComponent } from './components/header/page-title/page-title.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: Routing,
  },
];

@NgModule({
  declarations: [
    LayoutComponent,
    AsideComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    ToolbarComponent,
    AsideMenuComponent,
    TopbarComponent,
    PageTitleComponent,
    HeaderMenuComponent,
  ],
  imports: [
    CoreUIModule,
    LibCommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class LayoutModule { }
