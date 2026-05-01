// Enums
export enum ProductCategory {
  FRUITS = 'Fruits',
  VEGETABLES = 'Vegetables',
  DAIRY = 'Dairy',
  BAKERY = 'Bakery',
  MEAT = 'Meat',
  BEVERAGES = 'Beverages',
  SNACKS = 'Snacks',
  FROZEN = 'Frozen',
  ORGANIC = 'Organic',
  PERSONAL_CARE = 'Personal Care',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PREPARING = 'PREPARING',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export enum SortOption {
  POPULAR = 'popular',
  PRICE_LOW = 'price_low',
  PRICE_HIGH = 'price_high',
  NEWEST = 'newest',
  RATING = 'rating',
}

// Interfaces
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  address?: Address;
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  unit: string;
  image: string;
  category: ProductCategory;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isFeatured: boolean;
  isOrganic?: boolean;
  discount?: number;
  tags: string[];
  nutritionInfo?: NutritionInfo;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: ProductCategory;
  icon: string;
  color: string;
  bgColor: string;
  count: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  deliveryAddress: Address;
  estimatedDelivery?: string;
  paymentMethod: string;
}

export interface FilterState {
  categories: ProductCategory[];
  minPrice: number;
  maxPrice: number;
  sortBy: SortOption;
  inStockOnly: boolean;
  isOrganic: boolean;
  minRating: number;
}

export interface SearchResult {
  products: Product[];
  query: string;
  loading: boolean;
}
