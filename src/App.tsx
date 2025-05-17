// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

// 布局
import UserDashboardLayout from './layouts/UserDashboardLayout';

// 认证页面
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// 仪表盘页面
import Home from './pages/dashboard/Home';
import Docs from './pages/dashboard/Docs';
import NodeStatus from './pages/dashboard/NodeStatus';
import PurchaseSubscription from './pages/dashboard/PurchaseSubscription';
import MyOrders from './pages/dashboard/MyOrders';
import MyInvitations from './pages/dashboard/MyInvitations';
import PersonalCenter from './pages/dashboard/PersonalCenter';
import TrafficDetails from './pages/dashboard/TrafficDetails';
import MyTickets from './pages/dashboard/MyTickets';

// 其他页面
import NotFound from './pages/NotFound';

// 导入路由配置
import { ROUTES } from './config/routes';

const App: React.FC = () => {
  const { isAuthenticated, logoutUser } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* 登录页路由 */}
        <Route
          path={ROUTES.AUTH.LOGIN}
          element={
            isAuthenticated ? (
              <Navigate to={ROUTES.DASHBOARD.HOME} replace />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path={ROUTES.AUTH.REGISTER}
          element={
            isAuthenticated ? (
              <Navigate to={ROUTES.DASHBOARD.HOME} replace />
            ) : (
              <Register />
            )
          }
        />
        <Route
          path={ROUTES.AUTH.FORGOT_PASSWORD}
          element={
            isAuthenticated ? (
              <Navigate to={ROUTES.DASHBOARD.HOME} replace />
            ) : (
              <ForgotPassword />
            )
          }
        />

        {/* 仪表盘路由 */}
        <Route
          path={ROUTES.DASHBOARD.ROOT}
          element={
            isAuthenticated ? (
              <UserDashboardLayout onLogout={logoutUser} />
            ) : (
              <Navigate to={ROUTES.AUTH.LOGIN} replace />
            )
          }
        >
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="docs" element={<Docs />} />
          <Route path="store/purchase" element={<PurchaseSubscription />} />
          <Route path="store/status" element={<NodeStatus />} />
          <Route path="finance/orders" element={<MyOrders />} />
          <Route path="finance/invitations" element={<MyInvitations />} />
          <Route path="user/profile" element={<PersonalCenter />} />
          <Route path="user/traffic" element={<TrafficDetails />} />
          <Route path="user/tickets" element={<MyTickets />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* 根路由重定向 */}
        <Route
          path="/"
          element={
            <Navigate
              to={isAuthenticated ? ROUTES.DASHBOARD.HOME : ROUTES.AUTH.LOGIN}
              replace
            />
          }
        />
        
        {/* 404 路由 */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;