// src/config/api.ts
export const API_CONFIG = {
  // 更新为正确的API地址
  BASE_URL: 'https://wujie.15273671.xyz/api/v1',
  ENDPOINTS: {
    LOGIN: '/passport/auth/login',
    REGISTER: '/passport/auth/register',
    PASSWORD_RESET: '/passport/auth/forgot-password',
    // 添加其他端点
  },
  TIMEOUT: 10000, // 10 秒超时
};