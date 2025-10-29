import { Component, inject } from '@angular/core';
// Import the necessary modules

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
// You will also need MatButtonModule for any buttons in your template, but we'll focus on the error fix.
import { FormsModule } from '@angular/forms';
import { User } from '../../services/user/user';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-signup',
  // Use the full Modules, not the individual directives
  standalone: true, // Assuming this is a standalone component
  imports: [
    MatFormFieldModule, // Enables <mat-form-field>, <mat-label>
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatSelectModule,
    MatSnackBarModule,
],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
})
export class Signup  {

constructor() { }

public user = {
  name: '',
  email: '',
  password: '',
  user_roles_enum: '',
}


private userService = inject(User);
private snack = inject(MatSnackBar);

  formSubmit(){
    console.log(this.user);
    if(this.user.name=='' || this.user.name==null){
      this.snack.open("Name is required !!",'',{duration:3000});
      return;
    }

    this.userService.addUser(this.user).subscribe(
      (response)=>{
        console.log(response);
        this.snack.open("User registered successfully",'',{duration:3000});
      },
      (error)=>{
        console.log(error);
       this.snack.open("Something went wrong !!",'',{duration:3000});
      }
    );
  }

}
