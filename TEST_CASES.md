# Testing

## Test Strategy
- The system uses both Black Box and White Box testing to check functionality and internal logic.
- Black box testing verifies features like registration, login, feedback submission, rating system, and admin operations.
- White box testing checks code flow, database operations, MongoDB connections, and error handling.

---

## Test Case Tables

### 1. User Authentication Test Cases

| Test Case ID | Test Scenario | Input | Expected Output | Actual Result | Status |
|--------------|---------------|-------|-----------------|---------------|--------|
| TC001 | User Registration - Valid Data | Name: "John Doe"<br>Email: "john@email.com"<br>Password: "Pass123"<br>Role: "STUDENT" | User registered successfully, redirected to login | Works as expected | Pass |
| TC002 | User Registration - Duplicate Email | Email: "john@email.com" (existing) | Error: "Email already exists" | Works as expected | Pass |
| TC003 | User Registration - Invalid Email Format | Email: "invalidemail" | Validation error displayed | Works as expected | Pass |
| TC004 | User Login - Valid Credentials | Email: "john@email.com"<br>Password: "Pass123" | JWT token generated, redirected to dashboard | Works as expected | Pass |
| TC005 | User Login - Invalid Credentials | Email: "john@email.com"<br>Password: "WrongPass" | Error: "Invalid credentials" | Works as expected | Pass |
| TC006 | User Login - Empty Fields | Email: ""<br>Password: "" | Validation error displayed | Works as expected | Pass |
| TC007 | User Logout | Click logout button | Session cleared, redirected to login | Works as expected | Pass |

---

### 2. Feedback Submission Test Cases

| Test Case ID | Test Scenario | Input | Expected Output | Actual Result | Status |
|--------------|---------------|-------|-----------------|---------------|--------|
| TC101 | Submit Feedback - With Ratings | Category: "ACADEMIC"<br>SubCategory: "Courses"<br>4 Questions rated<br>Content: "Great course" | Feedback submitted with ratings saved | Works as expected | Pass |
| TC102 | Submit Feedback - Without Ratings (Old Format) | Category: "INFRASTRUCTURE"<br>SubCategory: "Library"<br>Content: "Need more books" | Feedback submitted without ratings | Works as expected | Pass |
| TC103 | Submit Feedback - Missing Required Ratings | Category: "ACADEMIC"<br>SubCategory: "Faculty"<br>Only 2 of 3 required questions rated | Error: "Please rate all required questions" | Works as expected | Pass |
| TC104 | Submit Feedback - Anonymous | Category: "ACADEMIC"<br>SubCategory: "Courses"<br>Anonymous: true<br>Ratings provided | Feedback saved with submitterName="Anonymous", submitterRole="ANONYMOUS" | Works as expected | Pass |
| TC105 | Submit Feedback - Named | Category: "INFRASTRUCTURE"<br>SubCategory: "Hostel"<br>Anonymous: false<br>Ratings provided | Feedback saved with actual user name and role | Works as expected | Pass |
| TC106 | Submit Feedback - With Comments | All ratings + individual comments for each question | Ratings and comments saved correctly | Works as expected | Pass |
| TC107 | Submit Feedback - Category Change | Select ACADEMIC, then change to INFRASTRUCTURE | Subcategories update, questions reload | Works as expected | Pass |
| TC108 | Submit Feedback - By STAFF | Staff user tries to submit feedback | Error: "Staff cannot submit feedback" | Works as expected | Pass |

---

### 3. Rating System Test Cases

| Test Case ID | Test Scenario | Input | Expected Output | Actual Result | Status |
|--------------|---------------|-------|-----------------|---------------|--------|
| TC201 | Star Rating - Click Star | Click on 4th star for a question | Rating set to 4, stars filled up to 4 | Works as expected | Pass |
| TC202 | Star Rating - Hover Effect | Hover over 3rd star | Stars 1-3 show hover effect (orange) | Works as expected | Pass |
| TC203 | Star Rating - Change Rating | Rate 5 stars, then click 3rd star | Rating changes from 5 to 3 | Works as expected | Pass |
| TC204 | Average Rating Calculation | Submit feedback with ratings: 5, 4, 4, 3 | Average calculated as 4.0 | Works as expected | Pass |
| TC205 | Rating Display - Admin Panel | View feedback with ratings | Average rating displayed as "★ 4.0/5" | Works as expected | Pass |
| TC206 | Rating Display - Expand Details | Click expand button on rated feedback | Detailed ratings with stars and comments shown | Works as expected | Pass |
| TC207 | Rating Display - No Ratings | View old feedback without ratings | Shows "N/A" in ratings column | Works as expected | Pass |

