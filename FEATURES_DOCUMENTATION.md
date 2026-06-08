# Feedback Management System - Functions and Features Documentation

## 📋 System Overview

The Feedback Management System is a comprehensive web-based application designed to facilitate communication between students/faculty and administrative staff regarding academic and infrastructure-related concerns. The system uses a modern technology stack with Spring Boot backend, MongoDB database, and Angular frontend with Material Design.

---

## 🎯 Core Features

### 1. User Management & Authentication

#### 1.1 User Registration
- **Description**: New users can create accounts with email and password
- **Features**:
  - Email validation to ensure unique user accounts
  - Password encryption using BCrypt algorithm
  - Role-based registration (Student, Faculty, Staff)
  - Automatic account activation upon registration
- **Access**: Public (no login required)
- **Validation**: Email format validation, required field checks

#### 1.2 User Login
- **Description**: Registered users can authenticate using credentials
- **Features**:
  - Secure password verification using BCrypt
  - JWT (JSON Web Token) generation for session management
  - Token expiry set to 24 hours
  - Automatic redirect to dashboard upon successful login
- **Access**: Public (no login required)
- **Security**: Encrypted password storage, token-based authentication

#### 1.3 User Logout
- **Description**: Users can securely end their session
- **Features**:
  - Clears authentication token from local storage
  - Redirects to login page
  - Prevents unauthorized access to protected routes
- **Access**: Authenticated users only

#### 1.4 Profile Management
- **Description**: Users can view and update their profile information
- **Features**:
  - Update name and password
  - Email address cannot be changed (used as unique identifier)
  - Password re-encryption on update
- **Access**: Authenticated users only

---

### 2. Feedback Submission (Students & Faculty Only)

#### 2.1 Submit Feedback
- **Description**: Students and Faculty can submit feedback about academic or infrastructure issues
- **Features**:
  - **Category Selection**: Academic or Infrastructure
  - **Sub-Category Options**:
    - Academic: Courses, Faculty, Teaching Methods, Curriculum
    - Infrastructure: Classrooms, Internet/WiFi, Labs, Library, Hostel, Hygiene
  - **Content**: Detailed text description of the feedback
  - **Anonymous Submission**: Option to submit feedback without revealing identity
  - **Automatic Status**: All new feedback starts with "PENDING" status
  - **Timestamp**: Automatic submission date and time recording
- **Access**: Students and Faculty only (Staff cannot submit)
- **Validation**: Required fields (category, sub-category, content)

