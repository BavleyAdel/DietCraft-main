import { Component } from '@angular/core';
import { UserInfoSchema } from '../../models/UserInfoSchema';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  standalone: false,
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css',
})
export class UserInfoComponent {
  goals: string[] = ['Weight Loss', 'Muscle Gain', 'Maintain Weight'];
  activityLevel: string[] = [
    'Low : Sedentary',
    'Medium : Moderate exercise',
    'High : Heavy exercise',
  ];
  userInfoForm!: FormGroup;
  errorMessage: string | null = null;


  constructor(
    private fb: FormBuilder,
    private userService: UserService ,
    private router: Router
  ) {}

  addUserInfo(): void {
    const userInfo: UserInfoSchema = {
      age: this.userInfoForm.get('age')?.value,
      weight: this.userInfoForm.get('weight')?.value,
      height: this.userInfoForm.get('height')?.value,
      gender: this.userInfoForm.get('gender')?.value,
      activityLevel: this.userInfoForm.get('activityLevel')?.value,
      goal: this.userInfoForm.get('goal')?.value,
      calories: this.userInfoForm.get('calories')?.value,
    };

    this.userService.addUserInfo(userInfo).subscribe({
      next: (response) => {
        if (response?.success) {
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = response?.message || 'Adding your info failed';
        }
      },
      error: (error) => {
        this.errorMessage = error?.message || 'An error occurred';
      },
    });
  }

}
