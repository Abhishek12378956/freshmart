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

  // For onboarding/splash/auth we don't want the max-w container
  const useWideLayout = noNavRoutes.includes(pathname);

  return (
    <div className="flex min-h-dvh bg-white md:bg-gray-50/50">
      {/* Desktop sidebar - Hidden on mobile, visible from md up */}
      {showNav && (
        <div className="hidden md:block w-64 lg:w-72 border-r border-gray-200 bg-white shrink-0">
          <DesktopSidebar />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 h-dvh overflow-hidden">
        {showHeader && (
          <div className="hidden md:block border-b border-gray-100 bg-white">
            <Header
              title={isProductDetail ? undefined : title}
              showBack={isProductDetail || pathname === '/checkout'}
              showSearch={!isProductDetail}
              showCart={true}
            />
          </div>
        )}
        
        <main 
          className={`flex-1 overflow-y-auto bg-white ${!useWideLayout ? 'md:max-w-7xl md:mx-auto md:w-full md:px-6 md:py-8' : ''}`}
          id="main-content" 
          role="main"
        >
          <Outlet />
        </main>

        {/* Mobile bottom nav - Visible on mobile only */}
        {showNav && (
          <div className="md:hidden">
            <BottomNav />
          </div>
        )}
      </div>
    </div>
  );
};

export default AppLayout;
