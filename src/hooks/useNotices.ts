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
    console.log('🔍 useNotices: 开始获取通知数据...');
    try {
      setLoading(true);
      setError(null);
      
      // 检查是否已登录
      const token = Storage.get(StorageKeys.USER_TOKEN);
      console.log('🔑 useNotices: 用户Token状态:', token ? '已获取' : '未获取');
      
      if (!token) {
        const errorMsg = '用户未登录';
        console.error('❌ useNotices: 错误 -', errorMsg);
        setError(errorMsg);
        return;
      }
      
      // 调用API获取通知
      console.log('🌐 useNotices: 调用fetchNotices API...');
      const response = await fetchNotices();
      console.log('📊 useNotices: API响应数据:', response);
      
      // 处理API响应 - 修复条件判断逻辑
      if (response && response.data) {
        console.log('✅ useNotices: 成功获取通知数据:', response.data);
        
        // 检查数据结构 - 直接调试输出
        console.log('🔍 useNotices: 数据类型检查:', {
          responseType: typeof response,
          dataType: typeof response.data,
          isDataArray: Array.isArray(response.data),
          hasDataProperty: response.data && 'data' in response.data,
          hasTotalProperty: response.data && 'total' in response.data
        });
        
        // 根据实际数据结构设置通知数据
        if (Array.isArray(response.data)) {
          // 如果data直接是数组
          console.log('📦 useNotices: 使用数组数据格式');
          setNotices(response.data);
          setTotal(response.data.length);
        } else if (response.data.data && Array.isArray(response.data.data)) {
          // 如果data是包含data数组的对象
          console.log('📦 useNotices: 使用嵌套数据格式');
          setNotices(response.data.data);
          setTotal(response.data.total || response.data.data.length);
        } else {
          console.error('❓ useNotices: 未知的数据格式:', response.data);
          setError('获取通知失败: 数据格式不正确');
        }
      } else {
        // 只有在明确失败的情况下才设置错误
        const errorMsg = response?.message || '获取通知失败';
        console.error('❌ useNotices: API返回错误 -', errorMsg);
        setError(errorMsg);
      }
    } catch (err: any) {
      const errorMsg = err.message || '获取通知时发生未知错误';
      console.error('❌ useNotices: 异常错误 -', errorMsg, err);
      setError(errorMsg);
    } finally {
      console.log('🏁 useNotices: 获取通知完成，loading设为false');
      setLoading(false);
    }
  };

  // 组件挂载时获取通知
  useEffect(() => {
    console.log('🔄 useNotices: 钩子初始化，自动获取通知');
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