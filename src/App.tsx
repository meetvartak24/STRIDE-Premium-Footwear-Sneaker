import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryBar } from './components/CategoryBar';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductGrid } from './components/ProductGrid';
import { QuickViewModal } from './components/QuickViewModal';
import { ShoeCustomizer } from './components/ShoeCustomizer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { LookbookSection } from './components/LookbookSection';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { Sparkles, Palette, ArrowRight, SlidersHorizontal } from 'lucide-react';

const MainContent: React.FC = () => {
  const { setIsCustomizerOpen } = useShop();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 selection:bg-brand-accent selection:text-white">
      
      {/* Top Navbar */}
      <Navbar onOpenMobileFilters={() => setIsMobileFiltersOpen(true)} />

      {/* Hero Showcase Section */}
      <Hero />

      {/* Category Pills Bar */}
      <CategoryBar />

      {/* Main Catalog & Shopping Section */}
      <main id="catalog-section" className="flex-1 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4 flex justify-end">
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-white shadow-md active:scale-95 transition-all"
          >
            <SlidersHorizontal className="w-4 h-4 text-brand-accent" />
            <span>Filter Sneakers</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Filter Sidebar (Sticky) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28">
            <FilterSidebar />
          </aside>

          {/* Product Grid Area */}
          <section className="lg:col-span-9">
            <ProductGrid />
          </section>

        </div>
      </main>

      {/* 3D Customizer Interactive Studio Promo Banner */}
      <section className="py-12 border-y border-white/10 relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-volt/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-brand-accent/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="p-8 sm:p-12 rounded-3xl glass-card border border-brand-volt/20 shadow-glow-volt/20 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
            
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-volt/15 border border-brand-volt/30 text-brand-volt text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>STRIDE LABS • 3D STUDIO</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight leading-tight">
                CREATE YOUR BESPOKE 1-OF-1 SNEAKER.
              </h2>
              <p className="text-sm text-slate-300">
                Choose custom upper leathers, lightning swoosh tones, glowing midsoles, and engrave your personalized laser inscription on the heel collar.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => setIsCustomizerOpen(true)}
                className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-volt to-emerald-400 hover:from-emerald-400 hover:to-brand-volt text-slate-950 font-black text-sm uppercase tracking-wider shadow-glow-volt hover:scale-105 active:scale-95 transition-all"
              >
                <Palette className="w-4 h-4" />
                <span>Launch 3D Studio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Streetwear Community Lookbook */}
      <LookbookSection />

      {/* Footer */}
      <Footer />

      {/* Mobile Filter Drawer Modal */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
          <div
            onClick={() => setIsMobileFiltersOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
          />
          <div className="relative w-full max-w-sm bg-[#0d1322] h-full overflow-y-auto z-10 animate-slide-up">
            <FilterSidebar
              isMobile={true}
              onCloseMobile={() => setIsMobileFiltersOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Overlay Modals & Drawers */}
      <QuickViewModal />
      <ShoeCustomizer />
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <ToastContainer />

    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
