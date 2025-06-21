import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from './auth';
import { Observable } from 'rxjs';

export interface CreateTimeActivityRequest {
  ActivityId: string | null;
  Date: string; // ISO
  Hours: number;
}

@Injectable({
  providedIn: 'root'
})
export class TimeActivityService {
  private baseUrl = 'https://localhost:7253/api';

  constructor(private http: HttpClient, private authService: Auth) {}

  create(payload: CreateTimeActivityRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/TimeActivity`, payload, {
      headers: this.authService.getHeaders()
    });
  }
}
