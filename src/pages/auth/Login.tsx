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
  const handleUserAuthenticated = (token: string) => {
    // 保存token到localStorage
    localStorage.setItem('userToken', token);
    
    // 强制页面跳转以确保路由系统能够识别到新的认证状态
    // 使用 window.location.href 而非 navigate，可以确保完全刷新应用状态
    window.location.href = ROUTES.DASHBOARD.HOME;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <LoginForm onUserAuthenticated={handleUserAuthenticated} />
    </div>
  );
};

export default Login;