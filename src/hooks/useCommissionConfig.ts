// src/hooks/useCommissionConfig.ts
import { useState, useEffect } from 'react';
import { getCommissionConfig, CommissionConfigData } from '@/api/user/commConfig';
import { Storage, StorageKeys } from '@/utils/storage';

/**
 * 佣金配置钩子返回类型
 */
interface UseCommissionConfigReturn {
  commConfig: CommissionConfigData | null;
  loading: boolean;
  error: string | null;
  refreshCommConfig: () => Promise<void>;
  
  // 便捷访问属性
  telegramEnabled: boolean;
  telegramLink: string;
  withdrawMethods: string[];
  isWithdrawEnabled: boolean;
  currency: string;
  currencySymbol: string;
  isCommissionEnabled: boolean;
  commissionRates: {
    level1: number;
    level2: number;
    level3: number;
  }
}

/**
 * 佣金配置钩子函数
 * 用于获取和更新佣金配置信息
 * 
 * @returns 佣金配置状态和刷新方法
 */
export const useCommissionConfig = (): UseCommissionConfigReturn => {
  const [commConfig, setCommConfig] = useState<CommissionConfigData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 获取佣金配置的函数
  const fetchCommConfig = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 检查是否已登录
      const token = Storage.get(StorageKeys.USER_TOKEN);
      if (!token) {
        setError('用户未登录');
        return;
      }
      
      // 调用API获取佣金配置
      const response = await getCommissionConfig();
      
      // 如果请求成功且包含数据
      if (response.status === 'success' && response.data) {
        setCommConfig(response.data);
      } else {
        setError(response.message || '获取佣金配置信息失败');
      }
    } catch (err: any) {
      console.error('获取佣金配置时出错:', err);
      setError(err.message || '获取佣金配置时发生未知错误');
    } finally {
      setLoading(false);
    }
  };

  // 组件挂载时获取佣金配置
  useEffect(() => {
    fetchCommConfig();
  }, []);

  // 计算便捷访问属性
  const telegramEnabled = commConfig ? commConfig.is_telegram === 1 : false;
  const telegramLink = commConfig?.telegram_discuss_link || '';
  const withdrawMethods = commConfig?.withdraw_methods || [];
  const isWithdrawEnabled = commConfig ? commConfig.withdraw_close === 0 : false;
  const currency = commConfig?.currency || 'CNY';
  const currencySymbol = commConfig?.currency_symbol || '¥';
  const isCommissionEnabled = commConfig ? commConfig.commission_distribution_enable === 1 : false;
  
  const commissionRates = {
    level1: commConfig ? parseFloat(commConfig.commission_distribution_l1 || '0') : 0,
    level2: commConfig ? parseFloat(commConfig.commission_distribution_l2 || '0') : 0,
    level3: commConfig ? parseFloat(commConfig.commission_distribution_l3 || '0') : 0,
  };

  return {
    commConfig,
    loading,
    error,
    refreshCommConfig: fetchCommConfig,
    
    // 便捷访问属性
    telegramEnabled,
    telegramLink,
    withdrawMethods,
    isWithdrawEnabled,
    currency,
    currencySymbol,
    isCommissionEnabled,
    commissionRates
  };
};