import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthenticationService} from "./service/authentication/authentication.service";
import {UserService} from "./service/user/user.service";
import {AuthInterceptor} from "./service/interceptor/auth.interceptor";
import {AuthenticationGuard} from "./guard/authentication.guard";
import {NotificationModule} from "./notification.module";
import {NotificationService} from "./service/notification/notification.service";
import { RegisterComponent } from './component/register/register.component';
import { UserComponent } from './component/user/user.component';
import {LoginComponent} from "./component/login/login.component";

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    UserComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NotificationModule
  ],
  providers: [AuthenticationService,
    UserService,
    AuthenticationGuard,
    NotificationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
