import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestrictedRoutingModule } from './restricted-routing.module';
import { RestrictedComponent } from './restricted.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from './submodules/auth/interceptors/auth-http-interceptor';
import { AuthModule } from './submodules/auth/auth.module';

@NgModule({
  declarations: [RestrictedComponent],
  imports: [CommonModule, RestrictedRoutingModule, AuthModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
})
export class RestrictedModule {}
