import React, { useState, useEffect, useRef } from 'react';
// 1. 导入 react-router-dom 相关组件
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

// --- 图标占位符 (与之前版本相同) ---
const HomeIcon = () => <span>🏠</span>;
const DocsIcon = () => <span>📄</span>;
const StoreCategoryIcon = () => <span className="text-xs opacity-0">🛍️</span>;
const FinanceCategoryIcon = () => <span className="text-xs opacity-0">💰</span>;
const UserCategoryIcon = () => <span className="text-xs opacity-0">👤</span>;
const PurchaseSubscriptionIcon = () => <span>🛒</span>;
const NodeStatusIcon = () => <span>🌐</span>;
const MyOrdersIcon = () => <span>🧾</span>;
const MyInvitationsIcon = () => <span>➕</span>;
const PersonalCenterIcon = () => <span>⚙️</span>;
const TrafficDetailsIcon = () => <span>📈</span>;
const MyTicketsIcon = () => <span>🛠️</span>;
const DownloadIcon = () => <span>⬇️</span>;
const RenewIcon = () => <span>🔄</span>;
const MenuIcon = () => <span>☰</span>;
const UserProfileIcon = () => <span className="text-sm font-semibold">ME</span>;
// WalletIcon, TrafficIcon, CommissionIcon, RefreshIcon, ConnectNodeIcon, KnowledgeBaseIcon, ResetTrafficIcon 已在 HomePageContent 中使用
const LogoutIcon = () => <span>🚪</span>;

// --- 导航项类型定义 (component 属性不再由此组件直接使用，而是由路由配置使用) ---
interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  path: string; // path 现在用于 Link to 和路由匹配
  isCategoryLabel?: boolean;
  subItems?: NavItem[];
  // component?: React.FC; // 这个属性将由 main.tsx 中的路由配置使用
}

// --- 占位符页面组件定义 (这些组件的实际内容应在各自的文件中) ---
// 您应该将这些组件移动到各自的文件中，例如 src/pages/HomePageContent.tsx 等
// 并在这里导入它们，或者直接在 main.tsx 的路由配置中引用它们的文件路径。
// 为了演示，暂时保留在这里。

