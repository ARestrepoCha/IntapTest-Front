import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from './auth';
import { Observable } from 'rxjs';

export interface TimeActivity {
  Date: Date;
  Hours: number;
}

export interface ActivityResponse {
  Id: string | null;
  Descripcion: string;
  TimeActivities: TimeActivity[];
}

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private baseUrl = 'https://localhost:7253/api';

  constructor(private http: HttpClient, private authService: Auth) {}

  getActivities(): Observable<ActivityResponse[]> {
    return this.http.get<ActivityResponse[]>(`${this.baseUrl}/Acitvity`, {
      headers: this.authService.getHeaders()
    });
  }

  createActivity(payload: ActivityResponse) {
    return this.http.post(`${this.baseUrl}/Acitvity`, payload, {
      headers: this.authService.getHeaders()
    });
  }

  updateActivity(payload: ActivityResponse) {
    return this.http.put(`${this.baseUrl}/Acitvity/Update/${payload.Id}`, payload, {
      headers: this.authService.getHeaders()
    });
  }

  deleteActivity(id: string) {
    return this.http.delete(`${this.baseUrl}/Acitvity/Delete/${id}`, {
      headers: this.authService.getHeaders()
    });
  }
}
