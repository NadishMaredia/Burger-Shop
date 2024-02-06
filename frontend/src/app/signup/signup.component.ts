import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { SignupRequest, SignupResponse, UserSession } from '../models/User';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: ['', this.nameValidator()],
      email: ['', [this.emailValidator()]],
      password: ['', this.passwordValidator()],
    })
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

  private nameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (Validators.required(control) || value === '') {
        return { 'emptyName': true };
      }

      return null; // Return null if the password is valid
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

  signup() {

    if (this.signUpForm.valid) {

      var user: SignupRequest = {
        name: this.signUpForm.get('name')?.value,
        email: this.signUpForm.get('email')?.value,
        password: this.signUpForm.get('password')?.value,
        role: 'customer'
      };

      this.authService.signup(user)
        .subscribe((res: SignupResponse) => {
          this.authService.setSession(this.setSession(res));
          this.router.navigate(['/']);
        }, (err) => {
          alert('Some issue occur while signing up..')
        })

    } else {
      this.markFormGroupTouched(this.signUpForm);
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

  get email() {
    return this.signUpForm.get('email');
  }

  setSession(res: SignupResponse) {
    var session: UserSession = {
      _id: res.user._id,
      name: res.user.name,
      token: res.token
    }

    return session;
  }

}
