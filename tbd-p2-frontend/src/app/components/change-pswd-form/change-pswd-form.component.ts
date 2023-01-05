import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/models/UserLogin';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { passwordMismatchValidator } from 'src/app/password-match.directive';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-pswd-form',
  templateUrl: './change-pswd-form.component.html',
  styleUrls: ['./change-pswd-form.component.scss'],
})
export class ChangePswdFormComponent {
  pswdForm = new FormGroup(
    {
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      repassword: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    },
    { validators: passwordMismatchValidator } // Still need to change "style to show when bad input. doesn't work by default like in the formControl"
  );

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private _snackbar: MatSnackBar
  ) {}

  onSubmit() {
    console.log(this.pswdForm);
    if (this.pswdForm.valid) {
      let userLogin: any = {
        password: String(this.pswdForm.value.password),
        repassword: String(this.pswdForm.value.repassword),
      };
      console.log(userLogin);

      // Update password
      this.usersService
        .updateUserPassword(
          String(this.authService.getLoggedInUser()),
          userLogin.password
        )
        .subscribe(
          (res) => {
            console.log(res);
            this.resultCheck(true);
          },
          (err) => {
            console.log(err);
            this.resultCheck(false);
          }
        );
    }
  }

  resultCheck(result: boolean) {
    if (result) {
      this._snackbar.open('Updated password', 'close', { duration: 5000 });
      this.router.navigate(['/profile']);
    } else {
      this._snackbar.open('Something went wrong', 'close', { duration: 5000 });
    }
  }
}
