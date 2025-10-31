import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login/login';

export const roleGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  const role = loginService.getUserRole();

  if (role === 'ADMIN') {
    return true;
  }

  router.navigate(['/unauthorized']);
  return false;
};
``