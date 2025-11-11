import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NavCardComponent } from "../../components/nav-card/nav-card";
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'admin-dashboard',
  imports: [NavCardComponent, MatCardModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboard {
  private router = inject(Router);

  protected readonly adminName = signal('Admin');

  protected readonly navCards = signal([
    { title: 'Exam Management', path: 'admin/quizzes' },
    { title: 'Question Bank', path: 'admin/questionbank' },
    { title: 'Reports', path: 'admin/reports' },
  ]);

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
