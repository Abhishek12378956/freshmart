import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';

const sidebarItems = [
  { to: '/home', label: 'Shop', icon: '🛒' },
  { to: '/search', label: 'Explore', icon: '🔍' },
  { to: '/favorites', label: 'Favourite', icon: '❤️' },
  { to: '/orders', label: 'Orders', icon: '📦' },
  { to: '/profile', label: 'Account', icon: '👤' },
];

const DesktopSidebar: React.FC = () => {
  const totalItems = useCartStore((s) => s.getTotalItems());
  const { user, logout } = useAuthStore();

  return (
    <aside className="flex flex-col h-full bg-white border-r border-gray-100">
      {/* Nectar Logo */}
      <div className="px-8 pt-10 pb-12 flex items-center justify-center">
        <span className="text-orange-500 text-4xl mr-2">🥕</span>
        <span className="text-2xl font-bold text-[#181725] tracking-tight">nectar</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {sidebarItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-4 px-6 py-4 rounded-[12px] font-bold text-lg transition-all ${
                isActive
                  ? 'text-[#53B175] bg-green-50/50'
                  : 'text-[#181725] hover:bg-gray-50'
              }`
            }
          >
            <span className="text-2xl">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}

        {/* Cart Special Item */}
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `flex items-center justify-between px-6 py-4 rounded-[12px] font-bold text-lg transition-all ${
              isActive
                ? 'text-[#53B175] bg-green-50/50'
                : 'text-[#181725] hover:bg-gray-50'
            }`
          }
        >
          <div className="flex items-center gap-4">
            <span className="text-2xl">🛍️</span>
            <span>Cart</span>
          </div>
          {totalItems > 0 && (
            <span className="bg-[#53B175] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </NavLink>
      </nav>

      {/* Footer / User */}
      <div className="p-6 border-t border-gray-50">
        {user && (
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
              {user.name[0]}
            </div>
            <div className="min-w-0">
              <p className="font-bold text-[#181725] text-sm truncate">{user.name}</p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-[12px] bg-gray-50 text-gray-400 font-bold hover:bg-gray-100 hover:text-red-500 transition-all"
        >
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default DesktopSidebar;
