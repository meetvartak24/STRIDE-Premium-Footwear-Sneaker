import React, { useState } from 'react';
import type { Product, ProductColor } from '../types';
import { useShop } from '../context/ShopContext';
import { 
  Heart, 
  Eye, 
  ShoppingBag, 
  Star, 
  Flame 
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setQuickViewProduct 
  } = useShop();

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickSize, setShowQuickSize] = useState(false);

  const isFavorite = isInWishlist(product.id);
  const currentColor: ProductColor = product.colors[selectedColorIndex] || product.colors[0];
  
  // Use image matching colorway if available or fallback
  const currentImage = product.images[currentColor.imageIndex ?? selectedColorIndex] || product.images[0];
  const hoverImage = product.images[1] || currentImage;

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleQuickAdd = (size: number, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, size, currentColor, 1);
    setShowQuickSize(false);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickSize(false);
      }}
      className="group relative flex flex-col rounded-2xl glass-card border border-white/10 hover:border-brand-accent/40 transition-all duration-300 hover:shadow-glow/40 hover:-translate-y-1.5 overflow-hidden"
    >
      
      {/* Top Media Area */}
      <div 
        onClick={() => setQuickViewProduct(product)}
        className="relative w-full aspect-[4/3] bg-gradient-to-b from-slate-900/80 to-slate-950 flex items-center justify-center p-6 cursor-pointer overflow-hidden"
      >
        
        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 items-start">
          {product.badge && (
            <span className="px-2.5 py-1 rounded-md bg-gradient-to-r from-brand-accent to-rose-600 text-white font-black text-[10px] uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Flame className="w-3 h-3" />
              {product.badge}
            </span>
          )}
          {discountPercent && discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-md bg-rose-500/90 text-white font-bold text-[10px] tracking-wide shadow-sm">
              -{discountPercent}% OFF
            </span>
          )}
          {product.isNew && !product.badge && (
            <span className="px-2 py-0.5 rounded-md bg-brand-volt text-slate-950 font-black text-[10px] tracking-wider uppercase">
              NEW
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-20 p-2 rounded-xl backdrop-blur-md transition-all duration-300 ${
            isFavorite
              ? 'bg-rose-500 text-white shadow-lg scale-110'
              : 'bg-slate-900/70 text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          aria-label="Save to favorites"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
        </button>

        {/* Sneaker Image with Smooth Crossfade on Hover */}
        <img
          src={isHovered && hoverImage ? hoverImage : currentImage}
          alt={product.name}
          className="w-full h-full object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.6)] transform group-hover:scale-110 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Quick View Button Hover overlay */}
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 pointer-events-none">
          <span className="px-4 py-2 rounded-xl glass border border-white/20 text-white text-xs font-bold tracking-wide flex items-center gap-1.5 shadow-xl">
            <Eye className="w-3.5 h-3.5 text-brand-volt" /> Quick View
          </span>
        </div>

        {/* Quick Size Popover on Bottom of Image */}
        {showQuickSize && (
          <div 
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-0 bottom-0 p-3 bg-slate-900/95 backdrop-blur-md border-t border-white/10 z-30 animate-slide-up"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-300">Select US Size to Add:</span>
              <button onClick={() => setShowQuickSize(false)} className="text-slate-400 hover:text-white text-xs">✕</button>
            </div>
            <div className="grid grid-cols-5 gap-1">
              {product.sizes.slice(0, 10).map((sz) => (
                <button
                  key={sz}
                  onClick={(e) => handleQuickAdd(sz, e)}
                  className="py-1 bg-slate-800 hover:bg-brand-accent text-white rounded text-[10px] font-bold transition-colors"
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        {/* Brand & Category & Rating */}
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
            <span>{product.brand} • {product.category}</span>
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-500 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => setQuickViewProduct(product)}
            className="text-sm font-bold text-white mt-1 group-hover:text-brand-accent transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>
        </div>

        {/* Colorway Swatches Selector */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColorIndex(idx);
                }}
                title={color.name}
                style={{ backgroundColor: color.hex }}
                className={`w-4 h-4 rounded-full border transition-all ${
                  selectedColorIndex === idx
                    ? 'border-white scale-125 ring-1 ring-brand-accent shadow'
                    : 'border-slate-600 hover:scale-110 opacity-70 hover:opacity-100'
                }`}
              />
            ))}
          </div>

          <span className="text-[10px] text-slate-400">
            {product.colors.length} {product.colors.length === 1 ? 'color' : 'colors'}
          </span>
        </div>

        {/* Price & Action Button */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-white font-display">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            {product.stock <= 5 && (
              <span className="text-[10px] text-rose-400 font-semibold">
                Only {product.stock} left
              </span>
            )}
          </div>

          {/* Instant Quick Add Trigger */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowQuickSize(!showQuickSize);
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-brand-accent text-slate-200 hover:text-white text-xs font-bold transition-all shadow-sm active:scale-95 group/btn"
          >
            <ShoppingBag className="w-3.5 h-3.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            <span>Add</span>
          </button>
        </div>

      </div>

    </div>
  );
};
