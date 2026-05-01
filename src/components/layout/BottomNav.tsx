import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';

const navItems = [
  { to: '/home', label: 'Shop', icon: '🏠', activeIcon: '🏠' },
  { to: '/search', label: 'Explore', icon: '🔍', activeIcon: '🔍' },
  { to: '/cart', label: 'Cart', icon: '🛒', activeIcon: '🛒' },
  { to: '/favorites', label: 'Favourite', icon: '🤍', activeIcon: '❤️' },
  { to: '/profile', label: 'Account', icon: '👤', activeIcon: '👤' },
];

const BottomNav: React.FC = () => {
  const totalItems = useCartStore((s) => s.getTotalItems());
  const location = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 shadow-xl md:hidden"
      aria-label="Bottom navigation"
    >
      <div className="flex items-center justify-around px-2 py-2 safe-bottom max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              id={`nav-${item.label.toLowerCase()}`}
              aria-label={item.label}
              className="flex flex-col items-center gap-0.5 flex-1 py-1 rounded-xl transition-all"
            >
              <div className={`relative flex items-center justify-center w-10 h-8 rounded-xl transition-all duration-200 ${isActive ? 'bg-green-50' : ''}`}>
                <span className="text-xl">{isActive ? item.activeIcon : item.icon}</span>
                {item.to === '/cart' && totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-green-600' : 'text-gray-400'}`}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
