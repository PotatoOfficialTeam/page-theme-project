// src/layouts/UserDashboardLayout.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../config/routes'; // 假设此文件在您的项目中已正确定义

// --- 图标占位符 ---
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
const LogoutIcon = () => <span>🚪</span>;

// --- 导航项类型定义 ---
interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  path?: string;
  isCategoryLabel?: boolean;
  subItems?: NavItem[];
}

// --- 侧边栏导航数据 ---
const sidebarNavigation: NavItem[] = [
  { id: 'home', label: '首页', icon: <HomeIcon />, path: `${ROUTES.DASHBOARD.HOME}` },
  { id: 'docs', label: '使用文档', icon: <DocsIcon />, path: `${ROUTES.DASHBOARD.DOCS}` },
  {
    id: 'storeCategory', label: '商店', isCategoryLabel: true, icon: <StoreCategoryIcon />,
    subItems: [
      { id: 'purchaseSubscription', label: '购买订阅', icon: <PurchaseSubscriptionIcon />, path: `${ROUTES.DASHBOARD.STORE.PURCHASE}` },
      { id: 'nodeStatus', label: '节点状态', icon: <NodeStatusIcon />, path: `${ROUTES.DASHBOARD.STORE.NODE_STATUS}` },
    ],
  },
  {
    id: 'financeCategory', label: '财务', isCategoryLabel: true, icon: <FinanceCategoryIcon />,
    subItems: [
      { id: 'myOrders', label: '我的订单', icon: <MyOrdersIcon />, path: `${ROUTES.DASHBOARD.FINANCE.ORDERS}` },
      { id: 'myInvitations', label: '我的邀请', icon: <MyInvitationsIcon />, path: `${ROUTES.DASHBOARD.FINANCE.INVITATIONS}` },
    ],
  },
  {
    id: 'userCategory', label: '用户', isCategoryLabel: true, icon: <UserCategoryIcon />,
    subItems: [
      { id: 'personalCenter', label: '个人中心', icon: <PersonalCenterIcon />, path: `${ROUTES.DASHBOARD.USER.PROFILE}` },
      { id: 'trafficDetails', label: '流量明细', icon: <TrafficDetailsIcon />, path: `${ROUTES.DASHBOARD.USER.TRAFFIC}` },
      { id: 'myTickets', label: '我的工单', icon: <MyTicketsIcon />, path: `${ROUTES.DASHBOARD.USER.TICKETS}` },
    ],
  },
];

// --- 主仪表盘布局组件 ---
interface UserDashboardLayoutProps {
  onLogout?: () => void;
}

const UserDashboardLayout: React.FC<UserDashboardLayoutProps> = ({ onLogout }) => {
  const [activePageId, setActivePageId] = useState<string>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let foundActiveId = '';
    const findActiveId = (items: NavItem[]): boolean => {
      for (const item of items) {
        if (item.path && path === item.path) {
          foundActiveId = item.id;
          return true;
        }
        if (item.subItems && findActiveId(item.subItems)) {
          return true;
        }
      }
      return false;
    };
    findActiveId(sidebarNavigation);
    if (foundActiveId) {
      setActivePageId(foundActiveId);
    } else if (ROUTES.DASHBOARD.ROOT && path.startsWith(ROUTES.DASHBOARD.ROOT)) {
      setActivePageId('home');
    }
  }, [location.pathname, ROUTES]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => { document.removeEventListener('mousedown', handleClickOutside); };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      // Resize logic can be added here if needed for more complex sidebar interactions
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const handleNavClick = (item: NavItem) => {
    if (!item.isCategoryLabel && item.path) {
      setActivePageId(item.id);
      navigate(item.path);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    }
  };

  const renderNavMenuItems = (items: NavItem[]) => {
    return items.map(item => (
      <React.Fragment key={item.id}>
        {item.isCategoryLabel ? (
          <div className="px-4 pt-4 pb-1"><span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{item.label}</span></div>
        ) : (
          <div onClick={() => handleNavClick(item)} className={`flex items-center py-2.5 px-4 cursor-pointer transition-colors rounded-md mx-2 ${activePageId === item.id ? 'bg-blue-500 text-white font-medium shadow-sm' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-800'}`}>
            <span className="mr-3 w-5 flex items-center justify-center">{item.icon}</span><span>{item.label}</span>
          </div>
        )}
        {item.isCategoryLabel && item.subItems && (
          <div className="mt-1 mb-2">
            {item.subItems.map(subItem => (
              <div key={subItem.id} onClick={() => handleNavClick(subItem)} className={`flex items-center py-2 pl-10 pr-4 cursor-pointer transition-colors rounded-md mx-2 text-sm ${activePageId === subItem.id ? 'bg-blue-100 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'}`}>
                <span className="mr-3 w-5 flex items-center justify-center">{subItem.icon}</span><span>{subItem.label}</span>
              </div>
            ))}
          </div>
        )}
      </React.Fragment>
    ));
  };

  const findCurrentPageLabel = (): string => {
    const findLabel = (items: NavItem[]): string | null => {
      for (const item of items) {
        if (item.id === activePageId) return item.label;
        if (item.subItems) {
          const found = findLabel(item.subItems);
          if (found) return found;
        }
      }
      return null;
    };
    return findLabel(sidebarNavigation) || '仪表盘';
  };

  const handleLogoutClick = () => {
    setIsUserMenuOpen(false);
    if (onLogout) onLogout();
    else console.warn("onLogout prop not provided to UserDashboardLayout");
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out md:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-30 w-60 bg-white shadow-lg
          transform transition-transform duration-300 ease-in-out
          flex flex-col
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0 md:shadow-none md:border-r md:border-gray-200
        `}
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-200 px-4">
          <span className="text-xl font-bold text-blue-600 whitespace-nowrap overflow-hidden overflow-ellipsis">
            应用平台名称
          </span>
        </div>
        <nav className="pt-2 pb-4 flex-grow overflow-y-auto">
          {renderNavMenuItems(sidebarNavigation)}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8"> {/* Header内通常有container来约束宽度 */}
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 mr-4"
                  aria-label="Toggle sidebar"
                  aria-expanded={isSidebarOpen}
                >
                  <MenuIcon />
                </button>
                <h1 className="text-xl font-semibold text-gray-800">{findCurrentPageLabel()}</h1>
              </div>
              <div className="flex items-center space-x-3">
                <button className="hidden sm:flex items-center text-sm text-blue-600 hover:text-blue-700 border border-blue-500 hover:border-blue-600 rounded-md px-3 py-1.5 transition-colors">
                  <DownloadIcon /> <span className="ml-1.5">下载客户端</span>
                </button>
                <button className="hidden sm:flex items-center text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-md px-3 py-1.5 transition-colors">
                  <RenewIcon /> <span className="ml-1.5">续费订阅</span>
                </button>
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center justify-center h-9 w-9 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 focus:outline-none ring-2 ring-transparent focus:ring-blue-500 transition-all"
                    aria-label="用户菜单"
                    aria-haspopup="true"
                    aria-expanded={isUserMenuOpen}
                  >
                    <UserProfileIcon />
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-20 py-1" role="menu">
                      <button
                        onClick={handleLogoutClick}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center"
                        role="menuitem"
                      >
                        <LogoutIcon /> <span className="ml-2">登出</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* 子路由渲染区域：移除了 p-4 sm:p-6 内边距 */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserDashboardLayout;