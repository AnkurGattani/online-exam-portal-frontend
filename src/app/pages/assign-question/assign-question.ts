import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import {
  AssignQuestionService,
  AssignedQuestionToExamDTO
} from '../../services/assign-question/assign-question-service';

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
    MatDividerModule
  ],
  templateUrl: './assign-question.html',
  styleUrls: ['./assign-question.css']
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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('examId');
    if (id) {
      this.examId = Number(id);
      console.log('Loaded examId:', this.examId);
    } else {
      console.error('No examId found in route');
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
      return;
    }

    this.assignService.assignQuestions(this.examId, this.criteriaList).subscribe({
      next: () => {
        this.assignService.getAssignedQuestions(this.examId).subscribe({
          next: (data) => {
            this.assignedQuestions = data;
            console.log('Assigned Questions:', this.assignedQuestions);
          },
          error: (err) => console.error('Error fetching questions:', err)
        });
      },
      error: (err) => console.error('Error assigning questions:', err)
    });

    console.log('Calling:', `${this.baseUrl}/${this.examId}/assign-questions`);
  }
}
