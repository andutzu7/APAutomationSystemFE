import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if(!authService.isUserLoggedIn()){
    router.navigateByUrl("/login");
    return false;
  }

  return true;
};
