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
import { HomeComponent } from './components/home/home.component';
import { ResumeService } from './services/resume.service';
import { ResumesComponent } from './components/resumes/resumes.component';
import { ResumesviewComponent } from './components/resumesview/resumesview.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    DefaultComponent,
    HomeComponent,
    ResumesComponent,
    ResumesviewComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    appRoutingProviders,
    UserService,
    ResumeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
