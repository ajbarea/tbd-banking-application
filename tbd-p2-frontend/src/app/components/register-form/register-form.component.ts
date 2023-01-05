import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { UserDetails } from '../../models/UserDetails';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
  registerForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  constructor(private usersService: UsersService, private location: Location, private _snackbar:MatSnackBar) {}

  onSubmit() {
    if (this.registerForm.valid) {
      let userDetails: UserDetails = {
        username: String(this.registerForm.value.userName),
        firstName: String(this.registerForm.value.firstName),
        lastName: String(this.registerForm.value.lastName),
        email: String(this.registerForm.value.email),
        password: String(this.registerForm.value.password),
      };

      // post request to create user with userDetails logs the response to console (might need to handle failure)
      console.log(userDetails);
      this.usersService.registerUser(userDetails).subscribe(
        (res) => {
          console.log(res);
          this.resultCheck(res.result);
        },
        (err) => {
          console.log(err);
          this.resultCheck(err.result);
        }
      );
    }
  }

  resultCheck(result: boolean) {
    if (result) {
      this.location.back();
      this._snackbar.open('User Registered', 'close', {duration: 5000});
    } else {
      alert('This username already exists');
    }
  }
}
