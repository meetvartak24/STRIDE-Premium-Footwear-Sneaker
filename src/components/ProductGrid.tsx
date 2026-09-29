import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { 
  ArrowUpDown, 
  X, 
  RotateCcw, 
  PackageX 
} from 'lucide-react';
import type { FilterState, Brand, Gender } from '../types';

export const ProductGrid: React.FC = () => {
  const {
    filteredProducts,
    filters,
    setSortBy,
    toggleBrand,
    toggleGender,
    toggleSize,
    toggleColor,
    setSearchQuery,
    resetFilters,
  } = useShop();

  const sortOptions: { label: string; value: FilterState['sortBy'] }[] = [
    { label: 'Featured & Drops', value: 'featured' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Highest Rated', value: 'rating' },
    { label: 'Newest Arrivals', value: 'newest' },
  ];

  return (
    <div className="flex-1 space-y-6">
      
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl glass border border-white/5">
        
        {/* Results Count & Search Indicator */}
        <div>
          <h2 className="text-base font-bold text-white font-display flex items-center gap-2">
            <span>Catalog Collection</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-accent/20 text-brand-accent font-mono font-bold">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Pair' : 'Pairs'}
            </span>
          </h2>
          {filters.searchQuery && (
            <p className="text-xs text-slate-400 mt-0.5">
              Filtered for search query: <strong className="text-white">"{filters.searchQuery}"</strong>
            </p>
          )}
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Sort By:</span>
          <select
            value={filters.sortBy}
            onChange={(e) => setSortBy(e.target.value as FilterState['sortBy'])}
            className="bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-white font-medium focus:outline-none focus:border-brand-accent cursor-pointer"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-slate-900 text-white">
                {opt.label}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Active Filter Tags Bar */}
      {(filters.brands.length > 0 ||
        filters.genders.length > 0 ||
        filters.sizes.length > 0 ||
        filters.colors.length > 0 ||
        filters.searchQuery) && (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Active Filters:</span>

          {filters.searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">
              Search: "{filters.searchQuery}"
              <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.brands.map((b) => (
            <span key={b} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-accent/20 text-brand-accent border border-brand-accent/30 font-semibold">
              {b}
              <button onClick={() => toggleBrand(b as Brand)} className="hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {filters.genders.map((g) => (
            <span key={g} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">
              {g}
              <button onClick={() => toggleGender(g as Gender)} className="text-slate-400 hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {filters.sizes.map((s) => (
            <span key={s} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 font-mono">
              Size US {s}
              <button onClick={() => toggleSize(s)} className="text-slate-400 hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {filters.colors.map((c) => (
            <span key={c} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }}></span>
              Color
              <button onClick={() => toggleColor(c)} className="text-slate-400 hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          <button
            onClick={resetFilters}
            className="text-xs text-rose-400 hover:underline font-semibold ml-2"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center rounded-3xl glass border border-white/10 flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-800/80 flex items-center justify-center text-slate-400">
            <PackageX className="w-8 h-8" />
          </div>
          <div className="space-y-1 max-w-sm">
            <h3 className="text-lg font-bold text-white">No Sneakers Match Your Filters</h3>
            <p className="text-xs text-slate-400">
              Try adjusting your price range, selected sizes, brands, or search terms to explore other available shoes.
            </p>
          </div>
          <button
            onClick={resetFilters}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-accent text-white text-xs font-bold shadow-glow hover:scale-105 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
};
