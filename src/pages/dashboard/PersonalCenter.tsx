// src/pages/dashboard/PersonalCenter.tsx
import React from 'react';

const PersonalCenter: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800">个人中心</h1>
      <p className="mt-2 text-gray-600">管理您的个人信息和账户设置。</p>
      
      {/* 简单的空白内容提示 */}
      <div className="mt-6 bg-white rounded-lg shadow p-8 text-center">
        <div className="flex flex-col items-center justify-center py-6">
          <svg
            className="w-16 h-16 text-gray-300 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-700">个人中心</h3>
          <p className="mt-2 text-gray-500">
            此页面将允许您管理个人信息、安全设置和账户偏好。
          </p>
          <button 
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            编辑个人资料
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalCenter;