import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'error' | 'warning' | 'primary' | 'secondary';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary', className = '' }) => {
  const variants = {
    primary: 'bg-green-100 text-green-700',
    secondary: 'bg-gray-100 text-gray-600',
    success: 'bg-emerald-100 text-emerald-700',
    error: 'bg-red-100 text-red-700',
    warning: 'bg-amber-100 text-amber-700',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

interface FABProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

export const FAB: React.FC<FABProps> = ({ icon, className = '', ...props }) => {
  return (
    <button
      className={`w-16 h-16 bg-[#53B175] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#489963] active:scale-95 transition-all ${className}`}
      {...props}
    >
      {icon || (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
        </svg>
      )}
    </button>
  );
};

interface StarRatingProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md';
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, count, size = 'sm' }) => {
  const starSize = size === 'sm' ? 'text-xs' : 'text-sm';
  return (
    <div className={`flex items-center gap-1 ${starSize}`}>
      <span className="text-amber-400">★</span>
      <span className="font-semibold text-gray-700">{rating.toFixed(1)}</span>
      {count !== undefined && <span className="text-gray-400">({count})</span>}
    </div>
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children, variant = 'primary', size = 'md', loading, fullWidth, className = '', disabled, ...props
}) => {
  const base = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-400 shadow-md shadow-green-200',
    secondary: 'bg-white text-green-600 border-2 border-green-500 hover:bg-green-50 focus:ring-green-400',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400',
  };

  const sizes = {
    sm: 'text-sm px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, error, leftIcon, rightIcon, className = '', id, ...props }) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{leftIcon}</div>
        )}
        <input
          id={inputId}
          className={`w-full px-4 py-3 rounded-xl border-2 bg-white text-gray-900 placeholder-gray-400
            transition-all duration-200 outline-none
            ${error ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-green-500'}
            ${leftIcon ? 'pl-10' : ''}
            ${rightIcon ? 'pr-10' : ''}
            ${className}`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{rightIcon}</div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};
export * from './Modal';
export * from './OrderResultModal';
