import { Injectable, inject } from '@angular/core';
import baseUrl from '../helper';
import { HttpClient } from '@angular/common/http';


@Injectable({
 providedIn: 'root'
})
export class AddQuizService {
 constructor() {}
 private http = inject(HttpClient);

  addQuiz( examId: any){
   return this.http.post(`${baseUrl}/exam/add`, examId);
  }
}
