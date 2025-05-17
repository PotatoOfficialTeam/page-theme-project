// src/hooks/useNotices.ts
import { useState, useEffect } from 'react';
import { fetchNotices, Notice } from '@/api/user/notice';
import { Storage, StorageKeys } from '@/utils/storage';

/**
 * 通知钩子返回类型
 */
interface UseNoticesReturn {
  notices: Notice[];
  total: number;
  loading: boolean;
  error: string | null;
  refreshNotices: () => Promise<void>;
}

/**
 * 通知钩子函数
 * 用于获取和更新用户通知
 * 
 * @returns 通知状态和刷新方法
 */
export const useNotices = (): UseNoticesReturn => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 获取通知的函数
  const fetchUserNotices = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 检查是否已登录
      const token = Storage.get(StorageKeys.USER_TOKEN);
      if (!token) {
        setError('用户未登录');
        return;
      }
      
      // 调用API获取通知
      const response = await fetchNotices();
      
      // 处理API响应
      if (response.status === 'success' && response.data) {
        // 这里正确访问response.data中的data数组和total
        setNotices(response.data.data);
        setTotal(response.data.total);
      } else {
        setError(response.message || '获取通知失败');
      }
    } catch (err: any) {
      console.error('获取通知时出错:', err);
      setError(err.message || '获取通知时发生未知错误');
    } finally {
      setLoading(false);
    }
  };

  // 组件挂载时获取通知
  useEffect(() => {
    fetchUserNotices();
  }, []);

  return {
    notices,
    total,
    loading,
    error,
    refreshNotices: fetchUserNotices
  };
};