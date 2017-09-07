import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const data = JSON.parse(localStorage.getItem('data'))
    const currentUser = data.currentUser;
    if (currentUser) {
      const token = currentUser.token;
      const authReq = req.clone({headers: req.headers.set('Authorization', `Bearer ${token}`)});
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
