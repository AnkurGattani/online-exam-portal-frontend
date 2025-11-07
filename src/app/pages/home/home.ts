import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core'; // 👈 Added Inject, PLATFORM_ID
import { Router, RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common'; // 👈 Added isPlatformBrowser

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  private isBrowser: boolean; // 👈 New property to track the environment

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // By injecting it into the constructor (@Inject(PLATFORM_ID) private platformId: Object),
  ) // you gained access to the current execution environment identifier.
  {
    // Determine if the application is running in a browser
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // 🛑 FIX: Wrap localStorage access inside the browser check
    if (this.isBrowser) {
      const token = localStorage.getItem('jwtToken');
      const role = localStorage.getItem('userRole');

      if (token && role) {
        if (role === 'ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else if (role === 'STUDENT') {
          this.router.navigate(['/student/dashboard']); // or student dashboard if you have one
        }
      }
    }
  }
}
