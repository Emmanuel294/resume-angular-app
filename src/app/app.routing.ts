import { Route } from '@angular/compiler/src/core';
import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';

//Set routes
const appRoutes:Routes = [
    {path: 'login', component:LoginComponent},
    {path: 'logout/:sure', component:LoginComponent},
    {path: 'register', component:RegisterComponent}
];

//EXPORTAR CONFIGURACION
export const appRoutingProviders: any[] = [];

export const routing:ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);