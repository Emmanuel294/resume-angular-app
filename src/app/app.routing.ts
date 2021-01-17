import { Route } from '@angular/compiler/src/core';
import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import { DefaultComponent } from './components/default/default.component';
import { HomeComponent } from './components/home/home.component';
import { ToolsComponent } from './components/tools/tools.component';
import { ResumesComponent } from './components/resumes/resumes.component';
import { ResumesviewComponent } from './components/resumesview/resumesview.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';

//Set routes
const appRoutes:Routes = [
    {path: '', component:HomeComponent},
    {path: 'home', component:DefaultComponent},
    {path: 'login', component:LoginComponent},
    {path: 'tools', component:ToolsComponent},
    {path: 'projects', component:ProjectsComponent},
    {path: 'projects/create', component:CreateProjectComponent},
    {path: 'projects/edit/:id', component:CreateProjectComponent},
    {path: 'resumes', component:ResumesComponent},
    {path: 'resumes/:id', component:ResumesviewComponent},
    {path: 'logout/:sure', component:LoginComponent},
    {path: 'register', component:RegisterComponent}
];

//EXPORTAR CONFIGURACION
export const appRoutingProviders: any[] = [];

export const routing:ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);