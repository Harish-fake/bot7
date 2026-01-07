package com.feedback.dto;

import com.feedback.model.Feedback;
import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import java.util.List;

@Data
public class FeedbackRequest {
    private Feedback.Category category;
    
    @NotBlank
    private String subCategory;
    
    private String content;
    
    private boolean anonymous = false;
    
    private List<Feedback.QuestionResponse> questionResponses;
}
