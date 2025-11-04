import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from '../helper';

import { Observable } from 'rxjs';

export interface QuizData {
  // Define a local interface/type for better clarity
  examId: number;
  title: string;
  description: string;
  totalMarks: number;
  duration: number;
}

@Injectable({
  providedIn: 'root',
})
export class Quiz {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  public quizzes() {
    return this.http.get(`${baseUrl}/exam/`);
  }

  public deleteQuiz(quizId: number) {
    return this.http.delete(`${baseUrl}/exam/deleteById/${quizId}`);
  }

  public getQuiz(qId: any) {
    return this.http.get(`${baseUrl}/exam/${qId}`);
  }

  public updateQuiz(quizData: QuizData) {
    return this.http.put(`${baseUrl}/exam/update/${quizData.examId}`, quizData);
  }

getQuestionsForTest(examId: string): Observable<any> {
    // Ensure this URL is correct:
    return this.http.get(`${baseUrl}/api/exams/${examId}/questions`);
    // If the service URL was wrong (e.g., using /exam/ instead of /api/exams/), this would fail.
}

  public getQuizDetails(qid: any) {
    // Assuming your backend has an endpoint like /exam/{qid} that returns the full Exam object (including duration)
    return this.http.get(`${baseUrl}/exam/${qid}`);
  }

  public saveResponse(responsePayload: any): Observable<any> {
    return this.http.post(`${baseUrl}/responses/submit`, responsePayload);
  }

  public getSavedResponses(userId: number, examId: string): Observable<any> {
    return this.http.get(`${baseUrl}/responses/user/${userId}/exam/${examId}`);
  }
  getFinalResult(examId: string, userId: number): Observable<any> {
    const url = `${this.apiUrl}/exams/${examId}/result/user/${userId}`;
    return this.http.get(url);
  }
}
