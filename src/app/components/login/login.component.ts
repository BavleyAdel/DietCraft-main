import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  loginUser(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = "Please correct the errors in the form.";
      return;
    }

    const user = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.userService.login(user).subscribe({
      next: (response) => {
        if (response.success) {
          this.userService.setCookie(response.token); // Save the JWT in a cookie
          this.router.navigate(['/home']); // Navigate to home page after successful login
        } else {
          this.errorMessage = response.message; // Display server-side message
        }
      },
      error: (error) => {
        this.errorMessage = error.message; // Display server-side error message
      }
    });
  }
}
