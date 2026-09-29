import React from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Trash2, 
  Star 
} from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    products,
    toggleWishlist,
    addToCart,
    setQuickViewProduct,
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleMoveAllToCart = () => {
    wishlistProducts.forEach((p) => {
      addToCart(p, p.sizes[0] || 9, p.colors[0], 1);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      
      {/* Backdrop */}
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm animate-fade-in"
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#0a0f1d] border-l border-white/10 shadow-2xl flex flex-col h-full z-10 animate-slide-up sm:animate-none">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h2 className="font-display font-black text-lg text-white">Your Saved Wishlist</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono font-bold">
              {wishlistProducts.length}
            </span>
          </div>

          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
          {wishlistProducts.length > 0 ? (
            wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="p-3.5 rounded-2xl glass-card border border-white/5 flex gap-3.5 items-center group relative hover:border-white/20 transition-all"
              >
                {/* Image */}
                <div 
                  onClick={() => {
                    setQuickViewProduct(product);
                    setIsWishlistOpen(false);
                  }}
                  className="w-20 h-20 rounded-xl bg-slate-900 border border-slate-800 p-2 flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h4 
                      onClick={() => {
                        setQuickViewProduct(product);
                        setIsWishlistOpen(false);
                      }}
                      className="text-xs font-bold text-white truncate cursor-pointer hover:text-brand-accent transition-colors"
                    >
                      {product.name}
                    </h4>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="text-slate-500 hover:text-rose-400 p-1 -mr-1 transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                    <span>{product.brand}</span>
                    <span>•</span>
                    <div className="flex items-center gap-0.5 text-amber-400 font-bold">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm font-black text-white font-display">
                      ${product.price}
                    </span>

                    <button
                      onClick={() => addToCart(product, product.sizes[0] || 9, product.colors[0], 1)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-accent hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-glow/50 active:scale-95"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* Empty State */
            <div className="py-16 text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                <Heart className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">No saved pairs</h3>
                <p className="text-xs text-slate-400 max-w-xs">
                  Tap the heart icon on any sneaker in the catalog to save it to your personal wishlist.
                </p>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
              >
                Explore Sneakers
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {wishlistProducts.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-slate-900/95 space-y-3">
            <button
              onClick={handleMoveAllToCart}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-brand-accent to-rose-600 text-white font-black text-xs uppercase tracking-wider shadow-glow hover:scale-[1.01] active:scale-95 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Move All to Bag ({wishlistProducts.length} items)</span>
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
