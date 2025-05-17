// src/utils/api.ts - 扩展版本
import { API_CONFIG } from '@/config/api';
import { Storage, StorageKeys } from '@/utils/storage';

// 接口响应的通用类型
export interface ApiResponse<T = any> {
  status?: string;
  message?: string;
  data?: T;
  error?: any;
  errors?: Record<string, string[]>;
}

// 定义请求选项接口
export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  withAuth?: boolean;
  timeout?: number;
  contentType?: 'json' | 'form' | 'multipart'; // 添加内容类型选项
}

// 创建URL参数字符串
const createQueryString = (params?: Record<string, any>): string => {
  if (!params || Object.keys(params).length === 0) return '';
  
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });
  
  return `?${searchParams.toString()}`;
};

// 添加超时功能
const withTimeout = <T>(promise: Promise<T>, timeoutMs: number): Promise<T> => {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error(`请求超时 (${timeoutMs}ms)`));
    }, timeoutMs);
  });
  
  return Promise.race([promise, timeoutPromise]);
};

/**
 * 通用GET请求方法
 * @param endpoint API端点路径
 * @param options 请求选项
 * @returns Promise with API response
 */
export const apiGet = async <T = any>(
  endpoint: string, 
  options: RequestOptions = {}
): Promise<ApiResponse<T>> => {
  try {
    const { 
      headers = {}, 
      params, 
      withAuth = true, 
      timeout = API_CONFIG.TIMEOUT 
    } = options;
    
    // 构建请求URL
    const url = `${API_CONFIG.BASE_URL}${endpoint}${createQueryString(params)}`;
    
    // 构建请求头
    const requestHeaders: Record<string, string> = {
      'Accept': 'application/json',
      ...headers
    };
    
    // 如果需要认证，添加认证头
    if (withAuth) {
      const token = Storage.get(StorageKeys.USER_TOKEN);
      if (token) {
        requestHeaders['Authorization'] = `Bearer ${token}`;
      }
    }
    
    // 发起请求
    const fetchPromise = fetch(url, {
      method: 'GET',
      headers: requestHeaders,
    });
    
    // 添加超时处理
    const response = await withTimeout(fetchPromise, timeout);
    
    // 解析响应
    const data = await response.json();
    
    // 处理HTTP错误
    if (!response.ok) {
      throw new Error(data.message || `请求失败，状态码: ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error(`API GET 请求错误 (${endpoint}):`, error);
    throw error;
  }
};

/**
 * 通用POST请求方法
 * @param endpoint API端点路径
 * @param body 请求体数据
 * @param options 请求选项
 * @returns Promise with API response
 */
export const apiPost = async <T = any>(
  endpoint: string,
  body: any = {},
  options: RequestOptions = {}
): Promise<ApiResponse<T>> => {
  try {
    const { 
      headers = {}, 
      params, 
      withAuth = true, 
      timeout = API_CONFIG.TIMEOUT,
      contentType = 'json'  // 默认为 JSON
    } = options;
    
    // 构建请求URL
    const url = `${API_CONFIG.BASE_URL}${endpoint}${createQueryString(params)}`;
    
    // 构建请求头
    const requestHeaders: Record<string, string> = {
      'Accept': 'application/json',
      ...headers
    };
    
    // 根据内容类型设置不同的 Content-Type 头
    if (!requestHeaders['Content-Type']) {
      switch(contentType) {
        case 'form':
          requestHeaders['Content-Type'] = 'application/x-www-form-urlencoded';
          break;
        case 'multipart':
          // 对于 multipart/form-data，不要设置 Content-Type，让浏览器自动设置边界
          delete requestHeaders['Content-Type'];
          break;
        case 'json':
        default:
          requestHeaders['Content-Type'] = 'application/json';
          break;
      }
    }
    
    // 如果需要认证，添加认证头
    if (withAuth) {
      const token = Storage.get(StorageKeys.USER_TOKEN);
      if (token) {
        requestHeaders['Authorization'] = `Bearer ${token}`;
      }
    }
    
    // 根据内容类型处理请求体
    let processedBody;
    if (requestHeaders['Content-Type'] === 'application/x-www-form-urlencoded') {
      // 处理表单数据
      const formData = new URLSearchParams();
      Object.entries(body).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
      processedBody = formData;
    } else if (!requestHeaders['Content-Type']) {
      // 处理 multipart/form-data
      const formData = new FormData();
      Object.entries(body).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      });
      processedBody = formData;
    } else {
      // 默认 JSON 处理
      processedBody = JSON.stringify(body);
    }
    
    // 发起请求
    const fetchPromise = fetch(url, {
      method: 'POST',
      headers: requestHeaders,
      body: processedBody,
    });
    
    // 添加超时处理
    const response = await withTimeout(fetchPromise, timeout);
    
    // 解析响应
    const data = await response.json();
    
    // 处理HTTP错误
    if (!response.ok) {
      throw new Error(data.message || `请求失败，状态码: ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error(`API POST 请求错误 (${endpoint}):`, error);
    throw error;
  }
};

// 导出所有API方法
export default {
  get: apiGet,
  post: apiPost,
};