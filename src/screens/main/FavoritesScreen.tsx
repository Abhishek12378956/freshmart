import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavoritesStore } from '../../store/favoritesStore';
import { useCartStore } from '../../store/cartStore';
import { Button } from '../../components/ui';

const FavoritesScreen: React.FC = () => {
  const navigate = useNavigate();
  const { favorites } = useFavoritesStore();
  const { addItem } = useCartStore();

  const handleAddAllToCart = () => {
    favorites.forEach(p => addItem(p, 1));
    navigate('/cart');
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-[70dvh] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-64 h-64 bg-gray-50 rounded-full flex items-center justify-center mb-8">
          <span className="text-8xl">❤️</span>
        </div>
        <h2 className="text-2xl font-bold text-[#181725] mb-2">No favorites yet!</h2>
        <p className="text-gray-400 mb-8">Tap the heart on any product to save it for later.</p>
        <Button onClick={() => navigate('/home')} className="bg-[#53B175] rounded-[19px] px-10">Explore Products</Button>
      </div>
    );
  }

  return (
    <div className="pb-32 px-6">
      <h1 className="text-xl font-bold text-[#181725] text-center pt-6 mb-8">Favorurite</h1>

      <div className="divide-y divide-gray-100">
        {favorites.map((product) => (
          <div 
            key={product.id} 
            className="py-6 flex items-center gap-4 group cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-16 h-16 object-contain"
            />
            
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-[#181725] truncate">
                {product.name}
              </h3>
              <p className="text-sm text-gray-400 font-medium">
                {product.unit}, Price
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-base font-bold text-[#181725]">
                ${product.price.toFixed(2)}
              </span>
              <svg className="w-5 h-5 text-[#181725]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Add All Button */}
      <div className="fixed bottom-24 left-0 right-0 px-6 pb-6 bg-gradient-to-t from-white via-white to-transparent pt-4">
        <Button 
          fullWidth 
          size="lg"
          className="bg-[#53B175] hover:bg-[#489963] h-[67px] text-lg font-semibold rounded-[19px] border-none"
          onClick={handleAddAllToCart}
        >
          Add All To Cart
        </Button>
      </div>
    </div>
  );
};

export default FavoritesScreen;
