    // src/app/register/page.tsx (注册页面)

    import RegisterForm from '@/components/RegisterForm'; // 1. 导入注册表单组件 (使用路径别名)
    // 或者使用相对路径: import RegisterForm from '../../components/RegisterForm';
    import '../../index.css'; // 2. 导入全局 CSS (确保路径正确)

    // 3. 定义并导出页面组件
    export default function RegisterPage() {
      return (
        // 4. 使用与登录/忘记密码页一致的布局
        <div className="flex min-h-screen items-center justify-center bg-white p-4"> {/* 使用白色背景 */}
          <RegisterForm /> {/* 5. 渲染注册表单 */}
        </div>
      );
    }
    