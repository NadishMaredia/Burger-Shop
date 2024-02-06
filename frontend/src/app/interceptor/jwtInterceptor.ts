
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserSession } from '../models/User';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userSessionString = localStorage.getItem('user');

    if (userSessionString !== null) {
      const userSession = JSON.parse(userSessionString) as UserSession;

      if (userSession && userSession.token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${userSession.token}`,
          },
        });
      }
    }

    return next.handle(request);
  }
}
