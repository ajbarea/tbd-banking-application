import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetails } from 'src/app/models/UserDetails';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  currentProfileState: UserDetails;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.usersService
      .getUser(String(this.authService.getLoggedInUser()))
      .subscribe((res) => {
        this.currentProfileState = res;
        this.getUserDetails();
      });
  }

  getUserDetails() {
    this.profileForm.setValue({
      firstName: String(this.currentProfileState.firstName),
      lastName: String(this.currentProfileState.lastName),
      email: String(this.currentProfileState.email),
    });
  }

  getCurrentUsername() {
    return this.authService.getLoggedInUser();
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.currentProfileState = {
        username: this.currentProfileState.username,
        firstName: String(this.profileForm.value.firstName),
        lastName: String(this.profileForm.value.lastName),
        email: String(this.profileForm.value.email),
        password: this.currentProfileState.password,
      };

      this.usersService
        .updateUserdetails(this.currentProfileState)
        .subscribe((res) => {
          if (res.result) this.successNotify();
        });
    }
  }

  successNotify() {
    this._snackbar.open('Updated profile', 'close', { duration: 5000 });
  }

  openPasswordMenu() {
    this.router.navigate(['./change-pswd'], { relativeTo: this.route });
  }
}
