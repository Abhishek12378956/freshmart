import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '../../store/productStore';
import ProductCard from '../../components/ProductCard';
import { ProductCardSkeleton } from '../../components/ui/Skeleton';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { products, isLoading, loadProducts } = useProductStore();

  useEffect(() => {
    if (products.length === 0) loadProducts();
  }, []);

  const exclusiveOffers = products.filter(p => p.discount).slice(0, 4);
  const bestSelling = products.slice(5, 9);
  const groceries = products.slice(10, 14);

  return (
    <div className="pb-24 md:pb-6">
      {/* Header / Location */}
      <div className="flex flex-col items-center pt-6 px-4">
        <span className="text-orange-500 text-3xl mb-1">🥕</span>
        <div className="flex items-center gap-1.5 text-[#4C4F4D] font-bold">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-lg">Dhaka, Banassre</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 mt-6">
        <div 
          onClick={() => navigate('/search')}
          className="bg-[#F2F3F2] rounded-2xl p-4 flex items-center gap-3 cursor-pointer group transition-all hover:bg-gray-200"
        >
          <svg className="w-6 h-6 text-[#181725] font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-gray-400 font-semibold text-sm">Search Store</span>
        </div>
      </div>

      {/* Banner */}
      <div className="px-4 mt-6">
        <div 
          className="h-44 rounded-3xl bg-cover bg-center overflow-hidden flex items-center px-6 relative"
          style={{ backgroundImage: 'url("/nectar_home_banner_1777578858814.png")' }}
        >
          {/* Fallback text if image doesn't load/render well */}
          <div className="relative z-10 max-w-[150px]">
            <h2 className="text-xl font-bold text-gray-900 leading-tight">Fresh Vegetables</h2>
            <p className="text-green-500 font-bold text-sm mt-1">Get Up To 40% OFF</p>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="mt-8 space-y-10">
        <Section title="Exclusive Offer" products={exclusiveOffers} isLoading={isLoading} onSeeAll={() => navigate('/products')} />
        <Section title="Best Selling" products={bestSelling} isLoading={isLoading} onSeeAll={() => navigate('/products')} />
        
        {/* Groceries Category Row */}
        <div className="px-4">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-2xl font-bold text-[#181725]">Groceries</h3>
            <button onClick={() => navigate('/products')} className="text-green-500 font-semibold">See all</button>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            <div className="shrink-0 w-64 h-28 bg-[#F8A44C1A] rounded-2xl flex items-center p-4 gap-4 border border-[#F8A44C4D]">
              <img src="https://images.unsplash.com/photo-1598971861713-54ad16a7e718?auto=format&fit=crop&q=80&w=100" alt="Pulses" className="w-16 h-16 object-contain" />
              <span className="text-xl font-bold text-[#3E423F]">Pulses</span>
            </div>
            <div className="shrink-0 w-64 h-28 bg-[#53B1751A] rounded-2xl flex items-center p-4 gap-4 border border-[#53B1754D]">
              <img src="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=100" alt="Rice" className="w-16 h-16 object-contain" />
              <span className="text-xl font-bold text-[#3E423F]">Rice</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 px-4">
           {groceries.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
};

const Section: React.FC<{ title: string; products: any[]; isLoading: boolean; onSeeAll: () => void }> = ({ title, products, isLoading, onSeeAll }) => (
  <div className="px-4">
    <div className="flex items-center justify-between mb-5">
      <h3 className="text-2xl font-bold text-[#181725]">{title}</h3>
      <button onClick={onSeeAll} className="text-green-500 font-semibold">See all</button>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-x-auto md:overflow-visible no-scrollbar pb-4 -mx-4 px-4 md:mx-0 md:px-0">
      {isLoading ? (
        Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="shrink-0 w-44 md:w-full">
            <ProductCardSkeleton />
          </div>
        ))
      ) : (
        products.map(p => (
          <div key={p.id} className="shrink-0 w-44 md:w-full">
            <ProductCard product={p} />
          </div>
        ))
      )}
    </div>
  </div>
);

export default HomeScreen;
