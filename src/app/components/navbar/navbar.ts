import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLinkActive, RouterModule } from '@angular/router';   
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ CommonModule, MatToolbarModule, MatButtonModule, MatIconModule , RouterModule,RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
  
export class Navbar {

  currentUrl: string = '';

  constructor(private router: Router) {
    // Subscribe to route changes
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url;
    });


 }
}
