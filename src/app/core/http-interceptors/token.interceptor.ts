import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../user/services';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    let nextHeaders = req.headers;
    const token = this.cookieService.get('token');

    if (token && !req.url.endsWith('login')) {
      nextHeaders = nextHeaders.append('Authorization', token);
    }

    const nextReq = req.clone({
      headers: nextHeaders,
    });

    return next
      .handle(nextReq)
      .pipe(catchError((err: HttpErrorResponse) => this.handelAuthError(err)));
  }

  private handelAuthError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401) {
      this.router.navigate(['/login'], {
        queryParams: {
          sessionFailed: true,
        },
      });
    }

    return throwError(error);
  }
}
