import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductStore } from '../../store/productStore';
import { useCartStore } from '../../store/cartStore';
import { useFavoritesStore } from '../../store/favoritesStore';
import { Button } from '../../components/ui';

const ProductDetailScreen: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProductStore();
  const { addItem, items, updateQuantity } = useCartStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'detail' | 'nutrition' | 'review'>('detail');

  const product = products.find(p => p.id === id);
  const cartItem = items.find(i => i.product.id === id);

  if (!product) return null;

  return (
    <div className="min-h-dvh bg-white flex flex-col">
      {/* Header */}
      <div className="px-6 pt-6 flex items-center justify-between absolute top-0 w-full z-10">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-start">
          <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="w-10 h-10 flex items-center justify-end">
          <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      </div>

      {/* Image Gallery */}
      <div className="h-80 bg-[#F2F3F2] rounded-b-[40px] flex items-center justify-center pt-10">
        <img src={product.image} alt={product.name} className="h-48 object-contain" />
      </div>

      <div className="px-6 py-8 flex-1">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[#181725]">{product.name}</h1>
            <p className="text-gray-400 font-semibold mt-1">{product.unit}, Price</p>
          </div>
          <button 
            onClick={() => toggleFavorite(product)}
            className={`p-2 ${isFavorite(product.id) ? 'text-red-500' : 'text-gray-400'}`}
          >
            <svg className="w-7 h-7" fill={isFavorite(product.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-11 h-11 border border-gray-200 rounded-2xl flex items-center justify-center text-2xl text-gray-400"
            >
              -
            </button>
            <span className="w-11 h-11 border border-gray-100 rounded-2xl flex items-center justify-center text-lg font-bold text-[#181725]">
              {quantity}
            </span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-11 h-11 border border-gray-200 rounded-2xl flex items-center justify-center text-2xl text-green-500"
            >
              +
            </button>
          </div>
          <span className="text-2xl font-bold text-[#181725]">${(product.price * quantity).toFixed(2)}</span>
        </div>

        {/* Accordions */}
        <div className="mt-10 border-t border-gray-100">
          <Accordion 
            title="Product Detail" 
            isOpen={activeTab === 'detail'} 
            onClick={() => setActiveTab(activeTab === 'detail' ? 'detail' : 'detail')} // Stay open or toggle
          >
            <p className="text-gray-400 text-sm leading-relaxed">
              {product.description}
            </p>
          </Accordion>

          <Accordion 
            title="Nutritions" 
            rightContent={<span className="bg-gray-100 px-2 py-1 rounded-md text-[10px] text-gray-500 font-bold">100gr</span>}
            isOpen={activeTab === 'nutrition'} 
            onClick={() => setActiveTab(activeTab === 'nutrition' ? 'detail' : 'nutrition')}
          >
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between border-b pb-1"><span>Calories</span><span>{product.nutritionInfo?.calories} kcal</span></div>
              <div className="flex justify-between border-b pb-1"><span>Protein</span><span>{product.nutritionInfo?.protein}g</span></div>
              <div className="flex justify-between border-b pb-1"><span>Carbs</span><span>{product.nutritionInfo?.carbs}g</span></div>
              <div className="flex justify-between border-b pb-1"><span>Fat</span><span>{product.nutritionInfo?.fat}g</span></div>
            </div>
          </Accordion>

          <Accordion 
            title="Review" 
            rightContent={
              <div className="flex text-orange-400 text-sm">
                {"★".repeat(Math.floor(product.rating))}
              </div>
            }
            isOpen={activeTab === 'review'} 
            onClick={() => setActiveTab(activeTab === 'review' ? 'detail' : 'review')}
          >
            <p className="text-sm text-gray-500 italic">No reviews yet. Be the first to review this product!</p>
          </Accordion>
        </div>
      </div>

      <div className="px-6 pb-10">
        <Button 
          id="add-to-basket" 
          fullWidth 
          size="lg"
          className="bg-[#53B175] hover:bg-[#489963] h-[67px] text-lg font-semibold rounded-[19px] border-none"
          onClick={() => {
            addItem(product, quantity);
            navigate('/cart');
          }}
        >
          Add To Basket
        </Button>
      </div>
    </div>
  );
};

const Accordion: React.FC<{ title: string; children: React.ReactNode; rightContent?: React.ReactNode; isOpen: boolean; onClick: () => void }> = ({ title, children, rightContent, isOpen, onClick }) => (
  <div className="border-b border-gray-100">
    <button 
      onClick={onClick}
      className="w-full py-5 flex items-center justify-between text-left"
    >
      <span className="text-lg font-bold text-[#181725]">{title}</span>
      <div className="flex items-center gap-3">
        {rightContent}
        <svg className={`w-5 h-5 text-[#181725] transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </button>
    {isOpen && <div className="pb-5">{children}</div>}
  </div>
);

export default ProductDetailScreen;
