import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { TextFadeWrapperComponent } from './components/text-fade-wrapper/text-fade-wrapper.component';
import { ImageLoadedDirective } from './directives/image-loaded.directive';
import { LazyLoadImageDirective } from './directives/lazy-load-image.directive';

@NgModule({
  declarations: [
    SnackbarComponent,
    TextFadeWrapperComponent,
    ImageLoadedDirective,
    LazyLoadImageDirective,
  ],
  imports: [CommonModule],
  exports: [SnackbarComponent, 
            TextFadeWrapperComponent, 
            ImageLoadedDirective, 
            LazyLoadImageDirective],
})
export class SharedModule {}
