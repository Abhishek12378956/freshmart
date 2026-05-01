import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showSearch?: boolean;
  showCart?: boolean;
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBack,
  transparent,
}) => {
  const navigate = useNavigate();
  const totalItems = useCartStore((s) => s.getTotalItems());

  return (
    <header
      className={`sticky top-0 z-30 transition-all ${transparent ? 'bg-transparent' : 'bg-white/95 backdrop-blur-sm border-b border-gray-100'}`}
    >
      <div className="px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-50 transition-colors"
              aria-label="Go back"
            >
              <svg className="w-6 h-6 text-[#181725]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {!title && !showBack && (
            <div className="flex items-center gap-1 cursor-pointer" onClick={() => navigate('/home')}>
              <span className="text-orange-500 text-2xl">🥕</span>
              <span className="text-xl font-bold text-[#181725] tracking-tight">nectar</span>
            </div>
          )}
        </div>

        {title && (
          <h1 className="absolute left-1/2 -translate-x-1/2 font-bold text-[#181725] text-lg">{title}</h1>
        )}

        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/search')}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-50"
          >
            <svg className="w-5 h-5 text-[#181725]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          <button 
            onClick={() => navigate('/cart')}
            className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-50"
          >
            <svg className="w-5 h-5 text-[#181725]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 bg-[#53B175] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
