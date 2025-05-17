// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { login, LoginResponse } from '../api/auth';
import { Storage, StorageKeys } from '../utils/storage';

interface LoginResult {
  success: boolean;
  message?: string;
}

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // 初始化时检查本地存储中是否有有效令牌
  useEffect(() => {
    const storedToken = Storage.get(StorageKeys.USER_TOKEN);
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
        // 使用 Storage 工具存储令牌，确保一致性
        Storage.set(StorageKeys.USER_TOKEN, result.data.auth_data);
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
    // 使用 Storage 工具移除令牌，确保一致性
    Storage.remove(StorageKeys.USER_TOKEN);
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