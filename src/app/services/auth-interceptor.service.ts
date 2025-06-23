import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

private authService = inject(AuthService)
  
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  const token = this.authService.getToken();
  let modifiedReq = req;
  if (token) {
    modifiedReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token)
    });
  }
  return next.handle(modifiedReq);
}





}
