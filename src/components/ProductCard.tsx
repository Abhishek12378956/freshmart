import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../types';
import { useCartStore } from '../store/cartStore';
import { useFavoritesStore } from '../store/favoritesStore';
import { useProductStore } from '../store/productStore';
import { StarRating, Badge } from './ui';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, layout = 'grid' }) => {
  const navigate = useNavigate();
  const { addItem, items } = useCartStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const { setSelectedProduct } = useProductStore();
  const [imgError, setImgError] = useState(false);

  const cartItem = items.find((i) => i.product.id === product.id);
  const quantity = cartItem?.quantity ?? 0;
  const fav = isFavorite(product.id);

  const handleView = () => {
    setSelectedProduct(product);
    navigate(`/product/${product.id}`);
  };

  if (layout === 'list') {
    return (
      <div
        className="bg-white rounded-2xl flex gap-3 p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        onClick={handleView}
        role="article"
        aria-label={product.name}
      >
        <div className="relative w-24 h-24 shrink-0">
          <img
            src={imgError ? 'https://via.placeholder.com/200x200?text=🛒' : product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-xl"
            onError={() => setImgError(true)}
          />
          {product.discount && (
            <span className="absolute top-1 left-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-lg">
              -{product.discount}%
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-gray-900 text-sm truncate">{product.name}</h3>
              <button
                onClick={(e) => { e.stopPropagation(); toggleFavorite(product); }}
                aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
                className="shrink-0 text-lg"
              >
                {fav ? '❤️' : '🤍'}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{product.unit}</p>
            <StarRating rating={product.rating} count={product.reviewCount} />
          </div>
          <div className="flex items-center justify-between mt-2">
            <div>
              <span className="text-green-600 font-bold text-base">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-gray-400 text-xs line-through ml-1">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); addItem(product); }}
              className="bg-green-500 hover:bg-green-600 active:scale-95 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all"
              aria-label={`Add ${product.name} to cart`}
            >
              {quantity > 0 ? `+1 (${quantity})` : '+ Add'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={handleView}
      role="article"
      aria-label={product.name}
    >
      <div className="relative overflow-hidden">
        <img
          src={imgError ? 'https://via.placeholder.com/200x200?text=🛒' : product.image}
          alt={product.name}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={() => setImgError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        {product.discount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-lg shadow">
            -{product.discount}%
          </span>
        )}
        {product.isOrganic && (
          <span className="absolute top-2 right-8 bg-green-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-lg shadow">
            🌿
          </span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); toggleFavorite(product); }}
          className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-transform"
          aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
        >
          <span className="text-base">{fav ? '❤️' : '🤍'}</span>
        </button>
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="error">Out of Stock</Badge>
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-gray-900 text-sm truncate">{product.name}</h3>
        <p className="text-xs text-gray-400 mt-0.5">{product.unit}</p>
        <StarRating rating={product.rating} count={product.reviewCount} />
        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="text-green-600 font-bold text-base">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-gray-400 text-xs line-through ml-1">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); addItem(product); }}
            disabled={!product.inStock}
            className="w-8 h-8 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 active:scale-95 text-white rounded-full flex items-center justify-center text-lg font-bold transition-all shadow-md shadow-green-200"
            aria-label={`Add ${product.name} to cart`}
          >
            {quantity > 0 ? (
              <span className="text-xs font-bold">{quantity}</span>
            ) : (
              <span>+</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
