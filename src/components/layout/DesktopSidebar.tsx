import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';

const sidebarItems = [
  { to: '/home', label: 'Home', icon: '🏠' },
  { to: '/search', label: 'Search', icon: '🔍' },
  { to: '/favorites', label: 'Favorites', icon: '❤️' },
  { to: '/orders', label: 'Orders', icon: '📦' },
  { to: '/profile', label: 'Profile', icon: '👤' },
];

const DesktopSidebar: React.FC = () => {
  const totalItems = useCartStore((s) => s.getTotalItems());
  const { user, logout } = useAuthStore();

  return (
    <aside className="hidden xl:flex flex-col w-64 shrink-0 bg-white border-r border-gray-100 h-screen sticky top-0 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
          <span className="text-white text-xl">🛒</span>
        </div>
        <div>
          <h1 className="font-extrabold text-lg text-gray-900">
            Fresh<span className="text-green-500">Cart</span>
          </h1>
          <p className="text-xs text-gray-400">Grocery delivery</p>
        </div>
      </div>

      {/* User info */}
      {user && (
        <div className="px-4 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-green-100 shrink-0">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span className="w-full h-full flex items-center justify-center text-green-600 font-bold">{user.name[0]}</span>
              )}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 text-sm truncate">{user.name}</p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1" aria-label="Sidebar navigation">
        {sidebarItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            id={`sidebar-${item.label.toLowerCase()}`}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-green-500 text-white shadow-md shadow-green-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}

        {/* Cart link */}
        <NavLink
          to="/cart"
          id="sidebar-cart"
          className={({ isActive }) =>
            `flex items-center justify-between gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
              isActive
                ? 'bg-green-500 text-white shadow-md shadow-green-200'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`
          }
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">🛒</span>
            <span>Cart</span>
          </div>
          {totalItems > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
              {totalItems}
            </span>
          )}
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="px-4 py-4 border-t border-gray-100">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
          aria-label="Log out"
        >
          <span className="text-lg">🚪</span>
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default DesktopSidebar;
