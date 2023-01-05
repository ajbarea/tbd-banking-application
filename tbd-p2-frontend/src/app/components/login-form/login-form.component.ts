import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { UserLogin } from 'src/app/models/UserLogin';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private _snackbar: MatSnackBar
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      let userLogin: UserLogin = {
        userName: String(this.loginForm.value.userName),
        password: String(this.loginForm.value.password),
      };
      console.log(userLogin);
      // placeholder call, still need to handle output and save into a more permanent storage
      this.authService.login(userLogin).subscribe(
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
      console.log('User is logged in');
      this.router.navigateByUrl('/');
    } else {
      //alert('Wrong username or password');
      this._snackbar.open('Wrong username or password', 'close', {duration: 5000});
    }
  }
}
