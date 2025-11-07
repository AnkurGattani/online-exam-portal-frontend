import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import {
  AssignQuestionService,
  AssignedQuestionToExamDTO,
} from '../../services/assign-question/assign-question-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-assign-question',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
  ],
  templateUrl: './assign-question.html',
  styleUrls: ['./assign-question.css'],
})
export class AssignQuestionComponent implements OnInit {
  baseUrl: string = 'http://localhost:8080/api/exams';
  examId!: number;

  criteriaList = [{ type: '', difficulty: '', numberOfQuestions: '' }];
  questionTypes: string[] = ['MULTIPLE_CHOICE_QUESTION', 'MULTIPLE_SELECT_QUESTION', 'NUMERIC'];
  questionDifficulties: string[] = ['EASY', 'MEDIUM', 'HARD'];
  assignedQuestions: AssignedQuestionToExamDTO[] = [];

  constructor(
    private assignService: AssignQuestionService,
    private route: ActivatedRoute,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('examId');
    if (id) {
      this.examId = Number(id);
      console.log('Loaded examId:', this.examId);
    } else {
      console.error('No examId found in route');
      this.snack.open('Error: Exam ID is missing from the URL.', 'Dismiss', { duration: 5000 });
    }
  }

  addCriteria() {
    this.criteriaList.push({ type: '', difficulty: '', numberOfQuestions: '' });
  }

  deleteCriteria(index: number) {
    this.criteriaList.splice(index, 1);
  }

  formSubmit() {
    if (!this.examId) {
      console.error('Exam ID is missing.');
      this.snack.open('Error: Cannot submit, Exam ID is missing.', 'Dismiss', { duration: 5000 });
      return;
    }

    // 🛑 FIX 1: Frontend validation for criteria fields
    for (const criteria of this.criteriaList) {
      if (
        !criteria.type ||
        !criteria.difficulty ||
        !criteria.numberOfQuestions ||
        Number(criteria.numberOfQuestions) <= 0
      ) {
        this.snack.open(
          'Please fill all fields and ensure the number of questions is positive.',
          'Dismiss',
          {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          }
        );
        return; // Stop submission
      }
    }
    // ---------------------------------------------------

    this.assignService.assignQuestions(this.examId, this.criteriaList).subscribe({
      next: () => {
        // Success case: Show a success message
        this.snack.open('Questions assigned successfully!', 'OK', { duration: 3000 });

        this.assignService.getAssignedQuestions(this.examId).subscribe({
          next: (data) => {
            this.assignedQuestions = data;
            console.log('Assigned Questions:', this.assignedQuestions);
          },
          error: (err) => {
            console.error('Error fetching questions:', err);
            this.snack.open('Questions assigned but failed to refresh the list.', 'Dismiss', {
              duration: 5000,
            });
          },
        });
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error assigning questions:', err); // 🛑 FIX 2: Enhanced error message extraction for clarity

        let errorMessage = 'Assignment failed due to an unknown server error.'; // 1. Check for raw string error (used by your Spring controller)

        if (typeof err.error === 'string' && err.error.length > 0) {
          errorMessage = err.error;
        }
        // 2. Check for common object message formats
        else if (err.error && err.error.message) {
          errorMessage = err.error.message;
        }
        // 3. Fallback to HTTP status text
        else if (err.status) {
          errorMessage = `${err.status} ${err.statusText || 'Error'}`;
        } // Display the user-facing error message

        this.snack.open(`Error: ${errorMessage}`, 'Dismiss', {
          duration: 8000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      },
    });

    console.log('Calling:', `${this.baseUrl}/${this.examId}/assign-questions`);
  }
}
