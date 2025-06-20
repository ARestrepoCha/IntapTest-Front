import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing-module';
import { FormsModule } from '@angular/forms';
import { Login } from './login/login';
import { Register } from './register/register';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    Login,
    Register
  ]
})
export class AuthModule { }
