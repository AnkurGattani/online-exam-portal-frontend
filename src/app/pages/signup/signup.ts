import { Component, inject } from '@angular/core';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

import { FormsModule } from '@angular/forms';
import { User } from '../../services/user/user';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-signup',
  standalone: true, // A standalone component
  imports: [
    MatFormFieldModule, // Enables <mat-form-field>, <mat-label>
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatCard,
    MatSelectModule,
    MatSnackBarModule,
    RouterLink,
    CommonModule
],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
})
export class Signup  {

constructor() { }

public user = {
  name: '',
  email: '',
  password: '',
  userRolesEnum: '',
}


private userService = inject(User);
private snack = inject(MatSnackBar);

formSubmit() {
    console.log(this.user);
    if (this.user.name === '' || this.user.name === null) {
      this.snack.open("Name is required !!", '', { duration: 3000 });
      return;
    }

    this.userService.addUser(this.user).subscribe({
      next: (response) => {
        console
        this.snack.open("User registered successfully", '', { duration: 3000 });
      },
      error: (error) => {
        console.error(error); 

        
        let errorMessage = "Something went wrong on the server.";

        
        if (error.error && typeof error.error === 'object') {

            // Get all validation messages (values) from the error object
            const validationErrors = Object.values(error.error) as string[];
            console.log(validationErrors);


            if (validationErrors.length > 0) {
                // Join the messages into a single string, separated by new lines or a pipe '|'
                errorMessage = validationErrors.join(' | ');
            } else {
                // Fallback for an empty error object
                errorMessage = "Validation failed with no specific message.";
            }

        } else if (typeof error.error === 'string') {
            // Fallback for simple string errors (less common)
            errorMessage = error.error;
        }

        // Display the specific, extracted error message
        this.snack.open("Validation Failed: " + errorMessage, 'Close', { duration: 5000 });
      }
    });
}
}
