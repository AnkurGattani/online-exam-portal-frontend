import { Component } from '@angular/core';
import { ReportService, ReportResponse } from '../../services/report/report';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-report',
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-report.html',
  styleUrls: ['./admin-report.css'],
})
export class AdminReport {
  reports: ReportResponse[] = [];
  examId!: number;

  constructor(private reportService: ReportService) {}

  loadReports(): void {
    this.reportService.getReportsByExam(this.examId).subscribe({
      next: (data) => this.reports = data,
      error: (err) => console.error('Error fetching reports', err)
    });
  }
}