import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';

// ── SVG Icons exactly matching Figma ──────────────────────────────────────────

const ShopIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#53B175' : '#6E7672'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
  </svg>
);

const ExploreIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#53B175' : '#6E7672'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    {active && <line x1="8" y1="11" x2="14" y2="11" strokeWidth="2.5" />}
    {active && <line x1="11" y1="8" x2="11" y2="14" strokeWidth="2.5" />}
  </svg>
);

const CartIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#53B175' : '#6E7672'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

const FavouriteIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#53B175' : 'none'} stroke={active ? '#53B175' : '#6E7672'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const AccountIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#53B175' : '#6E7672'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// ── Nav Items ─────────────────────────────────────────────────────────────────

const navItems = [
  { to: '/home',      label: 'Shop',      Icon: ShopIcon      },
  { to: '/search',    label: 'Explore',   Icon: ExploreIcon   },
  { to: '/cart',      label: 'Cart',      Icon: CartIcon      },
  { to: '/favorites', label: 'Favourite', Icon: FavouriteIcon },
  { to: '/profile',   label: 'Account',   Icon: AccountIcon   },
];

// ── Component ─────────────────────────────────────────────────────────────────

const BottomNav: React.FC = () => {
  const totalItems = useCartStore((s) => s.getTotalItems());
  const location = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 shadow-[0_-2px_16px_0_rgba(0,0,0,0.06)] md:hidden"
      aria-label="Bottom navigation"
    >
      {/* Figma home indicator pill */}
      <div className="flex justify-center pt-1 pb-0.5">
        <div className="w-24 h-1 bg-gray-200 rounded-full" />
      </div>

      <div className="flex items-center justify-around px-4 pb-4 pt-1 max-w-lg mx-auto">
        {navItems.map(({ to, label, Icon }) => {
          const isActive = location.pathname === to;
          return (
            <NavLink
              key={to}
              to={to}
              id={`nav-${label.toLowerCase()}`}
              aria-label={label}
              className="flex flex-col items-center gap-1 flex-1 relative"
            >
              <div className="relative flex items-center justify-center w-8 h-7">
                <Icon active={isActive} />
                {/* Cart badge */}
                {to === '/cart' && totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#53B175] text-white text-[9px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-0.5 leading-none">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </div>
              <span
                className={`text-[11px] font-semibold leading-none transition-colors ${
                  isActive ? 'text-[#53B175]' : 'text-[#6E7672]'
                }`}
              >
                {label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
