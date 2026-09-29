import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Flame, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Eye, 
  Clock, 
  Star,
  Truck
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { products, setQuickViewProduct, addToCart, setIsCustomizerOpen } = useShop();
  
  // Featured hero sneaker is the flagship AeroPulse
  const heroShoe = products.find((p) => p.id === 'stride-aero-pulse') || products[0];

  // Drop countdown timer simulation
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleQuickAddHero = () => {
    if (heroShoe) {
      addToCart(heroShoe, heroShoe.sizes[2] || 9, heroShoe.colors[0], 1);
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24 border-b border-white/10">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-brand-accent/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-brand-volt/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-6 text-left">
            
            {/* Live Drop Pill & Countdown */}
            <div className="inline-flex flex-wrap items-center gap-3 p-1.5 pr-4 rounded-full glass border border-amber-500/30 text-xs shadow-lg">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white font-black uppercase tracking-wider text-[10px]">
                <Flame className="w-3 h-3" />
                Drop Alert #09
              </span>
              <div className="flex items-center gap-1 text-slate-300 font-mono text-xs font-semibold">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Ends in:</span>
                <span className="text-white font-bold bg-slate-800 px-1.5 py-0.5 rounded">
                  {String(timeLeft.hours).padStart(2, '0')}h
                </span>
                :
                <span className="text-white font-bold bg-slate-800 px-1.5 py-0.5 rounded">
                  {String(timeLeft.minutes).padStart(2, '0')}m
                </span>
                :
                <span className="text-white font-bold bg-slate-800 px-1.5 py-0.5 rounded text-brand-volt">
                  {String(timeLeft.seconds).padStart(2, '0')}s
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-[1.08]">
                UNLEASH YOUR <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-rose-500 to-brand-volt">
                  NEXT LEVEL
                </span>{' '}
                STRIDE.
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed pt-2">
                Engineered with aerodynamic carbon-weave matrix and responsive nitrogen-infused foam. 
                Experience boundless propulsion built for athletes, collectors, and street visionaries.
              </p>
            </div>

            {/* Spec Highlights Grid */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-md pt-1">
              <div className="p-3 rounded-xl glass border border-white/10 flex flex-col">
                <span className="text-xs text-slate-400 font-medium">Weight</span>
                <span className="text-base font-black text-white">185 Grams</span>
                <span className="text-[10px] text-brand-volt font-semibold">Ultralight</span>
              </div>
              <div className="p-3 rounded-xl glass border border-white/10 flex flex-col">
                <span className="text-xs text-slate-400 font-medium">Energy Return</span>
                <span className="text-base font-black text-white">+88.4%</span>
                <span className="text-[10px] text-emerald-400 font-semibold">Max Bounce</span>
              </div>
              <div className="p-3 rounded-xl glass border border-white/10 flex flex-col">
                <span className="text-xs text-slate-400 font-medium">Wear Test</span>
                <span className="text-base font-black text-white">30 Days</span>
                <span className="text-[10px] text-cyan-400 font-semibold">Risk Free</span>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3 w-full sm:w-auto">
              <button
                onClick={handleQuickAddHero}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-accent to-rose-600 hover:from-rose-500 hover:to-brand-accent text-white font-black text-sm tracking-wider uppercase shadow-glow hover:scale-[1.02] active:scale-95 transition-all duration-300"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Instant Buy • ${heroShoe.price}</span>
              </button>

              <button
                onClick={() => setQuickViewProduct(heroShoe)}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-4 rounded-xl glass hover:bg-white/10 border border-white/20 text-white font-bold text-sm tracking-wide transition-all hover:scale-[1.02]"
              >
                <Eye className="w-4 h-4 text-slate-300" />
                <span>Explore Specs</span>
              </button>

              <button
                onClick={() => setIsCustomizerOpen(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-white/5 hover:bg-brand-volt/20 border border-brand-volt/40 text-brand-volt font-bold text-sm transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Customize Colors</span>
              </button>
            </div>

            {/* Social Proof & Guarantee Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-slate-400 border-t border-slate-800/80 w-full">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2 overflow-hidden">
                  <img className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Avatar" />
                  <img className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Avatar" />
                  <img className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80" alt="Avatar" />
                </div>
                <div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-300 font-medium">4.9/5 (1,240+ Verified Reviews)</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-slate-400 text-xs">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Authentic</span>
                <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-cyan-400" /> Express Dispatch</span>
              </div>
            </div>

          </div>

          {/* Right Hero Visual Showcase */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Background Circular Rotating Halo */}
            <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-dashed border-white/20 animate-[spin_40s_linear_infinite]"></div>
              <div className="absolute inset-8 rounded-full border border-white/10"></div>
              <div className="absolute inset-20 rounded-full bg-gradient-to-tr from-brand-accent/20 via-rose-500/10 to-brand-volt/20 blur-2xl"></div>

              {/* Sneaker Image with Floating Animation and Glow */}
              <div className="relative z-10 w-full animate-float group cursor-pointer" onClick={() => setQuickViewProduct(heroShoe)}>
                <img
                  src={heroShoe.images[0]}
                  alt={heroShoe.name}
                  className="w-full h-auto max-h-[420px] object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] filter group-hover:scale-105 transition-transform duration-500"
                />

                {/* Floating Hotspot Tag 1: Cushioning */}
                <div className="absolute -top-4 left-6 glass-card p-2.5 rounded-xl border border-brand-volt/40 shadow-glow-volt flex items-center gap-2.5 animate-bounce [animation-duration:3s]">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-volt animate-ping"></div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Compound</p>
                    <p className="text-xs font-black text-white">ZoomX Matrix Nitro</p>
                  </div>
                </div>

                {/* Floating Hotspot Tag 2: Carbon Plate */}
                <div className="absolute bottom-4 right-4 glass-card p-2.5 rounded-xl border border-rose-500/40 shadow-glow flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Chassis</p>
                    <p className="text-xs font-black text-white">Curved Carbon Plate</p>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Badge Info */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 glass px-5 py-2 rounded-full border border-white/15 flex items-center gap-3 text-xs text-slate-300 shadow-xl whitespace-nowrap">
                <span className="font-bold text-white">{heroShoe.name}</span>
                <span className="text-slate-500">•</span>
                <span className="text-brand-volt font-black">${heroShoe.price}</span>
                <span className="text-slate-500 line-through text-[11px]">${heroShoe.originalPrice}</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
