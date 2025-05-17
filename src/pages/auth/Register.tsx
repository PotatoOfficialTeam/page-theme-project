// src/pages/auth/Register.tsx
import React from 'react';
import RegisterForm from '../../components/auth/RegisterForm';

const Register: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <RegisterForm />
    </div>
  );
};

export default Register;