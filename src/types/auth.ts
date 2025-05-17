// src/types/auth.ts

/**
 * 登录请求参数接口
 */
export interface LoginRequest {
    email: string;
    password: string;
  }
  
  /**
   * 登录成功响应数据接口
   */
  export interface LoginResponseData {
    token: string;
    is_admin: number;
    auth_data: string;
  }
  
  /**
   * 登录API返回完整响应接口
   */
  export interface LoginApiResponse {
    status: 'success' | 'fail';
    message: string;
    data: LoginResponseData | null;
    error: any;
  }
  
  /**
   * 登录验证错误响应接口
   */
  export interface LoginValidationError {
    message: string;
    errors: {
      email?: string[];
      password?: string[];
      [key: string]: string[] | undefined;
    };
  }