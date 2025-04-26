
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { api } from '@/lib/api';

interface User {
  id: string;
  email: string;
  username: string;
  is_verified: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          const response = await api.get('/auth/user/');
          setUser(response.data);
        } catch (error) {
          console.error('Error validating token:', error);
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setIsLoading(false);
    };

    validateToken();
  }, [token]);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await api.post('/auth/login/', { email, password });
      const { access, user: userData } = response.data;
      
      localStorage.setItem('token', access);
      setToken(access);
      setUser(userData);
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${userData.username}!`,
      });
    } catch (error: any) {
      console.error('Login error:', error);
      let errorMessage = "Login failed. Please check your credentials.";
      
      if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      }
      
      toast({
        variant: "destructive",
        title: "Login failed",
        description: errorMessage,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (username: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      await api.post('/auth/register/', { username, email, password });
      
      toast({
        title: "Registration successful",
        description: "Please check your email to verify your account.",
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      let errorMessage = "Registration failed. Please try again.";
      
      if (error.response?.data) {
        errorMessage = Object.values(error.response.data).flat().join(' ');
      }
      
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: errorMessage,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  // Request password reset
  const requestPasswordReset = async (email: string) => {
    try {
      setIsLoading(true);
      await api.post('/auth/password-reset/', { email });
      
      toast({
        title: "Password reset request sent",
        description: "Please check your email for instructions.",
      });
    } catch (error: any) {
      console.error('Password reset request error:', error);
      let errorMessage = "Failed to request password reset. Please try again.";
      
      if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      }
      
      toast({
        variant: "destructive",
        title: "Request failed",
        description: errorMessage,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password with token
  const resetPassword = async (token: string, password: string) => {
    try {
      setIsLoading(true);
      await api.post('/auth/password-reset/confirm/', { token, password });
      
      toast({
        title: "Password reset successful",
        description: "You can now log in with your new password.",
      });
    } catch (error: any) {
      console.error('Password reset error:', error);
      let errorMessage = "Failed to reset password. Please try again.";
      
      if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      }
      
      toast({
        variant: "destructive",
        title: "Reset failed",
        description: errorMessage,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Verify email with token
  const verifyEmail = async (token: string) => {
    try {
      setIsLoading(true);
      await api.post('/auth/verify-email/', { token });
      
      if (user) {
        setUser({
          ...user,
          is_verified: true,
        });
      }
      
      toast({
        title: "Email verified",
        description: "Your email has been successfully verified.",
      });
    } catch (error: any) {
      console.error('Email verification error:', error);
      let errorMessage = "Failed to verify email. Please try again.";
      
      if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      }
      
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: errorMessage,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    requestPasswordReset,
    resetPassword,
    verifyEmail,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
