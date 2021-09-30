import { AppState } from './../store/app.state';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

const TOKEN_HEADER_KEY = 'Authorization'; 


@Injectable()

export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<AppState>,
    private authService: AuthService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // const user = this.authService.getUserFromLocalStorage();
    // let token = user.token;

    // if (!token) {
    //   return next.handle(req);
    // }
    // let modifiedReq = req.clone({
    //   params: req.params.append('auth', token),
    // });
    // return next.handle(modifiedReq);

    let authReq = req;
    const user = this.authService.getUserFromLocalStorage();
    let token = user.token;
    
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    return next.handle(authReq);
  }
}