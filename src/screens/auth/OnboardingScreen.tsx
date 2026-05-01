import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui';

const OnboardingScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-dvh w-full overflow-hidden flex flex-col justify-end bg-black">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-8 pb-16 flex flex-col items-center text-center animate-slide-up">
        <span className="text-white text-5xl mb-4">🥕</span>
        <h1 className="text-white text-4xl font-bold leading-tight mb-2">
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
          className="bg-[#53B175] hover:bg-[#489963] h-[67px] text-lg font-semibold rounded-[19px] border-none"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default OnboardingScreen;
