// src/components/dashboard/NoticeTicker.tsx
import React, { useState, useEffect } from 'react';
import { Notice } from '@/api/user/notice'; // 确保路径正确

interface NoticeTickerProps {
  notices: Notice[];
  onNoticeSelect: (notice: Notice) => void;
  isLoading: boolean;
  error: string | null;
  className?: string;
}

const AnnouncementIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 flex-shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 3.94A2.25 2.25 0 0 0 8.5 5.133V7.875h3.75V5.133A2.25 2.25 0 0 0 10.34 3.94ZM14.25 7.875V5.133A2.25 2.25 0 0 0 12.41 3.94A2.25 2.25 0 0 0 10.5 5.133V7.875h3.75Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5v10.5A2.25 2.25 0 0 1 18 21.75H6A2.25 2.25 0 0 1 3.75 19.5V9Zm16.5 0H3.75m0 0V7.5A2.25 2.25 0 0 1 6 5.25h12A2.25 2.25 0 0 1 20.25 7.5V9Z" />
  </svg>
);


const NoticeTicker: React.FC<NoticeTickerProps> = ({
  notices,
  onNoticeSelect,
  isLoading,
  error,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedTitle, setDisplayedTitle] = useState<string | null>(null);
  const [key, setKey] = useState(0); // Used to force re-render for fade effect

  useEffect(() => {
    if (!notices || notices.length === 0) {
      setDisplayedTitle(isLoading ? '加载公告中...' : (error ? `错误: ${error}`: '暂无最新公告'));
      return;
    }

    // Initial display
    setDisplayedTitle(notices[currentIndex]?.title || '暂无标题');
    setKey(prev => prev + 1);

    if (notices.length > 1) {
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % notices.length;
          setDisplayedTitle(notices[nextIndex]?.title || '暂无标题');
          setKey(prev => prev + 1); // Trigger re-render for animation
          return nextIndex;
        });
      }, 5000); // Change title every 5 seconds

      return () => clearInterval(intervalId);
    }
  }, [notices, isLoading, error, currentIndex]); // Re-run if notices array itself changes identity or length for non-cycling case

  const handleTitleClick = () => {
    if (notices && notices.length > 0 && notices[currentIndex]) {
      onNoticeSelect(notices[currentIndex]);
    }
  };

  // Basic fade-in animation (add this to your global CSS or a <style> tag for NoticeTicker)
  // @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
  // .animate-fadeIn { animation: fadeIn 0.5s ease-in-out; }

  return (
    <div className={`bg-sky-50 dark:bg-sky-900 border border-sky-200 dark:border-sky-700 text-sky-700 dark:text-sky-300 px-3 py-2.5 flex items-center text-sm rounded-md shadow-sm ${className}`}>
      <AnnouncementIcon />
      <div className="ml-2 flex-1 overflow-hidden">
        {notices && notices.length > 0 ? (
          <span
            key={key} // Change key to re-trigger potential CSS transitions or simply re-render
            className="whitespace-nowrap cursor-pointer hover:underline animate-fadeIn" // Add your animation class here
            onClick={handleTitleClick}
            title={displayedTitle || ''}
          >
            {displayedTitle}
          </span>
        ) : (
          <span className="whitespace-nowrap">
            {displayedTitle}
          </span>
        )}
      </div>
    </div>
  );
};

export default NoticeTicker;