export interface User {
  id?: string;
  name: string;
  email: string;
  password?: string;
  role: 'STUDENT' | 'FACULTY' | 'STAFF';
  active?: boolean;
}

export interface AuthResponse {
  token: string;
  userId: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: 'STUDENT' | 'FACULTY' | 'STAFF';
}
