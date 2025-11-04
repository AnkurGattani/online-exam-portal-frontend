import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../../models/question.model';
import baseUrl from '../helper';

@Injectable({ providedIn: 'root' })
export class QuestionService {
  private apiUrl = `${baseUrl}/questions`;

  constructor(private http: HttpClient) { }

  // Get all questions
  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/get-all-questions`);
  }

  // Get question by type (MCQ, MSQ, Numeric)
  getQuestionsByType(type: string): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/get-question-by-type/${type}`);
  }

  // Get question by difficulty (Easy, Medium, Hard)
  getQuestionsByDifficulty(difficulty: string): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/get-question-by-difficulty/${difficulty}`);
  }

  // Get question by ID
  getQuestionById(id: number): Observable<Question> {
    return this.http.get<Question>(`${this.apiUrl}/${id}`);
  }

  // Add new question (QuestionDTO expected)
  addQuestion(questionDTO: Question): Observable<Question> {
    return this.http.post<Question>(`${this.apiUrl}/add-question`, questionDTO);
  }

  // Update question
  updateQuestion(id: number, question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.apiUrl}/${id}`, question);
  }

  // Delete question
  deleteQuestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Bulk import questions from file
  importQuestions(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/upload-questions`, formData, { responseType: 'text' });
  }
}