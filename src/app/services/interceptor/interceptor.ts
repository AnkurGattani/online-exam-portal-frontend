import { HttpInterceptorFn } from '@angular/common/http';

export const Interceptor: HttpInterceptorFn = (req, next) => {

  if(req.url.includes('/login') || req.url.includes('/register')){
    return next(req);
  }
  // Get token from localStorage
  const token = localStorage.getItem('jwtToken');

  // If token exists, clone the request and add Authorization header
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  // If no token, send the original request
  return next(req);
};
