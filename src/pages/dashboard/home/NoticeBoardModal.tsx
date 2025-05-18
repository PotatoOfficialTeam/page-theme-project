// src/components/dashboard/NoticeBoardModal.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNotices } from '@/hooks/useNotices'; // 确保路径正确
import { Notice } from '@/api/user/notice';    // 确保路径正确
import './NoticeBoard.css'; // 复用之前的CSS样式

// 图标组件 (可以根据你的项目实际情况替换或定义)
const BellIcon = () => <span>🔔</span>;
const TagIcon = () => <span>🏷️</span>;
const CloseIcon = () => <span style={{ fontSize: '20px', lineHeight: '1' }}>&times;</span>;

interface NoticeBoardModalProps {
  initiallyOpenOnNewNotice?: boolean; // 控制是否在有新公告时自动打开
}

const NOTICE_MODAL_LAST_SEEN_ID_KEY = 'dashboardNoticeModalLastSeenId';
const NOTICE_MODAL_LAST_CLOSED_TIMESTAMP_KEY = 'dashboardNoticeModalLastClosedTimestamp';

const NoticeBoardModal: React.FC<NoticeBoardModalProps> = ({
  initiallyOpenOnNewNotice = true,
}) => {
  const { notices, loading, error } = useNotices();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentNotice, setCurrentNotice] = useState<Notice | null>(null);

  useEffect(() => {
    if (initiallyOpenOnNewNotice && notices && notices.length > 0) {
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
        setCurrentNotice(latestNotice);
        setIsModalOpen(true);
      }
    }
  }, [notices, initiallyOpenOnNewNotice]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    if (currentNotice && currentNotice.id) {
      localStorage.setItem(NOTICE_MODAL_LAST_SEEN_ID_KEY, currentNotice.id.toString());
    }
    localStorage.setItem(NOTICE_MODAL_LAST_CLOSED_TIMESTAMP_KEY, Date.now().toString());
  }, [currentNotice]);

  const formatDate = (timestamp: number): string => {
    try {
      const date = new Date(timestamp * 1000);
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit'
      });
    } catch (e) {
      console.error('日期格式化错误:', e);
      return '日期错误';
    }
  };

  const renderTags = (tags: string[] | undefined) => {
    if (!tags || !Array.isArray(tags) || tags.length === 0) return null;
    return (
      <div className="flex flex-wrap gap-1 mt-2 mb-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
          >
            <TagIcon /> <span className="ml-1">{tag}</span>
          </span>
        ))}
      </div>
    );
  };

  if (!isModalOpen || !currentNotice) {
    return null;
  }

  // 加载状态和错误状态的弹窗保持较小尺寸，不应用复杂的宽度调整
  if (loading && !currentNotice) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1001] p-4"> {/* Increased z-index slightly if needed over other modals */}
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-xs text-center">
          <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-3 text-sm text-gray-500">加载公告...</p>
        </div>
      </div>
    );
  }
  
  if (error && !currentNotice) {
     return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1001] p-4">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-xs text-center">
          <p className="text-red-600">无法加载公告: {error}</p>
          <button
            onClick={() => setIsModalOpen(false)}
            className="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            关闭
          </button>
        </div>
      </div>
    );
  }

  return (
    // Backdrop: p-4 提供边缘空间，使得弹窗不会紧贴屏幕边缘
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[1000] p-4 transition-opacity duration-300 ease-in-out" role="dialog" aria-modal="true" aria-labelledby="noticeModalTitle">
      {/* Modal Dialog Container: 调整了最大宽度 */}
      <div 
        className="bg-white rounded-lg shadow-2xl w-full 
                   max-w-sm sm:max-w-md md:max-w-lg /* 在小屏幕上最大宽度为sm (384px), 中等屏幕sm (448px), md及以上为lg (512px) */
                   max-h-[85vh] flex flex-col 
                   transform transition-all duration-300 ease-in-out scale-100"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 id="noticeModalTitle" className="text-xl font-semibold text-gray-800 flex items-center">
            <BellIcon />
            <span className="ml-2">{currentNotice.title || '系统公告'}</span>
          </h3>
          <button
            onClick={handleCloseModal}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
            aria-label="关闭公告"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Modal Body - Scrollable: 添加了 flex-1 */}
        <div className="p-5 overflow-y-auto flex-1"> {/* flex-1 使此div填充可用空间，确保滚动正常 */}
          <div className="mb-3">
             <span className="text-xs text-gray-500">
                发布于: {currentNotice.created_at ? formatDate(currentNotice.created_at) : '未知日期'}
             </span>
             {renderTags(currentNotice.tags)}
          </div>
          <div
            className="notice-content text-sm text-gray-700"
            dangerouslySetInnerHTML={{ __html: currentNotice.content || '暂无内容。' }}
          />
        </div>
        
        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-200 text-right space-x-2">
          <button
            onClick={handleCloseModal}
            className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            我知道了
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeBoardModal;