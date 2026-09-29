import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import type { ProductColor } from '../types';
import { 
  X, 
  Star, 
  ShoppingBag, 
  Heart, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Ruler, 
  Check, 
  MessageSquarePlus,
  Flame
} from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist,
    addReview
  } = useShop();

  if (!quickViewProduct) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number>(quickViewProduct.sizes[0] || 9);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Review Form State
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  const isFavorite = isInWishlist(quickViewProduct.id);
  const selectedColor: ProductColor = quickViewProduct.colors[selectedColorIndex] || quickViewProduct.colors[0];

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedSize, selectedColor, quantity);
    setQuickViewProduct(null);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) return;
    addReview(quickViewProduct.id, {
      author: reviewAuthor.trim(),
      rating: reviewRating,
      comment: reviewComment.trim(),
      verified: true,
    });
    setReviewAuthor('');
    setReviewComment('');
    setShowReviewForm(false);
  };

  const discountPercent = quickViewProduct.originalPrice
    ? Math.round(((quickViewProduct.originalPrice - quickViewProduct.price) / quickViewProduct.originalPrice) * 100)
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      
      {/* Backdrop */}
      <div 
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/80 backdrop-blur-md animate-fade-in"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#0e1424] border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 animate-slide-up my-8 max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 custom-scrollbar">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Image Gallery */}
            <div className="md:col-span-6 space-y-4">
              
              {/* Main Image Stage */}
              <div className="relative aspect-[4/3] rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 p-6 flex items-center justify-center overflow-hidden">
                {quickViewProduct.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-brand-accent text-white text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <Flame className="w-3.5 h-3.5" />
                    {quickViewProduct.badge}
                  </span>
                )}
                <img
                  src={quickViewProduct.images[activeImageIndex] || quickViewProduct.images[0]}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] transition-all duration-300 transform hover:scale-105"
                />
              </div>

              {/* Thumbnails Row */}
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl bg-slate-900 border-2 p-1.5 shrink-0 transition-all ${
                      activeImageIndex === idx
                        ? 'border-brand-accent scale-105 shadow-glow/50'
                        : 'border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>

              {/* Badges and Guarantees */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-slate-300">
                <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Authentic</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Fast Delivery</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>30-Day Returns</span>
                </div>
              </div>

            </div>

            {/* Right Column: Product Info & Purchase Form */}
            <div className="md:col-span-6 space-y-6 text-left">
              
              {/* Brand, Rating, Title */}
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-1">
                  <span>{quickViewProduct.brand} • {quickViewProduct.category}</span>
                  <span className="font-mono text-[11px] text-slate-500">SKU: {quickViewProduct.sku}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight leading-snug">
                  {quickViewProduct.name}
                </h1>

                {/* Rating & Review Counter */}
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(quickViewProduct.rating)
                            ? 'fill-amber-400'
                            : 'text-slate-600'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-bold text-white ml-1">{quickViewProduct.rating}</span>
                  </div>
                  <span className="text-xs text-slate-400">•</span>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className="text-xs text-brand-accent hover:underline font-semibold"
                  >
                    {quickViewProduct.reviewCount} customer reviews
                  </button>
                </div>
              </div>

              {/* Price Display */}
              <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-white font-display">
                    ${quickViewProduct.price}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-base text-slate-500 line-through">
                      ${quickViewProduct.originalPrice}
                    </span>
                  )}
                  {discountPercent && (
                    <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold">
                      Save {discountPercent}%
                    </span>
                  )}
                </div>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  In Stock ({quickViewProduct.stock} left)
                </span>
              </div>

              {/* Color Selection */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">Selected Colorway:</span>
                  <span className="text-brand-volt">{selectedColor.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  {quickViewProduct.colors.map((c, idx) => (
                    <button
                      key={c.name}
                      onClick={() => {
                        setSelectedColorIndex(idx);
                        if (c.imageIndex !== undefined) {
                          setActiveImageIndex(c.imageIndex);
                        }
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                        selectedColorIndex === idx
                          ? 'border-white bg-slate-800 text-white shadow-md'
                          : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-black/30" style={{ backgroundColor: c.hex }} />
                      <span>{c.name.split('&')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">Select Size (US Men/Unisex):</span>
                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-brand-accent hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    Size Guide
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {quickViewProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-10 rounded-xl text-xs font-bold flex items-center justify-center transition-all ${
                        selectedSize === size
                          ? 'bg-brand-accent text-white shadow-glow'
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {/* Size Guide Calculator Popup */}
                {showSizeGuide && (
                  <div className="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-2 animate-fade-in">
                    <p className="font-bold text-white">Size Conversion Guide:</p>
                    <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-300 font-mono">
                      <div>US 8 = EU 41 (26 cm)</div>
                      <div>US 9 = EU 42.5 (27 cm)</div>
                      <div>US 10 = EU 44 (28 cm)</div>
                      <div>US 11 = EU 45 (29 cm)</div>
                      <div>US 12 = EU 46 (30 cm)</div>
                      <div>US 13 = EU 47.5 (31 cm)</div>
                    </div>
                    <p className="text-[10px] text-brand-volt">
                      💡 Fits true to size. If between sizes or wide foot, order 0.5 size up.
                    </p>
                  </div>
                )}
              </div>

              {/* Quantity & Add to Cart Row */}
              <div className="flex items-center gap-3 pt-2">
                <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 shrink-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 text-sm font-bold"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-white font-mono">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 text-sm font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-gradient-to-r from-brand-accent to-rose-600 hover:from-rose-500 hover:to-brand-accent text-white font-black text-sm tracking-wider uppercase shadow-glow hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag • ${(quickViewProduct.price * quantity).toFixed(0)}</span>
                </button>

                {/* Wishlist Toggle Button */}
                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isFavorite
                      ? 'bg-rose-500 border-rose-500 text-white shadow-lg'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-white' : ''}`} />
                </button>
              </div>

            </div>

          </div>

          {/* Bottom Tabs Section: Specifications / Technology / Reviews */}
          <div className="border-t border-slate-800 pt-6">
            
            {/* Tab Headers */}
            <div className="flex items-center gap-6 border-b border-slate-800 pb-3">
              <button
                onClick={() => setActiveTab('details')}
                className={`text-sm font-bold pb-1 transition-colors relative ${
                  activeTab === 'details' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Product Details & Tech
                {activeTab === 'details' && (
                  <div className="absolute -bottom-3.5 left-0 right-0 h-0.5 bg-brand-accent"></div>
                )}
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`text-sm font-bold pb-1 transition-colors relative ${
                  activeTab === 'reviews' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Reviews ({quickViewProduct.reviews.length})
                {activeTab === 'reviews' && (
                  <div className="absolute -bottom-3.5 left-0 right-0 h-0.5 bg-brand-accent"></div>
                )}
              </button>
            </div>

            {/* Tab 1: Details & Tech Content */}
            {activeTab === 'details' && (
              <div className="pt-6 space-y-6 text-left animate-fade-in">
                <p className="text-sm text-slate-300 leading-relaxed">
                  {quickViewProduct.description}
                </p>

                {/* Technology Badges */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Engineered Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.technology.map((tech) => (
                      <span key={tech} className="px-3 py-1.5 rounded-lg bg-brand-volt/15 border border-brand-volt/30 text-brand-volt font-bold text-xs">
                        ⚡ {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bullet List Details */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Highlights</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    {quickViewProduct.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 2: Reviews & Feedback Form */}
            {activeTab === 'reviews' && (
              <div className="pt-6 space-y-6 text-left animate-fade-in">
                
                {/* Reviews Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Verified Customer Ratings</h4>
                    <p className="text-xs text-slate-400">Real feedback from real shoe wearers.</p>
                  </div>

                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700 transition-colors"
                  >
                    <MessageSquarePlus className="w-4 h-4 text-brand-accent" />
                    Write a Review
                  </button>
                </div>

                {/* Write Review Form */}
                {showReviewForm && (
                  <form onSubmit={handleReviewSubmit} className="p-4 bg-slate-900/90 rounded-2xl border border-slate-700 space-y-4 animate-slide-up">
                    <h5 className="text-xs font-bold text-white uppercase tracking-wider">Your Experience</h5>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-300 block mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          value={reviewAuthor}
                          onChange={(e) => setReviewAuthor(e.target.value)}
                          placeholder="e.g. Alex Miller"
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-accent"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-300 block mb-1">Rating</label>
                        <div className="flex items-center gap-2 pt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setReviewRating(star)}
                              className="text-amber-400 hover:scale-125 transition-transform"
                            >
                              <Star className={`w-5 h-5 ${star <= reviewRating ? 'fill-amber-400' : 'text-slate-600'}`} />
                            </button>
                          ))}
                          <span className="text-xs font-bold text-amber-400 ml-2">{reviewRating} Stars</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Your Comment</label>
                      <textarea
                        required
                        rows={3}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="How did they fit? How does the cushion feel on road/court?"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-accent"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-brand-accent text-white font-bold text-xs shadow-glow hover:bg-rose-600 transition-colors"
                      >
                        Post Review
                      </button>
                    </div>
                  </form>
                )}

                {/* Reviews List */}
                <div className="space-y-3">
                  {quickViewProduct.reviews.length > 0 ? (
                    quickViewProduct.reviews.map((rev) => (
                      <div key={rev.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            {rev.avatar ? (
                              <img src={rev.avatar} alt={rev.author} className="w-7 h-7 rounded-full object-cover" />
                            ) : (
                              <div className="w-7 h-7 rounded-full bg-brand-accent/20 text-brand-accent font-bold text-xs flex items-center justify-center">
                                {rev.author.charAt(0)}
                              </div>
                            )}
                            <div>
                              <p className="text-xs font-bold text-white flex items-center gap-1.5">
                                {rev.author}
                                {rev.verified && (
                                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-semibold">
                                    Verified Buyer
                                  </span>
                                )}
                              </p>
                              <p className="text-[10px] text-slate-500">{rev.date}</p>
                            </div>
                          </div>

                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < rev.rating ? 'fill-amber-400' : 'text-slate-700'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed pl-9">
                          "{rev.comment}"
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 italic">No reviews yet. Be the first to review this pair!</p>
                  )}
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
