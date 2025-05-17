// src/config/routes.ts
export const ROUTES = {
    // 认证相关路由
    AUTH: {
      LOGIN: '/login',
      REGISTER: '/register',
      FORGOT_PASSWORD: '/forgot-password',
    },
    // 仪表盘相关路由
    DASHBOARD: {
      ROOT: '/dashboard',
      HOME: '/dashboard/home',
      DOCS: '/dashboard/docs',
      STORE: {
        PURCHASE: '/dashboard/store/purchase',
        NODE_STATUS: '/dashboard/store/status',
      },
      FINANCE: {
        ORDERS: '/dashboard/finance/orders',
        INVITATIONS: '/dashboard/finance/invitations',
      },
      USER: {
        PROFILE: '/dashboard/user/profile',
        TRAFFIC: '/dashboard/user/traffic',
        TICKETS: '/dashboard/user/tickets',
      },
    },
    // 通用路由
    NOT_FOUND: '*',
  };