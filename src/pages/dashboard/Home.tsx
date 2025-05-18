// src/pages/dashboard/Home.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useUserInfo } from '@/hooks/useUserInfo';
import { useSubscription } from '@/hooks/useSubscription';
import { useNotices } from '@/hooks/useNotices'; // 引入 useNotices
import { Notice } from '@/api/user/notice';     // 引入 Notice 类型
import NoticeBoardModal from './home/NoticeBoardModal';
import NoticeTicker from './home/NoticeTicker';
import SubscriptionTrafficCard from './home/SubscriptionTrafficCard';


// 从 NoticeBoardModal 移过来的常量
const NOTICE_MODAL_LAST_SEEN_ID_KEY = 'dashboardNoticeModalLastSeenId';
const NOTICE_MODAL_LAST_CLOSED_TIMESTAMP_KEY = 'dashboardNoticeModalLastClosedTimestamp';

const Home: React.FC = () => {
  const { loading: userLoading, error: userError, refreshUserInfo } = useUserInfo();
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

  const { notices, loading: noticesLoading, error: noticesError } = useNotices(); // 获取公告数据

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalNotice, setModalNotice] = useState<Notice | null>(null);

  // 新公告自动弹出逻辑 (原 NoticeBoardModal 中的 initiallyOpenOnNewNotice 逻辑)
  useEffect(() => {
    //  initiallyOpenOnNewNotice 行为默认开启
    if (notices && notices.length > 0) {
      const latestNotice = notices[0];
      if (!latestNotice || !latestNotice.id) return;

      const lastSeenIdStr = localStorage.getItem(NOTICE_MODAL_LAST_SEEN_ID_KEY);
      const lastSeenId = lastSeenIdStr ? parseInt(lastSeenIdStr, 10) : 0;

      const lastClosedTimestampStr = localStorage.getItem(NOTICE_MODAL_LAST_CLOSED_TIMESTAMP_KEY);
      const lastClosedTimestamp = lastClosedTimestampStr ? parseInt(lastClosedTimestampStr, 10) : 0;

      const now = Date.now();
      const thirtyMinutesInMs = 30 * 60 * 1000;

      const isNewerNotice = latestNotice.id > lastSeenId;
      const isCooldownOver = (now - lastClosedTimestamp) > thirtyMinutesInMs;

      if (isNewerNotice || isCooldownOver) {
        setModalNotice(latestNotice);
        setIsModalOpen(true);
      }
    }
  }, [notices]); // 依赖 notices 变化

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    // localStorage 的更新由 NoticeBoardModal 内部的 handleCloseModal 处理
  }, []);

  const handleNoticeSelectFromTicker = useCallback((notice: Notice) => {
    setModalNotice(notice);
    setIsModalOpen(true);
  }, []);

  if (userLoading) { // 保留页面级加载状态
    return (
      <div className="p-6 text-center">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">加载中，请稍候...</p>
      </div>
    );
  }

  if (userError) { // 保留页面级错误状态
    return (
      <div className="p-6 text-center">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">无法加载用户信息: {userError}</p>
        </div>
        <button
          onClick={() => { refreshUserInfo(); if (subError) refreshSubscription(); /* ويمكنك إضافة refreshNotices هنا إذا كان لديك */ }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          重试
        </button>
      </div>
    );
  }

  return (
    // 移除了根 div 的内边距，让布局控制区域宽度
      <div className="space-y-6"> {/* 移除了 bg-gray-100 和 min-h-screen，以及任何 p- 内边距 */}
      {/* 公告 Ticker 放在顶部 */}
      <div className="px-4 sm:px-0"> {/* 为Ticker提供左右边距，使其不会紧贴边缘 */}
        <NoticeTicker
            notices={notices || []}
            isLoading={noticesLoading}
            error={noticesError}
            onNoticeSelect={handleNoticeSelectFromTicker}
            className="mt-4 sm:mt-6" // 顶部留白
        />
      </div>

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

      {/* 公告模态框，由 Home 的状态控制 */}
      <NoticeBoardModal
        isOpen={isModalOpen}
        notice={modalNotice}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default Home;