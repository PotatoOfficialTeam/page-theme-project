// src/hooks/useUser.ts
import { useState, useEffect } from 'react';
import { getUserProfile, getTrafficData, UserProfile, TrafficData } from '../api/user';
import { Storage, StorageKeys } from '../utils/storage';

// 使用默认导出或命名导出，但两者要保持一致
// 方法1: 命名导出 (推荐)
export const useUser = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [trafficData, setTrafficData] = useState<TrafficData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
      const token = Storage.get(StorageKeys.USER_TOKEN);
      
      if (!token) {
        setLoading(false);
        setError('无法获取用户令牌');
        return;
      }

      try {
        // 并行获取用户数据
        const [profileData, traffic] = await Promise.all([
          getUserProfile(token),
          getTrafficData(token),
        ]);
        
        setUserProfile(profileData);
        setTrafficData(traffic);
      } catch (err: any) {
        console.error('获取用户数据失败:', err);
        setError(err.message || '获取用户数据时出错');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return {
    userProfile,
    trafficData,
    loading,
    error,
    // 增加刷新数据的方法
    refreshUserData: async () => {
      setLoading(true);
      setError(null);
      const token = Storage.get(StorageKeys.USER_TOKEN);
      
      if (!token) {
        setLoading(false);
        setError('无法获取用户令牌');
        return;
      }

      try {
        const profileData = await getUserProfile(token);
        setUserProfile(profileData);
      } catch (err: any) {
        console.error('刷新用户数据失败:', err);
        setError(err.message || '刷新用户数据时出错');
      } finally {
        setLoading(false);
      }
    },
    refreshTrafficData: async () => {
      setLoading(true);
      setError(null);
      const token = Storage.get(StorageKeys.USER_TOKEN);
      
      if (!token) {
        setLoading(false);
        setError('无法获取用户令牌');
        return;
      }

      try {
        const traffic = await getTrafficData(token);
        setTrafficData(traffic);
      } catch (err: any) {
        console.error('刷新流量数据失败:', err);
        setError(err.message || '刷新流量数据时出错');
      } finally {
        setLoading(false);
      }
    }
  };
};

// 如果其他地方使用默认导出，也可以添加一个默认导出
// 方法2: 同时提供默认导出 (可选)
// export default useUser;