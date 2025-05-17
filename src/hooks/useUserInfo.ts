// src/hooks/useUserInfo.ts
import { useState, useEffect } from 'react';
import { getUserInfo, UserInfoData } from '@/api/user/info';
import { Storage, StorageKeys } from '@/utils/storage';

/**
 * 用户信息钩子返回类型
 */
interface UseUserInfoReturn {
  userInfo: UserInfoData | null;
  loading: boolean;
  error: string | null;
  refreshUserInfo: () => Promise<void>;
}

/**
 * 用户信息钩子函数
 * 用于获取和更新用户信息
 * 
 * @returns 用户信息状态和刷新方法
 */
export const useUserInfo = (): UseUserInfoReturn => {
  const [userInfo, setUserInfo] = useState<UserInfoData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 获取用户信息的函数
  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 检查是否已登录
      const token = Storage.get(StorageKeys.USER_TOKEN);
      if (!token) {
        setError('用户未登录');
        return;
      }
      
      // 调用API获取用户信息
      const response = await getUserInfo();
      
      // 如果请求成功且包含数据
      if (response.status === 'success' && response.data) {
        setUserInfo(response.data);
      } else {
        setError(response.message || '获取用户信息失败');
      }
    } catch (err: any) {
      console.error('获取用户信息时出错:', err);
      setError(err.message || '获取用户信息时发生未知错误');
    } finally {
      setLoading(false);
    }
  };

  // 组件挂载时获取用户信息
  useEffect(() => {
    fetchUserInfo();
  }, []);

  // 刷新用户信息的方法
  const refreshUserInfo = async () => {
    await fetchUserInfo();
  };

  return {
    userInfo,
    loading,
    error,
    refreshUserInfo
  };
};