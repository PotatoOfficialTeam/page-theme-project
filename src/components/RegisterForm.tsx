// src/components/RegisterForm.tsx (注册表单 - 浅色主题 - 宽卡片 - 强阴影)
'use client'; // 虽然 Vite 不用，但保留无害

import { useState, type FormEvent } from 'react'; // 移除了未使用的 React 导入
import { Link, useNavigate } from 'react-router-dom'; // 导入 react-router-dom 的 Link 和 useNavigate

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

// --- RegisterForm 组件逻辑 ---
export default function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate(); // 使用 useNavigate 进行跳转
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string; form?: string }>({});

    // 表单校验逻辑
    const validateForm = (): boolean => {
        const newErrors: typeof errors = {};
        let isValid = true;
        if (!name.trim()) { newErrors.name = '请输入姓名'; isValid = false; }
        if (!email.trim()) { newErrors.email = '请输入邮箱地址'; isValid = false; }
        else if (!/\S+@\S+\.\S+/.test(email)) { newErrors.email = '请输入有效的邮箱格式'; isValid = false; }
        if (!password) { newErrors.password = '请输入密码'; isValid = false; }
        else if (password.length < 8) { newErrors.password = '密码长度不能少于8位'; isValid = false; }
        if (!confirmPassword) { newErrors.confirmPassword = '请再次输入密码'; isValid = false; }
        else if (password && password !== confirmPassword) { newErrors.confirmPassword = '两次输入的密码不一致'; isValid = false; }
        setErrors(newErrors);
        return isValid;
    };

    // 表单提交处理
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors(prev => ({ ...prev, form: undefined })); // 只清除表单级错误

        if (validateForm()) {
            setIsLoading(true);
            console.log('注册信息校验通过，准备提交:', { name, email }); // 不打印密码
            // **VITE_REPLACE**: 替换为实际的后端 API 调用来注册
            try {
                // --- 模拟后端注册 API 调用 ---
                await new Promise(resolve => setTimeout(resolve, 1500)); // 模拟网络延迟
                console.log("模拟注册成功！");
                alert("注册成功！将跳转到登录页面。"); // 临时提示
                navigate('/'); // 注册成功后跳转回根路径 (登录页)
                // --- 模拟结束 ---
            } catch (error: any) {
                 console.error('注册失败:', error);
                 setErrors({ form: error.message || "注册过程中发生错误，请稍后再试。" });
            } finally {
                 setIsLoading(false);
            }
        } else {
            console.log('注册表单校验失败');
        }
    };

    // 输入框内容变化时清除对应字段和表单错误
    const clearErrorOnChange = (fieldName: keyof typeof errors) => {
      if (errors[fieldName] || errors.form) {
        setErrors(prev => ({ ...prev, [fieldName]: undefined, form: undefined }));
      }
    };

    // --- JSX (样式与 LoginForm 保持一致) ---
    return (
        // 卡片容器: 宽度 max-w-xl, 背景 bg-white, 圆角 rounded-2xl, 阴影 shadow-2xl
        <div className="w-full max-w-xl rounded-2xl bg-white p-10 shadow-2xl">
            {/* Logo 和标题 */}
            <div className="mb-10 flex flex-col items-center text-center">
                <AppLogo />
                <h1 className="mt-5 text-3xl font-medium text-gray-900">创建账户</h1>
                <p className="mt-3 text-sm text-gray-600">欢迎加入我们！</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate> {/* 调整间距 */}
                 {/* Name Input */}
                 <div>
                    {/* <label htmlFor="name" className="sr-only">姓名</label> */}
                    <input
                        id="name" name="name" type="text" required value={name}
                        onChange={(e) => { setName(e.target.value); clearErrorOnChange('name'); }}
                        // 输入框样式与 LoginForm 一致
                        className={`block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 shadow-sm transition-colors duration-150 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:border-blue-500 focus:ring-blue-500'}`}
                        placeholder="姓名" disabled={isLoading} aria-invalid={!!errors.name} aria-describedby="name-error"
                    />
                    {errors.name && <p id="name-error" className="mt-1.5 text-xs text-red-600">{errors.name}</p>}
                </div>

                 {/* Email Input */}
                 <div>
                    {/* <label htmlFor="email-register" className="sr-only">邮箱地址</label> */}
                    <input
                        id="email-register" name="email" type="email" required value={email}
                        onChange={(e) => { setEmail(e.target.value); clearErrorOnChange('email'); }}
                        className={`block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 shadow-sm transition-colors duration-150 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:border-blue-500 focus:ring-blue-500'}`}
                        placeholder="邮箱地址" disabled={isLoading} aria-invalid={!!errors.email} aria-describedby="email-error"
                    />
                    {errors.email && <p id="email-error" className="mt-1.5 text-xs text-red-600">{errors.email}</p>}
                 </div>

                 {/* Password Input */}
                 <div>
                     {/* <label htmlFor="password-register" className="sr-only">密码</label> */}
                     <input
                         id="password-register" name="password" type="password" required value={password}
                         onChange={(e) => { setPassword(e.target.value); clearErrorOnChange('password'); }}
                         className={`block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 shadow-sm transition-colors duration-150 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:border-blue-500 focus:ring-blue-500'}`}
                         placeholder="密码 (至少8位)" disabled={isLoading} aria-invalid={!!errors.password} aria-describedby="password-error"
                     />
                     {errors.password && <p id="password-error" className="mt-1.5 text-xs text-red-600">{errors.password}</p>}
                 </div>

                 {/* Confirm Password Input */}
                 <div>
                     {/* <label htmlFor="confirmPassword" className="sr-only">确认密码</label> */}
                     <input
                         id="confirmPassword" name="confirmPassword" type="password" required value={confirmPassword}
                         onChange={(e) => { setConfirmPassword(e.target.value); clearErrorOnChange('confirmPassword'); }}
                         className={`block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 shadow-sm transition-colors duration-150 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:border-blue-500 focus:ring-blue-500'}`}
                         placeholder="确认密码" disabled={isLoading} aria-invalid={!!errors.confirmPassword} aria-describedby="confirmPassword-error"
                     />
                     {errors.confirmPassword && <p id="confirmPassword-error" className="mt-1.5 text-xs text-red-600">{errors.confirmPassword}</p>}
                 </div>

                 {/* 表单级错误显示 */}
                 <div className="min-h-[20px] text-center text-sm">
                    {errors.form && ( <p className="text-red-600">{errors.form}</p> )}
                 </div>


                 {/* Submit Button */}
                 <button
                    type="submit"
                    // 按钮样式与 LoginForm 一致 (柔和灰色)
                    className={`relative flex w-full justify-center rounded-lg border-none bg-gray-100 px-6 py-2.5 text-sm font-medium text-gray-600 shadow-sm transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 disabled:opacity-70 ${isLoading ? 'cursor-not-allowed' : ''}`}
                    disabled={isLoading}
                 >
                    {isLoading ? <LoadingSpinnerGray /> : '创建账户'}
                 </button>

                 {/* Link back to Login */}
                 <p className="text-center text-sm text-gray-600">
                     已有账户？{' '}
                     {/* 使用 react-router-dom 的 Link 组件 */}
                     <Link to="/" className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline">
                         前往登录
                     </Link>
                 </p>
            </form>
        </div>
    );
}
