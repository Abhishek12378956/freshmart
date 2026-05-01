import { ProductCategory } from '../types';
import type { Product, Category } from '../types';

export const categories: Category[] = [
  { id: 'cat-1', name: ProductCategory.FRUITS, icon: '🍎', color: '#E53E3E', bgColor: '#FEE2E2', count: 48 },
  { id: 'cat-2', name: ProductCategory.VEGETABLES, icon: '🥦', color: '#38A169', bgColor: '#DCFCE7', count: 62 },
  { id: 'cat-3', name: ProductCategory.DAIRY, icon: '🥛', color: '#3182CE', bgColor: '#DBEAFE', count: 35 },
  { id: 'cat-4', name: ProductCategory.BAKERY, icon: '🍞', color: '#D69E2E', bgColor: '#FEF9C3', count: 28 },
  { id: 'cat-5', name: ProductCategory.MEAT, icon: '🥩', color: '#E53E3E', bgColor: '#FEE2E2', count: 41 },
  { id: 'cat-6', name: ProductCategory.BEVERAGES, icon: '🥤', color: '#805AD5', bgColor: '#EDE9FE', count: 55 },
  { id: 'cat-7', name: ProductCategory.SNACKS, icon: '🍿', color: '#D69E2E', bgColor: '#FEF9C3', count: 67 },
  { id: 'cat-8', name: ProductCategory.FROZEN, icon: '🧊', color: '#2B6CB0', bgColor: '#DBEAFE', count: 33 },
  { id: 'cat-9', name: ProductCategory.ORGANIC, icon: '🌿', color: '#276749', bgColor: '#DCFCE7', count: 24 },
  { id: 'cat-10', name: ProductCategory.PERSONAL_CARE, icon: '🧴', color: '#B7791F', bgColor: '#FEF3C7', count: 19 },
];

