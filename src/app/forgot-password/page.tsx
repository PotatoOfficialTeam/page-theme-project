// src/app/forgot-password/page.tsx (忘记密码页面)

import ForgotPasswordForm from '@/components/ForgotPasswordForm'; // 导入表单组件 (使用路径别名)
import '../../index.css'; // 导入全局 CSS (确保路径正确)

export default function ForgotPasswordPage() {
  return (
    // 使用与登录页一致的居中布局和背景色 (纯白色)
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <ForgotPasswordForm /> {/* 渲染忘记密码表单组件 */}
    </div>
  );
}
