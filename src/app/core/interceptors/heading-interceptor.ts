import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';
import { throwError } from 'rxjs';
import { UserService } from '../auth/services/user.service';
import { CookieService } from 'ngx-cookie-service';

export const headingInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const toasterService = inject(ToastrService);
  const userService = inject(UserService);
  const cookieService = inject(CookieService);

  let authReq = req;

  if (isPlatformBrowser(platformId)) {
    const authtoken = cookieService.get('authToken')
    //const authtoken = localStorage.getItem('authToken');
    if (authtoken) {
      authReq = req.clone({
        setHeaders: {
          token: authtoken,
          //'Content-Type': 'application/json',
        },
      });
    }
  }
  return next(authReq)
    // return next(authReq).pipe(
    //   catchError((error: HttpErrorResponse) => {
    //     console.log('Interceptor caught error:', error);

    //     // Handle only *real* auth errors
    //     if (
    //       error.status === 401 ||
    //       error.error?.message?.toLowerCase().includes('invalid token')
    //     ) {
    //       toasterService.error(error.error?.message || 'Authentication failed');

    //       // if (isPlatformBrowser(platformId)) {
    //       //   cookieService.delete('authToken');
    //       //  // localStorage.removeItem('authToken');
    //       // }
    //       userService.clearUser();
    //       router.navigate(['/auth/login']);
    //     }

    //     return throwError(() => error);
    //   })
    // );
};
