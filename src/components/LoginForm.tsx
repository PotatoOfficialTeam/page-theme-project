// src/components/LoginForm.tsx (修复 Spinner 错误 - 浅色主题 for Vite)

import React, { useState, type FormEvent } from 'react';
// import { useNavigate } from 'react-router-dom'; // **ROUTER_REPLACE**: 如果需要内部路由
// import { Link } from 'react-router-dom'; // **ROUTER_REPLACE**

// --- 辅助 SVG 组件定义 ---

// 加载图标 - 用于浅灰色按钮 (深色图标)
const LoadingSpinnerGray = ({ color = "#4B5563", size = 20 }: { color?: string; size?: number }) => { // Default color gray-600
    return (
        <svg className="animate-spin" style={{ color: color, height: size, width: size }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    );
};
// 移除了未使用的 LoadingSpinnerWhite 定义

// 占位符 Logo - 使用柔和灰色
const AppLogo = () => {
    return (
         <div className="mb-6 h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-2xl">
            L {/* 占位符 */}
         </div>
    );
};

// --- LoginForm 组件逻辑 ---
export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        if (!email || !/\S+@\S+\.\S+/.test(email)) { setError('请输入有效的邮箱地址'); return; }
        if (!password) { setError('请输入密码'); return; }
        if (password.length < 8) { setError('密码长度不能少于8位'); return; }
        setIsLoading(true);
        console.log("模拟登录 (Vite):", { email });
        try {
            await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟 API 延迟
            const mockSignInResult = { ok: true, error: null, token: "fake-token" }; // 模拟成功
            if (mockSignInResult.ok) {
                alert('模拟登录成功！准备跳转...'); // 占位提示
                console.log('将跳转到 Umi 应用...');
                // **VITE_REPLACE**: window.location.href = `YOUR_UMIJS_APP_URL/dashboard#token=${mockSignInResult.token}`;
            } else {
                setError(mockSignInResult.error || '邮箱或密码错误，请重试。');
            }
        } catch (err: any) {
            console.error('登录时发生意外错误:', err);
            setError(err.message || '发生未知错误，请稍后重试。');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value); if (error) setError(null); };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value); if (error) setError(null); };

    // --- JSX (纯白卡片 - 强阴影 - 更柔和边缘灰色元素) ---
    return (
        // 卡片容器: 宽度 max-w-xl, 背景 bg-white, 圆角 rounded-2xl, 阴影 shadow-2xl
        <div className="w-full max-w-xl rounded-2xl bg-white p-10 shadow-2xl">
            {/* Logo 和标题 */}
            <div className="mb-10 flex flex-col items-center text-center">
                <AppLogo /> {/* 使用更柔和灰色 Logo */}
                <h1 className="mt-5 text-3xl font-medium text-gray-900">
                    登录您的账户
                </h1>
            </div>

            {/* 单个表单 */}
            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                {/* Email Input */}
                <div>
                    <input
                        id="email" name="email" type="email" required value={email} onChange={handleEmailChange}
                        className={`block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 shadow-sm transition-colors duration-150 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${error?.includes('邮箱') ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:border-blue-500 focus:ring-blue-500'}`}
                        placeholder="电子邮箱或电话号码" disabled={isLoading} aria-invalid={!!error?.includes('邮箱')} aria-describedby="form-error-msg"
                    />
                </div>

                {/* Password Input */}
                <div>
                    <input
                        id="password" name="password" type="password" required value={password} onChange={handlePasswordChange}
                        className={`block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 shadow-sm transition-colors duration-150 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${error?.includes('密码') ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:border-blue-500 focus:ring-blue-500'}`}
                        placeholder="密码" disabled={isLoading} aria-invalid={!!error?.includes('密码')} aria-describedby="form-error-msg"
                    />
                </div>

                 {/* 忘记密码链接 */}
                 <div className="text-right text-sm">
                    <a href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline">忘记了密码?</a>
                 </div>

                 {/* 统一的错误信息显示 */}
                 <div className="min-h-[20px] text-center text-sm">
                    {error && ( <p id="form-error-msg" className="text-red-600">{error}</p> )}
                 </div>

                {/* Final Login Button - 使用浅灰色和柔和边缘 */}
                <button type="submit"
                        // 移除边框，使用更浅的灰色背景，保留 shadow-sm，调整 hover 和 focus
                        className={`relative flex w-full justify-center rounded-lg border-none bg-gray-100 px-6 py-2.5 text-sm font-medium text-gray-600 shadow-sm transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 disabled:opacity-70 ${isLoading ? 'cursor-not-allowed' : ''}`} // 保持柔和灰色按钮样式
                        disabled={isLoading}>
                    {/* 使用灰色加载图标 */}
                    {isLoading ? <LoadingSpinnerGray /> : '登录'} {/* 确认使用 LoadingSpinnerGray */}
                </button>

                 {/* 创建账户链接 */}
                 <div className='text-center text-sm pt-2'>
                     <p className="text-gray-600">
                         还没有账户?{' '}
                         <a href="/register" className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline">创建账户</a>
                     </p>
                 </div>
            </form>
        </div>
    );
}

