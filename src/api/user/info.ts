// src/api/user/info.ts
import { apiGet, ApiResponse } from '@/utils/api';

/**
 * 用户信息响应数据类型
 */
export interface UserInfoData {
  email: string;
  transfer_enable: number;
  last_login_at: string | null;
  created_at: number;
  banned: number;
  remind_expire: number;
  remind_traffic: number;
  expired_at: number;
  balance: number;
  commission_balance: number;
  plan_id: number;
  discount: number | null;
  commission_rate: number | null;
  telegram_id: number;
  uuid: string;
  avatar_url: string;
}

/**
 * 获取用户信息的API响应类型
 */
export type UserInfoResponse = ApiResponse<UserInfoData>;

/**
 * 获取用户信息API
 * 
 * 需要携带用户认证token
 * 
 * @returns Promise with user info response
 */
export const getUserInfo = () => {
  return apiGet<UserInfoData>('/user/info', {
    withAuth: true, // 需要认证
  });
};