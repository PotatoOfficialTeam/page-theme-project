// src/pages/dashboard/TrafficDetails.tsx
import React, { useState } from 'react';
import { useUser } from '../../hooks/useUser';

// 正确的 React 组件声明
const TrafficDetails: React.FC = () => {
  const { trafficData, loading, error } = useUser();
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('day');
  
  // 假设的流量使用记录
  const trafficRecords = [
    { id: 1, date: '2025-05-16', amount: '2.45 GB', nodeLocation: '香港 HK-1' },
    { id: 2, date: '2025-05-15', amount: '3.12 GB', nodeLocation: '日本 JP-2' },
    { id: 3, date: '2025-05-14', amount: '1.87 GB', nodeLocation: '新加坡 SG-1' },
    { id: 4, date: '2025-05-13', amount: '3.56 GB', nodeLocation: '美国 US-1' },
    { id: 5, date: '2025-05-12', amount: '2.21 GB', nodeLocation: '香港 HK-2' },
  ];
  
  if (loading) {
    return <div className="p-6 text-center text-gray-600">加载中...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">加载错误: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800">流量明细</h1>
      <p className="mt-2 text-gray-600">查看和管理您的流量使用情况。</p>
      
      {/* 流量使用概览 */}
      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">流量使用概览</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-500">总流量</p>
            <p className="text-2xl font-semibold text-gray-800">{trafficData?.total || '0 GB'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">已使用</p>
            <p className="text-2xl font-semibold text-red-500">{trafficData?.used || '0 GB'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">剩余流量</p>
            <p className="text-2xl font-semibold text-green-500">{trafficData?.remaining || '0 GB'}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-500 h-2.5 rounded-full" 
              style={{ width: `${trafficData?.usagePercentage || 0}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-right">
            已使用 {trafficData?.usagePercentage || 0}%
          </p>
        </div>
      </div>
      
      {/* 流量使用历史 */}
      <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-700">流量使用历史</h2>
          
          <div className="flex rounded-lg border border-gray-300 overflow-hidden">
            <button 
              className={`px-3 py-1 text-sm ${period === 'day' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setPeriod('day')}
            >
              日
            </button>
            <button 
              className={`px-3 py-1 text-sm border-l border-r border-gray-300 ${period === 'week' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setPeriod('week')}
            >
              周
            </button>
            <button 
              className={`px-3 py-1 text-sm ${period === 'month' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setPeriod('month')}
            >
              月
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  日期
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  使用量
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  节点
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {trafficRecords.map((record) => (
                <tr key={record.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.nodeLocation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-3 border-t border-gray-200 text-right">
          <button className="text-sm text-blue-500 hover:text-blue-600">
            查看全部历史记录
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrafficDetails;