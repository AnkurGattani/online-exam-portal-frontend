import { Routes } from '@angular/router';
import { Signup } from './pages/signup/signup';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {
    path: '',
    component:Home,
    pathMatch: 'full',
  },
  {
	path: 'signup',
	component: Signup,
	pathMatch: 'full',
  },
  {
    path:'login',
    component:Login,
    pathMatch:'full',
  },

  // {
    
  //   path: 'admin-dashboard',
  //   component: AdminDashboardComponent,
  //   canActivate: [role-guard]

  // }
  
];
