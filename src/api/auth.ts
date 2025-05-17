// src/api/auth.ts - 使用增强版 API 工具
import { apiPost, ApiResponse } from '@/utils/api';
import { API_CONFIG } from '@/config/api';

// 登录响应类型
export interface LoginResponseData {
  token?: string;
  is_admin?: number;
  auth_data?: string;
  [key: string]: any;
}

export type LoginResponse = ApiResponse<LoginResponseData>;

/**
 * 用户登录 API
 * @param email 用户邮箱
 * @param password 用户密码
 * @returns Promise with login response
 */
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    // 使用公共 API 工具发送 POST 请求，指定 contentType 为 'form'
    const response = await apiPost<LoginResponseData>(
      API_CONFIG.ENDPOINTS.LOGIN,  // 使用配置中定义的端点
      { email, password },         // 请求体数据
      {
        withAuth: false,           // 登录不需要认证令牌
        timeout: API_CONFIG.TIMEOUT,
        contentType: 'form'        // 关键：指定内容类型为表单数据
      }
    );
    
    // 处理验证错误
    if (response.errors) {
      let errorMessage = '';
      if (response.errors.email) errorMessage = response.errors.email[0];
      else if (response.errors.password) errorMessage = response.errors.password[0];
      else errorMessage = response.message || '表单验证失败';
      
      throw new Error(errorMessage);
    }
    
    // 处理登录失败（例如凭据错误）
    if (response.status === 'fail') {
      throw new Error(response.message || '邮箱或密码错误');
    }
    
    // 确保响应成功且包含所需数据
    if (response.status !== 'success' || !response.data?.auth_data) {
      throw new Error(response.message || '登录过程中发生错误');
    }
    
    return response;
  } catch (error) {
    console.error('登录 API 调用时发生错误:', error);
    throw error;
  }
};

/**
 * 用户注册 API
 * @param name 用户名
 * @param email 用户邮箱
 * @param password 用户密码
 * @returns Promise with registration response
 */
export const register = async (name: string, email: string, password: string) => {
  try {
    return await apiPost(
      API_CONFIG.ENDPOINTS.REGISTER,
      { name, email, password },
      {
        withAuth: false,
        contentType: 'form'  // 同样使用表单数据格式
      }
    );
  } catch (error) {
    console.error('注册 API 调用时发生错误:', error);
    throw error;
  }
};

/**
 * 请求密码重置 API
 * @param email 用户邮箱
 * @returns Promise with password reset response
 */
export const requestPasswordReset = async (email: string) => {
  try {
    return await apiPost(
      API_CONFIG.ENDPOINTS.PASSWORD_RESET,
      { email },
      {
        withAuth: false,
        contentType: 'form'  // 同样使用表单数据格式
      }
    );
  } catch (error) {
    console.error('密码重置 API 调用时发生错误:', error);
    throw error;
  }
};