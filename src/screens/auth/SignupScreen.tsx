import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FAB } from '../../components/ui';
import { useAuthStore } from '../../store/authStore';

const SignupScreen: React.FC = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const sendOtp = useAuthStore((s) => s.sendOtp);
  const error = useAuthStore((s) => s.error);

  const handleNext = async () => {
    const success = await sendOtp(phone);
    if (success) {
      navigate('/otp');
    }
  };

  return (
    <div className="min-h-dvh bg-white flex flex-col px-6">
      <div className="pt-6">
        <button 
          onClick={() => navigate('/login')}
          className="w-10 h-10 flex items-center justify-start"
        >
          <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="mt-10">
        <h1 className="text-2xl font-bold text-[#181725] mb-8">
          Enter your mobile number
        </h1>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-400">Mobile Number</label>
          <div className="flex items-center gap-3 border-b-2 border-gray-100 pb-3">
            <span className="text-2xl">🇧🇩</span>
            <span className="text-lg text-[#181725] font-medium">+880</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 text-lg text-[#181725] font-medium outline-none bg-transparent"
              placeholder=""
              autoFocus
            />
          </div>
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-end pb-12 pr-2">
        <FAB onClick={handleNext} />
      </div>
    </div>
  );
};

export default SignupScreen;
