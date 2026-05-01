import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

// Layout
import AppLayout from './components/layout/AppLayout';

// Auth screens
import SplashScreen from './screens/auth/SplashScreen';
import OnboardingScreen from './screens/auth/OnboardingScreen';
import LoginScreen from './screens/auth/LoginScreen';
import SignupScreen from './screens/auth/SignupScreen';
import OTPScreen from './screens/auth/OTPScreen';
import LocationScreen from './screens/auth/LocationScreen';
import EmailLoginScreen from './screens/auth/EmailLoginScreen';
import EmailSignupScreen from './screens/auth/EmailSignupScreen';

// Main screens
import HomeScreen from './screens/main/HomeScreen';
import SearchScreen from './screens/main/SearchScreen';
import ProductsScreen from './screens/main/ProductsScreen';
import ProductDetailScreen from './screens/main/ProductDetailScreen';
import CartScreen from './screens/main/CartScreen';
import FavoritesScreen from './screens/main/FavoritesScreen';
import ProfileScreen from './screens/main/ProfileScreen';
import OrdersScreen from './screens/main/OrdersScreen';

// Checkout screens
import CheckoutScreen from './screens/checkout/CheckoutScreen';
import OrderResultScreen from './screens/checkout/OrderResultScreen';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, hasLocation } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!hasLocation && location.pathname !== '/location') {
    return <Navigate to="/location" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/onboarding" element={<OnboardingScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/otp" element={<OTPScreen />} />
        <Route path="/email-login" element={<EmailLoginScreen />} />
        <Route path="/email-signup" element={<EmailSignupScreen />} />

        {/* Protected Routes */}
        <Route 
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/location" element={<LocationScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/search" element={<SearchScreen />} />
          <Route path="/products" element={<ProductsScreen />} />
          <Route path="/product/:id" element={<ProductDetailScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/favorites" element={<FavoritesScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/orders" element={<OrdersScreen />} />
          <Route path="/checkout" element={<CheckoutScreen />} />
          <Route path="/order-result" element={<OrderResultScreen />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
