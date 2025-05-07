// src/main.tsx (配置 React Router)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // 1. 导入 react-router-dom 组件
import App from './App'; // 你的主 App 组件 (渲染 LoginForm)
import RegisterPage from '@/app/register/page'; // 2. 导入注册页面组件 (使用路径别名)
import ForgotPasswordPage from '@/app/forgot-password/page'; // 3. 导入忘记密码页面组件 (使用路径别名)
import './index.css'; // 4. 导入全局 CSS

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 5. 使用 BrowserRouter 包裹整个应用 */}
    <BrowserRouter>
      {/* 6. 使用 Routes 定义路由规则 */}
      <Routes>
        {/* 根路径 '/' 渲染 App 组件 (它内部渲染 LoginForm) */}
        <Route path="/" element={<App />} />

        {/* 如果登录页有单独路由 /login, 可以取消注释并创建对应页面 */}
        {/* <Route path="/login" element={<App />} /> */}

        {/* 注册页路由 */}
        <Route path="/register" element={<RegisterPage />} />

        {/* 忘记密码页路由 */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* 在这里可以添加其他页面的路由 */}
        {/* <Route path="/dashboard" element={<DashboardPage />} /> */}

        {/* 可以添加一个 404 页面 */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

// 注意: 你需要确保 '@/app/register/page' 和 '@/app/forgot-password/page'
// 这两个路径能正确解析，并且对应的文件存在且导出了 React 组件。
