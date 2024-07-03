import { TestBed, inject } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authGuard } from './auth.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('authGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [authGuard],
      imports: [HttpClientTestingModule],
    });
  });

  it('should create authGuard', inject([authGuard], (guard: authGuard) => {
    expect(guard).toBeTruthy();
  }));
});
