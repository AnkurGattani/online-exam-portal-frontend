// src/app/services/user/user.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class User {
  private http = inject(HttpClient);

  // ✅ FIX: USE YOUR ACTUAL BACKEND URL
  private baseUrl = 'http://localhost:8080';

  addUser(user: any) {
    // This path '/api/users/register' must match your Spring Boot SecurityConfig
    return this.http.post(`${this.baseUrl}/api/users/register`, user);
  }
}
