import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, skipWhile, tap, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.currentUser$.pipe(
      // NOTE: currently incomplete but works atm
      // - need to shift navigateByUrl in interceptor to guard instead.
      skipWhile((value) => value === null),
      take(1),
      map((hasCurrentUser) => {
        return Boolean(hasCurrentUser);
      }),
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigateByUrl('/');
        }
      })
    );
  }
}
