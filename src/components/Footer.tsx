import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Sparkles, 
  Mail, 
  ArrowRight, 
  CheckCircle2
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { showToast, setCategory, setIsCustomizerOpen } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    showToast(
      'Drop Access Granted!',
      'Check your inbox for your 20% discount code: STRIDE20',
      'success'
    );
    setEmail('');
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070b14] border-t border-white/10 text-slate-400 text-xs">
      
      {/* Top Value Proposition Grid */}
      <div className="border-b border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
            
            <div className="p-4 rounded-2xl glass-card border border-white/5 flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-brand-accent/20 text-brand-accent shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">100% Verified Authentic</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Every pair verified by our master sneaker authenticators.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl glass-card border border-white/5 flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Fast Global Dispatch</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Complimentary express shipping on all orders over $150.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl glass-card border border-white/5 flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">30-Day Wear Test</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Put them to the test on track or court. Love them or return hassle-free.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl glass-card border border-white/5 flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-brand-volt/20 text-brand-volt shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Exclusive Drop Access</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Priority queue on limited editions and collaborative colorways.</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 text-left">
          
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-accent to-amber-400 flex items-center justify-center shadow-glow">
                <svg className="w-5 h-5 text-white transform -rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3.5 17.5 6 15l2.5 2.5L12 14l3.5 3.5L20 13l2 3.5" />
                  <path d="M2 18h20" />
                  <path d="M4 18v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1" />
                  <path d="m7 14 3-6 5 2 3-4" />
                </svg>
              </div>
              <span className="font-display font-black text-xl text-white tracking-tight">STRIDE</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Crafting the next generation of athletic and streetwear footwear. High-performance cushioning, sustainable premium materials, and iconic timeless silhouettes.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="text-[11px] text-slate-500">Accepted Payments:</span>
              <div className="flex gap-2 text-white font-mono text-[10px] font-bold">
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">VISA</span>
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">MC</span>
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">AMEX</span>
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800"> PAY</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">Categories</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => { setCategory('Running'); scrollToCatalog(); }} className="hover:text-white transition-colors">
                  Running & Marathons
                </button>
              </li>
              <li>
                <button onClick={() => { setCategory('Lifestyle'); scrollToCatalog(); }} className="hover:text-white transition-colors">
                  Streetwear & Retro
                </button>
              </li>
              <li>
                <button onClick={() => { setCategory('Basketball'); scrollToCatalog(); }} className="hover:text-white transition-colors">
                  Basketball Courts
                </button>
              </li>
              <li>
                <button onClick={() => { setCategory('Trail & Hiking'); scrollToCatalog(); }} className="hover:text-white transition-colors">
                  Trail & GORE-TEX
                </button>
              </li>
              <li>
                <button onClick={() => { setCategory('Limited Edition'); scrollToCatalog(); }} className="hover:text-white transition-colors text-brand-volt font-semibold">
                  Limited Drops 🔥
                </button>
              </li>
            </ul>
          </div>

          {/* Studio & Features */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">Explore</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setIsCustomizerOpen(true)} className="hover:text-brand-volt transition-colors flex items-center gap-1">
                  <span>3D Sneaker Studio</span>
                  <span className="text-[9px] px-1 bg-brand-volt/20 text-brand-volt rounded">PRO</span>
                </button>
              </li>
              <li>
                <a href="#lookbook-section" className="hover:text-white transition-colors">
                  Community Lookbook
                </a>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-white transition-colors">
                  Size Guide & Chart
                </a>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-white transition-colors">
                  Drop Calendar 2026
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div className="md:col-span-4 space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">Join the VIP Drop Club</h5>
            <p className="text-xs text-slate-400">
              Subscribe for secret drop alerts, athlete collaborations, and get an instant <strong>20% off</strong> coupon.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2 pt-1">
              <div className="relative flex-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-accent"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-brand-accent hover:bg-rose-500 text-white font-bold text-xs shadow-glow transition-all shrink-0 flex items-center gap-1"
              >
                <span>Join</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {subscribed && (
              <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                You're in! Use coupon code <strong>STRIDE20</strong> at checkout.
              </p>
            )}
          </div>

        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-10 mt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} STRIDE Footwear Co. All rights reserved. Designed for elite sneakerheads.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Authenticity Shield</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
