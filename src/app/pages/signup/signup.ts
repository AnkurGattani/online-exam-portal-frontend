import { Component, inject } from '@angular/core';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

import { FormsModule } from '@angular/forms';
import { User } from '../../services/user/user';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-signup',
  standalone: true, // A standalone component
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
  userRolesEnum: '',
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
