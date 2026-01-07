import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from '../../services/feedback.service';
import { Feedback, QuestionResponse } from '../../models/feedback.model';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  feedbacks: Feedback[] = [];
  allFeedbacks: Feedback[] = [];
  filteredFeedbacks: Feedback[] = [];
  displayedColumns: string[] = ['submitterName', 'submitterRole', 'category', 'subCategory', 'content', 'ratings', 'submittedAt'];
  
  // For expanded ratings view
  expandedRatings: Set<string> = new Set();
  
  // For analytics
  @ViewChild('ratingsChart') ratingsChartRef!: ElementRef<HTMLCanvasElement>;
  chart: Chart | null = null;
  showAnalytics: boolean = false;
  analyticsData: any = null;
  
  // Filter properties
  searchText: string = '';
  selectedRole: string = '';
  selectedCategory: string = '';
  selectedSubCategory: string = '';
  selectedStatus: string = '';
  
  // Subcategories mapping
  academicSubCategories = ['Courses', 'Faculty', 'Teaching Methods', 'Curriculum'];
  infrastructureSubCategories = ['Classrooms', 'Internet/WiFi', 'Labs', 'Library', 'Hostel', 'Hygiene'];
  availableSubCategories: string[] = [];

  constructor(
    private feedbackService: FeedbackService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadAllFeedback();
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

  loadAllFeedback(): void {
    this.feedbackService.getAllFeedback().subscribe({
      next: (data) => {
        console.log('Loaded feedback data:', data);
        console.log('Sample feedback roles:', data.slice(0, 3).map(f => ({ name: f.submitterName, role: f.submitterRole })));
        this.allFeedbacks = data;
        this.filteredFeedbacks = data;
        this.applyQueryParamFilters();
      },
      error: (error) => {
        console.error('Error fetching feedback:', error);
      }
    });
  }
  
  onCategoryChange(): void {
    this.selectedSubCategory = '';
    if (this.selectedCategory === 'ACADEMIC') {
      this.availableSubCategories = this.academicSubCategories;
    } else if (this.selectedCategory === 'INFRASTRUCTURE') {
      this.availableSubCategories = this.infrastructureSubCategories;
    } else {
      this.availableSubCategories = [];
    }
    this.applyAllFilters();
  }
  
  applyAllFilters(): void {
    let filtered = [...this.allFeedbacks];
    
    // Search filter
    if (this.searchText) {
      const search = this.searchText.toLowerCase();
      filtered = filtered.filter(f => 
        (f.submitterName && f.submitterName.toLowerCase().includes(search)) ||
        (f.content && f.content.toLowerCase().includes(search))
      );
    }
    
    // Role filter
    if (this.selectedRole) {
      if (this.selectedRole === 'ANONYMOUS') {
        filtered = filtered.filter(f => 
          f.anonymous === true || 
          f.submitterRole === 'ANONYMOUS' || 
          f.submitterRole === null || 
          f.submitterRole === undefined ||
          f.submitterName === 'Anonymous'
        );
      } else {
        filtered = filtered.filter(f => f.submitterRole === this.selectedRole);
      }
      console.log('Filtered results for', this.selectedRole, ':', filtered.length);
    }
    
    // Category filter
    if (this.selectedCategory) {
      filtered = filtered.filter(f => f.category === this.selectedCategory);
    }
    
    // SubCategory filter
    if (this.selectedSubCategory) {
      filtered = filtered.filter(f => f.subCategory === this.selectedSubCategory);
    }
    
    // Status filter
    if (this.selectedStatus) {
      filtered = filtered.filter(f => f.status === this.selectedStatus);
    }
    
    this.feedbacks = filtered;
  }
  
  clearFilters(): void {
    this.searchText = '';
    this.selectedRole = '';
    this.selectedCategory = '';
    this.selectedSubCategory = '';
    this.selectedStatus = '';
    this.availableSubCategories = [];
    this.feedbacks = [...this.filteredFeedbacks];
  }

  applyQueryParamFilters(): void {
    this.route.queryParams.subscribe(params => {
      let filtered = [...this.filteredFeedbacks];

      if (params['status']) {
        filtered = filtered.filter(f => f.status === params['status']);
      }

      if (params['category']) {
        filtered = filtered.filter(f => f.category === params['category']);
      }

      if (params['anonymous'] === 'true') {
        filtered = filtered.filter(f => f.anonymous === true);
      } else if (params['anonymous'] === 'false') {
        filtered = filtered.filter(f => f.anonymous === false);
      }

      this.filteredFeedbacks = filtered;
      this.feedbacks = filtered;
    });
  }

  updateStatus(id: string, status: string): void {
    this.feedbackService.updateStatus(id, status).subscribe({
      next: () => {
        this.loadAllFeedback();
      },
      error: (error) => {
        console.error('Error updating status:', error);
      }
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

  generateAnalytics(): void {
    if (!this.selectedCategory || !this.selectedSubCategory) {
      alert('Please select both Category and Sub-Category to view analytics');
      return;
    }

    // Filter feedback for selected category and subcategory
    const relevantFeedback = this.allFeedbacks.filter(f => 
      f.category === this.selectedCategory && 
      f.subCategory === this.selectedSubCategory &&
      f.questionResponses && 
      f.questionResponses.length > 0
    );

    if (relevantFeedback.length === 0) {
      alert('No feedback with ratings found for this category/subcategory');
      return;
    }

    // Aggregate ratings by question
    const questionRatings: { [question: string]: number[] } = {};
    
    relevantFeedback.forEach(feedback => {
      feedback.questionResponses?.forEach(qr => {
        if (!questionRatings[qr.question]) {
          questionRatings[qr.question] = [];
        }
        questionRatings[qr.question].push(qr.rating);
      });
    });

    // Calculate average ratings
    const questions = Object.keys(questionRatings);
    const averageRatings = questions.map(q => {
      const ratings = questionRatings[q];
      const avg = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
      return { question: q, average: avg, count: ratings.length };
    });

    // Sort by average rating (lowest first for identifying problem areas)
    averageRatings.sort((a, b) => a.average - b.average);

    this.analyticsData = {
      category: this.selectedCategory,
      subCategory: this.selectedSubCategory,
      totalFeedback: relevantFeedback.length,
      questions: averageRatings
    };

    this.showAnalytics = true;

    // Render chart after view update
    setTimeout(() => this.renderChart(), 100);
  }

  renderChart(): void {
    if (!this.ratingsChartRef || !this.analyticsData) return;

    // Destroy existing chart
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = this.ratingsChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    const questions = this.analyticsData.questions.map((q: any) => this.truncateQuestion(q.question));
    const ratings = this.analyticsData.questions.map((q: any) => q.average);
    const counts = this.analyticsData.questions.map((q: any) => q.count);

    // Color code bars: red for low (<3), yellow for medium (3-4), green for high (>4)
    const backgroundColors = ratings.map((rating: number) => {
      if (rating < 3) return 'rgba(244, 67, 54, 0.7)'; // Red
      if (rating < 4) return 'rgba(255, 193, 7, 0.7)'; // Yellow
      return 'rgba(76, 175, 80, 0.7)'; // Green
    });

    const borderColors = ratings.map((rating: number) => {
      if (rating < 3) return 'rgb(244, 67, 54)';
      if (rating < 4) return 'rgb(255, 193, 7)';
      return 'rgb(76, 175, 80)';
    });

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: questions,
        datasets: [{
          label: 'Average Rating',
          data: ratings,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
            max: 5,
            title: {
              display: true,
              text: 'Average Rating (1-5 stars)'
            },
            ticks: {
              stepSize: 1
            }
          },
          y: {
            title: {
              display: true,
              text: 'Questions'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              afterLabel: (context: any) => {
                const index = context.dataIndex;
                return `Responses: ${counts[index]}`;
              }
            }
          }
        }
      }
    };

    this.chart = new Chart(ctx, config);
  }

  truncateQuestion(question: string): string {
    return question.length > 50 ? question.substring(0, 50) + '...' : question;
  }

  closeAnalytics(): void {
    this.showAnalytics = false;
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }
}
