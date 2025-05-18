// src/components/dashboard/NoticeBoard.tsx
import React, { useState, useEffect } from 'react';
import { useNotices } from '@/hooks/useNotices';
import { Notice } from '@/api/user/notice';
import './NoticeBoard.css'; // 导入CSS样式

// 图标组件
const BellIcon = () => <span>🔔</span>;
const RefreshIcon = () => <span>🔄</span>;
const TagIcon = () => <span>🏷️</span>;
const DebugIcon = () => <span>🔍</span>;

interface NoticeBoardProps {
  maxNotices?: number; // 最大显示通知数量
  className?: string;
  debug?: boolean; // 是否显示调试信息
}

const NoticeBoard: React.FC<NoticeBoardProps> = ({ 
  maxNotices = 5, 
  className = '',
  debug = false // 默认关闭调试模式
}) => {
  const { notices, total, loading, error, refreshNotices } = useNotices();
  const [expandedNoticeId, setExpandedNoticeId] = useState<number | null>(null);
  const [showDebug, setShowDebug] = useState<boolean>(debug);
  
  // 输出到控制台的调试信息
  useEffect(() => {
    console.log('公告栏组件数据:', { 
      notices, 
      noticesCount: notices?.length || 0,
      total, 
      loading, 
      error,
      hasError: !!error
    });
  }, [notices, total, loading, error]);
  
  // 格式化日期
  const formatDate = (timestamp: number): string => {
    try {
      const date = new Date(timestamp * 1000);
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    } catch (e) {
      console.error('日期格式化错误:', e);
      return '日期错误';
    }
  };

  // 切换通知展开/收起状态
  const toggleNotice = (id: number) => {
    if (expandedNoticeId === id) {
      setExpandedNoticeId(null);
    } else {
      setExpandedNoticeId(id);
    }
  };

  // 安全地去除HTML标签，获取纯文本内容
  const stripHtml = (html: string): string => {
    try {
      if (!html) return '';
      // 创建临时DOM元素
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      // 获取纯文本内容
      return tempDiv.textContent || tempDiv.innerText || '';
    } catch (e) {
      console.error('去除HTML标签错误:', e);
      return '内容解析错误';
    }
  };

  // 显示通知标签
  const renderTags = (tags: string[]) => {
    if (!tags || !Array.isArray(tags) || tags.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-1 mt-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
          >
            <TagIcon />
            <span className="ml-1">{tag}</span>
          </span>
        ))}
      </div>
    );
  };

  // 处理加载状态
  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow p-4 ${className}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center">
            <BellIcon />
            <span className="ml-2">系统公告</span>
          </h3>
        </div>
        <div className="py-6 text-center">
          <div className="inline-block animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          <p className="mt-2 text-sm text-gray-500">加载公告中...</p>
        </div>
      </div>
    );
  }

  // 调试面板
  const renderDebugPanel = () => {
    if (!showDebug) return null;
    
    return (
      <div className="bg-gray-100 p-3 border-b text-xs font-mono overflow-auto max-h-40">
        <div className="flex justify-between items-center mb-1">
          <p className="font-semibold">调试信息:</p>
          <button 
            onClick={() => setShowDebug(false)}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            关闭
          </button>
        </div>
        <pre>
          {JSON.stringify({
            notices: notices?.length > 0 ? `${notices.length}条公告` : '无公告',
            firstNotice: notices?.[0] ? {
              id: notices[0].id,
              title: notices[0].title,
              contentLength: notices[0].content?.length || 0,
              tags: notices[0].tags,
              created_at: notices[0].created_at
            } : null,
            total,
            loading,
            error
          }, null, 2)}
        </pre>
      </div>
    );
  };

  // 显示通知列表
  return (
    <div className={`bg-white rounded-lg shadow ${className}`}>
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center">
          <BellIcon />
          <span className="ml-2">系统公告</span>
          {!showDebug && (
            <button 
              onClick={() => setShowDebug(true)}
              className="ml-2 text-xs text-gray-400 hover:text-gray-600"
              title="显示调试信息"
            >
              <DebugIcon />
            </button>
          )}
        </h3>
        <button
          onClick={refreshNotices}
          className="text-sm text-blue-500 hover:text-blue-600 flex items-center"
        >
          <RefreshIcon />
          <span className="ml-1">刷新</span>
        </button>
      </div>
      
      {/* 调试面板 */}
      {renderDebugPanel()}
      
      {/* 错误信息 */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-2">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}
      
      {/* 公告列表 */}
      <div className="divide-y divide-gray-200">
        {notices && Array.isArray(notices) && notices.length > 0 ? (
          notices.slice(0, maxNotices).map((notice: Notice) => (
            <div key={notice.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div 
                className="cursor-pointer" 
                onClick={() => toggleNotice(notice.id)}
              >
                <div className="flex justify-between items-start">
                  <h4 className="text-md font-medium text-gray-800">{notice.title || '无标题'}</h4>
                  <span className="text-xs text-gray-500">
                    {notice.created_at ? formatDate(notice.created_at) : '未知日期'}
                  </span>
                </div>
                
                {expandedNoticeId === notice.id ? (
                  <div className="mt-4">
                    {/* 渲染展开的HTML内容 */}
                    <div 
                      className="notice-content text-sm text-gray-600 overflow-hidden"
                      dangerouslySetInnerHTML={{ __html: notice.content || '' }}
                    />
                    {renderTags(notice.tags)}
                  </div>
                ) : (
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2 overflow-hidden">
                    {notice.content ? stripHtml(notice.content) : '无内容'}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500">暂无系统公告</p>
          </div>
        )}
      </div>
      
      {/* 如果公告数量超过显示限制，显示"查看更多"按钮 */}
      {notices && notices.length > maxNotices && (
        <div className="border-t p-3 text-center">
          <button 
            className="text-sm text-blue-500 hover:text-blue-600"
            onClick={() => alert('查看全部公告功能正在开发中')}
          >
            查看全部 {total || notices.length} 条公告
          </button>
        </div>
      )}
    </div>
  );
};

export default NoticeBoard;