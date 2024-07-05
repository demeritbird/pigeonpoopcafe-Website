import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('AuthService', () => {
  const rootUrl = environment.SERVER_LINK;
  let authService: AuthService, httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should allow successful sign in', () => {
    authService
      .login({
        username: 'username',
        pintoken: 'password',
      })
      .subscribe((response) => {
        expect(response.status).toBe(200);
      });

    const req = httpTestingController.expectOne(`${rootUrl}/login`);
    expect(req.request.method).toBe('POST');

    req.flush({
      status: 200,

      data: {
        id: 1,
        username: 'username',
        access_token: 'example_access_token',
      },
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
