import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
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
  private baseUrl = 'https://localhost:7253/api'; // tu puerto/backend local

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    console.log(`${this.baseUrl}/User/login`);
    return this.http.post<LoginResponse>(`${this.baseUrl}/User/login`, data);
  }

  createUser(data: CreateUserRequest): Observable<boolean> {
    console.log(`${this.baseUrl}/User/login`);
    return this.http.post<boolean>(`${this.baseUrl}/User`, data);
  }
}
