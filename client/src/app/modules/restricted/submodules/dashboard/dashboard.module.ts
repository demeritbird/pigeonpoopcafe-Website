import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AlyssaStoryComponent } from './stories/alyssa-story/alyssa-story.component';
import { WolfeStoryComponent } from './stories/wolfe-story/wolfe-story.component';
import { DemeritbirdStoryComponent } from './stories/demeritbird-story/demeritbird-story.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AlyssaStoryComponent,
    WolfeStoryComponent,
    DemeritbirdStoryComponent,
    DefaultLayoutComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
