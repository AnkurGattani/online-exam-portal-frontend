import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'; // <-- ADD THIS
import { NgForOf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { error, log } from 'console';
import Swal from 'sweetalert2';
import { Quiz, QuizData } from '../../services/viewExam/quiz';
import { RouterLink, Router } from "@angular/router";


@Component({
  selector: 'app-view-quizes',
  standalone: true,
  imports: [MatCardModule, NgForOf, MatButtonModule, RouterLink], // <-- ADD MatButtonModule HERE
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

  startQuizConfirmation(examId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to change your answers once submitted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6', // Customize button colors
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Start Quiz!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // --- THIS IS THE CRITICAL PART ---
        // If the user clicks "Yes, Start Quiz!", you put the logic
        // to actually start the quiz here.
        // This will likely be a navigation command.
        // Example: this.router.navigate(['/start-quiz', examId]);

        // For now, let's just show a success message:
        Swal.fire(
          'Starting!',
          'The quiz is now starting.',
          'success'
        );

        this.router.navigate(['/start', examId]);
        // **IMPORTANT:** Add your actual quiz start logic here.
        // For example, if you need to navigate to the quiz page:
        // this.router.navigate(['/start-quiz', examId]);

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // This block executes if the user clicks "Cancel" or dismisses the dialog
        Swal.fire(
          'Cancelled',
          'You have not started the quiz.',
          'error'
        );
      }
    });
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
