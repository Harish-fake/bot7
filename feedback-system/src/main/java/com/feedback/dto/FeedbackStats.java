package com.feedback.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackStats {
    private long totalFeedback;
    private long pendingCount;
    private long inProgressCount;
    private long resolvedCount;
    private long academicCount;
    private long infrastructureCount;
    private long anonymousCount;
    private long namedCount;
}
