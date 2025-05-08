// vite.config.ts (添加了 resolve.alias 配置)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // 1. 导入 path 模块 (如果还没有)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 2. 添加 resolve.alias 配置
  resolve: {
    alias: {
      // 定义 @ 别名指向 src 目录
      '@': path.resolve(__dirname, './src'),
    },
  },
})

