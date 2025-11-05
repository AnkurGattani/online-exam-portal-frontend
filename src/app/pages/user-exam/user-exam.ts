
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
// Import CommonModule directly instead of just NgForOf
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
// Update the import path and filename to match the actual file (e.g., 'quiz.service' or 'Quiz')
import { Quiz, QuizData } from '../../services/viewExam/quiz';
// If your file is named differently, adjust the path and filename accordingly.
import { RouterLink, Router } from '@angular/router';
import { LoginService } from '../../services/login/login';

@Component({
  selector: 'app-user-exam',
  imports: [MatCardModule, MatButtonModule, CommonModule, RouterLink],
  templateUrl: './user-exam.html',
  styleUrl: './user-exam.css',
})
export class UserExam implements OnInit {

  // Inject Services
  private examService = inject(Quiz);
  private router = inject(Router);

  quizzes: QuizData[] = [];

  ngOnInit(): void {

    // 2. Load quizzes
    this.examService.quizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
        console.log(this.quizzes);
      },
      (error) => {
        console.log('Error loading quizzes:', error);
        Swal.fire('Error !', 'Error in loading data !', 'error');
      }
    );
  }

  startQuizConfirmation(examId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to change your answers once submitted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Start Quiz!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Starting!', 'The quiz is now starting.', 'success');
        this.router.navigate(['/start', examId]);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'You have not started the quiz.', 'error');
      }
    });
  }

}
