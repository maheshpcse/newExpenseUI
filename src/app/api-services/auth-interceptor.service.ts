import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('token');
    const id = sessionStorage.getItem('user_id');
    const username = sessionStorage.getItem('username');
    const email = sessionStorage.getItem('email');
    const role = sessionStorage.getItem('role');

    if (!token) {
      return next.handle(req);
    }

    const req1 = req.clone({
      headers: req.headers.set('Authorization', [`Bearer ${token}`, id, role]),
      setHeaders: {
        id,
        email,
        username
      }
    });

    return next.handle(req1);
  }
}
