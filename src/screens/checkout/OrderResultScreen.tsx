import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../components/ui';

const OrderResultScreen: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const isError = state?.error === true;

  if (isError) {
    return (
      <div className="min-h-dvh bg-white flex flex-col items-center justify-center px-8 text-center">
        <div className="mb-10 relative">
          <div className="w-64 h-64 bg-gray-50 rounded-full flex items-center justify-center">
             {/* Mock grocery bag illustration with veggies */}
             <div className="text-8xl">🛍️</div>
          </div>
          <button 
            onClick={() => navigate(-1)}
            className="absolute top-0 left-0 w-8 h-8 flex items-center justify-center text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <h1 className="text-[28px] font-bold text-[#181725] mb-4 leading-tight px-4">
          Oops! Order Failed
        </h1>
        <p className="text-gray-400 text-base font-medium mb-12">
          Something went tembly wrong.
        </p>

        <div className="w-full space-y-4">
          <Button
            fullWidth
            size="lg"
            className="bg-[#53B175] hover:bg-[#489963] h-[67px] text-lg font-semibold rounded-[19px] border-none"
            onClick={() => navigate('/checkout')}
          >
            Please Try Again
          </Button>
          <button 
            onClick={() => navigate('/home')}
            className="text-lg font-bold text-[#181725] hover:text-green-500 transition-colors py-2"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-white flex flex-col items-center justify-center px-8 text-center bg-gradient-to-br from-white to-green-50/30">
      <div className="mb-12 relative scale-110">
        {/* Success checkmark with confetti decoration */}
        <div className="w-64 h-64 flex items-center justify-center relative">
           <div className="absolute inset-0 border-[6px] border-green-500 rounded-full opacity-10 animate-ping"></div>
           <div className="w-48 h-48 bg-[#53B175] rounded-full flex items-center justify-center shadow-xl shadow-green-200">
              <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
           </div>
           {/* Decorative dots/wavy lines */}
           <div className="absolute top-0 left-10 text-orange-400 text-2xl">✨</div>
           <div className="absolute bottom-10 right-0 text-blue-400 text-2xl">🎉</div>
           <div className="absolute top-20 right-0 text-purple-400 text-xl">🎈</div>
        </div>
      </div>

      <h1 className="text-[28px] font-bold text-[#181725] mb-4 leading-tight px-6">
        Your Order has been accepted
      </h1>
      <p className="text-gray-400 text-base font-medium mb-12 px-8">
        Your items has been placcd and is on its way to being processed
      </p>

      <div className="w-full space-y-4">
        <Button
          fullWidth
          size="lg"
          className="bg-[#53B175] hover:bg-[#489963] h-[67px] text-lg font-semibold rounded-[19px] border-none"
          onClick={() => navigate('/orders')}
        >
          Track Order
        </Button>
        <button 
          onClick={() => navigate('/home')}
          className="text-lg font-bold text-[#181725] hover:text-green-500 transition-colors py-2"
        >
          Back to home
        </button>
      </div>
    </div>
  );
};

export default OrderResultScreen;
