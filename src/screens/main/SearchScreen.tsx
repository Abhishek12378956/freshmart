import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'Fresh Fruits\n& Vegetable', color: '#53B1751A', border: '#53B1754D', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200' },
  { name: 'Cooking Oil\n& Ghee', color: '#F8A44C1A', border: '#F8A44C4D', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbadcbaf?auto=format&fit=crop&q=80&w=200' },
  { name: 'Meat & Fish', color: '#F7A5931A', border: '#F7A5934D', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=200' },
  { name: 'Bakery & Snacks', color: '#D3B0E01A', border: '#D3B0E04D', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=200' },
  { name: 'Dairy & Eggs', color: '#FDE5981A', border: '#FDE5984D', image: 'https://images.unsplash.com/photo-1550583724-125581ae278b?auto=format&fit=crop&q=80&w=200' },
  { name: 'Beverages', color: '#B7DFF51A', border: '#B7DFF54D', image: 'https://images.unsplash.com/photo-1527960669566-f882ba85a4c6?auto=format&fit=crop&q=80&w=200' },
];

const SearchScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
    }
  };

  return (
    <div className="pb-24 px-6 pt-6">
      <h1 className="text-xl font-bold text-[#181725] text-center mb-6">Find Products</h1>

      {/* Search Input */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="bg-[#F2F3F2] rounded-2xl p-4 flex items-center gap-3">
          <svg className="w-5 h-5 text-[#181725]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search Store"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-base font-semibold text-[#181725] placeholder-gray-400"
          />
        </div>
      </form>

      {/* Category Grid */}
      <div className="grid grid-cols-2 gap-4">
        {categories.map((cat, i) => (
          <div 
            key={i}
            onClick={() => navigate('/products')}
            className="rounded-3xl p-4 flex flex-col items-center text-center cursor-pointer transform transition-transform active:scale-95 h-48 border"
            style={{ backgroundColor: cat.color, borderColor: cat.border }}
          >
            <img src={cat.image} alt={cat.name} className="h-24 w-full object-contain mb-3" />
            <span className="text-base font-bold text-[#181725] whitespace-pre-line leading-tight">
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchScreen;