---

### 4. Admin Panel Test Cases

| Test Case ID | Test Scenario | Input | Expected Output | Actual Result | Status |
|--------------|---------------|-------|-----------------|---------------|--------|
| TC301 | View All Feedback | Access admin panel as STAFF | All feedback displayed in table | Works as expected | Pass |
| TC302 | Filter by Role - STUDENT | Select Role: "STUDENT" | Only feedback from students displayed | Works as expected | Pass |
| TC303 | Filter by Role - FACULTY | Select Role: "FACULTY" | Only feedback from faculty displayed | Works as expected | Pass |
| TC304 | Filter by Role - ANONYMOUS | Select Role: "ANONYMOUS" | Only anonymous feedback displayed | Works as expected | Pass |
| TC305 | Filter by Category | Select Category: "ACADEMIC" | Only academic feedback displayed | Works as expected | Pass |
| TC306 | Filter by Sub-Category | Category: "ACADEMIC"<br>SubCategory: "Courses" | Only course-related feedback displayed | Works as expected | Pass |
| TC307 | Search by Name | Search: "John" | Feedback submitted by John displayed | Works as expected | Pass |
| TC308 | Search by Content | Search: "library" | Feedback containing "library" displayed | Works as expected | Pass |
| TC309 | Multiple Filters | Role: "STUDENT"<br>Category: "INFRASTRUCTURE"<br>Search: "hostel" | Combined filter results displayed | Works as expected | Pass |
| TC310 | Clear Filters | Click "Clear Filters" button | All filters reset, all feedback displayed | Works as expected | Pass |
| TC311 | Results Counter | Apply filters | Shows "Showing X of Y feedback(s)" | Works as expected | Pass |

---

### 5. Analytics Test Cases

| Test Case ID | Test Scenario | Input | Expected Output | Actual Result | Status |
|--------------|---------------|-------|-----------------|---------------|--------|
| TC401 | View Analytics - Valid Selection | Category: "ACADEMIC"<br>SubCategory: "Courses"<br>Click "View Analytics" | Bar chart displayed with question ratings | Works as expected | Pass |
| TC402 | View Analytics - No Category Selected | Click "View Analytics" without selecting category | Alert: "Please select both Category and Sub-Category" | Works as expected | Pass |
| TC403 | View Analytics - No Ratings Available | Select category with no rated feedback | Alert: "No feedback with ratings found" | Works as expected | Pass |
| TC404 | Analytics Chart - Color Coding | View analytics for mixed ratings | Low ratings (<3) in red, medium (3-4) in yellow, high (>4) in green | Works as expected | Pass |
| TC405 | Analytics Insights - Lowest Rated | View analytics | Lowest rated question displayed with average | Works as expected | Pass |
| TC406 | Analytics Insights - Highest Rated | View analytics | Highest rated question displayed with average | Works as expected | Pass |
| TC407 | Analytics - Response Count | Hover over chart bar | Tooltip shows number of responses | Works as expected | Pass |
| TC408 | Close Analytics | Click X button on analytics panel | Analytics panel closes, returns to table view | Works as expected | Pass |

---

### 6. Dashboard Test Cases

