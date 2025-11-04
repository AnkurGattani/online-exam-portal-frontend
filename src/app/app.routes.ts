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
import { AssignQuestionComponent } from './pages/assign-question/assign-question';
import { Home } from './pages/home/home';
import { authGuard } from './guard/auth-guard';
import { roleGuard } from './guard/role-guard';
import { Unauthorized } from './unauthorized/unauthorized';
import { UserExam } from './pages/user-exam/user-exam';
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
    path: 'login',
    component: Login,
    pathMatch: 'full',
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboard,
    canActivate: [authGuard, roleGuard]
  },
  // {
  //   path: 'admin/quizzes',
  //   component: ViewQuizes,
  //    canActivate: [authGuard], // <--- ONLY REQUIRES LOGIN (AUTH)
  // },
  {
    path: 'start/:qid',
    component: Start,
    canActivate: [authGuard], // <--- ONLY REQUIRES LOGIN (AUTH)
  }, // ---------------------------------------------------------------------- // --- PROTECTED ADMIN ROUTES (Require Auth AND Admin Role) --- // ----------------------------------------------------------------------

  {
    path: 'assign-question',
    component: AssignQuestionComponent,
    pathMatch: 'full',
    canActivate: [authGuard, roleGuard],
  },
  {
    path: 'add-quiz',
    component: AddQuiz,
    canActivate: [authGuard, roleGuard],
  },
  {
    path: 'quiz/:qid',
    component: UpdateQuiz,
    canActivate: [authGuard, roleGuard],
  },
  {
    path: 'unauthorized',
    component: Unauthorized,
    pathMatch: 'full'
  },
  {
    path: 'user-exam',
    component: UserExam,
  },
  {
    path: 'admin/quizzes',
    loadComponent: () => import('./pages/view-exam/view-quizes').then(m => m.ViewQuizes)
  },
  // {
  //   path: 'admin/questionbank',
  //   loadComponent: () => import('./pages/question-bank/questionbank').then(m => m.QuestionBank)
  // },
  // {
  //   path: 'admin/reports',
  //   loadComponent: () => import('./pages/reports/reports').then(m => m.Reports)
  // },

];
