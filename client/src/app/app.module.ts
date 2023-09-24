import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { HeroSectionComponent } from './sections/hero-section/hero-section.component';
import { AboutSectionComponent } from './sections/about-section/about-section.component';
import { CodingSectionComponent } from './sections/coding-section/coding-section.component';
import { ArtworksSectionComponent } from './sections/artworks-section/artworks-section.component';
import { FooterSectionComponent } from './sections/footer-section/footer-section.component';
import { ProfileImageComponent } from './components/profile-image/profile-image.component';
import { LinkIconTrayComponent } from './components/link-icon-tray/link-icon-tray.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { ExperiencesSectionComponent } from './sections/coding-section/experiences-section/experiences-section.component';
import { ProjectsSectionComponent } from './sections/coding-section/projects-section/projects-section.component';
import { ProjectShowcaseComponent } from './components/project-showcase/project-showcase.component';
import { LanguageTagComponent } from './components/language-tag/language-tag.component';
import { ArtworkContainerComponent } from './components/artwork-container/artwork-container.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseLayoutComponent,
    HeroSectionComponent,
    AboutSectionComponent,
    CodingSectionComponent,
    ArtworksSectionComponent,
    FooterSectionComponent,
    ProfileImageComponent,
    LinkIconTrayComponent,
    NavigationBarComponent,
    ExperiencesSectionComponent,
    ProjectsSectionComponent,
    ProjectShowcaseComponent,
    LanguageTagComponent,
    ArtworkContainerComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
