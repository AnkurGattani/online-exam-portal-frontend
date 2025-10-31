import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Signup } from './pages/signup/signup';
import { Login } from './pages/login/login';
import { ViewQuizes } from './pages/view-exam/view-quizes';
import { AddQuiz } from './pages/add-exam/add-quiz';
import { UpdateQuiz } from './pages/update-exam/update-quiz';
import { Start } from './pages/start/start';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';

export const routes: Routes = [
  {
    path: 'signup',
    component: Signup,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
    pathMatch: 'full',
  },

];
