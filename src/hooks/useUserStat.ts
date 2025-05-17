// src/hooks/useUserStat.ts
import { useState, useEffect } from 'react';
import { getUserStat, UserStatData } from '@/api/user/stat';
import { Storage, StorageKeys } from '@/utils/storage';

/**
 * 用户统计钩子返回类型
 */
interface UseUserStatReturn {
  statData: UserStatData | null;
  loading: boolean;
  error: string | null;
  refreshStat: () => Promise<void>;
}

/**
 * 用户统计钩子函数
 * 用于获取和更新用户统计信息
 * 
 * @returns 用户统计状态和刷新方法
 */
export const useUserStat = (): UseUserStatReturn => {
  const [statData, setStatData] = useState<UserStatData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 获取用户统计的函数
  const fetchUserStat = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 检查是否已登录
      const token = Storage.get(StorageKeys.USER_TOKEN);
      if (!token) {
        setError('用户未登录');
        return;
      }
      
      // 调用API获取用户统计
      const response = await getUserStat();
      
      // 如果请求成功且包含数据
      if (response.status === 'success' && response.data) {
        setStatData(response.data);
      } else {
        setError(response.message || '获取用户统计信息失败');
      }
    } catch (err: any) {
      console.error('获取用户统计时出错:', err);
      setError(err.message || '获取用户统计时发生未知错误');
    } finally {
      setLoading(false);
    }
  };

  // 组件挂载时获取用户统计
  useEffect(() => {
    fetchUserStat();
  }, []);

  return {
    statData,
    loading,
    error,
    refreshStat: fetchUserStat
  };
};