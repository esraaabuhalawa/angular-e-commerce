import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const headingInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const cookieService = inject(CookieService);

  let authReq = req;

  if (isPlatformBrowser(platformId)) {
    const authtoken = cookieService.get('authToken')
    if (authtoken) {
      authReq = req.clone({
        setHeaders: {
          token: authtoken,
        },
      });
    }
  }
  return next(authReq)
};
