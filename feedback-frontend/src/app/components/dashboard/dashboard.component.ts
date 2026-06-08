import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FeedbackService } from '../../services/feedback.service';
import { FeedbackStats } from '../../models/feedback.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName = '';
  userRole = '';
  stats: FeedbackStats | null = null;
  loadingStats = false;
  statsError = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userName = user.name;
      this.userRole = user.role;
    }
    // Load statistics: staff sees overall stats, others see their own
    const current = this.authService.getCurrentUser();
    if (current) {
      this.loadingStats = true;
      if (this.userRole === 'STAFF') {
        this.feedbackService.getFeedbackStats().subscribe({
          next: s => this.stats = s,
          error: e => this.statsError = 'Failed to load statistics',
          complete: () => this.loadingStats = false
        });
      } else {
        this.feedbackService.getUserFeedbackStats(current.userId).subscribe({
          next: s => this.stats = s,
          error: e => this.statsError = 'Failed to load statistics',
          complete: () => this.loadingStats = false
        });
      }
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  viewAllFeedback(): void {
    if (this.userRole === 'STAFF') {
      this.router.navigate(['/admin-panel']);
    } else {
      this.router.navigate(['/feedback-list']);
    }
  }

  viewFeedbackByStatus(status: string): void {
    if (this.userRole === 'STAFF') {
      this.router.navigate(['/admin-panel'], { queryParams: { status } });
    } else {
      this.router.navigate(['/feedback-list'], { queryParams: { status } });
    }
  }

  viewFeedbackByCategory(category: string): void {
    if (this.userRole === 'STAFF') {
      this.router.navigate(['/admin-panel'], { queryParams: { category } });
    } else {
      this.router.navigate(['/feedback-list'], { queryParams: { category } });
    }
  }

  viewAnonymousFeedback(): void {
    if (this.userRole === 'STAFF') {
      this.router.navigate(['/admin-panel'], { queryParams: { anonymous: 'true' } });
    }
  }

  viewNamedFeedback(): void {
    if (this.userRole === 'STAFF') {
      this.router.navigate(['/admin-panel'], { queryParams: { anonymous: 'false' } });
    } else {
      this.router.navigate(['/feedback-list']);
    }
  }
}
