// src/components/dashboard/SubscriptionTrafficCard.tsx
import React from 'react';
// 假设您的 Subscription 类型定义路径如下，请根据您的项目结构调整
// 例如: import { SubscriptionData } from '@/types/subscription';
// 或者直接从 API 定义导入: import { Subscription } from '@/api/user/subscription';
// 为简化，这里用一个基本的接口类型
interface Plan {
  name?: string;
  month_price?: number;
}
interface Subscription {
  plan?: Plan;
  reset_day?: number;
  subscribe_url?: string;
  // ... 其他订阅相关字段
}

// 图标组件 (如果这些是您项目中的标准图标，可以从共享位置导入)
const TrafficIcon = () => <span>📊</span>;
const RefreshIcon = () => <span>🔃</span>;

// 格式化余额的辅助函数 (理想情况下，这应该是一个共享的工具函数)
const formatBalanceUtil = (balance: number | undefined): string => {
  if (typeof balance !== 'number') return '0.00 CNY';
  return (balance / 100).toFixed(2) + ' CNY';
};

interface SubscriptionTrafficCardProps {
  subscription: Subscription | null | undefined;
  daysUntilExpiration: number | undefined;
  totalTraffic: string | number | null | undefined;
  remainingTraffic: string | number | null | undefined;
  usedTrafficPercentage: number | null | undefined;
  isLoading: boolean; // 此卡片特定数据的加载状态
  error: string | null | undefined; // 此卡片特定数据的错误状态
  onRefresh: () => void; // 刷新数据的回调函数
}

const SubscriptionTrafficCard: React.FC<SubscriptionTrafficCardProps> = ({
  subscription,
  daysUntilExpiration,
  totalTraffic,
  remainingTraffic,
  usedTrafficPercentage,
  isLoading,
  error,
  onRefresh,
}) => {
  const getSubscriptionStatus = (): string => {
    // isLoading 和 error 状态应优先处理
    if (isLoading && !subscription) return "订阅状态加载中..."; // 在数据首次加载时显示
    if (!subscription && !isLoading && !error) return "未找到订阅信息"; // 加载完成但无数据且无错误

    // 如果有 subscription 对象，则进行判断
    if (subscription && daysUntilExpiration !== undefined) {
      if (daysUntilExpiration <= 0) return "订阅已过期!";
      return `订阅有效期还剩 ${daysUntilExpiration} 天`;
    }
    // 如果 subscription 存在但 daysUntilExpiration 未定义（理论上不应发生，除非数据不完整）
    if (subscription && daysUntilExpiration === undefined && !isLoading) return "订阅状态信息不完整";

    return "订阅状态加载中..."; // 作为通用后备
  };

  const renderSubscriptionDetails = () => {
    if (isLoading && !subscription && !error) {
      return <p className="text-gray-500 text-sm">加载订阅信息...</p>;
    }
    if (error && !isLoading) {
      return <p className="text-red-500 text-sm">无法加载订阅信息: {error}</p>;
    }
    if (!subscription && !isLoading && !error) {
      return <p className="text-gray-600">暂无有效订阅信息。</p>;
    }
    if (subscription) {
      return (
        <>
          <p className="font-medium text-gray-800">{subscription.plan?.name || '套餐信息加载中...'}</p>
          <p className={`text-sm ${daysUntilExpiration !== undefined && daysUntilExpiration <= 0 ? 'text-red-600' : 'text-green-600'}`}>
            {getSubscriptionStatus()}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {subscription.reset_day ? `重置日期: 每月 ${subscription.reset_day} 日 | ` : ''}
            {subscription.plan?.month_price !== undefined ? `价格: ${formatBalanceUtil(subscription.plan.month_price)}/月` : ''}
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
      );
    }
    return null; // Should not reach here if logic is correct
  };

  const renderTrafficDetails = () => {
    if (isLoading && (totalTraffic === undefined || remainingTraffic === undefined) && !error) {
         return <p className="text-gray-500 text-sm">加载流量信息...</p>;
    }
    if (error && !isLoading) {
         return <p className="text-red-500 text-sm">无法加载流量信息: {error}</p>;
    }
    // 仅当非加载中、无错误，且至少有一个流量数据有效时才尝试显示流量数据
    if (!isLoading && !error && (totalTraffic !== undefined || remainingTraffic !== undefined || usedTrafficPercentage !== undefined) ) {
        // 如果所有流量数据都是null/undefined，显示暂无数据
        if (totalTraffic == null && remainingTraffic == null && usedTrafficPercentage == null) {
            return <p className="text-gray-600">暂无流量数据。</p>;
        }
        return (
            <>
            <p className="text-2xl font-semibold text-gray-800">
                {totalTraffic ?? 'N/A'} / <span className="text-green-500">{remainingTraffic ?? 'N/A'}</span>
                <span className="text-sm text-gray-500 ml-2"> (总流量 / 剩余流量)</span>
            </p>
            {(totalTraffic !== null && totalTraffic !== undefined && typeof usedTrafficPercentage === 'number') && (
                <>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2 mb-1">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${usedTrafficPercentage}%` }}></div>
                </div>
                <p className="text-xs text-gray-500">{usedTrafficPercentage.toFixed(1)}% 已使用</p>
                </>
            )}
            </>
        );
    }
    // 如果不是正在加载，没有错误，但是也没有任何有效的流量数据（例如，所有相关字段都是 undefined）
    if (!isLoading && !error) {
        return <p className="text-gray-600">暂无流量数据。</p>;
    }
    return null;
  }


  return (
    <div className="bg-white p-6 shadow hover:shadow-lg transition-shadow">
      {/* --- 我的订阅部分 --- */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700">我的订阅</h3>
        <button
          onClick={onRefresh}
          className="text-sm text-blue-500 hover:text-blue-600 flex items-center"
          disabled={isLoading}
        >
          <RefreshIcon /> <span className="ml-1">刷新数据</span>
        </button>
      </div>
      <div className="border-t border-gray-200 pt-4 min-h-[100px]"> {/* min-h to prevent collapse during loading */}
        {renderSubscriptionDetails()}
      </div>

      {/* --- 分隔线 --- */}
      <div className="border-t border-gray-200 mt-6 mb-4"></div>

      {/* --- 流量使用情况部分 --- */}
      <div>
        <div className="flex items-center text-gray-500 mb-2">
          <TrafficIcon />
          <span className="ml-2 text-sm font-medium text-gray-700">流量使用情况</span>
        </div>
        <div className="min-h-[70px]"> {/* min-h to prevent collapse */}
            {renderTrafficDetails()}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionTrafficCard;