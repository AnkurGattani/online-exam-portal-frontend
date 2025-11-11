import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from "../helper"
@Injectable({
  providedIn: 'root',
})
export class User {
  private http = inject(HttpClient);

  addUser(user: any) {
    return this.http.post(`${baseUrl}/api/users/register`, user);
  }
}
