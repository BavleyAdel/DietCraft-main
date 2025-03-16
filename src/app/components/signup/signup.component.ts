import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { IUser } from '../../models/IUser';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signUpForm!: FormGroup;
  errorMessage: string | null = null;

  // Password visibility states
  passwordFieldType: string = 'password';
  iClass :string ='fa-eye-slash'

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
        checked: [false, Validators.requiredTrue], // Ensure terms are checked
      },
      { validators: this.passwordsMatch } // ✅ Apply validator correctly
    );
  }

  passwordsMatch(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (!password || !confirmPassword) return null;

    return password.value === confirmPassword.value
      ? confirmPassword.setErrors(null) // ✅ Remove errors if match
      : confirmPassword.setErrors({ mismatch: true }); // ❌ Add error if mismatch
  }

  isInvalid(field: string): boolean {
    return !!(
      this.signUpForm.get(field)?.invalid && this.signUpForm.get(field)?.touched
    );
  }

  signupUser(): void {
    if (this.signUpForm.invalid) {
      this.errorMessage = 'Please correct the errors in the form.';
      return;
    }

    const user: IUser = {
      username: this.signUpForm.get('username')?.value,
      email: this.signUpForm.get('email')?.value,
      password: this.signUpForm.get('password')?.value,
    };

    this.userService.signUp(user).subscribe({
      next: (response) => {
        console.log('Signup Response:', response); // ✅ Debugging log
        if (response?.message == 'User Created Successfully !') {
          // ✅ Use optional chaining to prevent crashes
          this.cookieService.set('auth_token', response.refreshToken || ''); // ✅ Default value
          this.router.navigate(['/login']);
        } else {
          this.errorMessage =
            response?.message ||
            'Something went wrong with Signing you up, please try again.'; // ✅ Avoid undefined errors
        }
      },
      error: (error) => {
        // console.error('Signup Error:', error); // ✅ Debugging log
        this.errorMessage = error?.message || 'An error occurred !';
      },
    });
  }

  // Toggle password visibility
  toggleVisibility(): void {
    this.passwordFieldType =
      this.passwordFieldType === "password" ? "text" : "password";
    this.iClass = this.passwordFieldType === "fa-eye-dash" ? "fa-eye" : "fa-eye-slash";
  }
}
