import { HttpInterceptorFn } from '@angular/common/http';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
