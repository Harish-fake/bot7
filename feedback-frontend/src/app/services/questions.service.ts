import { Injectable } from '@angular/core';

export interface PredefinedQuestion {
  question: string;
  required: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  
  private categoryQuestions: { [key: string]: PredefinedQuestion[] } = {
    // ACADEMIC Questions
    'ACADEMIC_Courses': [
      { question: 'How would you rate the course content quality?', required: true },
      { question: 'How relevant is the course material to your field?', required: true },
      { question: 'How would you rate the difficulty level of the course?', required: true },
      { question: 'How satisfied are you with the learning resources provided?', required: false }
    ],
    'ACADEMIC_Faculty': [
      { question: 'How would you rate the faculty\'s teaching effectiveness?', required: true },
      { question: 'How accessible is the faculty for doubt clearing?', required: true },
      { question: 'How would you rate the faculty\'s subject knowledge?', required: true },
      { question: 'How fair is the faculty in evaluation and grading?', required: false }
    ],
    'ACADEMIC_Teaching Methods': [
      { question: 'How effective are the teaching methods used?', required: true },
      { question: 'How engaging are the classroom sessions?', required: true },
      { question: 'How well do teaching methods suit different learning styles?', required: true },
      { question: 'How would you rate the use of technology in teaching?', required: false }
    ],
    'ACADEMIC_Curriculum': [
      { question: 'How relevant is the curriculum to industry needs?', required: true },
      { question: 'How balanced is the curriculum structure?', required: true },
      { question: 'How up-to-date is the curriculum content?', required: true },
      { question: 'How satisfied are you with elective options?', required: false }
    ],
    
    // INFRASTRUCTURE Questions
    'INFRASTRUCTURE_Classrooms': [
      { question: 'How would you rate the cleanliness of classrooms?', required: true },
      { question: 'How comfortable are the seating arrangements?', required: true },
      { question: 'How adequate is the lighting in classrooms?', required: true },
      { question: 'How would you rate the ventilation/AC facilities?', required: false }
    ],
    'INFRASTRUCTURE_Internet/WiFi': [
      { question: 'How reliable is the internet connectivity?', required: true },
      { question: 'How would you rate the internet speed?', required: true },
      { question: 'How adequate is the WiFi coverage across campus?', required: true },
      { question: 'How satisfied are you with network support services?', required: false }
    ],
    'INFRASTRUCTURE_Labs': [
      { question: 'How would you rate the quality of lab equipment?', required: true },
      { question: 'How adequate are the lab facilities?', required: true },
      { question: 'How safe are the lab environments?', required: true },
      { question: 'How satisfied are you with lab support staff?', required: false }
    ],
    'INFRASTRUCTURE_Library': [
      { question: 'How would you rate the collection of books and journals?', required: true },
      { question: 'How comfortable is the study environment?', required: true },
      { question: 'How accessible are digital resources?', required: true },
      { question: 'How helpful is the library staff?', required: false }
    ],
    'INFRASTRUCTURE_Hostel': [
      { question: 'How would you rate the hostel room facilities?', required: true },
      { question: 'How satisfied are you with the food quality?', required: true },
      { question: 'How safe and secure is the hostel environment?', required: true },
      { question: 'How responsive is the hostel management?', required: false }
    ],
    'INFRASTRUCTURE_Hygiene': [
      { question: 'How would you rate the cleanliness of washrooms?', required: true },
      { question: 'How satisfied are you with waste management?', required: true },
      { question: 'How adequate are hygiene facilities (soap, sanitizers)?', required: true },
      { question: 'How would you rate the overall campus cleanliness?', required: false }
    ]
  };

  constructor() { }

  getQuestions(category: string, subCategory: string): PredefinedQuestion[] {
    const key = `${category}_${subCategory}`;
    return this.categoryQuestions[key] || [];
  }

  hasQuestions(category: string, subCategory: string): boolean {
    const key = `${category}_${subCategory}`;
    return !!this.categoryQuestions[key];
  }
}
