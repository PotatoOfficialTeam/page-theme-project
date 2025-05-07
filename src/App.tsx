// src/App.tsx (为白色卡片设置纯白色背景)

// import React from 'react';
import LoginForm from './components/LoginForm';
import './index.css'; // 确保导入 Tailwind 指令

function App() {
  return (
    // 将页面背景改为纯白色 (bg-white)
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <LoginForm />
    </div>
  );
}

export default App;
