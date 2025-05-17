// src/pages/auth/Login.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../config/routes';

// 加载图标
const LoadingSpinnerGray = ({ color = "#4B5563", size = 20 }: { color?: string; size?: number }) => {
  return (
    <svg className="animate-spin" style={{ color: color, height: size, width: size }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
};

// 占位符 Logo
const AppLogo = () => {
  return (
    <div className="mb-6 h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-2xl">
      L {/* 占位符 */}
    </div>
  );
};

const Login: React.FC = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  
  // 表单状态
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    // 前端基本验证
    if (!email || !/\S+@\S+\.\S+/.test(email)) { 
      setError('请输入有效的邮箱地址'); 
      return; 
    }
    if (!password) { 
      setError('请输入密码'); 
      return; 
    }
    if (password.length < 8) { 
      setError('密码长度不能少于8位'); 
      return; 
    }

    setIsLoading(true);
    
    try {
      // 使用 loginUser 方法进行登录
      const result = await loginUser(email, password);
      
      if (result.success) {
        console.log('登录成功，准备跳转到仪表盘');
        navigate(ROUTES.DASHBOARD.HOME);
      } else {
        setError(result.message || '登录失败');
      }
    } catch (error: any) {
      console.error('登录过程中发生错误:', error);
      setError(error.message || '登录过程中发生未知错误');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError(null);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError(null);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-10 shadow-2xl">
        {/* Logo 和标题 */}
        <div className="mb-10 flex flex-col items-center text-center">
          <AppLogo />
          <h1 className="mt-5 text-3xl font-medium text-gray-900">
            登录您的账户
          </h1>
        </div>
        
        {/* 登录表单 */}
        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          {/* 邮箱输入框 */}
          <div>
            <input
              id="email" 
              name="email" 
              type="email" 
              required 
              value={email} 
              onChange={handleEmailChange}
              className={`block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 shadow-sm transition-colors duration-150 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${error?.includes('邮箱') ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
              placeholder="电子邮箱或电话号码" 
              disabled={isLoading} 
              aria-invalid={!!error?.includes('邮箱')} 
              aria-describedby="form-error-msg"
            />
          </div>
          
          {/* 密码输入框 */}
          <div>
            <input
              id="password" 
              name="password" 
              type="password" 
              required 
              value={password} 
              onChange={handlePasswordChange}
              className={`block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 shadow-sm transition-colors duration-150 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${error?.includes('密码') ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
              placeholder="密码" 
              disabled={isLoading} 
              aria-invalid={!!error?.includes('密码')} 
              aria-describedby="form-error-msg"
            />
          </div>
          
          {/* 忘记密码链接 */}
          <div className="text-right text-sm">
            <Link 
              to={ROUTES.AUTH.FORGOT_PASSWORD} 
              className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline"
            >
              忘记了密码?
            </Link>
          </div>
          
          {/* 错误消息显示 */}
          <div className="min-h-[20px] text-center text-sm">
            {error && (<p id="form-error-msg" className="text-red-600">{error}</p>)}
          </div>
          
          {/* 登录按钮 */}
          <button 
            type="submit"
            className={`relative flex w-full justify-center rounded-lg border-none bg-gray-100 px-6 py-2.5 text-sm font-medium text-gray-600 shadow-sm transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 disabled:opacity-70 ${isLoading ? 'cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinnerGray /> : '登录'}
          </button>
          
          {/* 创建账户链接 */}
          <div className='text-center text-sm pt-2'>
            <p className="text-gray-600">
              还没有账户?{' '}
              <Link 
                to={ROUTES.AUTH.REGISTER} 
                className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline"
              >
                创建账户
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;