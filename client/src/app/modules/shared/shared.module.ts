import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { TextFadeWrapperComponent } from './components/text-fade-wrapper/text-fade-wrapper.component';
import { LazyLoadImageDirective } from './directives/lazy-load-image.directive';

@NgModule({
  declarations: [
    SnackbarComponent,
    TextFadeWrapperComponent,
    LazyLoadImageDirective,
  ],
  imports: [CommonModule],
  exports: [
    SnackbarComponent,
    TextFadeWrapperComponent,
    LazyLoadImageDirective,
  ],
})
export class SharedModule {}