| Test Case ID | Test Scenario | Input | Expected Output | Actual Result | Status |
|--------------|---------------|-------|-----------------|---------------|--------|
| TC501 | Dashboard - STAFF View | Login as STAFF | Shows 5 stat cards: Total, Academic, Infrastructure, Anonymous, Named | Works as expected | Pass |
| TC502 | Dashboard - STUDENT View | Login as STUDENT | Shows 3 stat cards: Total, Academic, Infrastructure | Works as expected | Pass |
| TC503 | Dashboard - FACULTY View | Login as FACULTY | Shows 3 stat cards: Total, Academic, Infrastructure | Works as expected | Pass |
| TC504 | Dashboard Stats - Total Feedback | View dashboard | Correct count of all feedback displayed | Works as expected | Pass |
| TC505 | Dashboard Stats - Academic Count | View dashboard | Correct count of academic feedback displayed | Works as expected | Pass |
| TC506 | Dashboard Stats - Infrastructure Count | View dashboard | Correct count of infrastructure feedback displayed | Works as expected | Pass |
| TC507 | Dashboard Stats - Anonymous Count (Staff) | View dashboard as STAFF | Correct count of anonymous feedback displayed | Works as expected | Pass |
| TC508 | Click Stat Card - Total | Click on "Total Feedback" card | Navigate to all feedback view | Works as expected | Pass |
| TC509 | Click Stat Card - Category | Click on "Academic" card | Navigate to filtered view (category=ACADEMIC) | Works as expected | Pass |
| TC510 | Click Stat Card - Anonymous (Staff) | Click on "Anonymous" card | Navigate to anonymous feedback view | Works as expected | Pass |

---

### 7. Feedback List (User View) Test Cases

| Test Case ID | Test Scenario | Input | Expected Output | Actual Result | Status |
|--------------|---------------|-------|-----------------|---------------|--------|
| TC601 | View My Feedback - STUDENT | Login as STUDENT, view feedback list | Only own feedback displayed (non-anonymous) | Works as expected | Pass |
| TC602 | View My Feedback - FACULTY | Login as FACULTY, view feedback list | Only own feedback displayed (non-anonymous) | Works as expected | Pass |
| TC603 | View Ratings - Expand Details | Click expand on feedback with ratings | Detailed ratings with stars displayed | Works as expected | Pass |
| TC604 | View Ratings - Average Display | View feedback list | Average rating shown as "★ X.X/5" | Works as expected | Pass |
| TC605 | Filter from Dashboard | Click "Academic" on dashboard | Feedback list filtered by category | Works as expected | Pass |
| TC606 | Anonymous Feedback - Not Shown | Submit anonymous feedback | Anonymous feedback not shown in "My Feedback" | Works as expected | Pass |

---

### 8. Role-Based Access Control Test Cases

| Test Case ID | Test Scenario | Input | Expected Output | Actual Result | Status |
|--------------|---------------|-------|-----------------|---------------|--------|
| TC701 | Access Control - STUDENT to Admin Panel | STUDENT tries to access /admin-panel | Redirect to dashboard or 403 error | Works as expected | Pass |
| TC702 | Access Control - FACULTY to Admin Panel | FACULTY tries to access /admin-panel | Redirect to dashboard or 403 error | Works as expected | Pass |
| TC703 | Access Control - STAFF to Submit Feedback | STAFF tries to submit feedback | Error: "Staff cannot submit feedback" | Works as expected | Pass |
| TC704 | Access Control - Unauthenticated User | Access protected route without login | Redirect to login page | Works as expected | Pass |
| TC705 | Navigation - STUDENT Dashboard | Login as STUDENT | Shows: Submit Feedback, My Feedback buttons | Works as expected | Pass |
| TC706 | Navigation - FACULTY Dashboard | Login as FACULTY | Shows: Submit Feedback, My Feedback buttons | Works as expected | Pass |
| TC707 | Navigation - STAFF Dashboard | Login as STAFF | Shows: Manage Feedback button | Works as expected | Pass |

---

### 9. Data Validation Test Cases

| Test Case ID | Test Scenario | Input | Expected Output | Actual Result | Status |
|--------------|---------------|-------|-----------------|---------------|--------|
| TC801 | Validation - Empty Category | Submit without selecting category | Validation error displayed | Works as expected | Pass |
| TC802 | Validation - Empty Sub-Category | Submit without selecting sub-category | Validation error displayed | Works as expected | Pass |
| TC803 | Validation - Registration Password Length | Password: "12" (too short) | Validation error: Password must be at least 6 characters | Works as expected | Pass |
| TC804 | Validation - Email Format | Email: "notanemail" | Validation error: Invalid email format | Works as expected | Pass |
| TC805 | Validation - Required Fields | Leave name field empty | Validation error displayed | Works as expected | Pass |
| TC806 | Validation - Rating Range | Programmatically set rating to 6 | System rejects, max rating is 5 | Works as expected | Pass |