export const products: Product[] = [
  // Fruits
  {
    id: 'p-001', name: 'Fresh Strawberries', description: 'Sweet and juicy farm-fresh strawberries, perfect for snacking or desserts. Rich in vitamin C and antioxidants.',
    price: 4.99, originalPrice: 6.99, unit: '500g', image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop',
    category: ProductCategory.FRUITS, rating: 4.8, reviewCount: 234, inStock: true, isFeatured: true, discount: 29, tags: ['fresh', 'summer', 'vitamin-c'],
    nutritionInfo: { calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3 }
  },
  {
    id: 'p-002', name: 'Organic Banana', description: 'Organic bananas, naturally ripened, rich in potassium and energy. Perfect for smoothies and snacking.',
    price: 2.49, originalPrice: 2.99, unit: '1kg', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop',
    category: ProductCategory.FRUITS, rating: 4.6, reviewCount: 189, inStock: true, isFeatured: true, isOrganic: true, discount: 17, tags: ['organic', 'energy', 'potassium'],
    nutritionInfo: { calories: 89, protein: 1.1, carbs: 23, fat: 0.3 }
  },
  {
    id: 'p-003', name: 'Honeydew Melon', description: 'Refreshing honeydew melon, naturally sweet and hydrating. Perfect for summer days.',
    price: 5.99, unit: '1 piece', image: 'https://images.unsplash.com/photo-1571052503310-84ce30b55c08?w=400&h=400&fit=crop',
    category: ProductCategory.FRUITS, rating: 4.4, reviewCount: 98, inStock: true, isFeatured: false, tags: ['summer', 'hydrating', 'sweet'],
    nutritionInfo: { calories: 36, protein: 0.5, carbs: 9, fat: 0.1 }
  },
  {
    id: 'p-004', name: 'Red Grapes', description: 'Premium seedless red grapes, sweet and crisp. Rich in antioxidants and resveratrol.',
    price: 6.49, originalPrice: 7.99, unit: '500g', image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&h=400&fit=crop',
    category: ProductCategory.FRUITS, rating: 4.7, reviewCount: 156, inStock: true, isFeatured: true, discount: 19, tags: ['seedless', 'antioxidants'],
    nutritionInfo: { calories: 67, protein: 0.6, carbs: 17, fat: 0.4 }
  },
  {
    id: 'p-005', name: 'Fuji Apples', description: 'Crisp and sweet Fuji apples, perfect for snacking or baking. Naturally high in fiber.',
    price: 3.99, unit: '4 pack', image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=400&fit=crop',
    category: ProductCategory.FRUITS, rating: 4.5, reviewCount: 312, inStock: true, isFeatured: false, tags: ['crisp', 'fiber', 'baking'],
    nutritionInfo: { calories: 52, protein: 0.3, carbs: 14, fat: 0.2 }
  },
  {
    id: 'p-006', name: 'Mango Alphonso', description: 'King of mangoes - the famous Alphonso variety with rich, creamy flesh and heavenly aroma.',
    price: 8.99, originalPrice: 11.99, unit: '2 pieces', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop',
    category: ProductCategory.FRUITS, rating: 4.9, reviewCount: 445, inStock: true, isFeatured: true, discount: 25, tags: ['tropical', 'premium', 'seasonal'],
    nutritionInfo: { calories: 60, protein: 0.8, carbs: 15, fat: 0.4 }
  },

  // Vegetables
  {
    id: 'p-007', name: 'Broccoli Crown', description: 'Fresh broccoli crown, packed with vitamins K and C. Great for stir-fries and steaming.',
    price: 2.99, unit: '400g', image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=400&fit=crop',
    category: ProductCategory.VEGETABLES, rating: 4.5, reviewCount: 178, inStock: true, isFeatured: true, tags: ['vitamins', 'healthy', 'greens'],
    nutritionInfo: { calories: 34, protein: 2.8, carbs: 7, fat: 0.4 }
  },
  {
    id: 'p-008', name: 'Cherry Tomatoes', description: 'Sweet and colorful cherry tomatoes, perfect for salads, snacking or pasta dishes.',
    price: 3.49, originalPrice: 4.49, unit: '300g', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=400&fit=crop',
    category: ProductCategory.VEGETABLES, rating: 4.6, reviewCount: 221, inStock: true, isFeatured: true, discount: 22, tags: ['salad', 'colorful', 'sweet'],
    nutritionInfo: { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2 }
  },
  {
    id: 'p-009', name: 'Baby Spinach', description: 'Tender baby spinach leaves, pre-washed and ready to eat. Rich in iron and folate.',
    price: 2.79, unit: '200g', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop',
    category: ProductCategory.VEGETABLES, rating: 4.4, reviewCount: 143, inStock: true, isFeatured: false, isOrganic: true, tags: ['iron', 'leafy', 'organic'],
    nutritionInfo: { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 }
  },
  {
    id: 'p-010', name: 'Sweet Corn', description: 'Fresh sweet corn, naturally sweet and tender. Perfect for grilling or boiling.',
    price: 1.99, unit: '2 pieces', image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=400&fit=crop',
    category: ProductCategory.VEGETABLES, rating: 4.3, reviewCount: 89, inStock: true, isFeatured: false, tags: ['grilling', 'summer', 'sweet'],
    nutritionInfo: { calories: 86, protein: 3.3, carbs: 19, fat: 1.4 }
  },
  {
    id: 'p-011', name: 'Organic Carrots', description: 'Crunchy organic carrots, rich in beta-carotene and vitamin A. Great for snacking.',
    price: 2.49, originalPrice: 2.99, unit: '500g', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop',
    category: ProductCategory.VEGETABLES, rating: 4.7, reviewCount: 267, inStock: true, isFeatured: true, isOrganic: true, discount: 17, tags: ['organic', 'vitamin-a', 'crunchy'],
    nutritionInfo: { calories: 41, protein: 0.9, carbs: 10, fat: 0.2 }
  },
  {
    id: 'p-012', name: 'Bell Peppers Mix', description: 'Colorful mix of red, yellow and green bell peppers. High in vitamin C and antioxidants.',
    price: 4.49, unit: '3 pack', image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop',
    category: ProductCategory.VEGETABLES, rating: 4.5, reviewCount: 192, inStock: true, isFeatured: false, tags: ['colorful', 'vitamin-c', 'stir-fry'],
    nutritionInfo: { calories: 31, protein: 1, carbs: 6, fat: 0.3 }
  },

  // Dairy
  {
    id: 'p-013', name: 'Greek Yogurt', description: 'Thick and creamy Greek yogurt with live cultures. High in protein, perfect for breakfast.',
    price: 3.99, unit: '500g', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop',
    category: ProductCategory.DAIRY, rating: 4.7, reviewCount: 328, inStock: true, isFeatured: true, tags: ['protein', 'probiotics', 'breakfast'],
    nutritionInfo: { calories: 59, protein: 10, carbs: 3.6, fat: 0.4 }
  },
  {
    id: 'p-014', name: 'Organic Whole Milk', description: 'Fresh organic whole milk from grass-fed cows. Rich and creamy with all natural vitamins.',
    price: 4.49, originalPrice: 5.49, unit: '1L', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop',
    category: ProductCategory.DAIRY, rating: 4.6, reviewCount: 205, inStock: true, isFeatured: false, isOrganic: true, discount: 18, tags: ['organic', 'grass-fed', 'calcium'],
    nutritionInfo: { calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3 }
  },
  {
    id: 'p-015', name: 'Cheddar Cheese Block', description: 'Sharp aged cheddar cheese with rich, bold flavor. Perfect for sandwiches and cooking.',
    price: 5.99, unit: '200g', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=400&fit=crop',
    category: ProductCategory.DAIRY, rating: 4.8, reviewCount: 156, inStock: true, isFeatured: true, tags: ['aged', 'sharp', 'cooking'],
    nutritionInfo: { calories: 403, protein: 25, carbs: 1.3, fat: 33 }
  },
  {
    id: 'p-016', name: 'Free Range Eggs', description: 'Fresh free-range eggs from happy hens. Rich yolks, great for all cooking.',
    price: 4.99, originalPrice: 5.99, unit: '12 pack', image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop',
    category: ProductCategory.DAIRY, rating: 4.9, reviewCount: 412, inStock: true, isFeatured: true, discount: 17, tags: ['free-range', 'protein', 'fresh'],
    nutritionInfo: { calories: 155, protein: 13, carbs: 1.1, fat: 11 }
  },

  // Bakery
  {
    id: 'p-017', name: 'Sourdough Loaf', description: 'Artisan sourdough bread with crispy crust and chewy interior. Made with long fermentation.',
    price: 5.49, unit: '800g loaf', image: 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=400&h=400&fit=crop',
    category: ProductCategory.BAKERY, rating: 4.8, reviewCount: 289, inStock: true, isFeatured: true, tags: ['artisan', 'fermented', 'crusty'],
    nutritionInfo: { calories: 274, protein: 9.5, carbs: 56, fat: 1.2 }
  },
  {
    id: 'p-018', name: 'Blueberry Muffins', description: 'Soft and fluffy blueberry muffins loaded with fresh blueberries. Perfect morning treat.',
    price: 3.99, unit: '4 pack', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop',
    category: ProductCategory.BAKERY, rating: 4.6, reviewCount: 198, inStock: true, isFeatured: false, tags: ['breakfast', 'sweet', 'fresh-baked'],
    nutritionInfo: { calories: 340, protein: 4.5, carbs: 52, fat: 13 }
  },
  {
    id: 'p-019', name: 'Whole Wheat Bread', description: 'Nutritious whole wheat bread, high in fiber and nutrients. Great for healthy sandwiches.',
    price: 3.49, originalPrice: 3.99, unit: '600g', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop',
    category: ProductCategory.BAKERY, rating: 4.4, reviewCount: 167, inStock: true, isFeatured: false, discount: 13, tags: ['whole-grain', 'fiber', 'healthy'],
    nutritionInfo: { calories: 247, protein: 13, carbs: 41, fat: 3.4 }
  },

  // Beverages
  {
    id: 'p-020', name: 'Cold Brew Coffee', description: 'Smooth and rich cold brew coffee concentrate. 20-hour steeped for maximum flavor.',
    price: 6.99, unit: '500ml', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop',
    category: ProductCategory.BEVERAGES, rating: 4.7, reviewCount: 341, inStock: true, isFeatured: true, tags: ['coffee', 'cold-brew', 'concentrate'],
    nutritionInfo: { calories: 5, protein: 0.3, carbs: 0.5, fat: 0 }
  },
  {
    id: 'p-021', name: 'Sparkling Water Pack', description: 'Refreshing natural sparkling water with a hint of lemon. Zero calories, zero sugar.',
    price: 4.99, originalPrice: 5.99, unit: '6×500ml', image: 'https://images.unsplash.com/photo-1559839697-e6a24e3b1b43?w=400&h=400&fit=crop',
    category: ProductCategory.BEVERAGES, rating: 4.5, reviewCount: 189, inStock: true, isFeatured: false, discount: 17, tags: ['sparkling', 'zero-cal', 'hydration'],
    nutritionInfo: { calories: 0, protein: 0, carbs: 0, fat: 0 }
  },
  {
    id: 'p-022', name: 'Fresh Orange Juice', description: 'Freshly squeezed orange juice, no added sugar or preservatives. Rich in vitamin C.',
    price: 5.49, unit: '1L', image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=400&fit=crop',
    category: ProductCategory.BEVERAGES, rating: 4.6, reviewCount: 223, inStock: true, isFeatured: true, tags: ['fresh', 'vitamin-c', 'no-preservatives'],
    nutritionInfo: { calories: 45, protein: 0.7, carbs: 10, fat: 0.2 }
  },

  // Snacks
  {
    id: 'p-023', name: 'Mixed Nuts', description: 'Premium mix of roasted almonds, cashews, walnuts and pecans. Great healthy snack.',
    price: 9.99, originalPrice: 12.99, unit: '400g', image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=400&h=400&fit=crop',
    category: ProductCategory.SNACKS, rating: 4.8, reviewCount: 367, inStock: true, isFeatured: true, discount: 23, tags: ['premium', 'protein', 'healthy'],
    nutritionInfo: { calories: 607, protein: 20, carbs: 21, fat: 54 }
  },
  {
    id: 'p-024', name: 'Dark Chocolate Bar', description: '72% dark chocolate, rich in antioxidants. Fair trade certified cacao from Ecuador.',
    price: 3.99, unit: '100g', image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&h=400&fit=crop',
    category: ProductCategory.SNACKS, rating: 4.7, reviewCount: 278, inStock: true, isFeatured: false, tags: ['dark', 'fair-trade', 'antioxidants'],
    nutritionInfo: { calories: 579, protein: 7.8, carbs: 44, fat: 43 }
  },
  {
    id: 'p-025', name: 'Granola Bars', description: 'Chewy oat granola bars with honey and dried fruits. Perfect on-the-go snack.',
    price: 5.99, unit: '6 pack', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=400&fit=crop',
    category: ProductCategory.SNACKS, rating: 4.4, reviewCount: 189, inStock: true, isFeatured: false, discount: 10, originalPrice: 6.69, tags: ['oats', 'energy', 'portable'],
    nutritionInfo: { calories: 193, protein: 3.7, carbs: 28, fat: 7.6 }
  },

  // Meat
  {
    id: 'p-026', name: 'Chicken Breast', description: 'Boneless skinless chicken breast, free-range and hormone-free. Perfect for grilling.',
    price: 8.99, originalPrice: 10.99, unit: '500g', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d11d36?w=400&h=400&fit=crop',
    category: ProductCategory.MEAT, rating: 4.6, reviewCount: 312, inStock: true, isFeatured: true, discount: 18, tags: ['lean', 'protein', 'grilling'],
    nutritionInfo: { calories: 165, protein: 31, carbs: 0, fat: 3.6 }
  },
  {
    id: 'p-027', name: 'Salmon Fillet', description: 'Wild-caught Atlantic salmon fillet, rich in omega-3 fatty acids. Fresh and never frozen.',
    price: 14.99, unit: '300g', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=400&h=400&fit=crop',
    category: ProductCategory.MEAT, rating: 4.8, reviewCount: 234, inStock: true, isFeatured: true, tags: ['omega-3', 'wild-caught', 'fresh'],
    nutritionInfo: { calories: 208, protein: 20, carbs: 0, fat: 13 }
  },

  // Frozen
  {
    id: 'p-028', name: 'Frozen Berry Mix', description: 'Mixed frozen berries - strawberries, blueberries, raspberries. IQF preserved for maximum nutrition.',
    price: 5.99, originalPrice: 7.49, unit: '500g', image: 'https://images.unsplash.com/photo-1563746924237-f81c3ddf7c2d?w=400&h=400&fit=crop',
    category: ProductCategory.FROZEN, rating: 4.5, reviewCount: 198, inStock: true, isFeatured: false, discount: 20, tags: ['smoothie', 'antioxidants', 'IQF'],
    nutritionInfo: { calories: 50, protein: 0.8, carbs: 12, fat: 0.3 }
  },
  {
    id: 'p-029', name: 'Frozen Edamame', description: 'Ready-to-eat frozen edamame beans, lightly salted. High in plant protein.',
    price: 3.99, unit: '400g', image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400&h=400&fit=crop',
    category: ProductCategory.FROZEN, rating: 4.3, reviewCount: 145, inStock: true, isFeatured: false, tags: ['protein', 'plant-based', 'ready-to-eat'],
    nutritionInfo: { calories: 121, protein: 11, carbs: 9.9, fat: 5.2 }
  },

  // Organic
  {
    id: 'p-030', name: 'Organic Avocado', description: 'Creamy organic Hass avocados, perfectly ripened. Rich in healthy fats and potassium.',
    price: 3.99, unit: '2 piece', image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=400&fit=crop',
    category: ProductCategory.ORGANIC, rating: 4.7, reviewCount: 389, inStock: true, isFeatured: true, isOrganic: true, tags: ['healthy-fats', 'potassium', 'premium'],
    nutritionInfo: { calories: 160, protein: 2, carbs: 9, fat: 15 }
  },

  // Personal Care
  {
    id: 'p-031', name: 'Natural Hand Wash', description: 'Gentle natural hand wash with aloe vera and lavender. Sulfate-free, biodegradable.',
    price: 4.99, unit: '300ml', image: 'https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=400&h=400&fit=crop',
    category: ProductCategory.PERSONAL_CARE, rating: 4.5, reviewCount: 134, inStock: true, isFeatured: false, tags: ['natural', 'sulfate-free', 'gentle'],
    nutritionInfo: { calories: 0, protein: 0, carbs: 0, fat: 0 }
  },
];

export const banners = [
  {
    id: 'b-1',
    title: 'Fresh Organic\nVegetables',
    subtitle: 'Up to 40% off on seasonal vegetables',
    discount: '40% OFF',
    image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=800&h=400&fit=crop',
    bg: 'from-green-500 to-emerald-700',
    cta: 'Shop Now',
  },
  {
    id: 'b-2',
    title: 'Summer Fruits\nCollection',
    subtitle: 'Fresh fruits delivered to your door',
    discount: '25% OFF',
    image: 'https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?w=800&h=400&fit=crop',
    bg: 'from-orange-400 to-red-500',
    cta: 'Explore',
  },
  {
    id: 'b-3',
    title: 'Dairy & Eggs\nFresh Daily',
    subtitle: 'Farm-fresh dairy products every morning',
    discount: '15% OFF',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&h=400&fit=crop',
    bg: 'from-blue-400 to-indigo-600',
    cta: 'Order Now',
  },
];
