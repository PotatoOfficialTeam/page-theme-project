// src/components/dashboard/NoticeBoardModal.tsx
import React, { useCallback } from 'react';
import { Notice } from '@/api/user/notice';    // 确保路径正确
import './NoticeBoard.css';

const BellIcon = () => <span>🔔</span>;
const TagIcon = () => <span>🏷️</span>;
const CloseIcon = () => <span style={{ fontSize: '20px', lineHeight: '1' }}>&times;</span>;

interface NoticeBoardModalProps {
  isOpen: boolean;
  notice: Notice | null;
  onClose: () => void;
}

const NOTICE_MODAL_LAST_SEEN_ID_KEY = 'dashboardNoticeModalLastSeenId';
const NOTICE_MODAL_LAST_CLOSED_TIMESTAMP_KEY = 'dashboardNoticeModalLastClosedTimestamp';

const NoticeBoardModal: React.FC<NoticeBoardModalProps> = ({
  isOpen,
  notice,
  onClose,
}) => {

  const handleCloseModal = useCallback(() => {
    if (notice && notice.id) {
      localStorage.setItem(NOTICE_MODAL_LAST_SEEN_ID_KEY, notice.id.toString());
    }
    // 无论如何都记录关闭时间戳，用于冷却
    localStorage.setItem(NOTICE_MODAL_LAST_CLOSED_TIMESTAMP_KEY, Date.now().toString());
    onClose(); // 通知父组件关闭
  }, [notice, onClose]);

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
            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
          >
            <TagIcon /> <span className="ml-1">{tag}</span>
          </span>
        ))}
      </div>
    );
  };

  if (!isOpen || !notice) {
    return null; // 如果不显示或没有公告数据，则不渲染
  }

  // 注意：原先的 loading 和 error 状态现在由 Home.tsx 在传递 notice 前处理。
  // 如果 notice 为 null 但 isOpen 为 true，Home.tsx 应该有逻辑来处理（例如，不应该发生）。

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[1000] p-4 transition-opacity duration-300 ease-in-out" role="dialog" aria-modal="true" aria-labelledby="noticeModalTitle">
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full
                   max-w-sm sm:max-w-md md:max-w-lg
                   max-h-[85vh] flex flex-col
                   transform transition-all duration-300 ease-in-out scale-100"
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 id="noticeModalTitle" className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center">
            <BellIcon />
            <span className="ml-2">{notice.title || '系统公告'}</span>
          </h3>
          <button
            onClick={handleCloseModal}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="关闭公告"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="p-5 overflow-y-auto flex-1 text-gray-700 dark:text-gray-300">
          <div className="mb-3">
             <span className="text-xs text-gray-500 dark:text-gray-400">
                发布于: {notice.created_at ? formatDate(notice.created_at) : '未知日期'}
             </span>
             {renderTags(notice.tags)}
          </div>
          <div
            className="notice-content" // CSS 定义在 NoticeBoard.css
            dangerouslySetInnerHTML={{ __html: notice.content || '暂无内容。' }}
          />
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-right space-x-2">
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