// src/pages/dashboard/MyInvitations.tsx
import React from 'react';

const MyInvitations: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800">我的邀请</h1>
      <p className="mt-2 text-gray-600">管理您的邀请码和查看邀请记录。</p>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">我的邀请链接</h2>
          <div className="flex items-center border rounded p-2 bg-gray-50">
            <span className="text-gray-600 flex-grow truncate mr-2">https://example.com/invite/YOUR_CODE</span>
            <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">复制</button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            使用此链接邀请朋友注册，您将获得佣金奖励！
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">邀请统计</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">已邀请人数</p>
              <p className="text-2xl font-semibold text-gray-800">0</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">累计佣金</p>
              <p className="text-2xl font-semibold text-gray-800">¥0.00</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">邀请记录</h2>
        <p className="text-gray-500 text-center py-6">暂无邀请记录</p>
        {/* 这里可以添加邀请记录列表 */}
      </div>
    </div>
  );
};

export default MyInvitations;