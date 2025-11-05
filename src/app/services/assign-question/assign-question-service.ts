import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface QuestionOptionDTO {
  optionId: number;
  optionText: string;
}

export interface AssignedQuestionToExamDTO {
  questionId: number;
  text: string;
  marks: number;
  questionType: string;
  difficulty: string;
  options: QuestionOptionDTO[];
}

@Injectable({
  providedIn: 'root'
})
export class AssignQuestionService {
  private baseUrl = 'http://localhost:9091/api/exams';

  constructor(private http: HttpClient) { }


  assignQuestions(examId: number, criteriaList: any[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/${examId}/assign-questions`, criteriaList);
  }

  getAssignedQuestions(examId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${examId}/questions`);
  }

}
