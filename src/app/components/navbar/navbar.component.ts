import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isActive = false;
  navLinks = [
    { label: 'Home', url: '#hero', state: '' },
    { label: 'About', url: '#about', state: '' },
    { label: 'Services', url: '#services', state: '' },
    { label: 'Contact', url: '#footer', state: '' },
  ];

  toggleMobileNav(): void {
    this.isActive = !this.isActive;
    // document.body.classList.toggle('mobile-nav-active', this.isActive);
  }

  hideMobileNav(): void {
    if (this.isActive) {
      this.toggleMobileNav();
    }
  }
}
