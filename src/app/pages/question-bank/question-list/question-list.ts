import { Component, OnInit } from '@angular/core';
import { Question } from '../../../models/question.model';
import { QuestionService } from '../../../services/question-bank/question-bank-service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatAnchor } from "@angular/material/button";


@Component({
  selector: 'app-question-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatAnchor],
  templateUrl: './question-list.html',
  styleUrl: './question-list.css',
})
export class QuestionList implements OnInit {

  questionList: Question[] = [];  // Initialize an empty array and make sure it's not undefined and of Question type

  // Constructor with dependency injection
  constructor(private questionService: QuestionService, private router: Router) { }

  // OnInit lifecycle hook to fetch questions when component initializes
  ngOnInit(): void {
    this.questionService.getAllQuestions().subscribe((data: Question[]) => {
      this.questionList = data;
      // console.log(this.questionList);
      // console.log(this.questionList[0].options[0].optionText);

    });
  }

  editQuestion(question: Question): void {
    this.router.navigate(['/questionbank/edit', question.questionId]);
  };

  deleteQuestion(question: Question): void {
    console.log('Inside deleteQuestion component method for question:', question);
    const id = question.questionId;
    if (confirm('Are you sure you want to delete this question?')) {
      if (id == null) {  // can't delete a question without an id
        return;
      }
      console.log('Deleting question with id:', id);

      this.questionService.deleteQuestion(id).subscribe(() => {
        this.questionList = this.questionList.filter(q => q.questionId !== id);
      });
    }
  }
}
