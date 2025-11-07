import { Component, PLATFORM_ID, Inject } from '@angular/core'; // 👈 Added Inject
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLinkActive, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common'; // 👈 Added isPlatformBrowser
import { LoginService } from '../../services/login/login';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, RouterModule],
  providers: [],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  currentUrl: string = '';
  private isBrowser: boolean; // 👈 New property to track the environment

  constructor(
    private loginService: LoginService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // 👈 Inject platform ID
  ) {
    // Check if the application is running in the browser
    this.isBrowser = isPlatformBrowser(this.platformId); // Subscribe to route changes

    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url;
    });
  }
  // returns true when a user token exists in storage (adjust to your auth mechanism)
  isLoggedIn(): boolean {
    // 👈 Wrapping localStorage access with an environment check
    if (this.isBrowser) {
      return !!localStorage.getItem('jwtToken');
    }
    return false; // Return false during server-side rendering
  }

  logout() {
    // Note: The logout service/function should also handle the browser check internally
    // if it manipulates localStorage directly.
    this.loginService.logout();
    this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
      // This check is good because window only exists in the browser
      if (this.isBrowser) {
        window.location.reload(); // ✅ Forces full reload
      }
    });
  }
}
