import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Sparkles, 
  SlidersHorizontal,
  Flame, 
  Palette,
  ArrowRight,
  TrendingUp,
  Tag
} from 'lucide-react';
import type { Category } from '../types';

export const Navbar: React.FC<{ onOpenMobileFilters?: () => void }> = ({ onOpenMobileFilters }) => {
  const { 
    cart, 
    wishlist, 
    setIsCartOpen, 
    setIsWishlistOpen, 
    setIsCustomizerOpen,
    filters,
    setCategory,
    setSearchQuery,
    products,
    setQuickViewProduct
  } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [localSearch, setLocalSearch] = useState(filters.searchQuery);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistItemCount = wishlist.length;

  useEffect(() => {
    setLocalSearch(filters.searchQuery);
  }, [filters.searchQuery]);

  // Close search preview when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    setIsSearchFocused(false);
    const catalogElem = document.getElementById('catalog-section');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectSearchResult = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    if (prod) {
      setQuickViewProduct(prod);
      setIsSearchFocused(false);
    }
  };

  const matchingSuggestions = localSearch.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(localSearch.toLowerCase()) ||
          p.brand.toLowerCase().includes(localSearch.toLowerCase()) ||
          p.category.toLowerCase().includes(localSearch.toLowerCase())
      ).slice(0, 4)
    : [];

  const navCategories: { label: string; cat?: Category; isSpecial?: 'customizer' | 'lookbook' | 'drops' }[] = [
    { label: 'Shop All', cat: 'All' },
    { label: 'Drops 🔥', isSpecial: 'drops' },
    { label: 'Running', cat: 'Running' },
    { label: 'Lifestyle', cat: 'Lifestyle' },
    { label: 'Basketball', cat: 'Basketball' },
    { label: '3D Customizer 🎨', isSpecial: 'customizer' },
    { label: 'Street Lookbook', isSpecial: 'lookbook' },
  ];

  const scrollToCatalog = () => {
    const elem = document.getElementById('catalog-section');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Banner Ticker */}
      <div className="bg-gradient-to-r from-brand-accent via-rose-600 to-amber-500 text-white text-xs font-semibold py-1.5 px-4 text-center tracking-wide overflow-hidden flex items-center justify-center gap-4 shadow-sm">
        <span className="flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 animate-pulse" />
          <span className="font-bold">EXCLUSIVE DROP:</span> Get 20% OFF with code <strong className="underline underline-offset-2">STRIDE20</strong>
        </span>
        <span className="hidden md:inline-block text-white/60">•</span>
        <span className="hidden md:inline-flex items-center gap-1">
          <Tag className="w-3 h-3" /> Free Worldwide Express Shipping over $150
        </span>
      </div>

      {/* Main Navbar */}
      <nav className="glass border-b border-white/10 bg-[#0b0f19]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <button 
              onClick={() => {
                setCategory('All');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 group text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-accent to-amber-400 flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform duration-300">
                {/* Modern Sneaker Icon */}
                <svg className="w-6 h-6 text-white transform -rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3.5 17.5 6 15l2.5 2.5L12 14l3.5 3.5L20 13l2 3.5" />
                  <path d="M2 18h20" />
                  <path d="M4 18v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1" />
                  <path d="m7 14 3-6 5 2 3-4" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-2xl tracking-tighter text-white group-hover:text-brand-accent transition-colors flex items-center gap-1">
                  STRIDE
                  <span className="w-2 h-2 rounded-full bg-brand-volt inline-block animate-ping"></span>
                </span>
                <span className="text-[10px] tracking-widest text-slate-400 font-medium uppercase -mt-1">
                  Urban & Athletic Footwear
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navCategories.map((item, idx) => {
                const isActive = item.cat && filters.category === item.cat;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (item.isSpecial === 'customizer') {
                        setIsCustomizerOpen(true);
                      } else if (item.isSpecial === 'lookbook') {
                        const elem = document.getElementById('lookbook-section');
                        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                      } else if (item.isSpecial === 'drops') {
                        setCategory('Limited Edition');
                        scrollToCatalog();
                      } else if (item.cat) {
                        setCategory(item.cat);
                        scrollToCatalog();
                      }
                    }}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                      isActive 
                        ? 'bg-white/10 text-white shadow-inner font-semibold' 
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    } ${item.isSpecial === 'customizer' ? 'text-brand-volt hover:text-white font-semibold' : ''}`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Section: Search Bar & Action Buttons */}
          <div className="flex items-center gap-3">
            
            {/* Search Bar with Autocomplete Dropdown */}
            <div ref={searchContainerRef} className="relative hidden md:block w-52 lg:w-64">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <input
                    type="text"
                    value={localSearch}
                    onChange={(e) => {
                      setLocalSearch(e.target.value);
                      setIsSearchFocused(true);
                    }}
                    onFocus={() => setIsSearchFocused(true)}
                    placeholder="Search sneakers, brands..."
                    className="w-full bg-slate-900/90 border border-slate-700/70 focus:border-brand-accent rounded-full py-2 pl-9 pr-4 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-accent transition-all"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  {localSearch && (
                    <button
                      type="button"
                      onClick={() => {
                        setLocalSearch('');
                        setSearchQuery('');
                      }}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </form>

              {/* Autocomplete Dropdown */}
              {isSearchFocused && localSearch.trim().length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#0f172a] border border-slate-700/80 rounded-xl shadow-2xl p-2 z-50 animate-fade-in backdrop-blur-xl">
                  <div className="text-[11px] font-semibold text-slate-400 px-3 py-1.5 uppercase tracking-wider flex items-center justify-between">
                    <span>Suggestions</span>
                    <TrendingUp className="w-3 h-3 text-brand-volt" />
                  </div>
                  {matchingSuggestions.length > 0 ? (
                    <div className="flex flex-col gap-1">
                      {matchingSuggestions.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => handleSelectSearchResult(product.id)}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/80 transition-colors text-left w-full group"
                        >
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-10 h-10 rounded-md object-cover bg-slate-800 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-white group-hover:text-brand-accent truncate">
                              {product.name}
                            </p>
                            <p className="text-[10px] text-slate-400">
                              {product.brand} • ${product.price}
                            </p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 p-3 text-center">
                      No sneakers matching "{localSearch}"
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Customizer Studio Fast CTA (Tablet / Desktop) */}
            <button
              onClick={() => setIsCustomizerOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-brand-volt/20 to-emerald-500/10 border border-brand-volt/30 text-brand-volt hover:bg-brand-volt/30 text-xs font-bold transition-all shadow-sm group"
            >
              <Palette className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span>Studio 3D</span>
            </button>

            {/* Mobile Filter Toggle */}
            {onOpenMobileFilters && (
              <button
                onClick={onOpenMobileFilters}
                className="lg:hidden p-2.5 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                aria-label="Filter products"
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            )}

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 rounded-xl bg-slate-800/80 text-slate-300 hover:text-rose-400 hover:bg-slate-700/80 transition-all group"
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 transition-transform group-hover:scale-110 ${wishlistItemCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {wishlistItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center shadow-lg animate-fade-in">
                  {wishlistItemCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-brand-accent hover:bg-rose-500 text-white font-semibold text-sm transition-all shadow-glow hover:shadow-glow/80 active:scale-95 group"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              <span className="hidden sm:inline-block text-xs font-bold">Cart</span>
              {cartItemCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-white text-slate-900 text-[11px] font-black flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Slideout */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 bg-[#0d1322] px-4 py-5 animate-slide-up space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <input
                  type="text"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  placeholder="Search sneakers, models..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-brand-accent"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </form>

            <div className="flex flex-col gap-1.5 pt-2">
              {navCategories.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (item.isSpecial === 'customizer') {
                      setIsCustomizerOpen(true);
                    } else if (item.isSpecial === 'lookbook') {
                      const elem = document.getElementById('lookbook-section');
                      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                    } else if (item.isSpecial === 'drops') {
                      setCategory('Limited Edition');
                      scrollToCatalog();
                    } else if (item.cat) {
                      setCategory(item.cat);
                      scrollToCatalog();
                    }
                  }}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-semibold text-slate-200 hover:bg-slate-800/80 hover:text-white transition-colors"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </button>
              ))}
            </div>

            {/* Customizer CTA in Mobile Menu */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsCustomizerOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-brand-volt to-emerald-400 text-slate-950 font-bold text-sm shadow-glow-volt mt-2"
            >
              <Sparkles className="w-4 h-4" />
              Open 3D Sneaker Studio
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};
