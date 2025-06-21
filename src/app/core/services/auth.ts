import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  TokenValue: string;
  // Otros campos que tu backend devuelva
}

interface CreateUserRequest {
  fullName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private baseUrl = 'https://localhost:7253/api';
  private tokenKey = 'token';

  constructor(private router: Router, private http: HttpClient) {}

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    if (!this.isBrowser()) return false;
    return !!localStorage.getItem('token');
  }

  login(data: LoginRequest): Observable<LoginResponse> {
    console.log(`${this.baseUrl}/User/login`);
    return this.http.post<LoginResponse>(`${this.baseUrl}/User/login`, data);
  }

  createUser(data: CreateUserRequest): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/User`, data);
  }

  getHeaders(): HttpHeaders {
    const headers: any = {};
    if (this.isBrowser()) {
      const token = localStorage.getItem('token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return new HttpHeaders(headers);
  }

  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
      this.router.navigate(['/auth/login']);
    }
  }
}
