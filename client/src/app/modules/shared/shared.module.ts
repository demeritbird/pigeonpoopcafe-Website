import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { TextFadeWrapperComponent } from './components/text-fade-wrapper/text-fade-wrapper.component';

@NgModule({
  declarations: [SnackbarComponent, TextFadeWrapperComponent],
  imports: [CommonModule],
  exports: [SnackbarComponent, TextFadeWrapperComponent],
})
export class SharedModule {}
