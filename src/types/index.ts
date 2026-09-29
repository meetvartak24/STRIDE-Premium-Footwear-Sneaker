export type Category = 
  | 'All'
  | 'Running'
  | 'Lifestyle'
  | 'Basketball'
  | 'Skateboarding'
  | 'Trail & Hiking'
  | 'Limited Edition';

export type Brand = 'Nike' | 'Adidas' | 'Jordan' | 'New Balance' | 'Puma' | 'Asics' | 'Salomon';

export type Gender = 'Men' | 'Women' | 'Unisex';

export interface ProductColor {
  name: string;
  hex: string;
  imageIndex?: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: Brand;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: Category;
  gender: Gender;
  sizes: number[];
  colors: ProductColor[];
  images: string[];
  featured?: boolean;
  isNew?: boolean;
  isTrending?: boolean;
  isSale?: boolean;
  badge?: string;
  stock: number;
  description: string;
  details: string[];
  technology: string[];
  sku: string;
  reviews: Review[];
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  selectedSize: number;
  selectedColor: ProductColor;
  quantity: number;
  isCustom?: boolean;
  customConfig?: CustomShoeConfig;
}

export interface CustomShoeConfig {
  modelName: string;
  baseColor: string;
  upperColor: string;
  swooshColor: string;
  soleColor: string;
  lacesColor: string;
  liningColor: string;
  customText: string;
  size: number;
}

export interface FilterState {
  category: Category;
  brands: string[];
  genders: string[];
  sizes: number[];
  colors: string[];
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  searchQuery: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

export interface LookbookItem {
  id: string;
  imageUrl: string;
  author: string;
  handle: string;
  taggedShoeName: string;
  taggedShoeId: string;
  price: number;
  likes: number;
}

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  createdAt: string;
}
