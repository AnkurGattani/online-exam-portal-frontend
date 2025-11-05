import { Component } from '@angular/core';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { Question } from '../../models/question.model';
import { QuestionForm } from "./question-form/question-form";
import { QuestionService } from '../../services/question-bank/question-bank-service';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardModule } from "@angular/material/card";


@Component({
  selector: 'app-question-bank',
  standalone: true,
  imports: [CommonModule, MatTabGroup, MatTabsModule, QuestionForm, MatCard, MatCardModule],
  templateUrl: './question-bank.html',
  styleUrl: './question-bank.css',
})
export class QuestionBank {
  selectedFile: File | null = null;

  constructor(private questionService: QuestionService) { }

  onSaveQuestion(questionDTO: Question) {
    this.questionService.addQuestion(questionDTO).subscribe({
      next: () => alert('Question added successfully'),
      error: (err) => alert('Error adding question: ' + err.message)
    });
  }

  onUploadFile() {
    if (this.selectedFile) {
      this.questionService.importQuestions(this.selectedFile).subscribe({
        next: (response) => alert('File uploaded successfully: ' + response),
        error: err => alert('Error uploading file: ' + err.message)
      })
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

}