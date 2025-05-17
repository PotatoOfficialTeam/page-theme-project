// src/api/user/getSubscribe.ts
import { apiGet, ApiResponse } from '@/utils/api';

/**
 * 订阅计划信息
 */
export interface PlanInfo {
  id: number;
  group_id: number;
  transfer_enable: number;
  name: string;
  speed_limit: number | null;
  show: number;
  sort: number;
  renew: number;
  content: string;
  month_price: number;
  quarter_price: number | null;
  half_year_price: number | null;
  year_price: number | null;
  two_year_price: number | null;
  three_year_price: number | null;
  onetime_price: number | null;
  reset_price: number;
  reset_traffic_method: number | null;
  capacity_limit: number | null;
  created_at: number;
  updated_at: number;
}

/**
 * 订阅信息数据
 */
export interface SubscriptionData {
  plan_id: number;
  token: string;
  expired_at: number;
  u: number;
  d: number;
  transfer_enable: number;
  email: string;
  uuid: string;
  plan: PlanInfo;
  subscribe_url: string;
  reset_day: number;
}

/**
 * 获取订阅信息的API响应类型
 */
export type SubscriptionResponse = ApiResponse<SubscriptionData>;

/**
 * 获取用户订阅信息API
 * 
 * 需要携带用户认证token
 * 
 * @returns Promise with subscription data response
 */
export const getSubscription = () => {
  return apiGet<SubscriptionData>('/user/getSubscribe', {
    withAuth: true, // 需要认证
  });
};