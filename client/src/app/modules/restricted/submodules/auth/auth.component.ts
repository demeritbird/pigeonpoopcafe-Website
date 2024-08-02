import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { AuthService, LoginRequest } from './services/auth.service';
import { Router } from '@angular/router';
import { ApiError } from 'src/app/utils/types';
import { SingleAlphaNumFormControl } from './controls/single-alpha-num-form-control';
import { logger } from 'src/app/utils/logger';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [
    trigger('slideFade', [
      state('hidden', style({ opacity: 0 })),
      transition('* => hidden', [animate('1s ease-in-out')]),
    ]),
  ],
})
export class AuthComponent {
  TAG: string = '** AuthPage';

  @ViewChildren('pin_input') pinInputs!: QueryList<ElementRef>;
  readonly PINTOKEN_LENGTH: number = 6;
  curPinTokenIdx: number = 0; // value between 0 through PINTOKEN_LENGTH - 1
  icons = Array(10);
  imageIsLoading: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  imageOnLoad() {
    // lazy loading
    this.imageIsLoading = false;
  }

  // dynamic-lengthed formgroup determined by PINTOKEN_LENGTH
  authForm = new FormGroup(
    Array.from({ length: this.PINTOKEN_LENGTH }, () => {
      return new SingleAlphaNumFormControl('', [
        Validators.required,
        Validators.maxLength(1),
      ]);
    }).reduce(
      (
        acc: { [key: string]: SingleAlphaNumFormControl },
        cur: SingleAlphaNumFormControl,
        idx: number
      ) => {
        acc[`pintokenControl-${idx + 1}`] = cur;
        return acc;
      },
      {}
    )
  );

  ngOnInit() {
    this.authForm.valueChanges.subscribe((value) => {
      this.curPinTokenIdx = Object.values(value).filter(
        (val) => val !== ''
      ).length;
    });
  }

  focusToPrevInput(target: HTMLElement) {
    const prevElementSibling =
      target.previousElementSibling as HTMLInputElement | null;

    if (prevElementSibling && this.curPinTokenIdx >= 0) {
      prevElementSibling.focus();
    }
  }

  focusToNextInput(target: HTMLElement) {
    const nextElementSibling =
      target.nextElementSibling as HTMLInputElement | null;

    if (nextElementSibling && this.curPinTokenIdx < this.PINTOKEN_LENGTH) {
      nextElementSibling.focus();
    }
  }

  inputOnFocus(event: FocusEvent): void {
    this.pinInputs
      .toArray()
      [Math.min(Math.max(this.curPinTokenIdx, 0), 5)].nativeElement.focus();
  }

  inputOnKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    const targetValue = target.value;

    if (event.key === 'Backspace' && targetValue.length <= 0) {
      this.curPinTokenIdx -= 1;
      this.focusToPrevInput(target);
    }
  }

  inputOnChange(event: Event) {
    const input = event.target as HTMLInputElement;
    let targetValue = input.value.trim();
    if (targetValue.length <= 0) {
      return;
    }

    this.focusToNextInput(input);
  }

  onLoginSubmit(event: Event) {
    event.preventDefault();

    const loginRequest: LoginRequest = {
      username: 'demeritbird', // TODO: change to env variable later on
      pintoken: Object.values(this.authForm.value).join(''),
    };

    this.authService.login(loginRequest).subscribe({
      next: (response) => {
        logger({
          tag: this.TAG,
          type: 'success',
          message: 'User has successfully logged in!',
        });

        this.router.navigate(['/restricted/dashboard']);
      },
      error: (err: ApiError) => {
        logger({
          tag: this.TAG,
          type: 'error',
          message: 'User failed to log in.',
        });

        if (err.status == 401) {
          this.authForm.setErrors({ credentials: true });
        } else {
          this.authForm.setErrors({ unknownError: true });
        }

        this.authForm.reset();
      },
    });
  }
}
