import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';
import DesktopSidebar from './DesktopSidebar';

const noHeaderRoutes = ['/', '/onboarding', '/login', '/signup', '/otp', '/location', '/order-result'];
const noNavRoutes = ['/', '/onboarding', '/login', '/signup', '/otp', '/location', '/order-result'];

const headerTitles: Record<string, string> = {
  '/cart': '🛒 Cart',
  '/favorites': '❤️ Favorites',
  '/checkout': '📋 Checkout',
  '/profile': '👤 Profile',
  '/products': '🛍️ Products',
  '/orders': '📦 My Orders',
  '/search': '🔍 Search',
};

const AppLayout: React.FC = () => {
  const { pathname } = useLocation();
  const showHeader = !noHeaderRoutes.includes(pathname);
  const showNav = !noNavRoutes.includes(pathname);
  const isProductDetail = pathname.startsWith('/product/');
  const title = headerTitles[pathname];

  return (
    <div className="flex min-h-dvh bg-gray-50">
      {/* Desktop sidebar */}
      {showNav && <DesktopSidebar />}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {showHeader && (
          <Header
            title={isProductDetail ? undefined : title}
            showBack={isProductDetail || pathname === '/checkout'}
            showSearch={!isProductDetail}
            showCart={!noNavRoutes.includes(pathname)}
          />
        )}
        <main className="flex-1" id="main-content" role="main">
          <Outlet />
        </main>
      </div>

      {/* Mobile bottom nav */}
      {showNav && <BottomNav />}
    </div>
  );
};

export default AppLayout;