const HomePageContent: React.FC = () => { 
  const WalletIcon = () => <span>💼</span>; const TrafficIcon = () => <span>📊</span>; const CommissionIcon = () => <span>🪙</span>; const RefreshIcon = () => <span>🔃</span>; const ConnectNodeIcon = () => <span>🔗</span>; const KnowledgeBaseIcon = () => <span>📚</span>; const ResetTrafficIcon = () => <span>♻️</span>;
  const walletBalance = "0 CNY"; const lastRecord = "0 CNY"; const totalTraffic = "130 GB"; const remainingTraffic = "26.33 GB"; const usedTraffic = "103.67 GB"; const trafficUsagePercentage = 80; const availableCommission = "0 CNY"; const pendingCommission = "0 CNY";
  const subscription = { name: "130G 流量 - 不限时间", status: "该订阅长期有效!" };
  return (
    <div className="p-4 sm:p-6 space-y-6 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"><div className="flex items-center text-gray-500 mb-2"> <WalletIcon /> <span className="ml-2 text-sm">钱包余额</span></div><p className="text-2xl font-semibold text-gray-800">{walletBalance}</p><p className="text-xs text-gray-400 mt-1">100% 上次记录 {lastRecord}</p></div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"><div className="flex items-center text-gray-500 mb-2"><TrafficIcon /><span className="ml-2 text-sm">总流量 / 剩余流量</span></div><p className="text-2xl font-semibold text-gray-800">{totalTraffic} / <span className="text-green-500">{remainingTraffic}</span></p><div className="w-full bg-gray-200 rounded-full h-1.5 mt-2"><div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${trafficUsagePercentage}%` }}></div></div><p className="text-xs text-gray-400 mt-1">{trafficUsagePercentage}% 已使用 {usedTraffic}</p></div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"><div className="flex items-center text-gray-500 mb-2"><CommissionIcon /><span className="ml-2 text-sm">可用佣金</span></div><p className="text-2xl font-semibold text-gray-800">{availableCommission}</p><p className="text-xs text-gray-400 mt-1">100% 确认中佣金 {pendingCommission}</p></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-semibold text-gray-700">我的订阅</h3><button className="text-sm text-blue-500 hover:text-blue-600 flex items-center"><RefreshIcon /> <span className="ml-1">刷新订阅</span></button></div><div className="border-t pt-4"><p className="font-medium text-gray-800">{subscription.name}</p><p className="text-sm text-green-600">{subscription.status}</p></div></div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"> <h3 className="text-lg font-semibold text-gray-700 mb-3">寻找人工客服</h3><div className="text-xs text-gray-600 space-y-1"><p>遇到任何问题请直接寻找我们的人工客服</p><p>收款的支付宝微信是合作商家是无法联系到我们的</p><p>TeleGram 群组: <a href="https://t.me/Lord_Rings" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://t.me/Lord_Rings</a></p><p>TeleGram 客服: <a href="https://t.me/tianchongplusbot" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://t.me/tianchongplusbot</a></p><p>官网右下角在线客服 09:00-22:00</p><p>官网左侧我的工单48小时内处理... <a href="mailto:themojie@pm.me" className="text-blue-500 hover:underline">邮箱客服</a></p></div></div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">快捷操作:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <button className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors text-center"><ConnectNodeIcon /><span className="mt-2 text-sm font-medium text-gray-700">连接节点</span><span className="text-xs text-gray-500">打开订阅面板或快速订阅</span></button>
          <button className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors text-center"><KnowledgeBaseIcon /><span className="mt-2 text-sm font-medium text-gray-700">知识文库</span><span className="text-xs text-gray-500">学习如何使用客户端和节点</span></button>
          <button className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors text-center"><ResetTrafficIcon /><span className="mt-2 text-sm font-medium text-gray-700">流量重置</span><span className="text-xs text-gray-500">流量用完后重置流量以继续使用</span></button>
        </div>
      </div>
    </div>
  );
};
const DocsPage: React.FC = () => <div className="p-6"><h1 className="text-2xl font-bold text-gray-800">使用文档</h1><p className="mt-2 text-gray-600">这里是使用文档的内容。</p></div>;
const PurchaseSubscriptionPage: React.FC = () => <div className="p-6"><h1 className="text-2xl font-bold text-gray-800">购买订阅</h1><p className="mt-2 text-gray-600">这里是购买订阅的选项和流程。</p></div>;
const NodeStatusPage: React.FC = () => <div className="p-6"><h1 className="text-2xl font-bold text-gray-800">节点状态</h1><p className="mt-2 text-gray-600">这里显示所有节点的状态信息。</p></div>;
const MyOrdersPage: React.FC = () => <div className="p-6"><h1 className="text-2xl font-bold text-gray-800">我的订单</h1><p className="mt-2 text-gray-600">这里列出您的所有订单记录。</p></div>;
const MyInvitationsPage: React.FC = () => <div className="p-6"><h1 className="text-2xl font-bold text-gray-800">我的邀请</h1><p className="mt-2 text-gray-600">这里是您的邀请码和邀请记录。</p></div>;
const PersonalCenterPage: React.FC = () => <div className="p-6"><h1 className="text-2xl font-bold text-gray-800">个人中心</h1><p className="mt-2 text-gray-600">这里可以修改您的个人信息和设置。</p></div>;
const TrafficDetailsPage: React.FC = () => <div className="p-6"><h1 className="text-2xl font-bold text-gray-800">流量明细</h1><p className="mt-2 text-gray-600">这里显示您的详细流量使用情况。</p></div>;
const MyTicketsPage: React.FC = () => <div className="p-6"><h1 className="text-2xl font-bold text-gray-800">我的工单</h1><p className="mt-2 text-gray-600">这里是您提交的工单和处理状态。</p></div>;
// NotFoundPage 可以在 main.tsx 的路由配置中使用


// --- 更新侧边栏导航数据，移除 component 属性，path 用于 Link ---
const sidebarNavigation: NavItem[] = [
  { id: 'home', label: '首页', icon: <HomeIcon />, path: 'home' }, // path 相对于父路由
  { id: 'docs', label: '使用文档', icon: <DocsIcon />, path: 'docs' },
  {
    id: 'storeCategory', label: '商店', isCategoryLabel: true, path: '', // 分类标签通常没有自己的路径
    icon: <StoreCategoryIcon />,
    subItems: [
      { id: 'purchaseSubscription', label: '购买订阅', icon: <PurchaseSubscriptionIcon />, path: 'store/purchase' },
      { id: 'nodeStatus', label: '节点状态', icon: <NodeStatusIcon />, path: 'store/status' },
    ],
  },
  {
    id: 'financeCategory', label: '财务', isCategoryLabel: true, path: '',
    icon: <FinanceCategoryIcon />,
    subItems: [
      { id: 'myOrders', label: '我的订单', icon: <MyOrdersIcon />, path: 'finance/orders' },
      { id: 'myInvitations', label: '我的邀请', icon: <MyInvitationsIcon />, path: 'finance/invitations' },
    ],
  },
  {
    id: 'userCategory', label: '用户', isCategoryLabel: true, path: '',
    icon: <UserCategoryIcon />,
    subItems: [
      { id: 'personalCenter', label: '个人中心', icon: <PersonalCenterIcon />, path: 'user/profile' },
      { id: 'trafficDetails', label: '流量明细', icon: <TrafficDetailsIcon />, path: 'user/traffic' },
      { id: 'myTickets', label: '我的工单', icon: <MyTicketsIcon />, path: 'user/tickets' },
    ],
  },
];

