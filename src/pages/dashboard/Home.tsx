// src/pages/dashboard/Home.tsx
import React from 'react';
import { useUserInfo } from '@/hooks/useUserInfo';
import { useSubscription } from '@/hooks/useSubscription';

// 图标组件
const WalletIcon = () => <span>💼</span>;
const TrafficIcon = () => <span>📊</span>;
const CommissionIcon = () => <span>🪙</span>;
const RefreshIcon = () => <span>🔃</span>;
const ConnectNodeIcon = () => <span>🔗</span>;
const KnowledgeBaseIcon = () => <span>📚</span>;
const ResetTrafficIcon = () => <span>♻️</span>;

const Home: React.FC = () => {
  // 使用Hook获取用户信息和订阅信息
  const { userInfo, loading: userLoading, error: userError, refreshUserInfo } = useUserInfo();
  const { 
    subscription, 
    loading: subLoading, 
    error: subError, 
    usedTraffic,
    remainingTraffic,
    totalTraffic,
    usedTrafficPercentage,
    refreshSubscription,
    daysUntilExpiration
  } = useSubscription();
  
  // 加载状态
  if (userLoading || subLoading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">加载中，请稍候...</p>
      </div>
    );
  }
  
  // 错误状态
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
  
  // 格式化余额显示（转换为元）
  const formatBalance = (balance: number) => {
    return (balance / 100).toFixed(2) + ' CNY';
  };

  // 获取订阅状态显示文本
  const getSubscriptionStatus = () => {
    if (!subscription) return "未找到订阅信息";
    if (daysUntilExpiration <= 0) return "订阅已过期!";
    return `订阅有效期还剩 ${daysUntilExpiration} 天`;
  };

  // 主内容渲染
  return (
    <div className="p-4 sm:p-6 space-y-6 bg-gray-100">
      {/* 顶部概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 钱包余额 */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="flex items-center text-gray-500 mb-2">
            <WalletIcon />
            <span className="ml-2 text-sm">钱包余额</span>
          </div>
          <p className="text-2xl font-semibold text-gray-800">
            {userInfo ? formatBalance(userInfo.balance) : '0 CNY'}
          </p>
          <p className="text-xs text-gray-400 mt-1">账户余额可用于购买和续费订阅</p>
        </div>
        
        {/* 流量 */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="flex items-center text-gray-500 mb-2">
            <TrafficIcon />
            <span className="ml-2 text-sm">总流量 / 剩余流量</span>
          </div>
          <p className="text-2xl font-semibold text-gray-800">
            {totalTraffic} / <span className="text-green-500">{remainingTraffic}</span>
          </p>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${usedTrafficPercentage}%` }}></div>
          </div>
          <p className="text-xs text-gray-400 mt-1">{usedTrafficPercentage}% 已使用 {usedTraffic}</p>
        </div>
        
        {/* 可用佣金 */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="flex items-center text-gray-500 mb-2">
            <CommissionIcon />
            <span className="ml-2 text-sm">可用佣金</span>
          </div>
          <p className="text-2xl font-semibold text-gray-800">
            {userInfo ? formatBalance(userInfo.commission_balance) : '0 CNY'}
          </p>
          <p className="text-xs text-gray-400 mt-1">邀请新用户可获得佣金奖励</p>
        </div>
      </div>

      {/* 我的订阅 和 寻找人工客服 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">我的订阅</h3>
            <button 
              onClick={refreshSubscription}
              className="text-sm text-blue-500 hover:text-blue-600 flex items-center"
            >
              <RefreshIcon /> <span className="ml-1">刷新订阅</span>
            </button>
          </div>
          <div className="border-t pt-4">
            {subscription ? (
              <>
                <p className="font-medium text-gray-800">{subscription.plan.name}</p>
                <p className="text-sm text-green-600">{getSubscriptionStatus()}</p>
                <p className="text-xs text-gray-500 mt-2">
                  重置日期: 每月 {subscription.reset_day} 日 | 
                  订阅价格: {(subscription.plan.month_price / 100).toFixed(2)} 元/月
                </p>
                {subscription.subscribe_url && (
                  <div className="mt-3">
                    <a 
                      href={subscription.subscribe_url} 
                      className="text-sm text-blue-500 hover:underline"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      查看订阅链接
                    </a>
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-600">暂无订阅信息</p>
            )}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">寻找人工客服</h3>
          <div className="text-xs text-gray-600 space-y-1">
            <p>遇到任何问题请直接寻找我们的人工客服</p>
            <p>收款的支付宝微信是合作商家是无法联系到我们的</p>
            <p>TeleGram 群组: <a href="https://t.me/Lord_Rings" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://t.me/Lord_Rings</a></p>
            <p>TeleGram 客服: <a href="https://t.me/tianchongplusbot" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://t.me/tianchongplusbot</a></p>
            <p>官网右下角在线客服 09:00-22:00</p>
            <p>官网左侧我的工单48小时内处理... <a href="mailto:themojie@pm.me" className="text-blue-500 hover:underline">邮箱客服</a></p>
          </div>
        </div>
      </div>

      {/* 快捷操作 */}
      <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">快捷操作:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <button className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors text-center">
            <ConnectNodeIcon />
            <span className="mt-2 text-sm font-medium text-gray-700">连接节点</span>
            <span className="text-xs text-gray-500">打开订阅面板或快速订阅</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors text-center">
            <KnowledgeBaseIcon />
            <span className="mt-2 text-sm font-medium text-gray-700">知识文库</span>
            <span className="text-xs text-gray-500">学习如何使用客户端和节点</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors text-center">
            <ResetTrafficIcon />
            <span className="mt-2 text-sm font-medium text-gray-700">流量重置</span>
            <span className="text-xs text-gray-500">流量用完后重置流量以继续使用</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;