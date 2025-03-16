import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isActive = false;
  isLoggedIn = false;
  navLinks = [
    { label: 'Home', url: '#hero', state: '' },
    { label: 'About', url: '#about', state: '' },
    { label: 'Services', url: '#services', state: '' },
    { label: 'Contact', url: '#footer', state: '' },
  ];

  constructor(private authService: AuthService,private router:Router) {
    this.authService.getAuthStatus().subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  toggleMobileNav(): void {
    this.isActive = !this.isActive;
  }

  hideMobileNav(): void {
    if (this.isActive) {
      this.toggleMobileNav();
    }
  }

  logout() {
    this.authService.logout();
  }
}
