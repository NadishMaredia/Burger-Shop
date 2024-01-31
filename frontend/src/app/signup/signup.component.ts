import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

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
    console.log(this.signUpForm)
    if (this.signUpForm.valid) {

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

}
