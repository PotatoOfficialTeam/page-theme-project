// src/hooks/useSubscription.ts
import { useState, useEffect } from 'react';
import { getSubscription, SubscriptionData } from '@/api/user/getSubscribe';
import { Storage, StorageKeys } from '@/utils/storage';

/**
 * 订阅信息钩子返回类型
 */
interface UseSubscriptionReturn {
  subscription: SubscriptionData | null;
  loading: boolean;
  error: string | null;
  refreshSubscription: () => Promise<void>;
  // 便捷计算属性
  usedTraffic: string;
  remainingTraffic: string;
  totalTraffic: string;
  usedTrafficPercentage: number;
  isSubscriptionExpired: boolean;
  daysUntilExpiration: number;
}

/**
 * 计算可读的流量大小
 * @param bytes 字节数
 * @returns 格式化后的流量大小字符串
 */
const formatTraffic = (bytes: number): string => {
  if (bytes < 1024) {
    return bytes + ' B';
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(2) + ' KB';
  } else if (bytes < 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  } else {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  }
};

/**
 * 订阅信息钩子函数
 * 用于获取和更新用户订阅信息
 * 
 * @returns 订阅信息状态和刷新方法
 */
export const useSubscription = (): UseSubscriptionReturn => {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 获取订阅信息的函数
  const fetchSubscription = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 检查是否已登录
      const token = Storage.get(StorageKeys.USER_TOKEN);
      if (!token) {
        setError('用户未登录');
        return;
      }
      
      // 调用API获取订阅信息
      const response = await getSubscription();
      
      // 如果请求成功且包含数据
      if (response.status === 'success' && response.data) {
        setSubscription(response.data);
      } else {
        setError(response.message || '获取订阅信息失败');
      }
    } catch (err: any) {
      console.error('获取订阅信息时出错:', err);
      setError(err.message || '获取订阅信息时发生未知错误');
    } finally {
      setLoading(false);
    }
  };

  // 组件挂载时获取订阅信息
  useEffect(() => {
    fetchSubscription();
  }, []);

  // 计算已使用的流量
  const usedTraffic = subscription ? formatTraffic(subscription.u + subscription.d) : '0 B';
  
  // 计算总流量
  const totalTraffic = subscription ? formatTraffic(subscription.transfer_enable) : '0 B';
  
  // 计算剩余流量
  const remainingTraffic = subscription 
    ? formatTraffic(Math.max(0, subscription.transfer_enable - (subscription.u + subscription.d))) 
    : '0 B';
  
  // 计算流量使用百分比
  const usedTrafficPercentage = subscription && subscription.transfer_enable > 0
    ? Math.min(100, Math.round(((subscription.u + subscription.d) / subscription.transfer_enable) * 100))
    : 0;
  
  // 检查订阅是否过期
  const isSubscriptionExpired = subscription 
    ? (subscription.expired_at * 1000) < Date.now() 
    : false;
  
  // 计算距离过期还有多少天
  const daysUntilExpiration = subscription 
    ? Math.max(0, Math.ceil((subscription.expired_at * 1000 - Date.now()) / (1000 * 60 * 60 * 24))) 
    : 0;

  return {
    subscription,
    loading,
    error,
    refreshSubscription: fetchSubscription,
    usedTraffic,
    remainingTraffic,
    totalTraffic,
    usedTrafficPercentage,
    isSubscriptionExpired,
    daysUntilExpiration
  };
};