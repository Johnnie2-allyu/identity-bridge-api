
import axios from 'axios';

// Base API configuration
export const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Will be replaced with actual Django backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Mock API for frontend development
export const mockApi = {
  login: (email: string, password: string) => {
    console.log('Mock login called with:', { email, password });
    // Simulate successful login for demo purposes
    return Promise.resolve({
      data: {
        access: 'mock-jwt-token',
        user: {
          id: '1',
          email: email,
          username: email.split('@')[0],
          is_verified: true
        }
      }
    });
  },
  
  register: (username: string, email: string, password: string) => {
    console.log('Mock register called with:', { username, email, password });
    // Simulate successful registration
    return Promise.resolve({
      data: {
        message: 'Registration successful. Please verify your email.'
      }
    });
  },
  
  requestPasswordReset: (email: string) => {
    console.log('Mock password reset request called with:', { email });
    // Simulate successful reset request
    return Promise.resolve({
      data: {
        message: 'Password reset link sent to email.'
      }
    });
  },
  
  resetPassword: (token: string, password: string) => {
    console.log('Mock reset password called with:', { token, password });
    // Simulate successful password reset
    return Promise.resolve({
      data: {
        message: 'Password reset successful.'
      }
    });
  },
  
  verifyEmail: (token: string) => {
    console.log('Mock verify email called with:', { token });
    // Simulate successful email verification
    return Promise.resolve({
      data: {
        message: 'Email verified successfully.'
      }
    });
  },
  
  fetchUser: () => {
    console.log('Mock fetch user called');
    // Simulate fetching user data
    const token = localStorage.getItem('token');
    if (!token) {
      return Promise.reject(new Error('No token found'));
    }
    return Promise.resolve({
      data: {
        id: '1',
        email: 'user@example.com',
        username: 'user',
        is_verified: true
      }
    });
  }
};

// Use mockApi for development if specified
export const useDevApi = process.env.NODE_ENV === 'development';
