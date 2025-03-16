import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { IUser } from '../../models/IUser';
import { AuthInterceptor } from '../../interceptors/auth.interceptor';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage: string | null = null;

  // Password visibility states
  passwordFieldType: string = 'password';
  iClass: string = 'fa-eye-slash';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  // Toggle password visibility
  toggleVisibility(): void {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  loginUser(): void {
    if (this.loginForm.invalid) {
      this.errorMessage =
        'An error occurred, please check you have entered valid Email & Password.';
      return;
    }

    let user: IUser = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.userService.login(user).subscribe({
      next: (response) => {
        console.log(response);
        
        if (response.message == 'User Logged In Successfully !') {
          this.authService.setToken(response.data.accessToken)
          this.userService.setCookie('refreshToken',response.data.user.refreshToken)  
          // if(response.data.userData == null){
            this.router.navigate(['/user-info']);
          // }else{
            // this.router.navigate(['/home']);
          // }
        } else {
          this.errorMessage = response.message; // Display server-side message
        }
      },
      error: (error) => {
        this.errorMessage = error.message; // Display server-side error message
      },
    });
  }
}
