package com.feedback.service;

import com.feedback.dto.FeedbackRequest;
import com.feedback.dto.FeedbackStats;
import com.feedback.model.Feedback;
import com.feedback.model.User;
import com.feedback.repository.FeedbackRepository;
import com.feedback.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FeedbackService {
    
    private final FeedbackRepository feedbackRepository;
    private final UserRepository userRepository;
    
    public Feedback submitFeedback(FeedbackRequest request, String userId) {
        Feedback feedback = new Feedback();
        feedback.setCategory(request.getCategory());
        feedback.setSubCategory(request.getSubCategory());
        feedback.setContent(request.getContent());
        feedback.setAnonymous(request.isAnonymous());
        feedback.setSubmittedBy(request.isAnonymous() ? null : userId);
        feedback.setStatus(Feedback.Status.PENDING);
        feedback.setSubmittedAt(LocalDateTime.now());
        feedback.setUpdatedAt(LocalDateTime.now());
        
        // Set question responses if provided
        if (request.getQuestionResponses() != null) {
            feedback.setQuestionResponses(request.getQuestionResponses());
        }
        
        // Set submitter name and role if not anonymous
        if (!request.isAnonymous()) {
            userRepository.findById(userId).ifPresent(user -> {
                feedback.setSubmitterName(user.getName());
                feedback.setSubmitterRole(user.getRole().toString());
            });
        } else {
            feedback.setSubmitterName("Anonymous");
            feedback.setSubmitterRole("ANONYMOUS");
        }
        
        return feedbackRepository.save(feedback);
    }
    
    public List<Feedback> getAllFeedback() {
        List<Feedback> feedbacks = feedbackRepository.findAll();
        populateSubmitterNames(feedbacks);
        return feedbacks;
    }
    
    public List<Feedback> getFeedbackByUser(String userId) {
        List<Feedback> feedbacks = feedbackRepository.findBySubmittedBy(userId);
        populateSubmitterNames(feedbacks);
        return feedbacks;
    }
    
    public List<Feedback> getFeedbackByStaff(String staffId) {
        List<Feedback> feedbacks = feedbackRepository.findByAssignedTo(staffId);
        populateSubmitterNames(feedbacks);
        return feedbacks;
    }
    
    public List<Feedback> getFeedbackByCategory(Feedback.Category category) {
        List<Feedback> feedbacks = feedbackRepository.findByCategory(category);
        populateSubmitterNames(feedbacks);
        return feedbacks;
    }
    
    public List<Feedback> getFeedbackByStatus(Feedback.Status status) {
        List<Feedback> feedbacks = feedbackRepository.findByStatus(status);
        populateSubmitterNames(feedbacks);
        return feedbacks;
    }
    
    private void populateSubmitterNames(List<Feedback> feedbacks) {
        for (Feedback feedback : feedbacks) {
            try {
                if (feedback.isAnonymous()) {
                    feedback.setSubmitterName("Anonymous");
                    feedback.setSubmitterRole("ANONYMOUS");
                } else if (feedback.getSubmittedBy() != null) {
                    // Always populate name and role from database
                    userRepository.findById(feedback.getSubmittedBy()).ifPresentOrElse(
                        user -> {
                            feedback.setSubmitterName(user.getName());
                            feedback.setSubmitterRole(user.getRole().toString());
                        },
                        () -> {
                            feedback.setSubmitterName("Anonymous");
                            feedback.setSubmitterRole("ANONYMOUS");
                        }
                    );
                } else {
                    feedback.setSubmitterName("Anonymous");
                    feedback.setSubmitterRole("ANONYMOUS");
                }
            } catch (Exception e) {
                feedback.setSubmitterName("Anonymous");
                feedback.setSubmitterRole("ANONYMOUS");
            }
        }
    }
    
    public Feedback updateFeedbackStatus(String id, Feedback.Status status, String resolutionComment) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found"));
        
        feedback.setStatus(status);
        if (resolutionComment != null) {
            feedback.setResolutionComment(resolutionComment);
        }
        feedback.setUpdatedAt(LocalDateTime.now());
        
        return feedbackRepository.save(feedback);
    }
    
    public Feedback assignFeedback(String id, String staffId) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found"));
        
        feedback.setAssignedTo(staffId);
        feedback.setStatus(Feedback.Status.IN_PROGRESS);
        feedback.setUpdatedAt(LocalDateTime.now());
        
        return feedbackRepository.save(feedback);
    }
    
    public Feedback getFeedbackById(String id) {
        return feedbackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found"));
    }
    
    public FeedbackStats getFeedbackStats() {
        List<Feedback> allFeedback = feedbackRepository.findAll();
        
        FeedbackStats stats = new FeedbackStats();
        stats.setTotalFeedback(allFeedback.size());
        stats.setPendingCount(allFeedback.stream()
                .filter(f -> f.getStatus() == Feedback.Status.PENDING)
                .count());
        stats.setInProgressCount(allFeedback.stream()
                .filter(f -> f.getStatus() == Feedback.Status.IN_PROGRESS)
                .count());
        stats.setResolvedCount(allFeedback.stream()
                .filter(f -> f.getStatus() == Feedback.Status.RESOLVED)
                .count());
        stats.setAcademicCount(allFeedback.stream()
                .filter(f -> f.getCategory() == Feedback.Category.ACADEMIC)
                .count());
        stats.setInfrastructureCount(allFeedback.stream()
                .filter(f -> f.getCategory() == Feedback.Category.INFRASTRUCTURE)
                .count());
        stats.setAnonymousCount(allFeedback.stream()
                .filter(Feedback::isAnonymous)
                .count());
        stats.setNamedCount(allFeedback.stream()
                .filter(f -> !f.isAnonymous())
                .count());
        
        return stats;
    }
    
    public FeedbackStats getUserFeedbackStats(String userId) {
        List<Feedback> userFeedback = feedbackRepository.findBySubmittedBy(userId);
        
        FeedbackStats stats = new FeedbackStats();
        stats.setTotalFeedback(userFeedback.size());
        stats.setPendingCount(userFeedback.stream()
                .filter(f -> f.getStatus() == Feedback.Status.PENDING)
                .count());
        stats.setInProgressCount(userFeedback.stream()
                .filter(f -> f.getStatus() == Feedback.Status.IN_PROGRESS)
                .count());
        stats.setResolvedCount(userFeedback.stream()
                .filter(f -> f.getStatus() == Feedback.Status.RESOLVED)
                .count());
        stats.setAcademicCount(userFeedback.stream()
                .filter(f -> f.getCategory() == Feedback.Category.ACADEMIC)
                .count());
        stats.setInfrastructureCount(userFeedback.stream()
                .filter(f -> f.getCategory() == Feedback.Category.INFRASTRUCTURE)
                .count());
        stats.setAnonymousCount(0); // User stats don't track anonymous
        stats.setNamedCount(userFeedback.size());
        
        return stats;
    }
}
