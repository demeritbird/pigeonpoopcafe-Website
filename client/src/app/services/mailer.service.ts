import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MailerService {
  constructor(private http: HttpClient) {}

  requestMail() {
    return this.http.post(`${environment.SERVER_LINK}/sendGreetingEmail`, {});
  }
}
