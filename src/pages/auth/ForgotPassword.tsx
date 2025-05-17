// src/pages/auth/ForgotPassword.tsx
import React from 'react';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';

const ForgotPassword: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPassword;