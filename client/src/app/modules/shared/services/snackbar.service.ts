import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum SnackbarStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}

interface SnackbarData {
  type: SnackbarStatus;
  message: string;
  show?: boolean;
  progressPerc?: number;
}

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  data: SnackbarData | null = null;
  public open = new Subject<SnackbarData>();

  init(data: SnackbarData) {
    this.data = { ...data, show: true, progressPerc: 100 };
    this.open.next(this.data);
  }

  hide() {
    if (!this.data) return;
    this.data = { ...this.data, show: false };
    this.open.next(this.data);
  }
}
