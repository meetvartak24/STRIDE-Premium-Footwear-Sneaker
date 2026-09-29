import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { 
  Product, 
  CartItem, 
  FilterState, 
  Category, 
  Brand, 
  Gender, 
  ProductColor, 
  CustomShoeConfig, 
  Review 
} from '../types';
import { INITIAL_PRODUCTS, PROMO_CODES } from '../data/products';

interface Toast {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface ShopContextType {
  products: Product[];
  filteredProducts: Product[];
  cart: CartItem[];
  wishlist: string[];
  filters: FilterState;
  
  // Cart Actions
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, size: number, color: ProductColor, quantity?: number, isCustom?: boolean, customConfig?: CustomShoeConfig) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Checkout & Promo
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  appliedPromo: string | null;
  promoDiscount: number;
  promoFreeShipping: boolean;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  cartSubtotal: number;
  cartTotal: number;
  freeShippingProgress: number;
  
  // Wishlist Actions
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Filter Actions
  setCategory: (category: Category) => void;
  toggleBrand: (brand: Brand) => void;
  toggleGender: (gender: Gender) => void;
  toggleSize: (size: number) => void;
  toggleColor: (colorHex: string) => void;
  setPriceRange: (min: number, max: number) => void;
  setInStockOnly: (inStock: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: FilterState['sortBy']) => void;
  resetFilters: () => void;
  
  // Modal Actions
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isCustomizerOpen: boolean;
  setIsCustomizerOpen: (open: boolean) => void;
  
  // Reviews & Feedback
  addReview: (productId: string, review: Omit<Review, 'id' | 'date'>) => void;
  toasts: Toast[];
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const initialFilters: FilterState = {
  category: 'All',
  brands: [],
  genders: [],
  sizes: [],
  colors: [],
  minPrice: 50,
  maxPrice: 300,
  inStockOnly: false,
  searchQuery: '',
  sortBy: 'featured',
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('stride_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('stride_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('stride_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('stride_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('stride_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('stride_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Toast System
  const showToast = (title: string, message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (
    product: Product,
    size: number,
    color: ProductColor,
    quantity: number = 1,
    isCustom: boolean = false,
    customConfig?: CustomShoeConfig
  ) => {
    setCart((prev) => {
      const cartItemId = isCustom
        ? `custom-${Date.now()}`
        : `${product.id}-${size}-${color.name}`;
      
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          product,
          selectedSize: size,
          selectedColor: color,
          quantity,
          isCustom,
          customConfig,
        },
      ];
    });

    showToast(
      'Added to Cart',
      `${product.name} (Size US ${size}, ${color.name}) is in your cart!`,
      'success'
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast('Removed item', 'Item removed from your cart.', 'info');
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from Wishlist', `${product?.name || 'Item'} removed from favorites.`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to Wishlist', `${product?.name || 'Item'} added to favorites!`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Filter setters
  const setCategory = (category: Category) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  const toggleBrand = (brand: Brand) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand],
    }));
  };

  const toggleGender = (gender: Gender) => {
    setFilters((prev) => ({
      ...prev,
      genders: prev.genders.includes(gender)
        ? prev.genders.filter((g) => g !== gender)
        : [...prev.genders, gender],
    }));
  };

