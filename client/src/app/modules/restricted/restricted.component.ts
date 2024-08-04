import { Component } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  AuthService,
  CurrentUser,
} from './submodules/auth/services/auth.service';
import { BehaviorSubject, filter, Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-restricted',
  templateUrl: './restricted.component.html',
  styleUrls: ['./restricted.component.scss'],
  animations: [
    trigger('slideFade', [
      state('hidden', style({ opacity: 0 })),
      transition('* => hidden', [animate('1s ease-in-out')]),
    ]),
  ],
})
export class RestrictedComponent {
  routerSubscription!: Subscription;
  currentRoute: string | null = null;
  currentUser$: BehaviorSubject<CurrentUser | null>;
  isOnRestrictedPage: boolean = false;

  imageIsLoading: boolean = true;
  icons = Array(10);

  constructor(private router: Router, private authService: AuthService) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd)) // prevent multiple calls
      .subscribe(() => {
        this.isOnRestrictedPage = this.checkIsNestedRestrictedRoute();
      });

    this.isOnRestrictedPage = this.checkIsNestedRestrictedRoute();
  }

  private checkIsNestedRestrictedRoute(): boolean {
    const urlSegments = this.router.url.split('/');
    return urlSegments.length > 2 && urlSegments[1] === 'restricted';
  }

  imageOnLoad() {
    // lazy loading
    this.imageIsLoading = false;
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
