import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}

  // Generate JWT token
  generateToken(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${baseUrl}/api/users/login`, credentials);
  }

  // Decode JWT and get role
  getUserRole(): string | null {
    const token = localStorage.getItem('jwtToken');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      return payload.role || null;
    } catch {
      return null;
    }
  }

  getUserId(): number | null {
    const token = localStorage.getItem('jwtToken');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId || null;
    } catch {
      return null;
    }
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwtToken');
  }

  //Logout functionality
  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userRole');
  }
  
}