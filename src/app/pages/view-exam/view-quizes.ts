import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'; // <-- ADD THIS
import { NgForOf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { error, log } from 'console';
import Swal from 'sweetalert2';
import { Quiz, QuizData } from '../../services/viewExam/quiz';
import { RouterLink, Router } from "@angular/router";
import { MatIcon } from "@angular/material/icon";


@Component({
  selector: 'app-view-quizes',
  standalone: true,
  imports: [MatCardModule, NgForOf, MatButtonModule, RouterLink, MatIcon], // <-- ADD MatButtonModule HERE
  templateUrl: './view-quizes.html',
  styleUrls: ['./view-quizes.css'],
})




export class ViewQuizes {
constructor() { }

private examService = inject(Quiz);
private router = inject(Router);



quizzes: QuizData[] = [];  // explicitly say its an interface type

  ngOnInit(): void{
    this.examService.quizzes().subscribe(

   (data:any)=>{
    this.quizzes=data;
    console.log(this.quizzes )
   },
   (error)=>{
    console.log(error);
    Swal.fire('Error !', "Error in loading data !", 'error');
   }
    )
  }


  // delete quiz

  public deleteQuiz(examId: number): void {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Call the service method with the ID
        this.examService.deleteQuiz(examId).subscribe(
          (data: any) => {
            // Success: Show confirmation and update the local list
            Swal.fire('Success', 'Quiz deleted successfully', 'success');

            // this.quizzes = ...,takes the newly created array (which is missing the deleted quiz) and replaces the old array with it.
            // which updates the page without reloading
            this.quizzes = this.quizzes.filter((quiz) => quiz.examId !== examId);
          },
          (error) => {
            // Error: Show error message
            console.log(error);
            Swal.fire('Error', 'Error in deleting quiz', 'error');
          }
        );
      }
    });
  }


 updateQuiz(){

 }



}
