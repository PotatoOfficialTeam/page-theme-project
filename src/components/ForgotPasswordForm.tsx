// src/components/ForgotPasswordForm.tsx (忘记密码表单 - 浅色主题 - 宽卡片 - 强阴影 - 使用 Link)
'use client'; // 虽然 Vite 不用，但保留无害

import React, { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom'; // 1. 导入 Link 组件

// --- 辅助 SVG 组件定义 ---
const LoadingSpinnerGray = ({ color = "#4B5563", size = 20 }: { color?: string; size?: number }) => { // 用于浅灰色按钮
    return (
        <svg className="animate-spin" style={{ color: color, height: size, width: size }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    );
};

// 占位符 Logo - 与 LoginForm 保持一致
const AppLogo = () => {
    return (
         <div className="mb-6 h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-2xl">
            L {/* 占位符 */}
         </div>
    );
};

// --- ForgotPasswordForm 组件逻辑 ---
export default function ForgotPasswordForm() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // 用于显示成功信息

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setSuccessMessage(null); // 清除旧消息

        // 前端邮箱格式校验
        if (!email.trim()) {
            setError('请输入邮箱地址');
            return;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setError('请输入有效的邮箱格式');
            return;
        }

        setIsLoading(true);

        // --- 模拟/调用后端发送重置链接的 API ---
        console.log('请求发送密码重置链接至:', email);
        // **VITE_REPLACE**: 这里需要替换为调用你实际的后端 API
        try {
            await new Promise(resolve => setTimeout(resolve, 1500)); // 模拟网络延迟
            // 模拟成功
            console.log("模拟发送成功!");
            setSuccessMessage('如果该邮箱地址在我们系统中存在，密码重置说明邮件已发送。请检查您的收件箱（包括垃圾邮件）。');
            setEmail(''); // 清空邮箱输入
        } catch (error: any) {
            console.error('发送重置邮件失败:', error);
            setError(error.message || "发送邮件时出错，请稍后再试。");
        } finally {
            setIsLoading(false);
        }
        // --- 模拟结束 ---
    };

    // 输入框内容变化时清除消息
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (error) setError(null);
        if (successMessage) setSuccessMessage(null);
    };

    // --- JSX (样式与 LoginForm 保持一致) ---
    return (
        // 卡片容器: 宽度 max-w-xl, 背景 bg-white, 圆角 rounded-2xl, 阴影 shadow-2xl
        <div className="w-full max-w-xl rounded-2xl bg-white p-10 shadow-2xl">
             {/* Logo 和标题 */}
            <div className="mb-10 flex flex-col items-center text-center">
                <AppLogo />
                <h1 className="mt-5 text-3xl font-medium text-gray-900">忘记密码？</h1>
                <p className="mt-3 text-sm text-gray-600">
                    请输入您的账户邮箱地址，我们将向您发送重置密码的说明。
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                {/* Email Input */}
                 <div>
                    {/* <label htmlFor="email-forgot" className="sr-only">邮箱地址</label> */}
                    <input
                        id="email-forgot" name="email" type="email" required value={email}
                        onChange={handleEmailChange}
                        // 输入框样式与 LoginForm 一致
                        className={`block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 shadow-sm transition-colors duration-150 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:border-blue-500 focus:ring-blue-500'}`}
                        placeholder="请输入注册邮箱" disabled={isLoading} aria-invalid={!!error} aria-describedby="form-message"
                    />
                </div>

                 {/* 错误或成功消息显示区域 */}
                 <div className="min-h-[20px] text-center text-sm"> {/* 避免跳动 */}
                     {error && ( <p id="form-message" className="text-red-600">{error}</p> )}
                     {successMessage && ( <p id="form-message" className="text-green-600">{successMessage}</p> )}
                 </div>

                 {/* Submit Button */}
                 <button
                    type="submit"
                    // 按钮样式与 LoginForm 一致 (柔和灰色)
                    className={`relative flex w-full justify-center rounded-lg border-none bg-gray-100 px-6 py-2.5 text-sm font-medium text-gray-600 shadow-sm transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 disabled:opacity-70 ${isLoading ? 'cursor-not-allowed' : ''}`}
                    disabled={isLoading}
                 >
                    {isLoading ? <LoadingSpinnerGray /> : '发送重置链接'}
                 </button>

                 {/* Link back to Login */}
                 <p className="text-center text-sm text-gray-600">
                     记起密码了？{' '}
                     {/* 2. 将 a 标签替换为 Link 组件 */}
                     <Link to="/" className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline">
                         返回登录
                     </Link>
                 </p>
            </form>
        </div>
    );
}
