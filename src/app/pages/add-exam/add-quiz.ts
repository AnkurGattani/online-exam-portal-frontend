import { AddQuizService } from '../../services/add-exam/add-quiz';
import { Component, inject } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-quiz',
   standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, MatSnackBarModule],
  templateUrl: './add-quiz.html',
  styleUrls: ['./add-quiz.css'],
})
export class AddQuiz {
constructor(){}

public quiz = {
  title: '',
  description: '',
  duration: '',
  totalMarks: '',
}

private addQuizService = inject(AddQuizService)
private snack = inject(MatSnackBar);

formSubmit() {

  // 1. INPUT VALIDATION (Optional but highly recommended)
  if (!this.quiz.title || !this.quiz.description) {
    this.snack.open("Title and Description are required!", "Dismiss", { duration: 3000 });
    return; // Stop form submission if required fields are empty
  }

  // 2. DATA CONVERSION: Convert strings to numbers
  // This is the CRITICAL fix for the 400 error if the backend expects integers.
  const quizDataToSend = {
    title: this.quiz.title,
    description: this.quiz.description,
    // Use parseInt() to ensure these are sent as JSON numbers
    totalMarks: parseInt(this.quiz.totalMarks, 10),
    duration: parseInt(this.quiz.duration, 10),
  };

  // 3. API CALL
  this.addQuizService.addQuiz(quizDataToSend).subscribe({
    next: (response) => {
      console.log(response);
      this.snack.open("Exam Added Successfully!", 'OK', { duration: 3000 });

      // Optional: Reset the form fields after successful submission
      this.quiz.title = '';
      this.quiz.description = '';
      this.quiz.totalMarks = '';
      this.quiz.duration = '';
    },
    error: (error) => {
      // Log the full error object for debugging
      console.error('API Error:', error);

      // The error.error property often contains the backend's specific reason for the 400.
      const errorMessage = error.error?.message || "Something went wrong! (400 Bad Request)";

      this.snack.open(errorMessage, 'Dismiss', { duration: 5000 });
    }
  });
}
}
