import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigate('/home', { replace: true });
      } else {
        navigate('/onboarding', { replace: true });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, isAuthenticated]);

  return (
    <div className="fixed inset-0 bg-[#53B175] flex flex-col items-center justify-center z-[100] animate-fade-in">
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-4">
          <span className="text-white text-6xl">🥕</span>
          <div className="flex flex-col">
            <h1 className="text-white text-7xl font-bold tracking-tight leading-none">nectar</h1>
            <p className="text-white text-sm tracking-[0.3em] font-medium opacity-90 -mt-1 ml-1 uppercase">online groceries</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
