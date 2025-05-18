// src/pages/dashboard/Home.tsx
import React from 'react';
import { useUserInfo } from '@/hooks/useUserInfo';
import { useSubscription } from '@/hooks/useSubscription';
import NoticeBoardModal from './home/NoticeBoardModal';
import SubscriptionTrafficCard from './home/SubscriptionTrafficCard';


const Home: React.FC = () => {
  const {loading: userLoading, error: userError, refreshUserInfo } = useUserInfo();
  const {
    subscription,
    loading: subLoading,
    error: subError,
    remainingTraffic,
    totalTraffic,
    usedTrafficPercentage,
    refreshSubscription,
    daysUntilExpiration
  } = useSubscription();

  if (userLoading) {
    return (
      <div className="p-6 text-center"> {/* 全局加载/错误提示可以保持自己的内边距 */}
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">加载中，请稍候...</p>
      </div>
    );
  }

  if (userError) {
    return (
      <div className="p-6 text-center"> {/* 全局加载/错误提示可以保持自己的内边距 */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">无法加载用户信息: {userError}</p>
        </div>
        <button
          onClick={() => { refreshUserInfo(); if (subError) refreshSubscription(); }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          重试
        </button>
      </div>
    );
  }

  return (
    // 移除了此处的 p-4 sm:p-6 内边距类，让内容宽度由 UserDashboardLayout 的 <main> 区域控制。
    // space-y-6 负责子元素（卡片）之间的垂直间距。
    // bg-gray-100 和 min-h-screen 可以保留，以确保背景和最小高度，
    // 或者如果 UserDashboardLayout 的 <main> 已完全覆盖这些，则可以酌情移除。
    // 为保持与 <main>一致性，bg-gray-100 通常是好的。min-h-screen 确保内容少时页面也撑开。
    <div className="space-y-6 bg-gray-100 min-h-screen">
      <NoticeBoardModal initiallyOpenOnNewNotice={true} />


      {/* 我的订阅与流量使用情况整合卡片组件 */}
      <SubscriptionTrafficCard
        subscription={subscription}
        daysUntilExpiration={daysUntilExpiration}
        totalTraffic={totalTraffic}
        remainingTraffic={remainingTraffic}
        usedTrafficPercentage={usedTrafficPercentage}
        isLoading={subLoading}
        error={subError}
        onRefresh={refreshSubscription}
      />
    </div>
  );
};

export default Home;