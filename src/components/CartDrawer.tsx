import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  Tag, 
  Check, 
  ShieldCheck 
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartTotal,
    promoDiscount,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    promoFreeShipping,
    freeShippingProgress,
    setIsCheckoutOpen,
  } = useShop();

  const [promoInput, setPromoInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    if (res.success) {
      setPromoInput('');
    }
  };

  const remainingForFreeShipping = Math.max(0, 150 - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity animate-fade-in"
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#0a0f1d] border-l border-white/10 shadow-2xl flex flex-col h-full z-10 animate-slide-up sm:animate-none">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-brand-accent" />
            <h2 className="font-display font-black text-lg text-white">Your Shopping Bag</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono font-bold">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="p-4 bg-slate-900/90 border-b border-white/5 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Truck className="w-3.5 h-3.5 text-cyan-400" />
              {remainingForFreeShipping > 0 && !promoFreeShipping ? (
                <>Add <strong className="text-brand-volt">${remainingForFreeShipping.toFixed(0)}</strong> more for FREE shipping</>
              ) : (
                <span className="text-emerald-400 flex items-center gap-1 font-bold">
                  <Check className="w-3.5 h-3.5" /> Free Express Shipping Unlocked!
                </span>
              )}
            </span>
            <span className="font-mono text-[11px] text-slate-400">
              {promoFreeShipping || remainingForFreeShipping === 0 ? '100%' : `${Math.round(freeShippingProgress)}%`}
            </span>
          </div>

          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-brand-accent via-amber-400 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${promoFreeShipping ? 100 : freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.cartItemId}
                className="p-3.5 rounded-2xl glass-card border border-white/5 flex gap-3.5 items-center group relative hover:border-white/20 transition-all"
              >
                {/* Item Thumbnail */}
                <div className="w-20 h-20 rounded-xl bg-slate-900 border border-slate-800 p-2 flex items-center justify-center shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="text-xs font-bold text-white truncate group-hover:text-brand-accent transition-colors">
                      {item.product.name}
                    </h4>
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-slate-500 hover:text-rose-400 p-1 -mr-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 mt-1">
                    <span className="font-semibold text-slate-300">Size: US {item.selectedSize}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.selectedColor.hex }} />
                      <span className="truncate max-w-[100px]">{item.selectedColor.name}</span>
                    </span>
                  </div>

                  {item.isCustom && item.customConfig && (
                    <span className="inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded bg-brand-volt/15 text-brand-volt border border-brand-volt/30 font-mono font-bold">
                      Custom: "{item.customConfig.customText}"
                    </span>
                  )}

                  {/* Quantity & Unit Price */}
                  <div className="flex items-center justify-between mt-3 pt-1">
                    <div className="flex items-center bg-slate-900 border border-slate-700/80 rounded-lg p-0.5">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-bold"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-white font-mono">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-bold"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-sm font-black text-white font-display">
                      ${(item.product.price * item.quantity).toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* Empty Cart View */
            <div className="py-16 text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">Your bag is empty</h3>
                <p className="text-xs text-slate-400 max-w-xs">
                  Discover our exclusive drop sneakers, legendary classics, or customize your own unique pair.
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-brand-accent text-white font-bold text-xs shadow-glow hover:scale-105 transition-all"
              >
                Browse Collection
              </button>
            </div>
          )}
        </div>

        {/* Bottom Checkout Section (Only if cart has items) */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-slate-900/95 space-y-4">
            
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Coupon (e.g. STRIDE20)"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2 pl-8 pr-3 text-xs text-white uppercase placeholder-slate-500 focus:outline-none focus:border-brand-accent font-mono"
                />
                <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700 transition-colors"
              >
                Apply
              </button>
            </form>

            {/* Active Promo Tag */}
            {appliedPromo && (
              <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  Code <strong>{appliedPromo}</strong> applied
                </span>
                <button onClick={removePromoCode} className="text-emerald-300 hover:text-white text-[10px] underline">
                  Remove
                </button>
              </div>
            )}

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono font-bold text-white">${cartSubtotal.toFixed(2)}</span>
              </div>

              {promoDiscount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Coupon Discount</span>
                  <span className="font-mono">-${promoDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-mono">
                  {cartSubtotal >= 150 || promoFreeShipping ? (
                    <span className="text-emerald-400 font-bold">FREE</span>
                  ) : (
                    '$15.00'
                  )}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-between text-base font-black text-white font-display">
                <span>Total Amount</span>
                <span className="text-brand-volt font-mono">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-brand-accent to-rose-600 hover:from-rose-500 hover:to-brand-accent text-white font-black text-sm tracking-wider uppercase shadow-glow hover:scale-[1.01] active:scale-95 transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-center text-slate-500 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              256-Bit Encrypted Secure Checkout
            </p>

          </div>
        )}

      </div>

    </div>
  );
};
