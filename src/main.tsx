// src/main.tsx (配置 React Router 以集成 UserDashboardLayout 和嵌套路由)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';

// 1. 导入您的 LoginForm 组件
//    请根据您项目中 LoginForm.tsx 文件的实际位置修改此路径。
import LoginPageComponent from './components/LoginForm'; // 修改: 使用您的 LoginForm

// 2. 导入 UserDashboardLayout 组件
import UserDashboardLayout from './components/UserDashboardLayout'; // 确保路径正确

// 3. 导入独立的 HomePageContent 组件
//    确保这个路径指向您创建的 src/pages/HomePageContent.tsx 文件
import HomePageContent from './pages/HomePageContent';

// --- 其他页面的临时占位符 (您需要为它们创建独立文件并替换导入) ---
const PlaceholderPageContent: React.FC<{ title: string }> = ({ title }) => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
    <p className="mt-2 text-gray-600">这是【{title}】页面的占位符内容，请创建并替换为实际组件。</p>
  </div>
);
const DocsPage = () => <PlaceholderPageContent title="使用文档" />;
const PurchaseSubscriptionPage = () => <PlaceholderPageContent title="购买订阅" />;
const NodeStatusPage = () => <PlaceholderPageContent title="节点状态" />;
const MyOrdersPage = () => <PlaceholderPageContent title="我的订单" />;
const MyInvitationsPage = () => <PlaceholderPageContent title="我的邀请" />;
const PersonalCenterPage = () => <PlaceholderPageContent title="个人中心" />;
const TrafficDetailsPage = () => <PlaceholderPageContent title="流量明细" />;
const MyTicketsPage = () => <PlaceholderPageContent title="我的工单" />;


// 4. (可选) 定义一个 404 Not Found 页面组件
const NotFoundPage: React.FC = () => (
  <div className="p-6 text-center">
    <h1 className="text-4xl font-bold text-red-600">404</h1>
    <p className="mt-2 text-xl text-gray-700">抱歉，页面未找到。</p>
    <Link to="/" className="mt-4 inline-block text-blue-500 hover:underline">返回首页</Link>
  </div>
);


// 5. 导入全局 CSS
import './index.css';

// --- 应用主路由和状态管理组件 ---
const AppRouter: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(() => {
    const token = localStorage.getItem('userToken');
    return !!token;
  });
  const navigate = useNavigate();

  const handleLoginSuccess = (token: string) => {
    console.log('main.tsx: 登录成功! Token:', token);
    localStorage.setItem('userToken', token);
    setIsAuthenticated(true);
    navigate('/dashboard/home'); // 登录成功后明确导航到仪表盘首页
  };

  const handleLogout = () => {
    console.log('main.tsx: 用户退出登录');
    localStorage.removeItem('userToken');
    setIsAuthenticated(false);
    navigate('/login'); // 退出登录后明确导航到登录页
  };

  return (
    <Routes>
      {/* 登录页路由 */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard/home" replace />
          ) : (
            // --- 修改开始: 添加居中容器 ---
            <div style={{
              minHeight: '100vh', // 确保容器至少和视口一样高
              display: 'flex',
              alignItems: 'center', // 垂直居中
              justifyContent: 'center', // 水平居中
              backgroundColor: '#f3f4f6' // 可选：设置页面背景色 (Tailwind gray-100)
            }}>
              <LoginPageComponent onUserAuthenticated={handleLoginSuccess} />
            </div>
            // --- 修改结束 ---
          )
        }
      />

      {/* 仪表盘/主应用路由 (父路由) */}
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <UserDashboardLayout onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<HomePageContent />} />
        <Route path="docs" element={<DocsPage />} />
        <Route path="store/purchase" element={<PurchaseSubscriptionPage />} />
        <Route path="store/status" element={<NodeStatusPage />} />
        <Route path="finance/orders" element={<MyOrdersPage />} />
        <Route path="finance/invitations" element={<MyInvitationsPage />} />
        <Route path="user/profile" element={<PersonalCenterPage />} />
        <Route path="user/traffic" element={<TrafficDetailsPage />} />
        <Route path="user/tickets" element={<MyTicketsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route
        path="/"
        element={
          <Navigate to={isAuthenticated ? "/dashboard/home" : "/login"} replace />
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

const MainApp: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>,
);
