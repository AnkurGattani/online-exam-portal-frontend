import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Signup } from './pages/signup/signup';
import { Login } from './pages/login/login';
import { ViewQuizes } from './pages/view-exam/view-quizes';
import { AddQuiz } from './pages/add-exam/add-quiz';
import { UpdateQuiz } from './pages/update-exam/update-quiz';
import { Start } from './pages/start/start';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

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

  {
    path : 'quizzes',
    component: ViewQuizes,
    pathMatch: 'full',
  },

  {
    path: 'add-quiz',
    component: AddQuiz,
    pathMatch: 'full',
  },

  {
     path: 'quiz/:qid',
     component: UpdateQuiz
  },

  {
    path : 'start/:qid',
    component: Start,

  }

];