  const toggleSize = (size: number) => {
    setFilters((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const toggleColor = (colorHex: string) => {
    setFilters((prev) => ({
      ...prev,
      colors: prev.colors.includes(colorHex)
        ? prev.colors.filter((c) => c !== colorHex)
        : [...prev.colors, colorHex],
    }));
  };

  const setPriceRange = (minPrice: number, maxPrice: number) => {
    setFilters((prev) => ({ ...prev, minPrice, maxPrice }));
  };

  const setInStockOnly = (inStockOnly: boolean) => {
    setFilters((prev) => ({ ...prev, inStockOnly }));
  };

  const setSearchQuery = (searchQuery: string) => {
    setFilters((prev) => ({ ...prev, searchQuery }));
  };

  const setSortBy = (sortBy: FilterState['sortBy']) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  // Reviews
  const addReview = (productId: string, newRev: Omit<Review, 'id' | 'date'>) => {
    const fullReview: Review = {
      ...newRev,
      id: `rev-${Date.now()}`,
      date: 'Just now',
    };
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updatedReviews = [fullReview, ...p.reviews];
          const avgRating = Number(
            (
              updatedReviews.reduce((sum, r) => sum + r.rating, 0) /
              updatedReviews.length
            ).toFixed(1)
          );
          return {
            ...p,
            reviews: updatedReviews,
            reviewCount: p.reviewCount + 1,
            rating: avgRating,
          };
        }
        return p;
      })
    );
    showToast('Review Submitted', 'Thank you for your rating & feedback!', 'success');
  };

  // Promo Code
  const applyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const promo = PROMO_CODES[cleanCode];
    if (promo) {
      setAppliedPromo(cleanCode);
      showToast('Promo Applied!', promo.description, 'success');
      return { success: true, message: promo.description };
    }
    showToast('Invalid Coupon', `Code "${code}" is not valid. Try STRIDE20.`, 'error');
    return { success: false, message: 'Invalid promo code' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Promo Removed', 'Coupon code has been removed.', 'info');
  };

  // Cart Calculations
  const cartSubtotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cart]);

  const promoInfo = appliedPromo ? PROMO_CODES[appliedPromo] : null;
  const promoDiscount = useMemo(() => {
    if (!promoInfo) return 0;
    if (promoInfo.discountPercent) {
      return (cartSubtotal * promoInfo.discountPercent) / 100;
    }
    if (promoInfo.fixedDiscount) {
      return Math.min(cartSubtotal, promoInfo.fixedDiscount);
    }
    return 0;
  }, [cartSubtotal, promoInfo]);

  const promoFreeShipping = Boolean(promoInfo?.freeShipping);

  const freeShippingThreshold = 150;
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const cartTotal = useMemo(() => {
    const discounted = Math.max(0, cartSubtotal - promoDiscount);
    const shipping = cartSubtotal === 0 || cartSubtotal >= 150 || promoFreeShipping ? 0 : 15;
    return discounted + shipping;
  }, [cartSubtotal, promoDiscount, promoFreeShipping]);

  // Filtered Products computation
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category
      if (filters.category !== 'All' && product.category !== filters.category) {
        return false;
      }
      // Brand
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }
      // Gender
      if (filters.genders.length > 0 && !filters.genders.includes(product.gender) && product.gender !== 'Unisex') {
        return false;
      }
      // Sizes
      if (
        filters.sizes.length > 0 &&
        !filters.sizes.some((size) => product.sizes.includes(size))
      ) {
        return false;
      }
      // Colors
      if (
        filters.colors.length > 0 &&
        !filters.colors.some((colorHex) =>
          product.colors.some((c) => c.hex.toLowerCase() === colorHex.toLowerCase())
        )
      ) {
        return false;
      }
      // Price
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }
      // In Stock
      if (filters.inStockOnly && product.stock <= 0) {
        return false;
      }
      // Search
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchBrand = product.brand.toLowerCase().includes(query);
        const matchCat = product.category.toLowerCase().includes(query);
        const matchTech = product.technology.some((t) => t.toLowerCase().includes(query));
        if (!matchName && !matchBrand && !matchCat && !matchTech) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      // featured default
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, filters]);

  return (
    <ShopContext.Provider
      value={{
        products,
        filteredProducts,
        cart,
        wishlist,
        filters,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCheckoutOpen,
        setIsCheckoutOpen,
        appliedPromo,
        promoDiscount,
        promoFreeShipping,
        applyPromoCode,
        removePromoCode,
        cartSubtotal,
        cartTotal,
        freeShippingProgress,
        isWishlistOpen,
        setIsWishlistOpen,
        toggleWishlist,
        isInWishlist,
        setCategory,
        toggleBrand,
        toggleGender,
        toggleSize,
        toggleColor,
        setPriceRange,
        setInStockOnly,
        setSearchQuery,
        setSortBy,
        resetFilters,
        quickViewProduct,
        setQuickViewProduct,
        isCustomizerOpen,
        setIsCustomizerOpen,
        addReview,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
