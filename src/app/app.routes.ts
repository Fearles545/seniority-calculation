import { Routes } from '@angular/router';
import { HostElementsComponent } from './topics/host-elements/host-elements.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'host-elements',
    component: HostElementsComponent,
  },
];
