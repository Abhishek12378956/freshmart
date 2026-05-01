import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui';
import { useAuthStore } from '../../store/authStore';

const EmailLoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const login = useAuthStore((s) => s.login);
  const error = useAuthStore((s) => s.error);

  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center md:py-10">
      <div className="w-full min-h-screen md:min-h-0 md:max-w-[400px] md:h-[850px] md:rounded-[40px] md:shadow-2xl md:border-8 md:border-gray-800 bg-white flex flex-col overflow-hidden relative">
        
        {/* Hero Image */}
        <div 
          className="h-56 bg-cover bg-center shrink-0"
          style={{ backgroundImage: 'url("/sign-in.png")' }}
        />

        <div className="px-6 flex flex-col flex-1">
          <div className="flex flex-col items-center pt-8 mb-8">
            <span className="text-orange-500 text-5xl">🥕</span>
          </div>

        <div className="mb-10">
          <h1 className="text-2xl font-bold text-[#181725] mb-2">Loging</h1>
          <p className="text-gray-400 font-medium text-base">Enter your emails and password</p>
        </div>

        <div className="space-y-6 flex-1">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b-2 border-gray-100 pb-3 text-lg text-[#181725] font-medium outline-none bg-transparent"
            />
          </div>

          <div className="space-y-1 relative">
            <label className="text-sm font-semibold text-gray-400">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b-2 border-gray-100 pb-3 text-lg text-[#181725] font-medium outline-none bg-transparent"
            />
            <button 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 bottom-3 text-gray-400"
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          
          {error && <p className="text-red-500 text-xs">{error}</p>}

          <div className="text-right">
            <button className="text-sm font-semibold text-[#181725] hover:text-green-500 transition-colors">
              Forgot Password?
            </button>
          </div>
        </div>

        <div className="mt-8">
          <Button
            id="email-login-submit"
            fullWidth
            size="lg"
            onClick={handleLogin}
            className="bg-[#53B175] hover:bg-[#489963] h-[67px] text-lg font-semibold rounded-[19px] border-none"
          >
            Log In
          </Button>
        </div>

        <div className="mt-6 mb-8 text-center">
          <p className="text-sm text-[#181725] font-bold">
            Don’t have an account?{' '}
            <button 
              onClick={() => navigate('/email-signup')}
              className="text-green-500 hover:underline"
            >
              Signup
            </button>
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default EmailLoginScreen;
