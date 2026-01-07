import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback, FeedbackRequest, FeedbackStats } from '../models/feedback.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'http://localhost:8080/api/feedback';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const user = this.authService.getCurrentUser();
    return new HttpHeaders({
      'userId': user?.userId || '',
      'userRole': user?.role || ''
    });
  }

  submitFeedback(request: FeedbackRequest): Observable<Feedback> {
    return this.http.post<Feedback>(this.apiUrl, request, { headers: this.getHeaders() });
  }

  getAllFeedback(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.apiUrl);
  }

  getUserFeedback(userId: string): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/user/${userId}`);
  }

  getStaffFeedback(staffId: string): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/staff/${staffId}`);
  }

  getFeedbackByCategory(category: string): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/category/${category}`);
  }

  getFeedbackByStatus(status: string): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/status/${status}`);
  }

  updateStatus(id: string, status: string, resolutionComment?: string): Observable<Feedback> {
    return this.http.put<Feedback>(`${this.apiUrl}/${id}/status`, { status, resolutionComment });
  }

  assignFeedback(id: string, staffId: string): Observable<Feedback> {
    return this.http.put<Feedback>(`${this.apiUrl}/${id}/assign`, { staffId });
  }

  getFeedbackStats(): Observable<FeedbackStats> {
    return this.http.get<FeedbackStats>(`${this.apiUrl}/stats`);
  }

  getUserFeedbackStats(userId: string): Observable<FeedbackStats> {
    return this.http.get<FeedbackStats>(`${this.apiUrl}/stats/user/${userId}`);
  }
}