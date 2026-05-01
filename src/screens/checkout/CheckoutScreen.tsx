import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { useOrderStore } from '../../store/orderStore';
import { useAuthStore } from '../../store/authStore';
import { Button, Input } from '../../components/ui';
import type { Address } from '../../types';

const paymentMethods = [
  { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
  { id: 'upi', label: 'UPI / Digital Wallet', icon: '📱' },
  { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
];

const CheckoutScreen: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, getDeliveryFee, getDiscount, clearCart } = useCartStore();
  const { placeOrder, isProcessing } = useOrderStore();
  const user = useAuthStore((s) => s.user);

  const [step, setStep] = useState<'address' | 'payment' | 'review'>('address');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [address, setAddress] = useState<Partial<Address>>({
    label: 'Home',
    street: user?.address?.street ?? '',
    city: user?.address?.city ?? 'San Francisco',
    state: user?.address?.state ?? 'CA',
    zip: user?.address?.zip ?? '',
  });

  const subtotal = getTotalPrice();
  const delivery = getDeliveryFee();
  const discount = getDiscount();
  const total = subtotal + delivery - discount;

  const handlePlaceOrder = async () => {
    const deliveryAddress: Address = {
      id: 'addr-checkout',
      label: address.label ?? 'Home',
      street: address.street ?? '',
      city: address.city ?? '',
      state: address.state ?? '',
      zip: address.zip ?? '',
      isDefault: false,
    };
    await placeOrder(items, deliveryAddress, paymentMethod, total);
    clearCart();
    navigate('/order-result', { replace: true });
  };

  const steps = ['address', 'payment', 'review'];
  const stepIdx = steps.indexOf(step);

  return (
    <div className="pb-8 min-h-dvh bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 pt-4">
        {/* Step progress */}
        <div className="flex items-center gap-0 mb-6">
          {['Delivery', 'Payment', 'Review'].map((label, i) => (
            <React.Fragment key={label}>
              <div className={`flex flex-col items-center ${i <= stepIdx ? 'text-green-600' : 'text-gray-300'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${i < stepIdx ? 'bg-green-500 border-green-500 text-white' : i === stepIdx ? 'border-green-500 bg-white text-green-600' : 'border-gray-200 bg-white text-gray-400'}`}>
                  {i < stepIdx ? '✓' : i + 1}
                </div>
                <span className="text-xs mt-1 font-medium">{label}</span>
              </div>
              {i < 2 && (
                <div className={`flex-1 h-0.5 mb-4 mx-1 transition-all ${i < stepIdx ? 'bg-green-500' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="md:grid md:grid-cols-3 md:gap-6">
          {/* Main content */}
          <div className="md:col-span-2 space-y-4">
            {step === 'address' && (
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <h2 className="font-bold text-gray-900 text-lg mb-4">📍 Delivery Address</h2>
                <div className="space-y-3">
                  <Input id="checkout-label" label="Address Label" value={address.label ?? ''} onChange={(e) => setAddress({ ...address, label: e.target.value })} placeholder="Home, Office, etc." />
                  <Input id="checkout-street" label="Street Address" value={address.street ?? ''} onChange={(e) => setAddress({ ...address, street: e.target.value })} placeholder="123 Main Street" />
                  <div className="grid grid-cols-2 gap-3">
                    <Input id="checkout-city" label="City" value={address.city ?? ''} onChange={(e) => setAddress({ ...address, city: e.target.value })} placeholder="San Francisco" />
                    <Input id="checkout-state" label="State" value={address.state ?? ''} onChange={(e) => setAddress({ ...address, state: e.target.value })} placeholder="CA" />
                  </div>
                  <Input id="checkout-zip" label="ZIP Code" value={address.zip ?? ''} onChange={(e) => setAddress({ ...address, zip: e.target.value })} placeholder="94105" />
                </div>
                <Button id="checkout-to-payment-btn" fullWidth size="lg" className="mt-5" onClick={() => setStep('payment')}>
                  Continue to Payment →
                </Button>
              </div>
            )}

            {step === 'payment' && (
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <h2 className="font-bold text-gray-900 text-lg mb-4">💳 Payment Method</h2>
                <div className="space-y-3">
                  {paymentMethods.map((pm) => (
                    <button
                      key={pm.id}
                      id={`checkout-payment-${pm.id}`}
                      onClick={() => setPaymentMethod(pm.id)}
                      aria-pressed={paymentMethod === pm.id}
                      className={`w-full flex items-center gap-4 p-4 border-2 rounded-xl transition-all ${paymentMethod === pm.id ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <span className="text-2xl">{pm.icon}</span>
                      <span className="font-medium text-gray-900 text-sm">{pm.label}</span>
                      {paymentMethod === pm.id && (
                        <div className="ml-auto w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}

                  {paymentMethod === 'card' && (
                    <div className="space-y-3 pt-2 border-t border-gray-100 mt-2">
                      <Input id="checkout-card-number" label="Card Number" placeholder="4242 4242 4242 4242" />
                      <div className="grid grid-cols-2 gap-3">
                        <Input id="checkout-expiry" label="Expiry" placeholder="MM/YY" />
                        <Input id="checkout-cvv" label="CVV" placeholder="123" type="password" />
                      </div>
                      <Input id="checkout-card-name" label="Name on Card" placeholder="John Doe" />
                    </div>
                  )}
                </div>
                <div className="flex gap-3 mt-5">
                  <Button variant="secondary" onClick={() => setStep('address')}>← Back</Button>
                  <Button id="checkout-to-review-btn" fullWidth onClick={() => setStep('review')}>
                    Review Order →
                  </Button>
                </div>
              </div>
            )}

            {step === 'review' && (
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <h2 className="font-bold text-gray-900 text-lg mb-4">📋 Review Order</h2>
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900 truncate">{item.product.name}</p>
                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-sm text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-4 space-y-2 text-sm mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery to</span>
                    <span className="font-medium text-gray-900 text-right max-w-[180px]">{address.street}, {address.city}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Payment</span>
                    <span className="font-medium text-gray-900">{paymentMethods.find((p) => p.id === paymentMethod)?.label}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Estimated delivery</span>
                    <span className="font-medium text-green-600">30–45 min ⚡</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="secondary" onClick={() => setStep('payment')}>← Back</Button>
                  <Button id="checkout-place-order-btn" fullWidth size="lg" loading={isProcessing} onClick={handlePlaceOrder}>
                    {isProcessing ? 'Processing...' : `Place Order — $${total.toFixed(2)}`}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Desktop order summary */}
          <div className="hidden md:block">
            <div className="bg-white rounded-2xl shadow-sm p-5 sticky top-20">
              <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span><span>−${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span>{delivery === 0 ? 'FREE 🎉' : `$${delivery.toFixed(2)}`}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-gray-900">
                  <span>Total</span><span className="text-green-600">${total.toFixed(2)}</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 text-center">🔒 Secure & encrypted checkout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutScreen;
