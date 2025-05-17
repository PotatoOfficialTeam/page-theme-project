// src/pages/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../config/routes';

const NotFound: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 text-center">
      <h1 className="mb-4 text-6xl font-bold text-red-500">404</h1>
      <p className="mb-8 text-xl text-gray-700">抱歉，您请求的页面不存在。</p>
      <Link
        to={ROUTES.DASHBOARD.ROOT}
        className="rounded-lg bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600"
      >
        返回首页
      </Link>
    </div>
  );
};

export default NotFound;