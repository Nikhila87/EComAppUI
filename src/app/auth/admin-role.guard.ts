import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminRoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const userRole = this.authService.getUserRole(); // Fetch role from AuthService

    if (userRole === 'Admin') {
      return true; // Allow access if Admin
    } else {
      this.router.navigate(['/']); // Redirect non-admin users to homepage
      return false;
    }
  }
}
