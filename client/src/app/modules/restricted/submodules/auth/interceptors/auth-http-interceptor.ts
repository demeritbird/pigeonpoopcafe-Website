import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  public static accessToken: string | null = null;
  hasReqRefreshAttempt = false;

  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const modifiedReq = req.clone({
      withCredentials: true,
      setHeaders: AuthHttpInterceptor.accessToken
        ? { Authorization: `Bearer ${AuthHttpInterceptor.accessToken}` }
        : {},
    });

    return next.handle(modifiedReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 && !this.hasReqRefreshAttempt) {
          this.hasReqRefreshAttempt = true;

          return this.authService.refresh().pipe(
            switchMap((response) => {
              return next.handle(
                req.clone({
                  withCredentials: true,
                  setHeaders: {
                    Authorization: `Bearer ${response.data.access_token}`,
                  },
                })
              );
            })
          );
        }

        this.router.navigateByUrl('/');

        return throwError(() => err);
      }),
      finalize(() => {
        this.hasReqRefreshAttempt = false;
      })
    );
  }
}
