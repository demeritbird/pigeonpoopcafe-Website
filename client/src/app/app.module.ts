import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { HeroSectionComponent } from './sections/hero-section/hero-section.component';
import { AboutSectionComponent } from './sections/about-section/about-section.component';
import { ExperienceProjectsSectionComponent } from './sections/experience-projects-section/experience-projects-section.component';
import { ArtworksSectionComponent } from './sections/artworks-section/artworks-section.component';
import { FooterSectionComponent } from './sections/footer-section/footer-section.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseLayoutComponent,
    HeroSectionComponent,
    AboutSectionComponent,
    ExperienceProjectsSectionComponent,
    ArtworksSectionComponent,
    FooterSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
