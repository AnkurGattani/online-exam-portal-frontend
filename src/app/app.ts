import { MatIconModule } from '@angular/material/icon';
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
  ],
  template:`<router-outlet></router-outlet>
  <app-navbar></app-navbar>`,
  //the elements you place directly in the main application template are the pieces of code (components/HTML) that are shared and visible across all pages.
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('online-exam-portal');
}
