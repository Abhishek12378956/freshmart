import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { useOrderStore } from '../../store/orderStore';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../../components/ui';
import type { Address } from '../../types';

const CartScreen: React.FC = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, getTotalPrice, getDeliveryFee, getDiscount, clearCart } = useCartStore();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (items.length === 0) {
    return (
      <div className="min-h-[70dvh] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-64 h-64 bg-gray-50 rounded-full flex items-center justify-center mb-8">
          <span className="text-8xl">🛒</span>
        </div>
        <h2 className="text-2xl font-bold text-[#181725] mb-2">Your cart is empty!</h2>
        <p className="text-gray-400 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Button onClick={() => navigate('/home')} className="bg-[#53B175] rounded-[19px] px-10">Shop Now</Button>
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const delivery = getDeliveryFee();
  const discount = getDiscount();
  const total = subtotal + delivery - discount;

  return (
    <div className="pb-32 px-6">
      <h1 className="text-xl font-bold text-[#181725] text-center pt-6 mb-8">My Cart</h1>

      <div className="divide-y divide-gray-100">
        {items.map((item) => (
          <div key={item.product.id} className="py-6 flex items-center gap-4">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-20 h-20 object-contain"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <h3 className="text-base font-bold text-[#181725] truncate">{item.product.name}</h3>
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="text-gray-400 hover:text-red-500 flex-shrink-0"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-400 font-medium mb-3">{item.product.unit}, Price</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                    className="w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center text-xl text-gray-400"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-base font-bold text-[#181725]">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center text-xl text-green-500"
                  >
                    +
                  </button>
                </div>
                <span className="text-lg font-bold text-[#181725]">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Checkout Button */}
      <div className="fixed bottom-24 left-0 right-0 px-6 pb-6 bg-gradient-to-t from-white via-white to-transparent pt-4">
        <button
          onClick={() => setIsCheckoutOpen(true)}
          className="w-full bg-[#53B175] text-white font-bold py-5 px-8 rounded-[19px] text-lg flex items-center justify-between hover:bg-[#489963] shadow-lg transition-all active:scale-95"
        >
          <span className="flex-1 text-center pl-10">Go to Checkout</span>
          <span className="bg-[#489963] px-3 py-1 rounded-md text-xs font-bold">
            ${total.toFixed(2)}
          </span>
        </button>
      </div>

      {isCheckoutOpen && (
        <CheckoutSheet
          items={items}
          total={total}
          delivery={delivery}
          discount={discount}
          onClose={() => setIsCheckoutOpen(false)}
          onSuccess={() => {
            clearCart();
            setIsCheckoutOpen(false);
            navigate('/order-result', { state: { error: false } });
          }}
          onFailure={() => {
            setIsCheckoutOpen(false);
            navigate('/order-result', { state: { error: true } });
          }}
        />
      )}
    </div>
  );
};

// ─── CheckoutSheet ───────────────────────────────────────────────────────────

interface CheckoutSheetProps {
  items: ReturnType<typeof useCartStore.getState>['items'];
  total: number;
  delivery: number;
  discount: number;
  onClose: () => void;
  onSuccess: () => void;
  onFailure: () => void;
}

const CheckoutSheet: React.FC<CheckoutSheetProps> = ({
  items,
  total,
  delivery,
  discount,
  onClose,
  onSuccess,
  onFailure,
}) => {
  const { placeOrder, isProcessing } = useOrderStore();
  const user = useAuthStore((s) => s.user);

  const handlePlaceOrder = async () => {
    const deliveryAddress: Address = {
      id: 'addr-cart',
      label: 'Home',
      street: user?.address?.street ?? '123 Main Street',
      city: user?.address?.city ?? 'Mumbai',
      state: user?.address?.state ?? 'MH',
      zip: user?.address?.zip ?? '400001',
      isDefault: true,
    };

    await placeOrder(items, deliveryAddress, 'Cash on Delivery', total);

    const lastStatus = useOrderStore.getState().lastOrderStatus;
    if (lastStatus === 'FAILED') {
      onFailure();
    } else {
      onSuccess();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm px-0 md:px-6">
      <div className="w-full max-w-md bg-white rounded-t-[30px] md:rounded-[30px] p-6 md:p-8 animate-slide-up shadow-2xl">
        <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-6">
          <h2 className="text-2xl font-bold text-[#181725]">Checkout</h2>
          <button onClick={onClose} className="text-3xl font-light hover:text-red-500 transition-colors">×</button>
        </div>

        <div className="space-y-1">
          <CheckoutItem label="Delivery" value="Standard (30–45 min)" />
          <CheckoutItem label="Payment" value="Cash on Delivery" />
          {discount > 0 && <CheckoutItem label="Discount" value={`-$${discount.toFixed(2)}`} />}
          <CheckoutItem label="Delivery Fee" value={delivery === 0 ? 'FREE 🎉' : `$${delivery.toFixed(2)}`} />
          <CheckoutItem label="Total Cost" value={`$${total.toFixed(2)}`} />
        </div>

        <div className="mt-8 text-sm text-gray-400 font-medium leading-relaxed">
          By placing an order you agree to our{' '}
          <span className="text-[#181725] font-bold underline cursor-pointer">Terms</span> And{' '}
          <span className="text-[#181725] font-bold underline cursor-pointer">Conditions</span>
        </div>

        <Button
          fullWidth
          size="lg"
          loading={isProcessing}
          className="mt-10 bg-[#53B175] hover:bg-[#489963] h-[67px] text-lg font-semibold rounded-[19px] border-none shadow-lg shadow-green-100"
          onClick={handlePlaceOrder}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Place Order'}
        </Button>
      </div>
    </div>
  );
};

// ─── CheckoutItem ─────────────────────────────────────────────────────────────

const CheckoutItem: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="flex items-center justify-between py-5 border-b border-gray-50">
    <span className="text-lg font-semibold text-gray-400">{label}</span>
    <div className="flex items-center gap-3">
      <span className="text-base font-bold text-[#181725]">{value}</span>
      <svg className="w-5 h-5 text-[#181725]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </div>
);

export default CartScreen;
