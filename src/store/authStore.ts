import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

// Mock Users for testing
const MOCK_USERS: User[] = [
  {
    id: 'u-1',
    name: 'Test User',
    email: 'test@test.com',
    phone: '+880123456789',
    avatar: 'https://i.pravatar.cc/150?u=u-1',
    address: {
      id: 'addr-1',
      label: 'Home',
      street: 'Banasree Main Road',
      city: 'Dhaka',
      state: 'Dhaka',
      zip: '1219',
      isDefault: true,
    }
  }
];

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  otpSent: boolean;
  hasLocation: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  socialLogin: (provider: 'google' | 'facebook') => Promise<boolean>;
  signup: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  sendOtp: (phone: string) => Promise<boolean>;
  verifyOtp: (otp: string) => Promise<boolean>;
  setLocation: (zone: string, area: string) => void;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      otpSent: false,
      hasLocation: false,

      login: async (email: string, _password: string) => {
        set({ isLoading: true, error: null });
        await new Promise((res) => setTimeout(res, 1000));
        
        const mockUser = MOCK_USERS.find(u => u.email === email) || MOCK_USERS[0];
        
        if (email.includes('@')) {
          set({ user: mockUser, isAuthenticated: true, isLoading: false, hasLocation: !!mockUser.address });
          return true;
        } else {
          set({ error: 'Invalid email format', isLoading: false });
          return false;
        }
      },

      socialLogin: async (provider: 'google' | 'facebook') => {
        set({ isLoading: true, error: null });
        await new Promise((res) => setTimeout(res, 1200));
        
        const mockUser = MOCK_USERS[0];
        set({ user: mockUser, isAuthenticated: true, isLoading: false, hasLocation: !!mockUser.address });
        console.log(`Logged in with ${provider}`);
        return true;
      },

      signup: async (name: string, email: string, phone: string, _password: string) => {
        set({ isLoading: true, error: null });
        await new Promise((res) => setTimeout(res, 1500));
        
        const newUser: User = {
          id: 'u-' + Date.now(),
          name,
          email,
          phone,
        };
        
        set({ user: newUser, isAuthenticated: true, isLoading: false, hasLocation: false });
        return true;
      },

      sendOtp: async (phone: string) => {
        set({ isLoading: true, error: null });
        await new Promise((res) => setTimeout(res, 1000));
        if (phone.length >= 10) {
          set({ otpSent: true, isLoading: false });
          return true;
        }
        set({ error: 'Invalid phone number', isLoading: false });
        return false;
      },

      verifyOtp: async (otp: string) => {
        set({ isLoading: true, error: null });
        await new Promise((res) => setTimeout(res, 1000));
        if (otp === '1234') {
          // If verifying OTP for phone login
          if (!get().isAuthenticated) {
            const mockUser = MOCK_USERS[0];
            set({ user: mockUser, isAuthenticated: true, hasLocation: !!mockUser.address });
          }
          set({ isLoading: false, otpSent: false });
          return true;
        }
        set({ error: 'Invalid OTP code. Use 1234', isLoading: false });
        return false;
      },

      setLocation: (zone: string, area: string) => {
        const user = get().user;
        if (user) {
          set({ 
            user: { 
              ...user, 
              address: { 
                id: 'addr-' + Date.now(), 
                label: 'Selected', 
                street: area, 
                city: zone, 
                state: zone, 
                zip: '0000', 
                isDefault: true 
              } 
            },
            hasLocation: true 
          });
        } else {
          set({ hasLocation: true });
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, otpSent: false, error: null, hasLocation: false });
      },

      clearError: () => set({ error: null }),
    }),
    { 
      name: 'auth-storage', 
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated,
        hasLocation: state.hasLocation
      }) 
    }
  )
);
