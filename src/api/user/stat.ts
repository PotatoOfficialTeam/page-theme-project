// src/api/user/stat.ts
import { apiGet, ApiResponse } from '@/utils/api';

/**
 * 用户统计数据类型
 * 数组中的元素分别表示：
 * [0]: 待定统计项1
 * [1]: 待定统计项2
 * [2]: 待定统计项3
 */
export type UserStatData = number[];

/**
 * 获取用户统计的API响应类型
 */
export type UserStatResponse = ApiResponse<UserStatData>;

/**
 * 获取用户统计信息API
 * 
 * 需要携带用户认证token
 * 
 * @returns Promise with user statistics response
 */
export const getUserStat = () => {
  return apiGet<UserStatData>('/user/getStat', {
    withAuth: true, // 需要认证
  });
};