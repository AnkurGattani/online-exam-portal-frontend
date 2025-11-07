// src/app/services/report.service.ts

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

  /**
   * ✅ FIX: Corrected path to match backend's @GetMapping("/userId/{id}")
   */
  getReportsByUser(userId: number): Observable<ReportResponse[]> {
    return this.http.get<ReportResponse[]>(`${this.reportUrl}/userId/${userId}`);
  }

  /**
   * ✅ FIX: Corrected path to match backend's @GetMapping("/examId/{id}")
   * This resolves the initial 403 error you reported due to the path mismatch.
   */
  getReportsByExam(examId: number): Observable<ReportResponse[]> {
    return this.http.get<ReportResponse[]>(`${this.reportUrl}/examId/${examId}`);
  }

  getReportById(reportId: number): Observable<ReportResponse> {
    return this.http.get<ReportResponse>(`${this.reportUrl}/${reportId}`);
  }

  /**
   * ⭐ NEW: Service call to match backend's @PostMapping("/generate/{userId}/{examId}")
   * This method must be called after a user submits an exam to generate and save the report.
   */
  generateReport(userId: number, examId: number): Observable<ReportResponse> {
    // Uses POST with path variables, so the request body is typically empty object {}.
    return this.http.post<ReportResponse>(`${this.reportUrl}/generate/${userId}/${examId}`, {});
  }
}
