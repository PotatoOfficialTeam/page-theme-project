// src/pages/auth/Login.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../config/routes';

const Login: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  // 如果已经登录，直接重定向到仪表盘
  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD.HOME} replace />;
  }

  // 登录成功回调函数
  const handleUserAuthenticated = async (token: string) => {
    // 将 token 保存到本地存储并更新认证状态
    localStorage.setItem('userToken', token);
    // 强制重新加载页面以确保路由系统能够识别到新的认证状态
    window.location.href = ROUTES.DASHBOARD.HOME;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <LoginForm onUserAuthenticated={handleUserAuthenticated} />
    </div>
  );
};

export default Login;