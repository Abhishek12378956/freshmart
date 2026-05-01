import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FAB } from '../../components/ui';
import { useAuthStore } from '../../store/authStore';

const OTPScreen: React.FC = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const verifyOtp = useAuthStore((s) => s.verifyOtp);
  const error = useAuthStore((s) => s.error);

  const handleVerify = async () => {
    const success = await verifyOtp(code);
    if (success) {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center md:py-10">
      <div className="w-full min-h-screen md:min-h-0 md:max-w-[400px] md:h-[850px] md:rounded-[40px] md:shadow-2xl md:border-8 md:border-gray-800 bg-white flex flex-col overflow-hidden relative px-6">
        <div className="pt-6 shrink-0">
          <button 
            onClick={() => navigate('/signup')}
            className="w-10 h-10 flex items-center justify-start"
          >
            <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        <div className="mt-10 flex-1">
          <h1 className="text-2xl font-bold text-[#181725] mb-8">
            Enter your 4-digit code
          </h1>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-400">Code</label>
            <div className="flex items-center gap-3 border-b-2 border-gray-100 pb-3">
              <input
                type="text"
                maxLength={4}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 text-lg text-[#181725] font-medium outline-none bg-transparent tracking-[1em]"
                placeholder="- - - -"
                autoFocus
              />
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <button className="mt-8 text-green-500 font-semibold text-base hover:opacity-80 transition-opacity">
            Resend Code
          </button>
        </div>

        <div className="flex items-center justify-end pb-12 pr-2 shrink-0">
          <FAB onClick={handleVerify} />
        </div>
      </div>
    </div>
  );
};

export default OTPScreen;
