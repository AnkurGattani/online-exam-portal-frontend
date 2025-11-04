import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLinkActive, RouterModule } from '@angular/router';   
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login/login';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, RouterModule],
  providers: [],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
  
export class Navbar {

  currentUrl: string = '';

  constructor(private loginService:LoginService,private router: Router) {
    // Subscribe to route changes
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url;
    });


 }
 // returns true when a user token exists in storage (adjust to your auth mechanism)
 isLoggedIn(): boolean {
  return !!localStorage.getItem('jwtToken'); // ✅ match the key used in LoginService
}

 logout() {
  this.loginService.logout();
  this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
    window.location.reload(); // ✅ Forces full reload
  });
}



}
