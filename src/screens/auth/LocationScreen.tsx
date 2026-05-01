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
          <img 
            src="https://images.unsplash.com/photo-1526367790999-0150786486a9?auto=format&fit=crop&q=80&w=600" 
            alt="Location" 
            className="w-48 h-48 object-cover rounded-3xl mb-8 shrink-0"
          />
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
