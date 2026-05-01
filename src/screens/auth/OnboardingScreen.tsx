import React from 'react';
import { useNavigate } from 'react-router-dom';

const OnboardingScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full bg-black flex flex-col justify-end items-center">
      
      {/* Mobile Background Image (Portrait) */}
      <div 
        className="absolute inset-0 bg-cover bg-top bg-no-repeat md:hidden"
        style={{ backgroundImage: 'url("/Group%201.png")' }}
      >
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/20" /> 
      </div>

      {/* Desktop Background Image (Landscape - Unsplash) */}
      <div 
        className="hidden md:block absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=1920")' }}
      >
        {/* Slightly darker overlay for desktop text readability */}
        <div className="absolute inset-0 bg-black/40" /> 
      </div>

      {/* Content Section */}
      <div className="relative z-10 w-full max-w-[450px] px-8 pb-16 flex flex-col items-center text-center animate-slide-up">
        
        {/* White Filled Carrot Icon */}
        <div className="mb-6">
          <svg width="48" height="56" viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Leaves (strokes) */}
            <path d="M24 0C24 0 24 5.33333 19.5 8C15 10.6667 9 10.6667 9 10.6667M24 0C24 0 24 5.33333 28.5 8C33 10.6667 39 10.6667 39 10.6667M24 0V10.6667" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            {/* Solid Body (fill) */}
            <path d="M24 10.6667C30.6274 10.6667 36 16.0393 36 22.6667C36 34.6667 24 56 24 56C24 56 12 34.6667 12 22.6667C12 16.0393 17.3726 10.6667 24 10.6667Z" fill="white"/>
          </svg>
        </div>
        
        <h1 className="text-white text-[48px] font-semibold leading-[1.1] mb-2 tracking-tight">
          Welcome<br />to our store
        </h1>
        <p className="text-white/70 text-base mb-10 font-medium">
          Get your groceries in as fast as one hour
        </p>

        <button 
          id="onboarding-get-started" 
          onClick={() => navigate('/login')}
          className="w-full flex items-center justify-center h-[67px] text-lg font-semibold rounded-[19px] text-white transition-all hover:opacity-90 active:scale-95 shadow-xl shadow-green-900/20"
          style={{ backgroundColor: '#53B175' }}
        >
          Get Started
        </button>
      </div>

    </div>
  );
};

export default OnboardingScreen;
