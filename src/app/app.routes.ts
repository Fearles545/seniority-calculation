import { Routes } from '@angular/router';
import { HostElementsComponent } from './topics/host-elements/host-elements.component';
import { HomeComponent } from './home/home.component';
import { NestJsComponent } from './nest-js/nest-js.component';
import { ApiWithNestJsComponent } from './nest-js/api-with-nest-js/api-with-nest-js.component';

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
    path: 'nest-js',
    component: NestJsComponent,
    children: [
      {
        path: 'api-with-nest-js',
        component: ApiWithNestJsComponent,
      },
    ],
  },
  {
    path: 'host-elements',
    component: HostElementsComponent,
  },
];
