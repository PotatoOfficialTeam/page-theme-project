// src/pages/dashboard/MyOrders.tsx
import React from 'react';

const MyOrders: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800">我的订单</h1>
      <p className="mt-2 text-gray-600">此页面显示您的所有订单历史记录。</p>
      <div className="mt-6 bg-white rounded-lg shadow p-4">
        <p className="text-gray-500 text-center py-8">暂无订单记录</p>
        {/* 这里可以添加订单列表和查询功能 */}
      </div>
    </div>
  );
};

export default MyOrders;