import { Component } from '@angular/core';
import {
  AuthService,
  CurrentUser,
} from './modules/restricted/submodules/auth/services/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentUser$: BehaviorSubject<CurrentUser | null>;

  constructor(private authService: AuthService) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit() {
    this.authService.refresh().subscribe(() => {});
  }
}