// --- 主仪表盘布局组件 ---
interface UserDashboardLayoutProps {
  onLogout?: () => void;
}

const UserDashboardLayout: React.FC<UserDashboardLayoutProps> = ({ onLogout }) => {
  const location = useLocation(); // 获取当前路由位置
  const navigate = useNavigate(); // 获取导航函数
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // 根据当前路径确定激活的导航项ID
  const getActivePageIdFromPath = (pathname: string) => {
    // 假设 UserDashboardLayout 挂载在 /dashboard 路径下
    // 那么 pathname 会是 /dashboard/home, /dashboard/docs 等
    const relativePath = pathname.startsWith('/dashboard/') ? pathname.substring('/dashboard/'.length) : pathname;
    
    for (const item of sidebarNavigation) {
      if (item.path === relativePath && !item.isCategoryLabel) return item.id;
      if (item.subItems) {
        for (const subItem of item.subItems) {
          if (subItem.path === relativePath) return subItem.id;
        }
      }
    }
    return 'home'; // 默认返回 home
  };
  const activePageId = getActivePageIdFromPath(location.pathname);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => { document.removeEventListener('mousedown', handleClickOutside); };
  }, []);

  const handleSidebarLinkClick = () => {
    if (window.innerWidth < 768) { // 如果是小屏幕，点击链接后关闭侧边栏
       setIsSidebarOpen(false);
    }
  };

  const renderNavMenuItems = (items: NavItem[]) => {
    return items.map(item => (
      <React.Fragment key={item.id}>
        {item.isCategoryLabel ? (
          <div className="px-4 pt-4 pb-1"><span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{item.label}</span></div>
        ) : (
          // 2. 使用 Link 组件进行导航
          <Link
            to={item.path} // 使用 item.path 作为链接目标
            onClick={handleSidebarLinkClick}
            className={`flex items-center py-2.5 px-4 cursor-pointer transition-colors rounded-md mx-2 
              ${activePageId === item.id 
                ? 'bg-blue-500 text-white font-medium shadow-sm' 
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-800'
              }
            `}
          >
            <span className="mr-3 w-5 flex items-center justify-center">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        )}
        {item.isCategoryLabel && item.subItems && (
          <div className="mt-1 mb-2">
            {item.subItems.map(subItem => (
              // 2. 子项也使用 Link 组件
              <Link
                key={subItem.id}
                to={subItem.path} // 使用 subItem.path
                onClick={handleSidebarLinkClick}
                className={`flex items-center py-2 pl-10 pr-4 cursor-pointer transition-colors rounded-md mx-2 text-sm 
                  ${activePageId === subItem.id 
                    ? 'bg-blue-100 text-blue-600 font-medium' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }
                `}
              >
                <span className="mr-3 w-5 flex items-center justify-center">{subItem.icon}</span>
                <span>{subItem.label}</span>
              </Link>
            ))}
          </div>
        )}
      </React.Fragment>
    ));
  };
  
  const getCurrentPageLabel = () => {
    for (const item of sidebarNavigation) {
      if (item.id === activePageId && !item.isCategoryLabel) return item.label;
      if (item.subItems) {
        for (const subItem of item.subItems) {
          if (subItem.id === activePageId) return subItem.label;
        }
      }
    }
    return sidebarNavigation.find(item => item.id === 'home')?.label || '仪表盘';
  };
  const currentPageLabel = getCurrentPageLabel();

  const handleLogoutClick = () => {
    setIsUserMenuOpen(false);
    if (onLogout) onLogout();
    else {
      console.warn("onLogout prop not provided to UserDashboardLayout");
      // 默认客户端退出逻辑 (示例)
      localStorage.removeItem('userToken'); // 清除 token
      navigate('/login'); // 跳转到登录页
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <aside className={` ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-30 w-60 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:shadow-none md:border-r md:border-gray-200 flex flex-col`}>
        <div className="flex items-center justify-center h-16 border-b border-gray-200 px-4">
          <Link to="home" className="text-xl font-bold text-blue-600 whitespace-nowrap overflow-hidden overflow-ellipsis">应用平台名称</Link>
        </div>
        <nav className="pt-2 pb-4 flex-grow overflow-y-auto">{renderNavMenuItems(sidebarNavigation)}</nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 mr-4" aria-label="Toggle sidebar"><MenuIcon /></button>
                <h1 className="text-xl font-semibold text-gray-800">{currentPageLabel}</h1>
              </div>
              <div className="flex items-center space-x-3">
                <button className="hidden sm:flex items-center text-sm text-blue-600 hover:text-blue-700 border border-blue-500 hover:border-blue-600 rounded-md px-3 py-1.5 transition-colors"><DownloadIcon /> <span className="ml-1.5">下载客户端</span></button>
                <button className="hidden sm:flex items-center text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-md px-3 py-1.5 transition-colors"><RenewIcon /> <span className="ml-1.5">续费订阅</span></button>
                <div className="relative" ref={userMenuRef}>
                  <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center justify-center h-9 w-9 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 focus:outline-none ring-2 ring-transparent focus:ring-blue-500 transition-all" aria-label="用户菜单"><UserProfileIcon /></button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-20 py-1">
                      <button onClick={handleLogoutClick} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center"><LogoutIcon /> <span className="ml-2">登出</span></button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* 3. 使用 Outlet 渲染子路由对应的组件 */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-0"> {/* 移除内边距，让子页面组件自己控制 */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserDashboardLayout;

// --- 如何在您的应用中使用 (main.tsx 示例) ---
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import AuthLayoutWithMyDesign from './components/AuthLayoutWithMyDesign';
// import UserDashboardLayout from './components/UserDashboardLayout';

// // 导入所有页面组件
// import { HomePageContent, DocsPage, PurchaseSubscriptionPage, NodeStatusPage, MyOrdersPage, MyInvitationsPage, PersonalCenterPage, TrafficDetailsPage, MyTicketsPage } from './components/UserDashboardLayout'; // 或者从各自文件导入
// const NotFoundPage = () => <div className="p-6"><h1 className="text-2xl font-bold text-red-500">404 - 页面未找到</h1><p>抱歉，您访问的页面不存在。</p></div>;


// const AppRouter: React.FC = () => {
//   const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(!!localStorage.getItem('userToken'));
//   const navigate = useNavigate(); // 在 BrowserRouter 内部使用

//   const handleLoginSuccess = (token: string) => {
//     localStorage.setItem('userToken', token);
//     setIsAuthenticated(true);
//     navigate('/dashboard/home'); // 登录后跳转到仪表盘首页
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('userToken');
//     setIsAuthenticated(false);
//     navigate('/login'); // 退出后跳转到登录页
//   };

//   return (
//     <Routes>
//       <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard/home" replace /> : <AuthLayoutWithMyDesign onUserAuthenticated={handleLoginSuccess} />} />
//       <Route path="/dashboard" element={isAuthenticated ? <UserDashboardLayout onLogout={handleLogout} /> : <Navigate to="/login" replace />}>
//         {/* 定义 UserDashboardLayout 的子路由 */}
//         <Route index element={<Navigate to="home" replace />} /> {/* /dashboard 默认重定向到 /dashboard/home */}
//         <Route path="home" element={<HomePageContent />} />
//         <Route path="docs" element={<DocsPage />} />
//         <Route path="store/purchase" element={<PurchaseSubscriptionPage />} />
//         <Route path="store/status" element={<NodeStatusPage />} />
//         <Route path="finance/orders" element={<MyOrdersPage />} />
//         <Route path="finance/invitations" element={<MyInvitationsPage />} />
//         <Route path="user/profile" element={<PersonalCenterPage />} />
//         <Route path="user/traffic" element={<TrafficDetailsPage />} />
//         <Route path="user/tickets" element={<MyTicketsPage />} />
//         <Route path="*" element={<NotFoundPage />} /> {/* 仪表盘内部的404 */}
//       </Route>
//       <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard/home" : "/login"} replace />} />
//       <Route path="*" element={<NotFoundPage />} /> {/* 应用全局的404 */}
//     </Routes>
//   );
// };

// const MainApp = () => (
//   <BrowserRouter>
//     <AppRouter />
//   </BrowserRouter>
// );

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <MainApp />
//   </React.StrictMode>,
// );
