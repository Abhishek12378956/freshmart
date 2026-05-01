import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const menuItems = [
    { icon: '📦', label: 'Orders', action: () => navigate('/orders') },
    { icon: '📄', label: 'My Details', action: () => {} },
    { icon: '📍', label: 'Delivery Address', action: () => navigate('/location') },
    { icon: '💳', label: 'Payment Methods', action: () => {} },
    { icon: '🎫', label: 'Promo Card', action: () => {} },
    { icon: '🔔', label: 'Notifications', action: () => {} },
    { icon: '❓', label: 'Help', action: () => {} },
    { icon: 'ℹ️', label: 'About', action: () => {} },
  ];

  return (
    <div className="pb-24">
      {/* User Header */}
      <div className="px-6 pt-12 pb-8 flex items-center gap-5 border-b border-gray-100">
        <div className="w-16 h-16 rounded-[27px] overflow-hidden bg-gray-100 shrink-0 border border-gray-50 shadow-sm">
          {user?.avatar ? (
            <img src={user.avatar} alt={user?.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-green-500">
              {user?.name?.[0] ?? 'U'}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-[#181725] truncate">{user?.name ?? 'Test User'}</h2>
            <button className="text-green-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
          <p className="text-gray-400 font-medium text-base truncate">{user?.email ?? 'test@test.com'}</p>
        </div>
      </div>

      {/* Menu List */}
      <div className="mt-2 divide-y divide-gray-100">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={item.action}
            className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl w-8 text-center">{item.icon}</span>
              <span className="text-lg font-bold text-[#181725]">{item.label}</span>
            </div>
            <svg className="w-5 h-5 text-[#181725]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </div>

      {/* Logout Button */}
      <div className="px-6 mt-8 pb-10">
        <button
          onClick={handleLogout}
          className="w-full bg-[#F2F3F2] text-[#53B175] font-bold py-5 rounded-[19px] text-lg flex items-center justify-center gap-4 hover:bg-gray-100 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;
