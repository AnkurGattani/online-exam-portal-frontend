import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NavCardComponent } from '../../components/nav-card/nav-card';

@Component({
  selector: 'student-dashboard',
  imports: [NavCardComponent],
  templateUrl: './student-dashboard.html',
  styleUrl: './student-dashboard.css',
})
export class StudentDashboard {
  constructor(private router: Router) { }

  protected readonly studentName = signal('Student');

  protected readonly navCards = signal([
    { title: 'Attempt Exams', path: 'student/exams' },
    { title: 'View Report', path: 'student/reports' }
  ]);

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
