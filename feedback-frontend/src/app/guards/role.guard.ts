import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getCurrentUser();
    
    // Prevent STAFF from accessing submit-feedback and feedback-list
    if (user && user.role === 'STAFF') {
      this.router.navigate(['/admin-panel']);
      return false;
    }
    
    return true;
  }
}
