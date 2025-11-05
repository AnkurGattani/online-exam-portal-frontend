import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import baseUrl from '../helper';

export interface ReportResponse {
  reportId: number;
  totalMarks: number;
  marksObtained: number;
  reportStatus: string;
  userId: number;
  userName: string;
  examId: number;
  examTitle: string;
}

@Injectable({
  providedIn: 'root'
})

export class ReportService {
  private reportUrl = `${baseUrl}/report`;

  constructor(private http: HttpClient) {}

  getReportsByUser(userId: number): Observable<ReportResponse[]> {
  return this.http.get<ReportResponse[]>(`${this.reportUrl}/user/${userId}`);
}

getReportsByExam(examId: number): Observable<ReportResponse[]> {
  return this.http.get<ReportResponse[]>(`${this.reportUrl}/exam/${examId}`);
}

getReportById(reportId: number): Observable<ReportResponse> {
  return this.http.get<ReportResponse>(`${this.reportUrl}/${reportId}`);
}

  // // Student: Get reports for logged-in user
  // getReportsByUser(userId: number): Observable<ReportResponse[]> {
  //   return this.http.get<ReportResponse[]>(`${this.reportUrl}/userId/${userId}`);
  // }

  // // Admin: Get reports by exam
  // getReportsByExam(examId: number): Observable<ReportResponse[]> {
  //   return this.http.get<ReportResponse[]>(`${this.reportUrl}/examId/${examId}`);
  // }

  // // Admin: Get report by ID
  // getReportById(reportId: number): Observable<ReportResponse> {
  //   return this.http.get<ReportResponse>(`${this.reportUrl}/${reportId}`);
  //}
}