#### 2.2 View My Feedback
- **Description**: Users can view all feedback they have submitted with filtering
- **Features**:
  - Displays feedback in table format with enhanced headers
  - Shows category, sub-category, content, status, and submission date
  - Color-coded status indicators:
    - PENDING: Yellow/Warning
    - IN_PROGRESS: Blue/Accent
    - RESOLVED: Green/Primary
  - **Enhanced Table Headers**: 
    - Dark indigo background (#1a237e)
    - White text with high contrast
    - Uppercase, larger font (15px)
    - Clear column labels
  - Chronological ordering (newest first)
  - Real-time status updates
  - **Query Parameter Filtering**: When coming from dashboard stats, shows filtered view
- **Access**: Students and Faculty only
- **Note**: Anonymous feedback is not linked to user accounts

---

### 3. Feedback Management (Staff Only)

#### 3.1 View All Feedback
- **Description**: Staff can view all feedback submitted by all users with comprehensive filtering
- **Features**:
  - Comprehensive table view of all feedback entries
  - **Columns**: Submitted By, Role, Category, Sub-Category, Content, Status, Submitted At, Actions
  - **Role Chips**: Color-coded badges showing submitter role
    - STUDENT: Blue chip
    - FACULTY: Purple chip
    - STAFF: Orange chip
    - ANONYMOUS: Grey chip
  - Filterable by multiple criteria
  - Real-time updates when status changes
  - Shows anonymous submissions with ANONYMOUS badge
  - Displays submitter name for named feedback
- **Access**: Staff only

#### 3.2 Advanced Filtering System
- **Description**: Multi-criteria filtering for efficient feedback management
- **Filter Options**:
  1. **Search Bar**: 
     - Search by submitter name or feedback content
     - Real-time search as you type
     - Searches across both name and content fields
  
  2. **Role Filter**: 
     - Filter by Student, Faculty, or Anonymous
     - Shows count of each role type
     - Helps identify feedback source
  
  3. **Category Filter**: 
     - Academic or Infrastructure
     - Dynamic sub-category dropdown
  
  4. **Sub-Category Filter**: 
     - Context-sensitive based on category
     - Academic: Courses, Faculty, Teaching Methods, Curriculum
     - Infrastructure: Classrooms, Internet/WiFi, Labs, Library, Hostel, Hygiene
  
  5. **Status Filter**: 
     - Pending, In Progress, or Resolved
     - Quick status-based views
  
- **Features**:
  - **Clear Filters Button**: Reset all filters with one click
  - **Results Counter**: Shows "Showing X of Y feedback(s)"
  - **Combined Filtering**: All filters work together
  - **Filter State**: Maintains filter selections during session
- **Access**: Staff only

#### 3.3 Manage Feedback Status
- **Description**: Staff can update the status of feedback with visual indicators
- **Features**:
  - **Status Workflow**:
    1. PENDING → IN_PROGRESS (Click "Start" button)
    2. IN_PROGRESS → RESOLVED (Click "Resolve" button)
  - **Action Buttons**: 
    - "Start" button (blue) visible for PENDING feedback
    - "Resolve" button (green) visible for IN_PROGRESS feedback
    - "Completed" message with checkmark icon for RESOLVED feedback
  - **Resolution Comments**: Add comments when resolving feedback
  - **Update Timestamp**: Automatic timestamp update on status change
  - **Visual Feedback**: Status changes reflected immediately in table
- **Access**: Staff only
- **Business Logic**: Sequential status progression enforced

#### 3.4 Assign Feedback
- **Description**: Feedback can be assigned to specific staff members
- **Features**:
  - Assign feedback to staff by staff ID
  - Automatically changes status to IN_PROGRESS upon assignment
  - Track which staff member is handling specific feedback
  - Filter feedback by assigned staff member
- **Access**: Staff only

---

### 4. Role-Based Access Control (RBAC)

#### 4.1 Role Types
1. **STUDENT**
   - Can register and login
   - Can submit feedback (named or anonymous)
   - Can view their own feedback
   - Cannot access staff panel

2. **FACULTY**
   - Same permissions as STUDENT
   - Can submit feedback (named or anonymous)
   - Can view their own feedback
   - Cannot access staff panel

3. **STAFF**
   - Can register and login
   - **Cannot submit feedback**
   - Cannot view "My Feedback" section
   - Can access staff panel (Manage Feedback)
   - Can view all feedback from all users
   - Can update feedback status
   - Can assign feedback to other staff members

#### 4.2 Access Restrictions
- **Route Protection**: 
  - Submit Feedback page: Blocked for Staff
  - My Feedback page: Blocked for Staff
  - Staff Panel: Blocked for Student/Faculty
- **API Protection**:
  - Backend validates user role on feedback submission
  - Returns error if Staff attempts to submit feedback
- **UI Protection**:
  - Dashboard buttons conditional based on role
  - Staff sees only "Manage Feedback" button
  - Students/Faculty see "Submit Feedback" and "My Feedback" buttons

---

### 5. Dashboard & Navigation

#### 5.1 User Dashboard
- **Description**: Centralized navigation hub with visual statistics
- **Features**:
  - Displays user name and role in toolbar
  - **Statistics Cards**: Visual representation of feedback metrics
    - Total Feedback count
    - Pending feedback count (yellow/orange)
    - In Progress feedback count (blue)
    - Resolved feedback count (green)
    - Academic feedback count (purple)
    - Infrastructure feedback count (grey)
    - Anonymous feedback count (grey) - Staff only
    - Named feedback count - Staff only
  - **Interactive Cards**: Click on any stat card to filter feedback
  - Role-specific navigation buttons
  - Quick access to main features
  - Logout button in toolbar
- **Access**: All authenticated users
- **Card Colors**:
  - Pending: Orange (#ff9800)
  - In Progress: Blue (#2196f3)
  - Resolved: Green (#4caf50)
  - Academic: Purple (#9c27b0)
  - Infrastructure: Grey (#607d8b)

#### 5.2 Dashboard Statistics
- **For Students/Faculty**:
  - Shows personal feedback statistics (6 cards)
  - Total, Pending, In Progress, Resolved, Academic, Infrastructure
  - Clicking cards navigates to filtered "My Feedback" view
  
- **For Staff**:
  - Shows system-wide feedback statistics (8 cards)
  - Includes Anonymous and Named feedback counts
  - Clicking cards navigates to admin panel with filters applied

#### 5.3 Navigation Features
- **For Students/Faculty**:
  - Submit Feedback button
  - My Feedback button
  - Logout option

- **For Staff**:
  - Manage Feedback button
  - Logout option

---

### 6. Security Features

#### 6.1 Authentication Security
- **Password Encryption**: BCrypt hashing algorithm
- **JWT Tokens**: Secure token-based authentication
- **Token Expiry**: 24-hour automatic expiry
- **Secure Headers**: CORS configuration for API security

#### 6.2 Authorization Security
- **Role-Based Access**: Enforced at both frontend and backend
- **Route Guards**: Prevents unauthorized URL access
- **API Validation**: Backend validates user role on all requests
- **Session Management**: Automatic logout on token expiry

#### 6.3 Data Security
- **Email Uniqueness**: Prevents duplicate accounts
- **Password Requirements**: Enforced through validation
- **MongoDB Security**: Secure database connection
- **Input Validation**: Client-side and server-side validation

---

### 7. Feedback Categories & Sub-Categories

#### 7.1 Academic Category
**Purpose**: Issues related to educational aspects

**Sub-Categories**:
1. **Courses**: Course content, structure, relevance
2. **Faculty**: Teaching staff performance and behavior
3. **Teaching Methods**: Instructional techniques and approaches
4. **Curriculum**: Overall program structure and content

#### 7.2 Infrastructure Category
**Purpose**: Issues related to physical facilities and resources

**Sub-Categories**:
1. **Classrooms**: Room conditions, furniture, equipment
2. **Internet/WiFi**: Network connectivity and speed
3. **Labs**: Laboratory equipment and facilities
4. **Library**: Library resources and services
5. **Hostel**: Accommodation facilities
6. **Hygiene**: Cleanliness and sanitation

---

### 8. Feedback Status Workflow

#### 8.1 Status Types
1. **PENDING**
   - Initial status when feedback is submitted
   - Indicates feedback awaiting review
   - Color: Yellow/Warning

2. **IN_PROGRESS**
   - Feedback is being actively addressed
   - Can be assigned to staff member
   - Color: Blue/Accent

3. **RESOLVED**
   - Issue has been addressed and closed
   - Optional resolution comment can be added
   - Color: Green/Primary

#### 8.2 Status Progression
```
PENDING → IN_PROGRESS → RESOLVED
   ↓           ↓            ↓
 New      Being Handled   Completed
```

---

### 9. Anonymous Feedback

#### 9.1 Features
- **Privacy**: User identity not stored with feedback
- **Submission**: Checkbox option during feedback creation
- **Display**: Marked with ANONYMOUS grey chip in staff view
- **Tracking**: User cannot view anonymous feedback in "My Feedback"
- **Role Assignment**: Backend sets submitterRole to "ANONYMOUS"
- **Filtering**: Can filter specifically for anonymous feedback in admin panel

#### 9.2 Use Cases
- Sensitive issues that require confidentiality
- Complaints about specific individuals
- Security or harassment concerns
- Honest feedback without fear of identification

#### 9.3 Anonymous Feedback Handling
- **Backend Storage**: 
  - `anonymous` field set to `true`
  - `submittedBy` field set to `null`
  - `submitterName` set to "Anonymous"
  - `submitterRole` set to "ANONYMOUS"
- **Frontend Display**:
  - Shows grey ANONYMOUS chip in Role column
  - "Anonymous" text in Submitted By column (italicized, grey)
  - Can filter by selecting "Anonymous" in Role filter
  - Included in staff dashboard "Anonymous" count

---

### 10. User Interface Features

#### 10.1 Material Design
- Modern, responsive UI using Angular Material
- Consistent design language across all pages
- Mobile-responsive layout
- Accessible form controls

#### 10.2 Visual Feedback
- Color-coded status chips
- Loading indicators
- Success/error messages
- Form validation messages

#### 10.3 User Experience
- Intuitive navigation
- Clear call-to-action buttons
- Confirmation dialogs for important actions
- Automatic redirects after actions

---

### 11. Data Management

#### 11.1 Database Collections
1. **Users Collection**
   - Stores user account information
   - Fields: id, name, email, password, role, active

2. **Feedbacks Collection**
   - Stores all feedback submissions
   - Fields: id, category, subCategory, content, anonymous, status, submittedBy, submitterName, submitterRole, assignedTo, resolutionComment, submittedAt, updatedAt

#### 11.2 Data Operations
- **Create**: Register users, submit feedback
- **Read**: View feedback, user profiles
- **Update**: Modify feedback status, user profiles
- **Query**: Filter by category, status, user

---

### 12. API Endpoints

#### 12.1 Authentication APIs
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

#### 12.2 User APIs
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user profile

#### 12.3 Feedback APIs
- `POST /api/feedback` - Submit feedback (Students/Faculty only)
- `GET /api/feedback` - Get all feedback (Staff only)
- `GET /api/feedback/user/{userId}` - Get user's feedback
- `GET /api/feedback/staff/{staffId}` - Get staff's assigned feedback
- `GET /api/feedback/category/{category}` - Get feedback by category
- `GET /api/feedback/status/{status}` - Get feedback by status
- `GET /api/feedback/{id}` - Get feedback by ID
- `GET /api/feedback/stats` - Get system-wide feedback statistics (Staff only)
- `GET /api/feedback/stats/user/{userId}` - Get user-specific feedback statistics
- `PUT /api/feedback/{id}/status` - Update feedback status
- `PUT /api/feedback/{id}/assign` - Assign feedback to staff

---

### 13. Validation & Error Handling

#### 13.1 Input Validation
- **Email**: Valid email format required
- **Required Fields**: Name, email, password, category, content
- **Password**: Minimum length enforced
- **Role**: Must be valid role type

#### 13.2 Error Messages
- Duplicate email on registration
- Invalid credentials on login
- Unauthorized access attempts
- Failed feedback submission
- Network/connection errors

---

### 14. Statistics & Analytics

#### 14.1 Dashboard Statistics
- **Real-time Metrics**: Live feedback counts and breakdowns
- **Visual Cards**: Color-coded interactive statistic cards
- **Statistics Tracked**:
  - Total feedback count
  - Feedback by status (Pending, In Progress, Resolved)
  - Feedback by category (Academic, Infrastructure)
  - Feedback by type (Anonymous, Named) - Staff only

#### 14.2 Staff Statistics (System-Wide)
- **Endpoint**: `/api/feedback/stats`
- **Metrics**:
  - Total feedback submitted to system
  - Count by each status type
  - Count by each category
  - Anonymous vs Named feedback ratio
- **Use Cases**:
  - Overall system health monitoring
  - Workload assessment
  - Response time tracking
  - Trend identification

#### 14.3 User Statistics (Personal)
- **Endpoint**: `/api/feedback/stats/user/{userId}`
- **Metrics**:
  - Total feedback submitted by user
  - User's feedback by status
  - User's feedback by category
  - Named feedback count (excludes anonymous count)
- **Use Cases**:
  - Personal feedback tracking
  - Individual engagement metrics
  - Historical submission patterns

#### 14.4 Interactive Statistics
- **Click-to-Filter**: Clicking stat cards navigates to filtered views
- **Query Parameters**: Stats pass filter criteria to detail pages
- **Dynamic Updates**: Statistics refresh when new feedback is submitted or status changes

---

### 15. Reporting & Future Enhancements

#### 14.1 Potential Features
- Feedback statistics dashboard
- Category-wise breakdown
- Response time metrics
- User satisfaction ratings
- Trend analysis over time

---

## 🔧 Technical Features

### 16.1 Backend Technologies
- **Framework**: Spring Boot 3.2.0
- **Database**: MongoDB (NoSQL)
- **Security**: Spring Security, JWT
- **Validation**: Bean Validation (Jakarta)
- **Build Tool**: Maven

### 16.2 Frontend Technologies
- **Framework**: Angular 17
- **UI Library**: Angular Material
- **HTTP Client**: HttpClient
- **Routing**: Angular Router
- **State Management**: RxJS BehaviorSubject

### 16.3 Architecture
- **Backend**: RESTful API, MVC pattern
- **Frontend**: Component-based architecture
- **Communication**: JSON over HTTP
- **Authentication**: Stateless JWT tokens

---

## 📊 System Benefits

### For Students/Faculty:
✅ Easy feedback submission
✅ Track feedback status in real-time
✅ Anonymous feedback option for privacy
✅ Organized categorization system
✅ Quick access to submission history

### For Staff:
✅ Centralized feedback management
✅ Efficient status tracking workflow
✅ Assignment capabilities for staff delegation
✅ **Advanced filtering and search tools**
✅ **Real-time statistics dashboard**
✅ **Role-based feedback identification**
✅ Complete visibility of all feedback
✅ **Visual status indicators and action buttons**

### For Institution:
✅ Improved communication channels
✅ Faster issue resolution
✅ Better student/faculty satisfaction
✅ Data-driven decision making
✅ Transparent feedback process
  
---

## 🎯 Key Differentiators

1. **Role-Based Segregation**: Clear separation between feedback providers (Students/Faculty) and feedback managers (Staff)

2. **Anonymous Feedback**: Encourages honest feedback without fear of identification with dedicated filtering

3. **Status Workflow**: Structured three-stage process ensures proper feedback handling with visual indicators

4. **Real-Time Statistics**: Interactive dashboard with color-coded metrics and click-to-filter functionality

5. **Advanced Filtering**: Multi-criteria search with role, category, sub-category, status, and text search

6. **Modern UI/UX**: Material Design for intuitive user experience with enhanced table visibility

7. **Secure Architecture**: JWT authentication, encrypted passwords, CORS protection

8. **Scalable Design**: MongoDB for flexible data storage, REST API for easy integration

9. **Role Identification**: Visual chips showing submitter role (Student, Faculty, Staff, Anonymous)

10. **Smart Data Population**: Backend automatically populates submitter names and roles from user database

---

## 📝 Summary

The Feedback Management System provides a comprehensive solution for educational institutions to manage student and faculty feedback effectively. With role-based access control, anonymous submission options, structured workflow management, advanced filtering capabilities, real-time statistics dashboard, and modern UI/UX, the system ensures efficient communication and issue resolution while maintaining security and privacy standards.

**Total Features**: 16 major feature categories with 50+ individual functions
**User Roles**: 3 distinct roles with specific permissions (Student, Faculty, Staff)
**Security Layers**: 3 levels (Authentication, Authorization, Data validation)
**Status Workflow**: 3-stage progression system with visual indicators
**Categories**: 2 main categories with 10 sub-categories
**Filtering Options**: 5 simultaneous filter criteria (Role, Category, Sub-category, Status, Search)
**Statistics**: 8 real-time metrics with interactive navigation
**Visual Elements**: Color-coded chips, status badges, interactive cards
