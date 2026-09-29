import React from 'react';
import { useShop } from '../context/ShopContext';
import type { Brand, Gender } from '../types';
import { RotateCcw, X, Check, Filter } from 'lucide-react';

interface FilterSidebarProps {
  isMobile?: boolean;
  onCloseMobile?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ isMobile, onCloseMobile }) => {
  const {
    filters,
    toggleBrand,
    toggleGender,
    toggleSize,
    toggleColor,
    setPriceRange,
    setInStockOnly,
    resetFilters,
  } = useShop();

  const brands: Brand[] = ['Nike', 'Adidas', 'Jordan', 'New Balance', 'Puma', 'Asics', 'Salomon'];
  const genders: Gender[] = ['Men', 'Women', 'Unisex'];
  const sizes = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13];
  
  const colors = [
    { name: 'Volt Lime', hex: '#ccff00' },
    { name: 'Crimson Red', hex: '#ff3366' },
    { name: 'Electric Cyan', hex: '#06b6d4' },
    { name: 'Classic Blue', hex: '#3b82f6' },
    { name: 'Forest Green', hex: '#166534' },
    { name: 'Midnight Black', hex: '#0f172a' },
    { name: 'Pure White', hex: '#f8fafc' },
    { name: 'Stealth Grey', hex: '#64748b' },
    { name: 'Maroon', hex: '#881337' },
  ];

  const hasActiveFilters = 
    filters.brands.length > 0 ||
    filters.genders.length > 0 ||
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.minPrice > 50 ||
    filters.maxPrice < 300 ||
    filters.inStockOnly;

  return (
    <div className={`flex flex-col gap-6 text-left ${isMobile ? 'p-6' : 'p-5 rounded-2xl glass-card border border-white/10'}`}>
      
      {/* Header with Title and Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-accent" />
          <h3 className="font-display font-bold text-white text-base">Filters</h3>
        </div>
        
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-brand-accent hover:text-rose-400 font-semibold flex items-center gap-1 hover:underline transition-all"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}

          {isMobile && onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Brands Filter */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Brand</h4>
        <div className="flex flex-wrap gap-1.5">
          {brands.map((brand) => {
            const isSelected = filters.brands.includes(brand);
            return (
              <button
                key={brand}
                onClick={() => toggleBrand(brand)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-brand-accent text-white font-bold shadow-sm'
                    : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                }`}
              >
                {brand}
              </button>
            );
          })}
        </div>
      </div>

      {/* Gender Filter */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Gender</h4>
        <div className="grid grid-cols-3 gap-1.5">
          {genders.map((g) => {
            const isSelected = filters.genders.includes(g);
            return (
              <button
                key={g}
                onClick={() => toggleGender(g)}
                className={`py-1.5 rounded-lg text-xs font-medium text-center transition-all ${
                  isSelected
                    ? 'bg-white text-slate-900 font-bold shadow'
                    : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                }`}
              >
                {g}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-300 uppercase tracking-wider">Price Range</span>
          <span className="font-mono text-brand-volt font-bold">
            ${filters.minPrice} — ${filters.maxPrice}
          </span>
        </div>
        <div className="space-y-2">
          <input
            type="range"
            min={50}
            max={300}
            step={10}
            value={filters.maxPrice}
            onChange={(e) => setPriceRange(filters.minPrice, Number(e.target.value))}
            className="w-full accent-brand-accent cursor-pointer bg-slate-800 h-1.5 rounded-lg appearance-none"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>$50</span>
            <span>$175</span>
            <span>$300</span>
          </div>
        </div>
      </div>

      {/* Shoe Sizes Grid */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Size (US)</h4>
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5">
          {sizes.map((size) => {
            const isSelected = filters.sizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-brand-accent text-white shadow-glow'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/50'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Swatches Filter */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Colorways</h4>
        <div className="flex flex-wrap gap-2.5">
          {colors.map((c) => {
            const isSelected = filters.colors.includes(c.hex);
            return (
              <button
                key={c.hex}
                onClick={() => toggleColor(c.hex)}
                title={c.name}
                style={{ backgroundColor: c.hex }}
                className={`w-7 h-7 rounded-full border-2 transition-transform relative flex items-center justify-center ${
                  isSelected
                    ? 'border-white scale-110 shadow-lg ring-2 ring-brand-accent'
                    : 'border-slate-700 hover:scale-105'
                }`}
              >
                {isSelected && (
                  <Check
                    className={`w-3.5 h-3.5 ${
                      c.hex === '#f8fafc' || c.hex === '#ccff00' ? 'text-black' : 'text-white'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* In Stock Toggle */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-300">In-Stock Only</span>
        <button
          onClick={() => setInStockOnly(!filters.inStockOnly)}
          className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 ${
            filters.inStockOnly ? 'bg-emerald-500' : 'bg-slate-800'
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full bg-white transition-transform ${
              filters.inStockOnly ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {isMobile && (
        <button
          onClick={onCloseMobile}
          className="w-full py-3 rounded-xl bg-brand-accent text-white font-bold text-sm shadow-glow mt-4"
        >
          View Results
        </button>
      )}

    </div>
  );
};
