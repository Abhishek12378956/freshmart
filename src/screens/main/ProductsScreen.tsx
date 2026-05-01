import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useProductStore } from '../../store/productStore';
import ProductCard from '../../components/ProductCard';
import { ProductCategory } from '../../types';

const ProductsScreen: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { products, loadProducts } = useProductStore();
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const search = searchParams.get('search');
  const category = searchParams.get('category') as ProductCategory;

  useEffect(() => {
    loadProducts();
  }, [category, search]);

  const filteredProducts = products.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (category && p.category !== category) return false;
    return true;
  });

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="px-6 pt-6 flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-start">
          <svg className="w-6 h-6 text-[#181725]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-[#181725] flex-1 text-center">
          {search ? `"${search}"` : (category || 'Beverages')}
        </h1>
        <button 
          onClick={() => setIsFilterOpen(true)}
          className="w-10 h-10 flex items-center justify-end"
        >
          <svg className="w-5 h-5 text-[#181725]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </button>
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 px-4">
          {filteredProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center pt-20 px-8 text-center">
          <div className="w-48 h-48 bg-[#F2F3F2] rounded-full flex items-center justify-center mb-6">
            <span className="text-7xl">🔍</span>
          </div>
          <h2 className="text-2xl font-bold text-[#181725] mb-2">No Results Found</h2>
          <p className="text-gray-400 font-medium">We couldn't find any products matching your search.</p>
          <button 
            onClick={() => navigate('/home')}
            className="mt-8 text-[#53B175] font-bold text-lg hover:underline"
          >
            Back to Shop
          </button>
        </div>
      )}

      {isFilterOpen && (
        <FilterModal onClose={() => setIsFilterOpen(false)} />
      )}
    </div>
  );
};

const FilterModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState('Eggs');
  const [selectedBrand, setSelectedBrand] = useState('Cocola');

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
      <div className="w-full max-w-md bg-[#F2F3F2] rounded-t-[30px] p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-8">
          <button onClick={onClose} className="text-2xl">×</button>
          <h2 className="text-xl font-bold text-[#181725]">Filters</h2>
          <div className="w-6" />
        </div>

        <div className="space-y-10">
          <div>
            <h3 className="text-2xl font-bold text-[#181725] mb-5">Categories</h3>
            <div className="space-y-4">
              {['Eggs', 'Noodles & Pasta', 'Chips & Crisps', 'Fast Food'].map(cat => (
                <label key={cat} className="flex items-center gap-4 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(cat)}
                    className="w-6 h-6 rounded-lg accent-[#53B175]" 
                  />
                  <span className={`text-base font-medium ${selectedCategory === cat ? 'text-[#53B175]' : 'text-[#181725]'}`}>
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#181725] mb-5">Brand</h3>
            <div className="space-y-4">
              {['Individual Callection', 'Cocola', 'Ifad', 'Kazi Farmas'].map(brand => (
                <label key={brand} className="flex items-center gap-4 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={selectedBrand === brand}
                    onChange={() => setSelectedBrand(brand)}
                    className="w-6 h-6 rounded-lg accent-[#53B175]" 
                  />
                  <span className={`text-base font-medium ${selectedBrand === brand ? 'text-[#53B175]' : 'text-[#181725]'}`}>
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full mt-12 bg-[#53B175] text-white font-bold py-5 rounded-[19px] text-lg hover:bg-[#489963] transition-colors"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default ProductsScreen;
