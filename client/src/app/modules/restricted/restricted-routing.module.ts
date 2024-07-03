import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './submodules/auth/guard/auth.guard';
import { RestrictedComponent } from './restricted.component';

const routes: Routes = [
  {
    path: '',
    component: RestrictedComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./submodules/auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'dashboard',
        canLoad: [authGuard],
        loadChildren: () =>
          import('./submodules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestrictedRoutingModule {}
