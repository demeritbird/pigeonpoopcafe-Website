import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthHttpInterceptor } from '../interceptors/auth-http-interceptor';
import { ApiResponse } from 'src/app/utils/types';

export interface CurrentUser {
  id: number;
  username: string;
  access_token: string;
}

export interface LoginRequest {
  username: string;
  pintoken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rootUrl = environment.SERVER_LINK;
  currentUser$ = new BehaviorSubject<CurrentUser | null>(null);
  constructor(private httpClient: HttpClient) {}

  updateInterceptorAccessToken(accessToken: string) {
    AuthHttpInterceptor.accessToken = accessToken;
  }

  login(loginRequest: LoginRequest) {
    return this.httpClient
      .post<ApiResponse>(`${this.rootUrl}/login`, loginRequest)
      .pipe(
        tap((response) => {
          this.updateInterceptorAccessToken(response.data.refresh_token);

          this.currentUser$.next({
            id: response.data.id,
            username: response.data.username,
            access_token: response.data.access_token,
          });
        })
      );
  }

  refresh() {
    return this.httpClient.get<ApiResponse>(`${this.rootUrl}/refresh`).pipe(
      tap((response) => {
        this.updateInterceptorAccessToken(response.data.refresh_token);

        this.currentUser$.next({
          id: response.data.id,
          username: response.data.username,
          access_token: response.data.access_token,
        });
      })
    );
  }
}
