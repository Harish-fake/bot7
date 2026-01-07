import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackService } from '../../services/feedback.service';
import { FeedbackRequest, QuestionResponse } from '../../models/feedback.model';
import { QuestionsService, PredefinedQuestion } from '../../services/questions.service';

@Component({
  selector: 'app-submit-feedback',
  templateUrl: './submit-feedback.component.html',
  styleUrls: ['./submit-feedback.component.css']
})
export class SubmitFeedbackComponent {
  feedbackRequest: FeedbackRequest = {
    category: 'ACADEMIC',
    subCategory: '',
    content: '',
    anonymous: false,
    questionResponses: []
  };
  
  categories = ['ACADEMIC', 'INFRASTRUCTURE'];
  
  academicSubCategories = ['Courses', 'Faculty', 'Teaching Methods', 'Curriculum'];
  infrastructureSubCategories = ['Classrooms', 'Internet/WiFi', 'Labs', 'Library', 'Hostel', 'Hygiene'];
  
  // For predefined questions
  predefinedQuestions: PredefinedQuestion[] = [];
  questionResponses: QuestionResponse[] = [];
  hoveredStars: number[] = [];
  
  successMessage = '';
  errorMessage = '';

  constructor(
    private feedbackService: FeedbackService, 
    private router: Router,
    private questionsService: QuestionsService
  ) {}

  get subCategories(): string[] {
    return this.feedbackRequest.category === 'ACADEMIC' 
      ? this.academicSubCategories 
      : this.infrastructureSubCategories;
  }

  onCategoryChange(): void {
    this.feedbackRequest.subCategory = '';
    this.predefinedQuestions = [];
    this.questionResponses = [];
  }

  onSubCategoryChange(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    if (this.feedbackRequest.category && this.feedbackRequest.subCategory) {
      this.predefinedQuestions = this.questionsService.getQuestions(
        this.feedbackRequest.category, 
        this.feedbackRequest.subCategory
      );
      
      // Initialize question responses
      this.questionResponses = this.predefinedQuestions.map(q => ({
        question: q.question,
        rating: 0,
        comment: ''
      }));
    }
  }

  setRating(index: number, rating: number): void {
    this.questionResponses[index].rating = rating;
  }

  setHoveredStar(index: number, star: number): void {
    this.hoveredStars[index] = star;
  }

  clearHoveredStar(index: number): void {
    this.hoveredStars[index] = 0;
  }

  getStarClass(questionIndex: number, starIndex: number): string {
    const rating = this.questionResponses[questionIndex]?.rating || 0;
    const hovered = this.hoveredStars[questionIndex] || 0;
    
    if (hovered >= starIndex) {
      return 'star-hovered';
    } else if (rating >= starIndex) {
      return 'star-filled';
    }
    return 'star-empty';
  }

  onSubmit(): void {
    // Validate required questions
    const hasInvalidResponses = this.predefinedQuestions.some((q, index) => 
      q.required && this.questionResponses[index].rating === 0
    );

    if (hasInvalidResponses) {
      this.errorMessage = 'Please rate all required questions (marked with *)';
      return;
    }

    // Add question responses to feedback request
    this.feedbackRequest.questionResponses = this.questionResponses.filter(r => r.rating > 0);

    this.feedbackService.submitFeedback(this.feedbackRequest).subscribe({
      next: () => {
        this.successMessage = 'Feedback submitted successfully!';
        setTimeout(() => {
          this.router.navigate(['/feedback-list']);
        }, 2000);
      },
      error: (error) => {
        this.errorMessage = 'Failed to submit feedback';
        console.error(error);
      }
    });
  }
}
