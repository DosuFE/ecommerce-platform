'use client';

// import { useState } from 'react';
// import Login from '../components/login';
// import Register from '../components/register';
import DashboardPage from '../dashboard/page';

export default function AccountPage() {
  // const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <DashboardPage/>
    </div>
  );
}
