// src/api/user.ts
import { API_CONFIG } from '../config/api';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export interface TrafficData {
  total: string;
  used: string;
  remaining: string;
  usagePercentage: number;
}

export const getUserProfile = async (token: string): Promise<UserProfile> => {
  // 这里将来会实现实际的 API 调用
  // 目前返回模拟数据
  return {
    id: '1',
    name: '测试用户',
    email: 'test@example.com',
    createdAt: new Date().toISOString(),
  };
};

export const getTrafficData = async (token: string): Promise<TrafficData> => {
  // 模拟数据
  return {
    total: '130 GB',
    used: '103.67 GB',
    remaining: '26.33 GB',
    usagePercentage: 80,
  };
};