import { ReportResponse, ReportService } from './../../services/report/report';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-report',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-report.html',
  styleUrls: ['./admin-report.css'],
})
export class AdminReport {
  reports: ReportResponse[] = [];
  examId!: number;

  constructor(private reportService: ReportService) {}

  loadReports(): void {
    // 1. Input Validation Check
    if (!this.examId) {
      console.warn('Please enter an Exam ID.');
      this.reports = [];
      return;
    }

    this.reportService.getReportsByExam(this.examId).subscribe({
      next: (data) => {
        // 2. FIX: Ensure 'data' is always treated as an array.
        // If it's a single object (the error you saw), wrap it in an array.
        // If it's already an array (the expected behavior), use it directly.
        const receivedReports = Array.isArray(data) ? data : [data]; // Filter out potential non-report items if necessary, though [data] handles the single object case.

        this.reports = receivedReports.filter((item) => item !== null);

        if (!Array.isArray(data)) {
          console.warn('Backend returned a single object. Wrapped it in an array to fix display.');
        }

        console.log('Reports loaded successfully:', this.reports);
      },
      error: (err) => {
        console.error('Error fetching reports', err);
        this.reports = []; // Clear reports on error
      },
    });
  }
}
