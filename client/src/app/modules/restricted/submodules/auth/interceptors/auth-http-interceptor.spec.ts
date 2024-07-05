import { TestBed } from '@angular/core/testing';
import { AuthService } from '../services/auth.service';
import { AuthHttpInterceptor } from './auth-http-interceptor';

describe('AuthHttpInterceptor', () => {
  let authServiceMock: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['refresh']);

    TestBed.configureTestingModule({
      providers: [
        AuthHttpInterceptor,
        { provide: AuthService, useValue: authServiceMock },
      ],
    });
  });

  it('should create an instance', () => {
    const interceptor = TestBed.inject(AuthHttpInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
