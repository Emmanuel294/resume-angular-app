import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {routing, appRoutingProviders} from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

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
import { ToolService } from './services/tool.service';
import { ToolviewComponent } from './components/toolview/toolview.component';
import { ToolsComponent } from './components/tools/tools.component';
import { EditableModule } from '@ngneat/edit-in-place';
import { ViewModeDirective } from './directives/view-mode.directive';
import { EditModeDirective } from './directives/edit-mode.directive';
import { EditableComponent } from './components/editable/editable.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectService } from './services/projects.service';
import { DatePipe } from '@angular/common';
import { CreateProjectComponent } from './components/create-project/create-project.component';

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
    ResumesviewComponent,
    ToolviewComponent,
    ToolsComponent,
    ViewModeDirective,
    EditModeDirective,
    EditableComponent,
    ProjectsComponent,
    CreateProjectComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    EditableModule,
    SweetAlert2Module,
  ],
  providers: [
    appRoutingProviders,
    UserService,
    ResumeService,
    ToolService,
    ProjectService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
