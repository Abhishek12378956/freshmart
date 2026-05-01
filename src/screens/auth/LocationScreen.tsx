import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui';
import { useAuthStore } from '../../store/authStore';

const LocationScreen: React.FC = () => {
  const navigate = useNavigate();
  const [zone, setZone] = useState('Banasree');
  const [area, setArea] = useState('');
  const setLocation = useAuthStore((s) => s.setLocation);

  const handleSubmit = () => {
    setLocation(zone, area || 'Types of your area');
    navigate('/home');
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center md:py-10">
      <div className="w-full min-h-screen md:min-h-0 md:max-w-[400px] md:h-[850px] md:rounded-[40px] md:shadow-2xl md:border-8 md:border-gray-800 bg-white flex flex-col overflow-hidden relative px-6">
        <div className="pt-6 shrink-0">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-start"
          >
            <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col items-center mt-4 flex-1 overflow-y-auto hide-scrollbar">
          {/* Google Maps-style location illustration — matches Figma */}
          <div className="w-52 h-52 mb-8 shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
              {/* Map background */}
              <rect width="200" height="200" rx="20" fill="#E8EAF0"/>

              {/* Map road grid */}
              <rect x="0" y="88" width="200" height="22" fill="#FFFFFF" opacity="0.9"/>
              <rect x="88" y="0" width="22" height="200" fill="#FFFFFF" opacity="0.9"/>

              {/* Green area (park) */}
              <rect x="30" y="30" width="50" height="50" rx="8" fill="#A8D5A2" opacity="0.8"/>
              {/* Beige area (building block) */}
              <rect x="120" y="30" width="50" height="50" rx="8" fill="#F5CBA7" opacity="0.8"/>
              {/* Blue area (water/block) */}
              <rect x="30" y="118" width="50" height="50" rx="8" fill="#AED6F1" opacity="0.8"/>
              {/* Yellow area (block) */}
              <rect x="120" y="118" width="50" height="50" rx="8" fill="#F9E79F" opacity="0.8"/>

              {/* Road lines */}
              <line x1="0" y1="99" x2="200" y2="99" stroke="#D5D8DC" strokeWidth="1" strokeDasharray="6 4"/>
              <line x1="99" y1="0" x2="99" y2="200" stroke="#D5D8DC" strokeWidth="1" strokeDasharray="6 4"/>

              {/* Location pin shadow */}
              <ellipse cx="99" cy="132" rx="14" ry="5" fill="#000000" opacity="0.12"/>

              {/* Location pin body */}
              <path d="M99 55 C81 55 67 69 67 87 C67 108 99 130 99 130 C99 130 131 108 131 87 C131 69 117 55 99 55Z" fill="#5B8DEF"/>
              {/* Pin highlight */}
              <path d="M99 55 C81 55 67 69 67 87 C67 108 99 130 99 130 C99 130 131 108 131 87 C131 69 117 55 99 55Z" fill="url(#pinGrad)"/>

              {/* Pin inner circle */}
              <circle cx="99" cy="87" r="14" fill="white"/>
              <circle cx="99" cy="87" r="9" fill="#5B8DEF"/>

              <defs>
                <radialGradient id="pinGrad" cx="40%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#7FB3FF"/>
                  <stop offset="100%" stopColor="#3D6FD4"/>
                </radialGradient>
              </defs>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#181725] mb-3">
            Select Your Location
          </h1>
          <p className="text-center text-gray-400 text-base font-medium px-4 mb-10 leading-relaxed">
            Switch on your location to stay in tune with what’s happening in your area
          </p>

          <div className="w-full space-y-8">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-400">Your Zone</label>
              <div className="relative border-b-2 border-gray-100 pb-3 flex items-center">
                <select
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  className="w-full appearance-none text-lg text-[#181725] font-medium outline-none bg-transparent pr-8"
                >
                  <option value="Banasree">Banasree</option>
                  <option value="Gulshan">Gulshan</option>
                  <option value="Dhanmondi">Dhanmondi</option>
                </select>
                <svg className="absolute right-0 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-400">Your Area</label>
              <div className="relative border-b-2 border-gray-100 pb-3 flex items-center">
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full appearance-none text-lg text-gray-300 font-medium outline-none bg-transparent pr-8"
                >
                  <option value="" disabled>Types of your area</option>
                  <option value="Area 1">Area 1</option>
                  <option value="Area 2">Area 2</option>
                </select>
                <svg className="absolute right-0 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="w-full mt-12 pb-10">
            <Button
              id="location-submit"
              fullWidth
              size="lg"
              onClick={handleSubmit}
              className="bg-[#53B175] hover:bg-[#489963] h-[67px] text-lg font-semibold rounded-[19px] border-none"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationScreen;
