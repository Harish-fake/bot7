# Feedback Management System

A comprehensive web-based feedback management system designed for academic institutions to facilitate communication between students/faculty and administrative staff regarding academic and infrastructure-related concerns.

## 🏗️ Architecture

- **Frontend**: Angular with Material Design
- **Backend**: Spring Boot (Java)
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: BCrypt password encryption

## 📁 Project Structure

```
OOAD/
├── feedback-frontend/          # Angular Frontend Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/    # UI Components
│   │   │   ├── guards/        # Route Guards
│   │   │   ├── models/        # Data Models
│   │   │   └── services/      # API Services
│   │   └── index.html
│   ├── angular.json
│   └── package.json
│
├── feedback-system/            # Spring Boot Backend Application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/feedback/
│   │   │   │   ├── config/         # Security Configuration
│   │   │   │   ├── controller/     # REST Controllers
│   │   │   │   ├── dto/           # Data Transfer Objects
│   │   │   │   ├── model/         # Database Models
│   │   │   │   ├── repository/    # MongoDB Repositories
│   │   │   │   ├── security/      # JWT Security
│   │   │   │   └── service/       # Business Logic
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   └── pom.xml
│
├── FEATURES_DOCUMENTATION.md   # Detailed features documentation
├── HOW_TO_RUN.txt             # Step-by-step setup guide
├── RATING_SYSTEM_GUIDE.md     # Rating system documentation
├── RATING_QUICK_REFERENCE.md  # Quick rating reference
└── TEST_CASES.md              # Test cases documentation
```

## ✨ Key Features

### User Management
- User registration with role-based access (Student, Faculty, Staff, Admin)
- Secure login/logout with JWT authentication
- Profile management
- Password encryption using BCrypt

### Feedback Management
- Submit feedback with ratings (1-5 scale)
- Question-based feedback system
- Anonymous feedback option
- Status tracking (Pending, In Progress, Resolved)
- Priority levels
- Category-based organization

### Admin Panel
- View and manage all feedback submissions
- Update feedback status and priority
- User management
- Statistics and analytics dashboard
- Search and filter capabilities

### Rating System
- Comprehensive 1-5 rating scale
- Multiple question categories
- Real-time rating calculations
- Statistical analysis

## 🚀 Getting Started

### Prerequisites

Before running the application, ensure you have the following installed:

- **Java Development Kit (JDK)** 11 or higher
- **Maven** 3.6 or higher
- **Node.js** 14.x or higher
- **npm** 6.x or higher
- **MongoDB** 4.4 or higher
- **Angular CLI** 12.x or higher

### Installation & Setup

#### 1. Start MongoDB

**Windows (as Service):**
```bash
net start MongoDB
```

**Manual Start:**
```bash
mongod --dbpath "C:\data\db"
```

Verify MongoDB is running by visiting: http://localhost:27017/

#### 2. Setup Backend (Spring Boot)

```bash
# Navigate to backend directory
cd feedback-system

# Install dependencies and build
mvn clean install

# Run the backend server
mvn spring-boot:run
```

The backend will start on: http://localhost:8080

#### 3. Setup Frontend (Angular)

```bash
# Navigate to frontend directory
cd feedback-frontend

# Install dependencies
npm install

# Run the development server
ng serve
```

The frontend will start on: http://localhost:4200

## 🔑 Default Credentials

### Admin Account
- **Email**: admin@feedback.com
- **Password**: admin123

### Test User Account
- **Email**: user@feedback.com
- **Password**: user123

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Feedback
- `GET /api/feedback` - Get all feedback (Admin only)
- `POST /api/feedback` - Submit new feedback
- `GET /api/feedback/user/{userId}` - Get user's feedback
- `PUT /api/feedback/{id}` - Update feedback
- `DELETE /api/feedback/{id}` - Delete feedback
- `GET /api/feedback/stats` - Get feedback statistics

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

## 🛠️ Configuration

### Backend Configuration (application.properties)

```properties
# MongoDB Configuration
spring.data.mongodb.uri=mongodb://localhost:27017/feedback_system

# Server Configuration
server.port=8080

# JWT Configuration
jwt.secret=your-secret-key
jwt.expiration=86400000
```

### Frontend Configuration

Update API endpoint in environment files:
- `src/environments/environment.ts` (development)
- `src/environments/environment.prod.ts` (production)

## 🧪 Testing

Run backend tests:
```bash
cd feedback-system
mvn test
```

Run frontend tests:
```bash
cd feedback-frontend
ng test
```

## 📝 Additional Documentation

- [**FEATURES_DOCUMENTATION.md**](FEATURES_DOCUMENTATION.md) - Comprehensive feature documentation
- [**HOW_TO_RUN.txt**](HOW_TO_RUN.txt) - Detailed step-by-step setup guide
- [**RATING_SYSTEM_GUIDE.md**](RATING_SYSTEM_GUIDE.md) - Rating system documentation
- [**RATING_QUICK_REFERENCE.md**](RATING_QUICK_REFERENCE.md) - Quick rating reference
- [**TEST_CASES.md**](TEST_CASES.md) - Test cases and scenarios

## 🔒 Security Features

- JWT-based authentication
- BCrypt password hashing
- Role-based access control (RBAC)
- CORS configuration
- Secure HTTP headers
- Protected API endpoints

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB service is running
- Check connection string in application.properties
- Verify MongoDB is accessible on port 27017

### Backend Port Already in Use
- Change port in application.properties
- Kill process using port 8080

### Frontend Build Errors
- Delete node_modules and run `npm install` again
- Clear npm cache: `npm cache clean --force`

## 📄 License

This project is developed for academic purposes.

## 👥 Contributors

Developed as part of Object-Oriented Analysis and Design (OOAD) coursework.

## 📧 Support

For issues and questions, please refer to the documentation files or contact the development team.
