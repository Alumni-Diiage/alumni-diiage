import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { MaterialModule } from '../material/material.module';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    PasswordResetComponent,
    AuthComponent,
    RegisterComponent
  ],
  imports: [
    FormsModule,
    MaterialModule,
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
