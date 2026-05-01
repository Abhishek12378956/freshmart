import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const socialLogin = useAuthStore((s) => s.socialLogin);

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    const success = await socialLogin(provider);
    if (success) {
      navigate('/home');
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-white flex items-center justify-center overflow-hidden">
      
      {/* Desktop Background Image (Subtle Hint) */}
      <div 
        className="hidden md:block absolute inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-10"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1920")' }}
      />

      {/* Mobile Background Image (sign-in.png - Paper Bag) */}
      <div 
        className="absolute inset-0 bg-contain bg-top bg-no-repeat md:hidden z-0"
        style={{ backgroundImage: 'url("/sign-in.png")' }}
      />

      {/* Login Content Container */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-end items-center px-8 pb-16 animate-slide-up">
        
        {/* Content Card (Semi-transparent for premium look) */}
        <div className="w-full max-w-[450px] bg-white/90 backdrop-blur-md p-8 rounded-[30px] shadow-2xl md:shadow-none md:bg-transparent">
          <h1 className="text-[#181725] text-[32px] font-semibold leading-tight mb-8">
            Get your groceries<br />with nectar
          </h1>

          {/* Phone Input Placeholder */}
          <div 
            className="flex items-center gap-3 border-b-2 border-gray-100 pb-3 mb-10 cursor-pointer hover:border-[#53B175] transition-colors"
            onClick={() => navigate('/signup')} 
          >
            <span className="text-2xl">🇧🇩</span>
            <span className="text-lg text-[#181725] font-medium">+880</span>
          </div>

          <div className="text-center mb-10">
            <p className="text-sm text-gray-400 font-semibold tracking-wider">
              Or connect with social media
            </p>
          </div>

          <div className="space-y-4">
            <button
              id="social-google"
              onClick={() => handleSocialLogin('google')}
              className="w-full h-[67px] rounded-[19px] flex items-center px-8 transition-all hover:opacity-90 active:scale-95 text-white"
              style={{ backgroundColor: '#5383EC' }}
            >
              <div className="w-6 h-6 flex items-center justify-center font-bold text-2xl pb-1">G</div>
              <span className="flex-1 text-lg font-semibold text-center pr-6">Continue with Google</span>
            </button>

            <button
              id="social-facebook"
              onClick={() => handleSocialLogin('facebook')}
              className="w-full h-[67px] rounded-[19px] flex items-center px-8 transition-all hover:opacity-90 active:scale-95 text-white"
              style={{ backgroundColor: '#4A66AC' }}
            >
              <div className="w-6 h-6 flex items-center justify-center font-bold text-2xl pb-1">f</div>
              <span className="flex-1 text-lg font-semibold text-center pr-6">Continue with Facebook</span>
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default LoginScreen;
