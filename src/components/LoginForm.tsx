// src/components/LoginForm.tsx (标准单步登录表单)
import React, { useState, type FormEvent } from 'react';
// import { useNavigate } from 'react-router-dom'; // **ROUTER_REPLACE**: 如果需要内部路由
// import { Link } from 'react-router-dom'; // **ROUTER_REPLACE**

// --- 辅助 SVG 组件 ---
const LoadingSpinner = ({ color = "#ffffff", size = 20 }: { color?: string; size?: number }) => {
    return (
        <svg className="animate-spin" style={{ color: color, height: size, width: size }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    );
};

const AppLogo = () => { // 示例 Logo - 请替换为你自己的
    return (
        <div className="mb-6 h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl">
            L {/* 占位符 Logo */}
        </div>
    );
};


// --- LoginForm 组件 ---
export default function LoginForm() {
    // --- 状态定义 ---
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // const navigate = useNavigate(); // **ROUTER_REPLACE**

    // --- 表单提交处理 ---
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null); // 清除之前的错误

        // 前端基本校验 (可选)
        if (!email || !password) {
            setError("邮箱和密码不能为空。");
            return;
        }
        if (password.length < 8) {
            setError("密码长度不能少于8位。");
            return;
        }

        setIsLoading(true);
        console.log("尝试登录:", { email }); // 不打印密码

        // **API_REPLACE**: 替换为实际的后端 API 调用
        // 成功后获取 token 并使用 window.location.href 跳转到 UmiJS 应用
        try {
            // 模拟 API 调用
            await new Promise(resolve => setTimeout(resolve, 1000));
            const mockLoginResult = { ok: true, error: null, token: "fake-jwt-token" }; // 模拟成功
            // const mockLoginResult = { ok: false, error: '邮箱或密码不正确' }; // 模拟失败

            if (mockLoginResult.ok) {
                console.log("模拟登录成功, Token:", mockLoginResult.token);
                alert("模拟登录成功！准备跳转..."); // 占位提示
                // **REDIRECT_REPLACE**: 跳转到 Umi 应用并携带 token
                // window.location.href = `YOUR_UMIJS_APP_URL/dashboard#token=${mockLoginResult.token}`;
                console.log('将跳转到 Umi 应用...');
            } else {
                setError(mockLoginResult.error || '登录失败，请重试。');
            }
        } catch (err: any) {
            console.error('登录时发生意外错误:', err);
            setError(err.message || '发生未知错误，请稍后重试。');
        } finally {
            setIsLoading(false);
        }
    };

    // 输入框内容变化时清除错误
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value); if (error) setError(null); };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value); if (error) setError(null); };

    // --- JSX 结构 ---
    return (
        // 卡片容器: 居中、内边距、圆角、背景色、阴影、边框
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg border border-gray-200">
            {/* Logo 和标题 */}
            <div className="mb-6 flex flex-col items-center text-center">
                <AppLogo />
                <h1 className="text-2xl font-bold text-gray-900">
                    登录您的账户
                </h1>
            </div>

            {/* 登录表单 */}
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* 邮箱输入框 */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        邮箱地址
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={handleEmailChange}
                        // 标准输入框样式，错误时边框变红
                        className={`block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 transition focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${error?.includes('邮箱') ? 'border-red-500' : ''}`}
                        placeholder="you@example.com"
                        disabled={isLoading}
                    />
                </div>

                {/* 密码输入框 */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        密码
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={handlePasswordChange}
                        // 标准输入框样式，错误时边框变红
                        className={`block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 transition focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${error?.includes('密码') ? 'border-red-500' : ''}`}
                        placeholder="••••••••"
                        disabled={isLoading}
                    />
                </div>

                {/* 忘记密码链接 */}
                <div className="text-right text-sm">
                    {/* **ROUTER_REPLACE**: 如果需要内部路由，使用 react-router-dom 的 Link */}
                    <a href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                        忘记密码?
                    </a>
                </div>

                {/* 错误信息显示 */}
                {/* 使用 min-h 避免消息消失时布局跳动 */}
                <div className="min-h-[20px] text-center text-sm">
                    {error && (
                        <p className="text-red-600">
                            {error}
                        </p>
                    )}
                </div>


                {/* 登录按钮 */}
                <button
                    type="submit"
                    // 标准按钮样式
                    className={`flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-75 ${isLoading ? 'cursor-not-allowed' : ''}`}
                    disabled={isLoading}
                >
                    {isLoading ? <LoadingSpinner /> : '登录'}
                </button>

                {/* 创建账户链接 */}
                <p className="text-center text-sm text-gray-600">
                    还没有账户?{' '}
                    {/* **ROUTER_REPLACE**: 如果需要内部路由，使用 react-router-dom 的 Link */}
                    <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                        创建账户
                    </a>
                </p>
            </form>
        </div>
    );
}
