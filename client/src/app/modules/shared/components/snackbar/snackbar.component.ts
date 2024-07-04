import { Component, ElementRef, ViewChild } from '@angular/core';
import { state, style, trigger } from '@angular/animations';
import { SnackbarService } from '../../services/snackbar.service';
import { TimerHandle } from 'rxjs/internal/scheduler/timerHandle';

// Referenced from: https://stackblitz.com/edit/angular-ivy-yp1co7
/**
 * Creates a snackbar on top of the screen w success/error.
 *
 * @example
 * // implement service (in TS)
 * this.snackbar.init({
 *   type: SnackbarStatus.SUCCESS,
 *   message: 'value',
 * });
 * // creating component (in HTML)
 * <app-snackbar></app-snackbar>
 */

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'closed',
        style({
          visibility: 'hidden',
        })
      ),
      state('open', style({})),
    ]),
  ],
})
export class SnackbarComponent {
  @ViewChild('element', { static: false }) progressBar!: ElementRef;
  progressInterval!: TimerHandle;

  readonly snackbarTimeSeconds: number = 5;

  constructor(public snackbarService: SnackbarService) {
    this.snackbarService.open.subscribe((data) => {
      if (data.show) {
        this.countDown();
      }
    });
  }

  countDown() {
    // reset timer if refreshed
    this.stopCountDown();

    if (!this.snackbarService.data) return;

    this.progressBar.nativeElement.style.width =
      this.snackbarService.data.progressPerc?.toString() + '%';

    this.progressInterval = setInterval(() => {
      if (!this.snackbarService.data) return;

      const width = parseInt(this.progressBar.nativeElement.style.width, 10);
      if (width <= 0) {
        this.snackbarService.hide();
        this.stopCountDown();
        return;
      }

      this.progressBar.nativeElement.style.width = (width - 2).toString() + '%';
    }, this.snackbarTimeSeconds * 20); // 1 second : 20
  }

  stopCountDown(): void {
    clearInterval(this.progressInterval);
    this.progressBar.nativeElement.style.width = '100%';
  }
}
