import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Signup } from './pages/signup/signup';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Navbar } from './components/navbar/navbar';
import { ViewQuizes } from './pages/view-exam/view-quizes';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSnackBarModule,
    MatToolbarModule,
    Navbar,
    MatCardModule,
  ],
  template:`
  <app-navbar></app-navbar>
  <div class="main-content-wrapper">
    <router-outlet></router-outlet>
  </div>
  `,
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('online-exam-portal');
}
