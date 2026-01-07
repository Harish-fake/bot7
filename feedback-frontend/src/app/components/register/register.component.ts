import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerRequest: RegisterRequest = {
    name: '',
    email: '',
    password: '',
    role: 'STUDENT'
  };
  errorMessage = '';

  roles = ['STUDENT', 'FACULTY', 'STAFF'];

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.register(this.registerRequest).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.errorMessage = 'Registration failed. Email may already exist.';
        console.error(error);
      }
    });
  }
}
