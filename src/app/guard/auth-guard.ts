import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/unauthorized']);
    return false;
  }
};