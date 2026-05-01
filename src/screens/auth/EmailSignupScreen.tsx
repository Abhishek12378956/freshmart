import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui';
import { useAuthStore } from '../../store/authStore';

const EmailSignupScreen: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('Afsar Hossen Shuvo');
  const [email, setEmail] = useState('imshuvo97@gmail.com');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const signup = useAuthStore((s) => s.signup);

  const handleSignup = async () => {
    const success = await signup(username, email, '', password);
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
          <h1 className="text-2xl font-bold text-[#181725] mb-2">Sign Up</h1>
          <p className="text-gray-400 font-medium text-base">Enter your credentials to continue</p>
        </div>

        <div className="space-y-6 flex-1">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-400">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-b-2 border-gray-100 pb-3 text-lg text-[#181725] font-medium outline-none bg-transparent"
            />
          </div>

          <div className="space-y-1 relative">
            <label className="text-sm font-semibold text-gray-400">Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b-2 border-gray-100 pb-3 text-lg text-[#181725] font-medium outline-none bg-transparent"
              />
              <span className="absolute right-0 bottom-3 text-green-500 text-xl">✓</span>
            </div>
          </div>

          <div className="space-y-1 relative">
            <label className="text-sm font-semibold text-gray-400">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b-2 border-gray-100 pb-3 text-lg text-[#181725] font-medium outline-none bg-transparent pr-10"
            />
            <button 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 bottom-3 text-gray-400"
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>

          <div className="text-sm leading-relaxed text-gray-400 font-medium">
            By continuing you agree to our{' '}
            <span className="text-green-500 cursor-pointer">Terms of Service</span><br />
            and <span className="text-green-500 cursor-pointer">Privacy Policy.</span>
          </div>
        </div>

        <div className="mt-8">
          <Button
            id="email-signup-submit"
            fullWidth
            size="lg"
            onClick={handleSignup}
            className="bg-[#53B175] hover:bg-[#489963] h-[67px] text-lg font-semibold rounded-[19px] border-none"
          >
            Sign Up
          </Button>
        </div>

        <div className="mt-6 text-center pb-8">
          <p className="text-sm text-[#181725] font-bold">
            Already have an account?{' '}
            <button 
              onClick={() => navigate('/email-login')}
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

export default EmailSignupScreen;
