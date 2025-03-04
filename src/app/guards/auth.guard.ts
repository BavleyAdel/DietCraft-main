import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('auth_token'); // Check if token exists

    if (!token) {
      this.router.navigate(['/login']); // Redirect to login if not signed in
      return false;
    }
    return true;
  }
}
