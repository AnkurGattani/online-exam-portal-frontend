import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    RouterModule,
    RouterLink

  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  user = { email: '', password: '' };

  constructor(private snackBar: MatSnackBar, private loginService:LoginService, private router:Router) {}

  formSubmit() {
    if (!this.user.email.trim() || !this.user.password) {
      this.snackBar.open('Please fill all fields', 'Close', {
        duration: 3000
      });
      return;
    }

    //request to server to generate token
    this.loginService.generateToken(this.user).subscribe({

      next: (data: any) => {
        console.log('Token generated successfully', data);
        localStorage.setItem('jwtToken', data.token); //  Save token
        this.snackBar.open('Login successful!', 'Close', { duration: 3000 });

        // Redirect based on role
        const role = this.loginService.getUserRole();
         localStorage.setItem('userRole', role ?? '');
        console.log('Decoded role from token:', role);

        if (role === 'ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else if (role === 'STUDENT') {
          this.router.navigate(['/user-exam']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (error: any) => {
        console.log('Error generating token', error);
        this.snackBar.open('Invalid credentials', 'Close', { duration: 3000 });
      },

    });




    console.log('Form Submitted');
    console.log('Email:', this.user.email);
    console.log('Password:', this.user.password);

    this.snackBar.open('Login successful!', 'Close', {
      duration: 3000
    });
  }
}

