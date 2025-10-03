import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },

  {
    path: 'users',
    loadComponent: () =>
      import('./users/user-list.component').then(m => m.UserListComponent)      
  },
  {
    path: 'users/:id',
    loadComponent: () =>
      import('./users/user-detail.component').then(m => m.UserDetailComponent)  
  },

  { path: '', pathMatch: 'full', redirectTo: 'users' }
];
