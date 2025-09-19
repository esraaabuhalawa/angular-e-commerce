import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';

export const isLoggedGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  const http = inject(HttpClient);

  const token = cookieService.get('authToken');

  if (!token) {
    // ✅ No token → allow access (e.g. login/register page)
    return true;
  }

  // 🔐 Verify token with backend
  return http.get<any>('https://ecommerce.routemisr.com/api/v1/auth/verifyToken').pipe(
    map((res) => {
      // If token valid → redirect to home
      if (res?.decoded) {
        return router.parseUrl('/home');
      }
      // If backend rejects → treat as not logged in → allow access
      return true;
    }),
    catchError(() => {
      // On error → allow access (invalid/expired token)
      return of(true);
    })
  );
};
