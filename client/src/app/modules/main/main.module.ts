import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
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
import { ModalComponent } from './components/modal/modal.component';
import { ArtworkContainerComponent } from './components/artwork-container/artwork-container.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  declarations: [
    MainComponent,
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
    ModalComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
})
export class MainModule {}
