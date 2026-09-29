import React from 'react';
import { LOOKBOOK_ITEMS } from '../data/products';
import { useShop } from '../context/ShopContext';
import { Heart, ArrowRight, Eye, Camera } from 'lucide-react';

export const LookbookSection: React.FC = () => {
  const { products, setQuickViewProduct } = useShop();

  const handleOpenProduct = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setQuickViewProduct(product);
    }
  };

  return (
    <section id="lookbook-section" className="py-16 border-b border-white/5 bg-[#090d18]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 text-left">
          <div>
            <div className="flex items-center gap-2 text-brand-volt text-xs font-bold uppercase tracking-wider mb-2">
              <Camera className="w-4 h-4" />
              <span>@stridefootwear • #stridesole</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight">
              STREETWEAR COMMUNITY LOOKBOOK
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Styled by athletes, tastemakers, and sneakerheads worldwide. Tap any look to shop the exact pair.
            </p>
          </div>

          <a
            href="#catalog-section"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-accent hover:text-rose-400 hover:underline"
          >
            <span>Explore All On-Foot Styles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Lookbook Visual Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LOOKBOOK_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-[3/4] rounded-3xl overflow-hidden glass-card border border-white/10 shadow-xl cursor-pointer"
              onClick={() => handleOpenProduct(item.taggedShoeId)}
            >
              {/* Background Streetwear Photo */}
              <img
                src={item.imageUrl}
                alt={item.taggedShoeName}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Top Creator Badge */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="text-xs font-bold text-white glass px-3 py-1 rounded-full border border-white/15 backdrop-blur-md">
                  {item.handle}
                </span>

                <span className="flex items-center gap-1 text-[11px] font-bold text-white/90 glass px-2.5 py-1 rounded-full border border-white/10">
                  <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                  {item.likes}
                </span>
              </div>

              {/* Bottom Tagged Product Card */}
              <div className="absolute bottom-4 inset-x-4 p-3 rounded-2xl glass border border-white/20 backdrop-blur-md transition-all duration-300 transform group-hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <p className="text-[10px] uppercase font-bold text-brand-volt tracking-wider">
                      Tagged Sneaker
                    </p>
                    <h4 className="text-xs font-bold text-white truncate">
                      {item.taggedShoeName}
                    </h4>
                    <p className="text-xs font-mono font-black text-white mt-0.5">
                      ${item.price}
                    </p>
                  </div>

                  <button
                    className="p-2 rounded-xl bg-brand-accent text-white group-hover:bg-rose-500 transition-colors shadow-glow shrink-0"
                    title="Quick View"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
