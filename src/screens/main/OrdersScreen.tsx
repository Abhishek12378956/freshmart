import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrderStore } from '../../store/orderStore';
import { OrderStatus } from '../../types';

const statusColors: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: 'text-yellow-600',
  [OrderStatus.CONFIRMED]: 'text-blue-600',
  [OrderStatus.PREPARING]: 'text-orange-600',
  [OrderStatus.OUT_FOR_DELIVERY]: 'text-purple-600',
  [OrderStatus.DELIVERED]: 'text-green-600',
  [OrderStatus.FAILED]: 'text-red-600',
  [OrderStatus.CANCELLED]: 'text-gray-600',
};

const OrdersScreen: React.FC = () => {
  const { orders } = useOrderStore();
  const navigate = useNavigate();

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-8 text-center gap-4">
        <div className="w-48 h-48 bg-[#F2F3F2] rounded-full flex items-center justify-center mb-4">
          <span className="text-7xl">📦</span>
        </div>
        <h2 className="text-2xl font-bold text-[#181725]">No Orders Yet</h2>
        <p className="text-gray-400 font-medium">Place your first order to see it here!</p>
        <button
          onClick={() => navigate('/home')}
          className="mt-6 bg-[#53B175] text-white font-bold px-10 py-4 rounded-[19px] hover:bg-[#489963] transition-colors"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="px-6 pt-6 mb-8 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-start">
          <svg className="w-6 h-6 text-[#181725]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-[#181725] flex-1 text-center pr-10">My Orders</h1>
      </div>

      <div className="space-y-4 px-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-50">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                <p className="text-sm font-bold text-[#181725]">#{order.id.slice(-6).toUpperCase()}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                <p className={`text-sm font-bold ${statusColors[order.status]}`}>{order.status}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4">
               {order.items.slice(0, 3).map((item, i) => (
                 <img 
                   key={i} 
                   src={item.product.image} 
                   alt={item.product.name} 
                   className="w-12 h-12 object-contain bg-gray-50 rounded-lg p-1"
                 />
               ))}
               {order.items.length > 3 && (
                 <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-bold text-gray-500">
                   +{order.items.length - 3}
                 </div>
               )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm font-medium">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
              <span className="text-lg font-bold text-[#53B175]">
                ${order.total.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersScreen;
