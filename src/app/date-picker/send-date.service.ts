import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DateToSend } from '../date-to-send';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class SendDateService {
  private sendDate = 'http://localhost:8080/testing/add';
  constructor(private http: HttpClient) {}
  postDate(DateToSend: DateToSend): Observable<any> {
    return this.http.post(this.sendDate, DateToSend, httpOptions);
  }
}