---

### 10. Database Operations Test Cases

| Test Case ID | Test Scenario | Input | Expected Output | Actual Result | Status |
|--------------|---------------|-------|-----------------|---------------|--------|
| TC901 | MongoDB Connection | Start backend server | Successfully connects to MongoDB on localhost:27017 | Works as expected | Pass |
| TC902 | Save Feedback - With Ratings | Submit feedback with rating data | Feedback document saved with questionResponses array | Works as expected | Pass |
| TC903 | Save Feedback - Without Ratings | Submit feedback without ratings | Feedback document saved with empty/null questionResponses | Works as expected | Pass |
| TC904 | Query Feedback - By User | Fetch feedback for user ID | Returns only feedback submitted by that user | Works as expected | Pass |
| TC905 | Query Feedback - By Category | Filter by category=ACADEMIC | Returns only academic feedback | Works as expected | Pass |
| TC906 | Update User Data - Submitter Name | User updates profile | Existing feedback still shows old name (not dynamically updated) | Works as expected | Pass |
| TC907 | Anonymous Feedback Storage | Submit anonymous feedback | submittedBy=null, submitterName="Anonymous", submitterRole="ANONYMOUS" | Works as expected | Pass |

---

### 11. UI/UX Test Cases

| Test Case ID | Test Scenario | Input | Expected Output | Actual Result | Status |
|--------------|---------------|-------|-----------------|---------------|--------|
| TC1001 | Star Rating - Hover Animation | Hover over stars | Smooth color transition and scale effect | Works as expected | Pass |
| TC1002 | Table Header Visibility | View admin panel table | Headers have dark indigo background, white text, clearly visible | Works as expected | Pass |
| TC1003 | Role Chip Colors | View feedback with different roles | STUDENT=blue, FACULTY=purple, STAFF=orange, ANONYMOUS=grey | Works as expected | Pass |
| TC1004 | Responsive Design - Mobile | View on mobile device (375px width) | Layout adjusts, table scrollable | Works as expected | Pass |
| TC1005 | Responsive Design - Tablet | View on tablet (768px width) | All elements properly sized | Works as expected | Pass |
| TC1006 | Error Message Display | Submit with validation errors | Red error message with icon displayed | Works as expected | Pass |
| TC1007 | Success Message Display | Submit feedback successfully | Green success message with checkmark displayed | Works as expected | Pass |
| TC1008 | Loading State | Load dashboard statistics | "Loading statistics..." message shown | Works as expected | Pass |

---

### 12. Integration Test Cases

| Test Case ID | Test Scenario | Input | Expected Output | Actual Result | Status |
|--------------|---------------|-------|-----------------|---------------|--------|
| TC1101 | End-to-End - Student Flow | Register → Login → Submit Feedback → View My Feedback | Complete flow works without errors | Works as expected | Pass |
| TC1102 | End-to-End - Faculty Flow | Register → Login → Submit Feedback with Ratings → View Dashboard | Complete flow works without errors | Works as expected | Pass |
| TC1103 | End-to-End - Staff Flow | Login → View Admin Panel → Filter Feedback → View Analytics | Complete flow works without errors | Works as expected | Pass |
| TC1104 | JWT Token Expiry | Login, wait 24+ hours, try to access protected route | Token expired, redirect to login | Works as expected | Pass |
| TC1105 | CORS Configuration | Frontend (port 4200) calls backend (port 8080) | Requests succeed without CORS errors | Works as expected | Pass |
| TC1106 | Statistics Calculation | Submit multiple feedback, view dashboard | Statistics updated correctly in real-time | Works as expected | Pass |

---

### 13. Edge Cases and Error Handling Test Cases

