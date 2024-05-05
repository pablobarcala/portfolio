import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StackPageComponent } from './components/stack-page/stack-page.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'stack', component: StackPageComponent}
];
