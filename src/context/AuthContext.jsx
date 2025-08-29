import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuthToken, setAuthToken, clearAuthCookies, isRememberMeEnabled } from '../utils/cookieUtils';
import AxiosApiService from '../services/axiosApiService';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = getAuthToken();
      if (token) {
        // Verify token with backend
        try {
          const response = await AxiosApiService.getProfile();
          if (response && response.user) {
            setUser(response.user);
            setIsAuthenticated(true);
          } else {
            // Token invalid, clear it
            clearAuthCookies();
          }
        } catch (error) {
          // Token might be expired or invalid
          console.error('Token verification failed:', error);
          clearAuthCookies();
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials, rememberMe = false) => {
    try {
      setIsLoading(true);
      const response = await AxiosApiService.login(credentials);
      
      if (response.success && response.token) {
        // Store token in secure cookies
        setAuthToken(response.token, rememberMe);
        
        // Set user state
        setUser(response.user || { email: credentials.email });
        setIsAuthenticated(true);
        
        toast.success('Login successful!');
        return { success: true };
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      const errorMessage = error.message || 'Login failed. Please try again.';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      const response = await AxiosApiService.register(userData);
      
      if (response.success) {
        toast.success('Registration successful! Please log in.');
        return { success: true };
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      const errorMessage = error.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Call backend logout if token exists
      const token = getAuthToken();
      if (token) {
        try {
          await AxiosApiService.logout();
        } catch (error) {
          // Even if backend logout fails, continue with frontend logout
          console.error('Backend logout failed:', error);
        }
      }
      
      // Clear all auth cookies
      clearAuthCookies();
      
      // Clear state
      setUser(null);
      setIsAuthenticated(false);
      
      toast.success('Logged out successfully');
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if there's an error
      clearAuthCookies();
      setUser(null);
      setIsAuthenticated(false);
      return { success: true };
    }
  };

  const forgotPassword = async (email) => {
    try {
      setIsLoading(true);
      const response = await AxiosApiService.forgotPassword(email);
      
      if (response.success) {
        toast.success('Password reset instructions sent to your email');
        return { success: true };
      } else {
        throw new Error(response.message || 'Failed to send reset email');
      }
    } catch (error) {
      const errorMessage = error.message || 'Failed to send reset email';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (resetData) => {
    try {
      setIsLoading(true);
      const response = await AxiosApiService.resetPassword(resetData);
      
      if (response.success) {
        toast.success('Password reset successful! Please log in.');
        return { success: true };
      } else {
        throw new Error(response.message || 'Password reset failed');
      }
    } catch (error) {
      const errorMessage = error.message || 'Password reset failed';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    checkAuthStatus,
    isRememberMeEnabled: isRememberMeEnabled(),
    getAuthToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
