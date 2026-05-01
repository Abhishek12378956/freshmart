import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useProductStore } from '../../store/productStore';
import ProductCard from '../../components/ProductCard';
import { ProductCategory } from '../../types';

// Figma-exact filter categories and brands
const FIGMA_CATEGORIES = ['Eggs', 'Noodles & Pasta', 'Chips & Crisps', 'Fast Food'];
const FIGMA_BRANDS = ['Individual Collection', 'Cocola', 'Ifad', 'Kazi Farmas'];

const ProductsScreen: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { products, isLoading, loadProducts } = useProductStore();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const search = searchParams.get('search');
  const categoryParam = searchParams.get('category') as ProductCategory | null;

  useEffect(() => {
    loadProducts();
  }, []);

  const displayProducts = products.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (categoryParam && p.category !== categoryParam) return false;
    return true;
  });

  const activeFilterCount = selectedCategories.length + selectedBrands.length;

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleApplyFilter = () => {
    setIsFilterOpen(false);
  };

  const handleResetFilter = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
  };

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
          {search ? `"${search}"` : categoryParam ?? 'All Products'}
        </h1>
        <button
          onClick={() => setIsFilterOpen(true)}
          className="relative w-10 h-10 flex items-center justify-end"
        >
          <svg className="w-5 h-5 text-[#181725]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#53B175] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-3xl h-56 animate-pulse" />
          ))}
        </div>
      ) : displayProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 md:px-0">
          {displayProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center pt-20 px-8 text-center">
          <div className="w-48 h-48 bg-[#F2F3F2] rounded-full flex items-center justify-center mb-6">
            <span className="text-7xl">🔍</span>
          </div>
          <h2 className="text-2xl font-bold text-[#181725] mb-2">No Results Found</h2>
          <p className="text-gray-400 font-medium">
            We couldn't find any products matching your search.
          </p>
          <button
            onClick={() => navigate('/home')}
            className="mt-8 text-[#53B175] font-bold text-lg hover:underline"
          >
            Back to Shop
          </button>
        </div>
      )}

      {/* Filter Modal — Figma exact design */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
          <div className="w-full max-w-md bg-[#F2F3F2] rounded-t-[30px] p-6 animate-slide-up">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-2xl text-gray-600 hover:text-gray-900 font-light"
              >
                ×
              </button>
              <h2 className="text-xl font-bold text-[#181725]">Filters</h2>
              <div className="w-8" />
            </div>

            <div className="space-y-10">
              {/* Categories */}
              <div>
                <h3 className="text-2xl font-bold text-[#181725] mb-5">Categories</h3>
                <div className="space-y-4">
                  {FIGMA_CATEGORIES.map((cat) => (
                    <label key={cat} className="flex items-center gap-4 cursor-pointer">
                      <div
                        onClick={() => toggleCategory(cat)}
                        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                          selectedCategories.includes(cat)
                            ? 'bg-[#53B175] border-[#53B175]'
                            : 'bg-white border-gray-200'
                        }`}
                      >
                        {selectedCategories.includes(cat) && (
                          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span
                        className={`text-base font-medium ${
                          selectedCategories.includes(cat) ? 'text-[#53B175]' : 'text-[#181725]'
                        }`}
                      >
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand */}
              <div>
                <h3 className="text-2xl font-bold text-[#181725] mb-5">Brand</h3>
                <div className="space-y-4">
                  {FIGMA_BRANDS.map((brand) => (
                    <label key={brand} className="flex items-center gap-4 cursor-pointer">
                      <div
                        onClick={() => toggleBrand(brand)}
                        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                          selectedBrands.includes(brand)
                            ? 'bg-[#53B175] border-[#53B175]'
                            : 'bg-white border-gray-200'
                        }`}
                      >
                        {selectedBrands.includes(brand) && (
                          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span
                        className={`text-base font-medium ${
                          selectedBrands.includes(brand) ? 'text-[#53B175]' : 'text-[#181725]'
                        }`}
                      >
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <button
              onClick={handleApplyFilter}
              className="w-full mt-12 bg-[#53B175] text-white font-bold py-5 rounded-[19px] text-lg hover:bg-[#489963] transition-colors"
            >
              Apply Filter
            </button>

            {activeFilterCount > 0 && (
              <button
                onClick={handleResetFilter}
                className="w-full mt-3 text-center text-sm font-semibold text-gray-400 hover:text-gray-600 py-2"
              >
                Reset All
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsScreen;
