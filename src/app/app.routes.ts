import { Routes } from '@angular/router';
import { Signup } from './pages/signup/signup';
import { Login } from './pages/login/login';

export const routes: Routes = [
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
  
];
