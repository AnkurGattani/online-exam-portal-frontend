import { Routes } from '@angular/router';
import { Signup } from './pages/signup/signup';
import { Login } from './pages/login/login';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { AssignQuestionComponent } from './pages/assign-question/assign-question';
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
  {
    path: 'admin/dashboard',
    component: AdminDashboard
  },
   {
    path: 'assign-question',
    component: AssignQuestionComponent,
    pathMatch: 'full',

  }
  // {
  //   path: 'admin/exams',
  //   loadComponent: () => import('./pages/exam-management/exams').then(m => m.Exams)
  // },
  // {
  //   path: 'admin/questionbank',
  //   loadComponent: () => import('./pages/question-bank/questionbank').then(m => m.QuestionBank)
  // },
  // {
  //   path: 'admin/reports',
  //   loadComponent: () => import('./pages/reports/reports').then(m => m.Reports)
  // },

];
