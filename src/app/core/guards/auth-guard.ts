import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  const http = inject(HttpClient);

  const token = cookieService.get('authToken');

  if (!token) {
    // No token → go to login
    return router.parseUrl('/auth/login');
  }

  // Verify token with backend
  return http.get<any>('https://ecommerce.routemisr.com/api/v1/auth/verifyToken').pipe(
    map((res) => {
      // ✅ valid response
      if (res?.message === 'verified') {
        return true;
      }
      return router.parseUrl('/auth/login');
    }),
    catchError(() => {
      // ❌ invalid token
      return of(router.parseUrl('/auth/login'));
    })
  );
};
