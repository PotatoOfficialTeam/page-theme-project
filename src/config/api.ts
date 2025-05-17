// src/config/api.ts
export const API_CONFIG = {
    BASE_URL: 'https://wujie.one/api/v1',
    ENDPOINTS: {
      LOGIN: '/passport/auth/login',
      REGISTER: '/passport/auth/register',
      PASSWORD_RESET: '/passport/auth/forgot-password',
      // 添加其他端点
    },
    TIMEOUT: 10000, // 10 秒超时
  };