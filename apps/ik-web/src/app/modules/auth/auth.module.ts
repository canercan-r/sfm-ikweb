import { NgModule } from '@angular/core';
import { SharedModule } from '@ikweb-shared/shared.module';
import { LibCommonModule } from '@lib-common';
import { CoreUIModule } from '@lib-core';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LoginComponent, AuthComponent],
  imports: [LibCommonModule, CoreUIModule, SharedModule, AuthRoutingModule],
})
export class AuthModule { }
