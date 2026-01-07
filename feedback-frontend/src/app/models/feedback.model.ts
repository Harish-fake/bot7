export interface QuestionResponse {
  question: string;
  rating: number; // 1-5 stars
  comment?: string; // Optional additional comment
}

export interface Feedback {
  id?: string;
  category: 'ACADEMIC' | 'INFRASTRUCTURE';
  subCategory: string;
  content: string;
  anonymous: boolean;
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED';
  submittedBy?: string;
  submitterName?: string;
  submitterRole?: string;
  assignedTo?: string;
  resolutionComment?: string;
  questionResponses?: QuestionResponse[];
  submittedAt?: string;
  updatedAt?: string;
}

export interface FeedbackRequest {
  category: 'ACADEMIC' | 'INFRASTRUCTURE';
  subCategory: string;
  content: string;
  anonymous: boolean;
  questionResponses?: QuestionResponse[];
}

export interface FeedbackStats {
  totalFeedback: number;
  pendingCount: number;
  inProgressCount: number;
  resolvedCount: number;
  academicCount: number;
  infrastructureCount: number;
  anonymousCount: number;
  namedCount: number;
}
