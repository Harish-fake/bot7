package com.feedback.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Document(collection = "feedbacks")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Feedback {
    @Id
    private String id;
    
    private Category category;
    
    private String subCategory;
    
    private String content;
    
    private boolean anonymous;
    
    private Status status = Status.PENDING;
    
    private String submittedBy; // User ID
    
    private String submitterName; // User name for display
    
    private String submitterRole; // User role (STUDENT/FACULTY)
    
    private String assignedTo; // Staff ID
    
    private String resolutionComment;
    
    // New fields for structured feedback with ratings
    private List<QuestionResponse> questionResponses;
    
    private LocalDateTime submittedAt = LocalDateTime.now();
    
    private LocalDateTime updatedAt = LocalDateTime.now();
    
    public enum Category {
        ACADEMIC, INFRASTRUCTURE
    }
    
    public enum Status {
        PENDING, IN_PROGRESS, RESOLVED
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuestionResponse {
        private String question;
        private int rating; // 1-5 stars
        private String comment; // Optional additional comment
    }
}
