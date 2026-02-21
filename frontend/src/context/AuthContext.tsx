'use client';

import { createContext, useContext, useState, ReactNode, FC, useEffect } from 'react';
import type { UserInfo } from '@/lib/types/product';
import { apiClient, setAuthToken } from '@/lib/api/client';

interface AuthContextType {
  user: UserInfo | null;
  login: (email?: string, password?: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for token and user info on initial load (session persistence)
    try {
      const token = localStorage.getItem('accessToken');
      const storedUser = localStorage.getItem('user');
      if (token && storedUser) {
        setAuthToken(token);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      // Clear potentially corrupted storage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    }
    setIsLoading(false);
  }, []);

  const login = async (email?: string, password?: string) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const { access_token, user: loggedInUser } = response.data;

      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('user', JSON.stringify(loggedInUser));

      setAuthToken(access_token);
      setUser(loggedInUser);
    } catch (error: any) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      alert('Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.');
      // Ensure state is clean on failure
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setAuthToken(); // Clear token from axios header
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
