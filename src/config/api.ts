// src/config/api.ts
export const API_CONFIG = {
  // API基础地址
  BASE_URL: 'https://wujie.15273671.xyz/api/v1',
  ENDPOINTS: {
    // 认证相关
    LOGIN: '/passport/auth/login',
    REGISTER: '/passport/auth/register',
    PASSWORD_RESET: '/passport/auth/forgot-password',
    
    // 用户相关
    USER_INFO: '/user/info',
    USER_SUBSCRIPTION: '/user/getSubscribe',
    USER_NOTICES: '/user/notice/fetch',
    USER_STAT: '/user/getStat',
    USER_COMMISSION_CONFIG: '/user/comm/config',

    // 添加其他端点
  },
  TIMEOUT: 10000, // 10 秒超时
};