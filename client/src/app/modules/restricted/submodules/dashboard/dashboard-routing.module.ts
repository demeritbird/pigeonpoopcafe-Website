import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../auth/guards/auth.guard';
import { DashboardComponent } from './dashboard.component';
import { AlyssaStoryComponent } from './stories/alyssa-story/alyssa-story.component';
import { WolfeStoryComponent } from './stories/wolfe-story/wolfe-story.component';
import { DemeritbirdStoryComponent } from './stories/demeritbird-story/demeritbird-story.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: DefaultLayoutComponent,
      },
      {
        path: 'alyssa',
        component: AlyssaStoryComponent,
      },
      {
        path: 'wolfe',
        component: WolfeStoryComponent,
      },
      {
        path: 'demeritbird',
        component: DemeritbirdStoryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
