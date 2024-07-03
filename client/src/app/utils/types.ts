import { HttpErrorResponse } from '@angular/common/http';

export interface ApiResponse {
  status: number;
  data: any;
}
export interface ApiError extends HttpErrorResponse {
  error: {
    status: number;
    message: any;
  };
}
