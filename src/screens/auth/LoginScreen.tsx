import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui';
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
    <div className="min-h-dvh bg-white flex flex-col">
      {/* Header Image */}
      <div 
        className="h-64 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&q=80&w=1000")' }}
      />

      <div className="px-6 flex flex-col pt-8">
        <h1 className="text-2xl font-bold text-[#181725] leading-tight mb-8">
          Get your groceries<br />with nectar
        </h1>

        {/* Phone Input Placeholder */}
        <div 
          className="flex items-center gap-3 border-b-2 border-gray-100 pb-3 mb-10 cursor-pointer"
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
          <Button
            id="social-google"
            fullWidth
            onClick={() => handleSocialLogin('google')}
            className="bg-[#5383EC] hover:bg-[#4275E0] h-[67px] rounded-[19px] flex items-center justify-start px-8 gap-10 border-none"
          >
            <div className="w-6 h-6 flex items-center justify-center font-bold text-xl">G</div>
            <span className="text-lg font-semibold text-white">Continue with Google</span>
          </Button>

          <Button
            id="social-facebook"
            fullWidth
            onClick={() => handleSocialLogin('facebook')}
            className="bg-[#4A66AC] hover:bg-[#3D5591] h-[67px] rounded-[19px] flex items-center justify-start px-8 gap-10 border-none"
          >
            <div className="w-6 h-6 flex items-center justify-center font-bold text-xl text-white">f</div>
            <span className="text-lg font-semibold text-white">Continue with Facebook</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
