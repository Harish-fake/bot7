package com.feedback.repository;

import com.feedback.model.Feedback;
import com.feedback.model.Feedback.Category;
import com.feedback.model.Feedback.Status;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FeedbackRepository extends MongoRepository<Feedback, String> {
    List<Feedback> findBySubmittedBy(String userId);
    List<Feedback> findByAssignedTo(String staffId);
    List<Feedback> findByCategory(Category category);
    List<Feedback> findByStatus(Status status);
    List<Feedback> findByCategoryAndStatus(Category category, Status status);
}
