import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {routing, appRoutingProviders} from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import {UserService} from './services/user.service';
import { DefaultComponent } from './components/default/default.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    DefaultComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    appRoutingProviders,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
