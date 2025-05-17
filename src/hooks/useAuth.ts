// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { login, LoginResponse } from '../api/auth';

interface LoginResult {
  success: boolean;
  message?: string;
}

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('userToken');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const loginUser = async (email: string, password: string): Promise<LoginResult> => {
    setLoading(true);
    try {
      const result: LoginResponse = await login(email, password);
      if (result.status === 'success' && result.data && result.data.auth_data) {
        localStorage.setItem('userToken', result.data.auth_data);
        setToken(result.data.auth_data);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, message: result.message || '登录失败' };
    } catch (error: any) {
      return { success: false, message: error.message || '发生网络错误或未知错误，请稍后重试。' };
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('userToken');
    setToken(null);
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    token,
    loading,
    loginUser,
    logoutUser
  };
};