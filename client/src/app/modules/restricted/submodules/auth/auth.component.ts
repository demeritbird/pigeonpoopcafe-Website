import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService, LoginRequest } from './services/auth.service';
import { Router } from '@angular/router';
import { ApiError } from 'src/app/utils/types';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  constructor(private authService: AuthService, private router: Router) {}

  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-z0-9]+$/),
    ]),
    pintoken: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),
  });
  usernameInputControl = this.authForm.get('username') as FormControl;
  pintokenInputControl = this.authForm.get('pintoken') as FormControl;

  onLoginSubmit(event: Event) {
    event.preventDefault();

    this.authService.login(this.authForm.value as LoginRequest).subscribe({
      next: (response) => {
        this.router.navigate(['/restricted/dashboard']);
      },
      error: (err: ApiError) => {
        if (err.status == 401) {
          this.authForm.setErrors({ credentials: true });
        } else {
          this.authForm.setErrors({ unknownError: true });
        }
      },
    });
  }
}
