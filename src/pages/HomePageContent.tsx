// src/pages/HomePageContent.tsx
import React from 'react';

// 您可以在这里定义或从其他地方导入这些图标组件
// 为了示例完整性，我将它们直接定义在这里
const WalletIcon = () => <span>💼</span>;
const TrafficIcon = () => <span>📊</span>;
const CommissionIcon = () => <span>🪙</span>;
const RefreshIcon = () => <span>🔃</span>;
const ConnectNodeIcon = () => <span>🔗</span>;
const KnowledgeBaseIcon = () => <span>📚</span>;
const ResetTrafficIcon = () => <span>♻️</span>;

const HomePageContent: React.FC = () => {
  // 模拟数据 (与您提供的一致)
  const walletBalance = "0 CNY";
  const lastRecord = "0 CNY";
  const totalTraffic = "130 GB";
  const remainingTraffic = "26.33 GB";
  const usedTraffic = "103.67 GB";
  const trafficUsagePercentage = 80;
  const availableCommission = "0 CNY";
  const pendingCommission = "0 CNY";

  const subscription = {
    name: "130G 流量 - 不限时间",
    status: "该订阅长期有效!",
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-gray-100"> {/* 确保内容区背景与 UserDashboardLayout 匹配或独立设置 */}
      {/* 顶部概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 钱包余额 */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="flex items-center text-gray-500 mb-2">
            <WalletIcon />
            <span className="ml-2 text-sm">钱包余额</span>
          </div>
          <p className="text-2xl font-semibold text-gray-800">{walletBalance}</p>
          <p className="text-xs text-gray-400 mt-1">100% 上次记录 {lastRecord}</p>
        </div>
        {/* 流量 */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="flex items-center text-gray-500 mb-2">
            <TrafficIcon />
            <span className="ml-2 text-sm">总流量 / 剩余流量</span>
          </div>
          <p className="text-2xl font-semibold text-gray-800">{totalTraffic} / <span className="text-green-500">{remainingTraffic}</span></p>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${trafficUsagePercentage}%` }}></div>
          </div>
          <p className="text-xs text-gray-400 mt-1">{trafficUsagePercentage}% 已使用 {usedTraffic}</p>
        </div>
        {/* 可用佣金 */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="flex items-center text-gray-500 mb-2">
            <CommissionIcon />
            <span className="ml-2 text-sm">可用佣金</span>
          </div>
          <p className="text-2xl font-semibold text-gray-800">{availableCommission}</p>
          <p className="text-xs text-gray-400 mt-1">100% 确认中佣金 {pendingCommission}</p>
        </div>
      </div>

      {/* 我的订阅 和 寻找人工客服 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">我的订阅</h3>
            <button className="text-sm text-blue-500 hover:text-blue-600 flex items-center">
              <RefreshIcon /> <span className="ml-1">刷新订阅</span>
            </button>
          </div>
          <div className="border-t pt-4">
            <p className="font-medium text-gray-800">{subscription.name}</p>
            <p className="text-sm text-green-600">{subscription.status}</p>
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

export default HomePageContent;
