import { Component, OnInit } from '@angular/core';
import { QuestionForm } from "../question-bank/question-form/question-form";
import { Question } from '../../models/question.model';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../services/question-bank/question-bank-service';

@Component({
  selector: 'app-update-question',
  imports: [QuestionForm],
  templateUrl: './update-question.html',
  styleUrl: './update-question.css',
})
export class UpdateQuestion {
  question?: Question;  // Property to hold the question data

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.questionService.getQuestionById(id).subscribe((data) => {
      this.question = data;
    });
  }

  updateQuestion(updatedQuestion: Question): void {
    if (!this.question?.questionId) {
      console.log("Question ID is missing. Cannot update question!! :: ", this.question);
      return;
    }
    this.questionService.updateQuestion(this.question.questionId, updatedQuestion).subscribe({
      next: (response) => {
        console.log("Question updated successfully:", response);
        this.router.navigate(['/admin/questionbank']); // Navigate back to question list after update
      },
      error: (error) => {
        console.error("Error updating question:", error);
      }
    });
  }

}
