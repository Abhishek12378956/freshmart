import React from 'react';
import { Modal } from './Modal';
import { Button } from './index';
import { useNavigate } from 'react-router-dom';

interface OrderResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error';
  onRetry?: () => void;
}

export const OrderResultModal: React.FC<OrderResultModalProps> = ({ isOpen, onClose, type, onRetry }) => {
  const navigate = useNavigate();

  const isError = type === 'error';

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative p-8 pt-10 flex flex-col items-center text-center">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 left-6 text-2xl text-gray-800 hover:text-black transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Illustration Container */}
        <div className="mb-10 w-56 h-56 relative flex items-center justify-center">
          {/* Pale Green Circle Background */}
          <div className="absolute inset-0 bg-[#F2F3F2] rounded-full scale-110 opacity-60" />
          
          {isError ? (
            <div className="relative z-10 w-48 h-48 flex items-center justify-center">
               {/* High-fidelity SVG Grocery Bag Illustration */}
               <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
                 {/* Bag */}
                 <path d="M60 70L50 170H150L140 70H60Z" fill="#D3A67E"/>
                 <path d="M60 70L55 120L145 120L140 70H60Z" fill="#C4956A"/>
                 
                 {/* Veggies */}
                 <rect x="85" y="40" width="12" height="40" rx="6" fill="#8B4513"/> {/* Bread */}
                 <path d="M110 30C110 30 115 50 115 60C115 70 110 80 110 80" stroke="#489963" strokeWidth="8" strokeLinecap="round"/> {/* Leek */}
                 <circle cx="100" cy="55" r="12" fill="#9B59B6"/> {/* Eggplant */}
                 <circle cx="75" cy="65" r="10" fill="#E67E22"/> {/* Carrot body */}
                 <path d="M75 55L75 40" stroke="#27AE60" strokeWidth="4" strokeLinecap="round"/> {/* Carrot top */}
                 <circle cx="125" cy="65" r="12" fill="#F1C40F"/> {/* Pepper */}
               </svg>
            </div>
          ) : (
            <div className="relative z-10 w-40 h-40 bg-[#53B175] rounded-full flex items-center justify-center shadow-xl shadow-green-100">
               <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
               </svg>
            </div>
          )}
        </div>

        {/* Text Content */}
        <div className="mb-10">
          <h2 className="text-[28px] font-bold text-[#181725] mb-3 leading-tight">
            {isError ? 'Oops! Order Failed' : 'Your Order has\nbeen accepted'}
          </h2>
          <p className="text-gray-400 text-base font-medium px-4 leading-relaxed">
            {isError 
              ? 'Something went terribly wrong.' 
              : 'Your items have been placed and are on their way to being processed'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-2">
          <Button
            fullWidth
            size="lg"
            className="bg-[#53B175] hover:bg-[#489963] h-[67px] text-lg font-semibold rounded-[19px] border-none"
            onClick={isError ? (onRetry || onClose) : () => navigate('/orders')}
          >
            {isError ? 'Please Try Again' : 'Track Order'}
          </Button>
          
          <button 
            onClick={() => {
              onClose();
              navigate('/home');
            }}
            className="w-full py-4 text-lg font-bold text-[#181725] hover:text-[#53B175] transition-colors"
          >
            Back to home
          </button>
        </div>
      </div>
    </Modal>
  );
};
