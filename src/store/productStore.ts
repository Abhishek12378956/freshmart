import { create } from 'zustand';
import { ProductCategory, SortOption } from '../types';
import type { FilterState, Product, SearchResult } from '../types';
import { products } from '../data/products';

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  selectedCategory: ProductCategory | null;
  filters: FilterState;
  search: SearchResult;
  isLoading: boolean;
  selectedProduct: Product | null;
  searchTimeout: any;

  loadProducts: () => Promise<void>;
  setSelectedCategory: (category: ProductCategory | null) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  searchProducts: (query: string) => void;
  clearSearch: () => void;
  setSelectedProduct: (product: Product | null) => void;
  applyFilters: () => void;
}

const defaultFilters: FilterState = {
  categories: [],
  minPrice: 0,
  maxPrice: 100,
  sortBy: SortOption.POPULAR,
  inStockOnly: false,
  isOrganic: false,
  minRating: 0,
};

export const useProductStore = create<ProductState>()((set, get) => ({
  products: [],
  filteredProducts: [],
  selectedCategory: null,
  filters: defaultFilters,
  search: { products: [], query: '', loading: false },
  isLoading: false,
  selectedProduct: null,

  loadProducts: async () => {
    set({ isLoading: true });
    await new Promise((res) => setTimeout(res, 800));
    set({ products, filteredProducts: products, isLoading: false });
  },

  setSelectedCategory: (category: ProductCategory | null) => {
    set({ selectedCategory: category });
    get().applyFilters();
  },

  setFilters: (newFilters: Partial<FilterState>) => {
    set((state) => ({ filters: { ...state.filters, ...newFilters } }));
    get().applyFilters();
  },

  resetFilters: () => {
    set({ filters: defaultFilters, selectedCategory: null });
    get().applyFilters();
  },

  searchTimeout: null as any,

  searchProducts: (query: string) => {
    if (get().searchTimeout) clearTimeout(get().searchTimeout);

    if (!query.trim()) {
      set({ search: { products: [], query: '', loading: false } });
      return;
    }

    set((state) => ({ search: { ...state.search, query, loading: true } }));

    const timeout = setTimeout(() => {
      const q = query.toLowerCase();
      const results = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
      set({ search: { products: results, query, loading: false } });
    }, 500);

    set({ searchTimeout: timeout });
  },

  clearSearch: () => {
    set({ search: { products: [], query: '', loading: false } });
  },

  setSelectedProduct: (product: Product | null) => {
    set({ selectedProduct: product });
  },

  applyFilters: () => {
    const { products: allProducts, filters, selectedCategory } = get();
    let result = [...allProducts];

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    result = result.filter((p) => p.price >= filters.minPrice && p.price <= filters.maxPrice);

    if (filters.inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    if (filters.isOrganic) {
      result = result.filter((p) => p.isOrganic);
    }

    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }

    switch (filters.sortBy) {
      case SortOption.PRICE_LOW:
        result.sort((a, b) => a.price - b.price);
        break;
      case SortOption.PRICE_HIGH:
        result.sort((a, b) => b.price - a.price);
        break;
      case SortOption.RATING:
        result.sort((a, b) => b.rating - a.rating);
        break;
      case SortOption.NEWEST:
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    set({ filteredProducts: result });
  },
}));
