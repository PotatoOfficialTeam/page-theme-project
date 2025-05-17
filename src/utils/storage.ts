// src/utils/storage.ts
export const StorageKeys = {
  USER_TOKEN: 'userToken',
};

export const Storage = {
  get: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`获取存储项失败: ${key}`, error);
      return null;
    }
  },
  
  set: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`设置存储项失败: ${key}`, error);
    }
  },
  
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`移除存储项失败: ${key}`, error);
    }
  },
  
  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('清除存储失败', error);
    }
  }
};