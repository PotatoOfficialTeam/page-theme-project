// src/pages/dashboard/Home.tsx
import React from 'react';
import { useUserInfo } from '@/hooks/useUserInfo';
import { useSubscription } from '@/hooks/useSubscription';
import NoticeBoardModal from './home/NoticeBoardModal';

// 图标组件 (只保留用到的)
const WalletIcon = () => <span>💼</span>;
const TrafficIcon = () => <span>📊</span>;
const CommissionIcon = () => <span>🪙</span>;
const RefreshIcon = () => <span>🔃</span>;

const Home: React.FC = () => {
  const { userInfo, loading: userLoading, error: userError, refreshUserInfo } = useUserInfo();
  const { 
    subscription, 
    loading: subLoading, 
    error: subError,
    // usedTraffic, // 暂时不直接显示，除非需要
    remainingTraffic,
    totalTraffic,
    usedTrafficPercentage,
    refreshSubscription,
    daysUntilExpiration
  } = useSubscription();
  
  if (userLoading || subLoading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">加载中，请稍候...</p>
      </div>
    );
  }
  
  if (userError || subError) {
    return (
      <div className="p-6 text-center">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">{userError || subError}</p>
        </div>
        <button 
          onClick={() => { refreshUserInfo(); refreshSubscription(); }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          重试
        </button>
      </div>
    );
  }
  
  const formatBalance = (balance: number | undefined) => {
    if (typeof balance !== 'number') return '0.00 CNY';
    return (balance / 100).toFixed(2) + ' CNY';
  };

  const getSubscriptionStatus = () => {
    if (!subscription) return "未找到订阅信息";
    if (daysUntilExpiration !== undefined) {
        if (daysUntilExpiration <= 0) return "订阅已过期!";
        return `订阅有效期还剩 ${daysUntilExpiration} 天`;
    }
    return "订阅状态加载中...";
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-gray-100 min-h-screen">
      {/* 公告弹窗组件，它会自己管理显示逻辑 */}
      <NoticeBoardModal initiallyOpenOnNewNotice={true} />

      {/* 顶部概览卡片 (API驱动) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 钱包余额 */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="flex items-center text-gray-500 mb-2">
            <WalletIcon />
            <span className="ml-2 text-sm">钱包余额</span>
          </div>
          <p className="text-2xl font-semibold text-gray-800">
            {userInfo ? formatBalance(userInfo.balance) : '加载中...'}
          </p>
          {userInfo && <p className="text-xs text-gray-400 mt-1">账户余额可用于购买和续费订阅</p>}
        </div>
        
        {/* 流量 */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="flex items-center text-gray-500 mb-2">
            <TrafficIcon />
            <span className="ml-2 text-sm">总流量 / 剩余</span> {/* 简化标题 */}
          </div>
          <p className="text-2xl font-semibold text-gray-800">
            {totalTraffic ?? 'N/A'} / <span className="text-green-500">{remainingTraffic ?? 'N/A'}</span>
          </p>
          {(totalTraffic !== null && totalTraffic !== undefined && typeof usedTrafficPercentage === 'number') && (
            <>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${usedTrafficPercentage}%` }}></div>
              </div>
              <p className="text-xs text-gray-400 mt-1">{usedTrafficPercentage.toFixed(1)}% 已使用</p>
            </>
          )}
        </div>
        
        {/* 可用佣金 */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="flex items-center text-gray-500 mb-2">
            <CommissionIcon />
            <span className="ml-2 text-sm">可用佣金</span>
          </div>
          <p className="text-2xl font-semibold text-gray-800">
            {userInfo ? formatBalance(userInfo.commission_balance) : '加载中...'}
          </p>
          {userInfo && <p className="text-xs text-gray-400 mt-1">邀请新用户可获得佣金奖励</p>}
        </div>
      </div>
      
      {/* 我的订阅 (API驱动) */}
      <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-700">我的订阅</h3>
          <button 
            onClick={refreshSubscription}
            className="text-sm text-blue-500 hover:text-blue-600 flex items-center"
            disabled={subLoading}
          >
            <RefreshIcon /> <span className="ml-1">刷新订阅</span>
          </button>
        </div>
        <div className="border-t pt-4">
          {subscription ? (
            <>
              <p className="font-medium text-gray-800">{subscription.plan?.name || '套餐信息加载中...'}</p>
              <p className={`text-sm ${daysUntilExpiration !== undefined && daysUntilExpiration <= 0 ? 'text-red-600' : 'text-green-600'}`}>
                {getSubscriptionStatus()}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {subscription.reset_day ? `重置日期: 每月 ${subscription.reset_day} 日 | ` : ''}
                {subscription.plan?.month_price !== undefined ? `价格: ${formatBalance(subscription.plan.month_price)}/月` : ''}
              </p>
              {subscription.subscribe_url && (
                <div className="mt-3">
                  <a 
                    href={subscription.subscribe_url} 
                    className="text-sm text-blue-500 hover:underline"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    查看/管理订阅链接
                  </a>
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-600">暂无有效订阅信息或正在加载...</p>
          )}
        </div>
      </div>

      {/* 移除了以下静态内容块:
        - 原先的嵌入式 NoticeBoard
        - "寻找人工客服"
        - "快捷操作"
      */}
    </div>
  );
};

export default Home;