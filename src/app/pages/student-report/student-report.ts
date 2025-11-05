import { Component, OnInit } from '@angular/core';
import { ReportService, ReportResponse } from '../../services/report/report';

@Component({
  selector: 'app-student-report',
  templateUrl: './student-report.html',
  styleUrls: ['./student-report.css'],
})
export class StudentReport implements OnInit {
  reports: ReportResponse[] = [];
  userId!: number; // Get from JWT or localStorage

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId')); // Example
    this.loadReports();
  }

  loadReports(): void {
    this.reportService.getReportsByUser(this.userId).subscribe({
      next: (data) => this.reports = data,
      error: (err) => console.error('Error fetching reports', err)
    });
  }
}
