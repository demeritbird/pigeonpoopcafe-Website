import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { TextFadeWrapperComponent } from './components/text-fade-wrapper/text-fade-wrapper.component';
import { ImageLoadedDirective } from './directives/image-loaded.directive';

@NgModule({
  declarations: [
    SnackbarComponent,
    TextFadeWrapperComponent,
    ImageLoadedDirective,
  ],
  imports: [CommonModule],
  exports: [SnackbarComponent, TextFadeWrapperComponent, ImageLoadedDirective],
})
export class SharedModule {}
