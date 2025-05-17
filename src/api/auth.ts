import { API_CONFIG } from "@/config/api";

export interface LoginResponse {
  status: string;
  message?: string;
  data?: {
    auth_data: string;
    [key: string]: any;
  };
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/passport/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      // 只读取一次 JSON
      const data = await response.json();
  
      // 如果响应状态码不是成功 (2xx)，处理错误情况
      if (!response.ok) {
        throw new Error(data.message || `请求失败，状态码: ${response.status}`);
      }
  
      return data;
    } catch (error) {
      console.error('登录 API 调用时发生错误:', error);
      throw error;
    }
  };
  

export const register = async (name: string, email: string, password: string) => {
  // 实现注册 API 调用
  // 这里模拟一个成功响应
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 'success',
        message: '注册成功',
      });
    }, 1000);
  });
};

export const requestPasswordReset = async (email: string) => {
  // 实现密码重置请求
  // 这里模拟一个成功响应
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 'success',
        message: '重置链接已发送',
      });
    }, 1000);
  });
};