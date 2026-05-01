import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui';

const OnboardingScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-dvh w-full overflow-hidden flex flex-col justify-end bg-black">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 scale-105"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=1200")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-8 pb-16 flex flex-col items-center text-center animate-slide-up">
        {/* White Carrot Icon */}
        <div className="mb-6">
          <svg width="48" height="56" viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 0C24 0 24 5.33333 19.5 8C15 10.6667 9 10.6667 9 10.6667M24 0C24 0 24 5.33333 28.5 8C33 10.6667 39 10.6667 39 10.6667M24 0V10.6667M24 10.6667C30.6274 10.6667 36 16.0393 36 22.6667C36 34.6667 24 56 24 56C24 56 12 34.6667 12 22.6667C12 16.0393 17.3726 10.6667 24 10.6667Z" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <h1 className="text-white text-[48px] font-bold leading-[1.1] mb-2 tracking-tight">
          Welcome<br />to our store
        </h1>
        <p className="text-white/70 text-base mb-10 font-medium">
          Get your groceries in as fast as one hour
        </p>

        <Button 
          id="onboarding-get-started" 
          fullWidth 
          size="lg" 
          onClick={() => navigate('/login')}
          className="bg-[#53B175] hover:bg-[#489963] h-[67px] text-lg font-semibold rounded-[19px] border-none shadow-xl shadow-green-900/20"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default OnboardingScreen;
