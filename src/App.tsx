// src/App.tsx (设置页面布局并渲染 LoginForm)

// import React from 'react'; // 在新版 Vite+React 中通常可选
import LoginForm from './components/LoginForm'; // 1. 导入 LoginForm 组件
import './index.css'; // 2. 导入包含 Tailwind 指令的主 CSS 文件

function App() {
  return (
    // 3. 外层 div 负责页面布局: 全屏高度、Flex 居中、背景色、内边距
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      {/*
        - flex: 启用 Flexbox 布局
        - min-h-screen: 使容器至少有屏幕那么高
        - items-center: 垂直居中内容
        - justify-center: 水平居中内容
        - bg-gray-50: 设置浅灰色页面背景
        - p-4: 添加一些内边距
      */}
      <LoginForm /> {/* 4. 渲染登录表单组件 */}
    </div>
  );
}

export default App;
