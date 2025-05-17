// src/api/user/commConfig.ts
import { apiGet, ApiResponse } from '@/utils/api';

/**
 * 佣金配置数据类型
 */
export interface CommissionConfigData {
  is_telegram: number;  // 是否启用Telegram (0: 否, 1: 是)
  telegram_discuss_link: string;  // Telegram讨论组链接
  stripe_pk: string | null;  // Stripe公钥
  withdraw_methods: string[];  // 提现方式列表
  withdraw_close: number;  // 是否关闭提现 (0: 开放, 1: 关闭)
  currency: string;  // 货币代码
  currency_symbol: string;  // 货币符号
  commission_distribution_enable: number;  // 是否启用佣金分配 (0: 否, 1: 是)
  commission_distribution_l1: string;  // 一级分销佣金比例
  commission_distribution_l2: string;  // 二级分销佣金比例
  commission_distribution_l3: string;  // 三级分销佣金比例
}

/**
 * 获取佣金配置的API响应类型
 */
export type CommissionConfigResponse = ApiResponse<CommissionConfigData>;

/**
 * 获取用户佣金配置API
 * 
 * 需要携带用户认证token
 * 
 * @returns Promise with commission config response
 */
export const getCommissionConfig = () => {
  return apiGet<CommissionConfigData>('/user/comm/config', {
    withAuth: true, // 需要认证
  });
};