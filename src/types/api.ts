// src/types/api.ts

/**
 * 通用API响应结构
 */
export interface ApiResponse<T> {
    status?: 'success' | 'fail' | 'error';
    message?: string;
    data?: T;
    error?: any;
  }
  
  /**
   * 字段验证错误结构
   */
  export interface ValidationErrors {
    message: string;
    errors: {
      [key: string]: string[];
    };
  }
  
  /**
   * API请求错误，可包含验证错误或其他错误信息
   */
  export interface ApiError {
    message: string;
    errors?: { [key: string]: string[] };
    status?: string;
    data?: any;
  }