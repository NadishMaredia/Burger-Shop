import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoginRequest, LoginResponse, User, UserSession } from '../models/User';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  isAuthenticated: boolean = false;
  userName: any = "";

  constructor(private fb: FormBuilder, public authService: AuthService, private notificationService: NotificationService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      emailControl: [null, [Validators.required, this.emailValidator()]],
      passwordControl: [null, [Validators.required, this.passwordValidator()]],
    });

    this.isAuthenticated = this.authService.isAuthenticated();
    this.userName = this.authService.getUserName();
  }

  private emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      // Check if the email is empty
      if (Validators.required(control) || value === '') {
        return { 'emptyEmail': true };
      }

      // Check if the email is valid using a simple regex
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(value)) {
        return { 'invalidEmail': true };
      }

      return null; // Return null if the email is valid
    };
  }

  private passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (Validators.required(control) || value === '') {
        return { 'emptyPassword': true };
      }

      return null; // Return null if the password is valid
    };
  }

  // getUserName() {
  //   if(this.authService.userSubject.value != null) {
  //     return this.authService.userSubject.value.name;
  //   }
  //   return null;
  // }

  login() {
    if (this.form.valid) {
      
      var user: LoginRequest = {
        email: this.form.get('emailControl')?.value,
        password: this.form.get('passwordControl')?.value
      }

      this.authService.login(user)
        .subscribe((res: LoginResponse) => {
          this.authService.setSession(this.setSession(res));
          this.showSuccessNotification('Login successful');
          this.isAuthenticated = this.authService.isAuthenticated();
        }, (err) => {
          alert(err.error.message)
        })

    } else {
      this.markFormGroupTouched(this.form);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      // If the control is a FormGroup, recursively mark its controls as touched
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  setSession(res: LoginResponse) {
    var session: UserSession = {
      _id: res.user._id,
      name: res.user.name,
      token: res.token
    }

    return session;
  }

  showSuccessNotification(message: any): void {
    this.notificationService.showSuccess(message);
  }

  showErrorNotification(): void {
    this.notificationService.showError('Oops! Something went wrong.');
  }

  signup() {
    this.router.navigate(['/signup']);
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated = this.authService.isAuthenticated();
    this.router.navigate(['/']);
  }
}
