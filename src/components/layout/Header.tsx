import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';

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
  showSearch = true,
  showCart = true,
  transparent,
}) => {
  const navigate = useNavigate();
  const totalItems = useCartStore((s) => s.getTotalItems());
  const user = useAuthStore((s) => s.user);

  return (
    <header
      className={`sticky top-0 z-30 transition-all ${transparent ? 'bg-transparent' : 'bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm'}`}
    >
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Go back"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {!showBack && (
          <Link to="/home" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white text-lg">🛒</span>
            </div>
            <span className="font-extrabold text-lg text-gray-900 hidden sm:block">
              Fresh<span className="text-green-500">Cart</span>
            </span>
          </Link>
        )}

        {title ? (
          <h1 className="flex-1 text-center font-bold text-gray-900 text-base">{title}</h1>
        ) : (
          <div className="flex-1 hidden md:block">
            {user && (
              <p className="text-sm text-gray-500">
                Welcome back, <span className="font-semibold text-gray-900">{user.name.split(' ')[0]}</span> 👋
              </p>
            )}
          </div>
        )}

        <div className="flex items-center gap-2 ml-auto">
          {showSearch && (
            <Link
              to="/search"
              className="hidden md:flex w-9 h-9 items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Search products"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
          )}

          {showCart && (
            <Link
              to="/cart"
              className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Shopping cart"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>
          )}

          {user && (
            <Link to="/profile" className="hidden md:flex" aria-label="User profile">
              <div className="w-9 h-9 rounded-xl overflow-hidden bg-green-100 flex items-center justify-center">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-green-600 font-bold text-sm">{user.name[0]}</span>
                )}
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
