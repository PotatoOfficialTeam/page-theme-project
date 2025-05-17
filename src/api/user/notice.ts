// src/api/user/notice.ts
import { apiGet, ApiResponse } from '@/utils/api';

/**
 * 通知数据类型
 */
export interface Notice {
  id: number;
  title: string;
  content: string;
  show: number;
  img_url: string | null;
  tags: string[];
  created_at: number;
  updated_at: number;
}

/**
 * 通知列表响应数据
 */
export interface NoticeListData {
  data: Notice[];
  total: number;
}

/**
 * 获取通知列表的API响应类型
 */
export type NoticeListResponse = ApiResponse<NoticeListData>;

/**
 * 获取用户通知列表API
 * 
 * 需要携带用户认证token
 * 
 * @returns Promise with notice list response
 */
export const fetchNotices = () => {
  return apiGet<NoticeListData>('/user/notice/fetch', {
    withAuth: true, // 需要认证
  });
};