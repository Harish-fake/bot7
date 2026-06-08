package com.feedback.controller;

import com.feedback.dto.FeedbackRequest;
import com.feedback.dto.FeedbackStats;
import com.feedback.model.Feedback;
import com.feedback.service.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class FeedbackController {
    
    private final FeedbackService feedbackService;
    
    @PostMapping
    public ResponseEntity<?> submitFeedback(
            @Valid @RequestBody FeedbackRequest request,
            @RequestHeader("userId") String userId,
            @RequestHeader("userRole") String userRole) {
        // Prevent STAFF from submitting feedback
        if ("STAFF".equals(userRole)) {
            return ResponseEntity.badRequest().body("Staff cannot submit feedback");
        }
        return ResponseEntity.ok(feedbackService.submitFeedback(request, userId));
    }
    
    @GetMapping
    public ResponseEntity<List<Feedback>> getAllFeedback() {
        return ResponseEntity.ok(feedbackService.getAllFeedback());
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Feedback>> getUserFeedback(@PathVariable String userId) {
        return ResponseEntity.ok(feedbackService.getFeedbackByUser(userId));
    }
    
    @GetMapping("/staff/{staffId}")
    public ResponseEntity<List<Feedback>> getStaffFeedback(@PathVariable String staffId) {
        return ResponseEntity.ok(feedbackService.getFeedbackByStaff(staffId));
    }
    
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Feedback>> getFeedbackByCategory(@PathVariable Feedback.Category category) {
        return ResponseEntity.ok(feedbackService.getFeedbackByCategory(category));
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Feedback>> getFeedbackByStatus(@PathVariable Feedback.Status status) {
        return ResponseEntity.ok(feedbackService.getFeedbackByStatus(status));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Feedback> getFeedbackById(@PathVariable String id) {
        return ResponseEntity.ok(feedbackService.getFeedbackById(id));
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<Feedback> updateStatus(
            @PathVariable String id,
            @RequestBody Map<String, Object> request) {
        Feedback.Status status = Feedback.Status.valueOf((String) request.get("status"));
        String comment = (String) request.get("resolutionComment");
        return ResponseEntity.ok(feedbackService.updateFeedbackStatus(id, status, comment));
    }
    
    @PutMapping("/{id}/assign")
    public ResponseEntity<Feedback> assignFeedback(
            @PathVariable String id,
            @RequestBody Map<String, String> request) {
        return ResponseEntity.ok(feedbackService.assignFeedback(id, request.get("staffId")));
    }
    
    @GetMapping("/stats")
    public ResponseEntity<FeedbackStats> getFeedbackStatistics() {
        return ResponseEntity.ok(feedbackService.getFeedbackStats());
    }
    
    @GetMapping("/stats/user/{userId}")
    public ResponseEntity<FeedbackStats> getUserFeedbackStatistics(@PathVariable String userId) {
        return ResponseEntity.ok(feedbackService.getUserFeedbackStats(userId));
    }
}
