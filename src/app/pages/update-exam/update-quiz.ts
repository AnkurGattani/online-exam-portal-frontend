import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // ⬅️ Router added here
import { Quiz } from '../../services/viewExam/quiz'; // Assuming this points to the service below
import Swal from 'sweetalert2';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-quiz',
  standalone: true, // Assuming this is an Angular 17+ component
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, MatSnackBarModule],
  templateUrl: './update-quiz.html',
  styleUrl: './update-quiz.css',
})
export class UpdateQuiz implements OnInit { // Implements OnInit for ngOnInit lifecycle hook

  // 1. Dependency Injections
  private route = inject(ActivatedRoute);
  private viewQuizService = inject(Quiz);
  private snack = inject(MatSnackBar); // To display success/error messages
  private router = inject(Router); // To navigate after successful update

  qId = 0;

  // Initialized quiz object. Added 'examId' as this is crucial for the PUT request URL.
  quiz: any = {
      examId: 0, // This will be set by the API response, but initialized for safety
      title: '',
      description: '',
      totalMarks: '',
      duration: '',
  };

  ngOnInit(): void {
    // 2. Fetch Quiz Data on Init
    this.qId = this.route.snapshot.params['qid'];

    this.viewQuizService.getQuiz(this.qId).subscribe(
      (data: any) => {
        this.quiz = data;
        // Important: Ensure the 'examId' or 'id' property used by the backend
        // is correctly mapped to quiz.examId/quiz.id for the update request.
        console.log("Quiz data loaded:", this.quiz);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !', 'Error in loading quiz data !', 'error');
      }
    );
  }

  // 3. Method to Handle Form Submission (Update)
  public updateData() {

    // Check if the required data is present (optional, but recommended)
    if (!this.quiz.title || !this.quiz.totalMarks) {
        this.snack.open('Title and Total Marks are required!', 'Dismiss', { duration: 3000 });
        return;
    }

    this.viewQuizService.updateQuiz(this.quiz).subscribe(
      (data: any) => {
        // Success
        Swal.fire('Success', 'Quiz updated successfully!', 'success').then(() => {
          // Navigate to the view quizzes page after success
          this.router.navigate(['/admin/quizzes']);
        });
      },
      (error: any) => {
        // Error
        console.log(error);
        this.snack.open('Error: Could not update quiz!', 'Dismiss', {
          duration: 3000,
        });
      }
    );
  }
}
