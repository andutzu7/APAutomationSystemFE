import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';


export const rolesGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  
  if(!authService.isUserLoggedIn()){
    router.navigateByUrl("/login");
    return false;
  }

  const expectedRoles = route.data['expectedRoles'];
  const userRoles: string[] = authService.getUserRoles();
    
  let isAllowed = expectedRoles.some((role:string) => userRoles.includes(role));
  if (isAllowed){
    return true;
  }

  router.navigateByUrl("/");
  return false;
};
