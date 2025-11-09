import { Component, OnInit } from '@angular/core';
import { ReportService, ReportResponse } from '../../services/report/report';
import { LoginService } from '../../services/login/login';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-report',
  templateUrl: './student-report.html',
  styleUrls: ['./student-report.css'],
  imports: [CommonModule],
  standalone: true
})
export class StudentReport implements OnInit {
  reports: ReportResponse[] = [];
  userId!: number; // Get from JWT or localStorage

  constructor(private reportService: ReportService,private loginService:LoginService) {}

  ngOnInit(): void {
    this.userId = this.loginService.getUserId()!; // Example
    this.loadReports();
  }

  loadReports(): void {
    this.reportService.getReportsByUser(this.userId).subscribe({
      next: (data) => this.reports = data,
      error: (err) => console.error('Error fetching reports', err)
    });
  }
}