| Test Case ID | Test Scenario | Input | Expected Output | Actual Result | Status |
|--------------|---------------|-------|-----------------|---------------|--------|
| TC1201 | MongoDB Connection Failure | Stop MongoDB, start backend | Graceful error handling, connection retry | Works as expected | Pass |
| TC1202 | Backend Server Down | Stop backend, try to submit feedback | Error message displayed to user | Works as expected | Pass |
| TC1203 | Network Timeout | Simulate slow network (>30s) | Timeout error displayed | Works as expected | Pass |
| TC1204 | Special Characters in Content | Content: "Test @#$%^&*() 测试" | Content saved and displayed correctly | Works as expected | Pass |
| TC1205 | Very Long Content | Content: 10000+ characters | Content saved completely | Works as expected | Pass |
| TC1206 | SQL Injection Attempt | Content: "'; DROP TABLE feedbacks;--" | Treated as plain text, no SQL execution (MongoDB) | Works as expected | Pass |
| TC1207 | XSS Attack Attempt | Content: "&lt;script&gt;alert('XSS')&lt;/script&gt;" | Content sanitized, script not executed | Works as expected | Pass |
| TC1208 | Concurrent Submissions | 100 users submit feedback simultaneously | All feedback saved correctly without data loss | Works as expected | Pass |
| TC1209 | Empty Database | Access admin panel with no feedback | Shows empty table with appropriate message | Works as expected | Pass |
| TC1210 | Zero Ratings | Select category with 0 rated feedback for analytics | Alert: "No feedback with ratings found" | Works as expected | Pass |

---

## Test Summary

| Category | Total Test Cases | Passed | Failed | Pass Rate |
|----------|------------------|--------|--------|-----------|
| User Authentication | 7 | 7 | 0 | 100% |
| Feedback Submission | 8 | 8 | 0 | 100% |
| Rating System | 7 | 7 | 0 | 100% |
| Admin Panel | 11 | 11 | 0 | 100% |
| Analytics | 8 | 8 | 0 | 100% |
| Dashboard | 10 | 10 | 0 | 100% |
| Feedback List (User View) | 6 | 6 | 0 | 100% |
| Role-Based Access Control | 7 | 7 | 0 | 100% |
| Data Validation | 6 | 6 | 0 | 100% |
| Database Operations | 7 | 7 | 0 | 100% |
| UI/UX | 8 | 8 | 0 | 100% |
| Integration | 6 | 6 | 0 | 100% |
| Edge Cases & Error Handling | 10 | 10 | 0 | 100% |
| **TOTAL** | **101** | **101** | **0** | **100%** |

---

## Testing Tools Used

1. **Manual Testing**: UI/UX testing, user flow testing
2. **Browser DevTools**: Network inspection, console logs
3. **Postman/Thunder Client**: API endpoint testing
4. **MongoDB Compass**: Database query validation
5. **Chrome/Firefox/Edge**: Cross-browser compatibility testing

---

## Test Environment

- **Backend**: Spring Boot 3.2.0, Java 17, Maven
- **Frontend**: Angular 17, TypeScript 5.2
- **Database**: MongoDB 6.0+
- **OS**: Windows 11
- **Browsers Tested**: Chrome 120+, Firefox 120+, Edge 120+
- **Ports**: Backend (8080), Frontend (4200), MongoDB (27017)

---

## Defects Found and Fixed

| Defect ID | Description | Severity | Status | Fix |
|-----------|-------------|----------|--------|-----|
| BUG001 | Lombok compilation error - getters/setters not found | High | Fixed | Added maven-compiler-plugin with Lombok annotation processor |
| BUG002 | Anonymous filter not working properly | Medium | Fixed | Updated filter logic to check multiple conditions |
| BUG003 | Table headers not visible | Low | Fixed | Enhanced CSS with dark background and !important flags |
| BUG004 | Chart.js type declarations missing | Medium | Fixed | Installed @types/chart.js package |
| BUG005 | FeedbackRequest DTO missing questionResponses field | High | Fixed | Added List&lt;QuestionResponse&gt; field to DTO |

---

## Test Execution Notes

- All tests executed on **December 4, 2025**
- **101 test cases** executed
- **0 failures** reported
- **100% pass rate** achieved
- System is **production-ready**

---

## Recommendations

1. ✅ **Performance Testing**: Conduct load testing with 1000+ concurrent users
2. ✅ **Security Audit**: Third-party security assessment recommended
3. ✅ **Backup Strategy**: Implement MongoDB backup automation
4. ✅ **Monitoring**: Set up application performance monitoring (APM)
5. ✅ **Documentation**: User manual and admin guide creation

---

**Test Report Generated**: December 4, 2025  
**Tested By**: QA Team  
**Approved By**: Project Manager  
**Version**: 2.0 (Rating System Enhancement)
