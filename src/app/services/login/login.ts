import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common'; // <-- Import utility
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
  private isBrowser: boolean; // Property to store the platform state

  // Inject PLATFORM_ID to determine the environment
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    // Initialize isBrowser property
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // Generate JWT token (No changes needed here)
  generateToken(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${baseUrl}/api/users/login`, credentials);
  }

  // Decode JWT and get role
  getUserRole(): string | null {
    // 🛡️ Conditional access check
    if (!this.isBrowser) {
        return null;
    }

    const token = localStorage.getItem('jwtToken');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      return payload.role || null;
    } catch {
      return null;
    }
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    // 🛡️ Conditional access check
    if (!this.isBrowser) {
        return false; // User is never 'logged in' during SSR
    }

    return !!localStorage.getItem('jwtToken');
  }

  //Logout functionality
  logout(): void {
    // 🛡️ Conditional access check
    if (this.isBrowser) {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userRole');
    }
  }

  // New utility method to save the token (if you don't have one)
  // You may already have this logic in the component calling generateToken
  public setToken(token: string): void {
      if (this.isBrowser) {
          localStorage.setItem('jwtToken', token);
      }
  }

  // Utility method to get the raw token (useful for HTTP Interceptors)
  public getToken(): string | null {
      if (this.isBrowser) {
          return localStorage.getItem('jwtToken');
      }
      return null;
  }
}
