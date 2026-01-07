import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from '../../services/feedback.service';
import { AuthService } from '../../services/auth.service';
import { Feedback, QuestionResponse } from '../../models/feedback.model';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {
  feedbacks: Feedback[] = [];
  displayedColumns: string[] = ['category', 'subCategory', 'content', 'ratings', 'submittedAt'];
  
  // For expanded ratings view
  expandedRatings: Set<string> = new Set();

  constructor(
    private feedbackService: FeedbackService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.feedbackService.getUserFeedback(user.userId).subscribe({
        next: (data) => {
          this.feedbacks = data;
          this.applyFilters();
        },
        error: (error) => {
          console.error('Error fetching feedback:', error);
        }
      });
    }
  }

  toggleRatingsExpanded(feedbackId: string): void {
    if (this.expandedRatings.has(feedbackId)) {
      this.expandedRatings.delete(feedbackId);
    } else {
      this.expandedRatings.add(feedbackId);
    }
  }

  isRatingsExpanded(feedbackId: string): boolean {
    return this.expandedRatings.has(feedbackId);
  }

  getAverageRating(questionResponses: QuestionResponse[]): string {
    if (!questionResponses || questionResponses.length === 0) {
      return '0.0';
    }
    const sum = questionResponses.reduce((acc, response) => acc + response.rating, 0);
    const avg = sum / questionResponses.length;
    return avg.toFixed(1);
  }

  applyFilters(): void {
    this.route.queryParams.subscribe(params => {
      let filtered = [...this.feedbacks];

      if (params['status']) {
        filtered = filtered.filter(f => f.status === params['status']);
      }

      if (params['category']) {
        filtered = filtered.filter(f => f.category === params['category']);
      }

      this.feedbacks = filtered;
    });
  }

  getStatusColor(status: string): string {
    switch(status) {
      case 'PENDING': return 'warn';
      case 'IN_PROGRESS': return 'accent';
      case 'RESOLVED': return 'primary';
      default: return '';
    }
  }
}
