import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { OrderStatus } from '../types';
import type { Order, CartItem, Address } from '../types';

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  isProcessing: boolean;
  lastOrderStatus: OrderStatus | null;
  placeOrder: (items: CartItem[], address: Address, paymentMethod: string, total: number) => Promise<void>;
  clearCurrentOrder: () => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orders: [],
      currentOrder: null,
      isProcessing: false,
      lastOrderStatus: null,

      placeOrder: async (items, address, paymentMethod, total) => {
        set({ isProcessing: true });
        await new Promise((res) => setTimeout(res, 2000));

        // Simulate 90% success rate
        const success = Math.random() > 0.1;
        const status = success ? OrderStatus.CONFIRMED : OrderStatus.FAILED;

        const order: Order = {
          id: `ORD-${Date.now()}`,
          items,
          total,
          status,
          createdAt: new Date().toISOString(),
          deliveryAddress: address,
          estimatedDelivery: success ? '30–45 min' : undefined,
          paymentMethod,
        };

        set((state) => ({
          orders: [order, ...state.orders],
          currentOrder: order,
          lastOrderStatus: status,
          isProcessing: false,
        }));
      },

      clearCurrentOrder: () => set({ currentOrder: null, lastOrderStatus: null }),
    }),
    { name: 'order-storage', partialize: (s) => ({ orders: s.orders }) }
  )
);
