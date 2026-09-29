import React from 'react';
import { useShop } from '../context/ShopContext';
import type { Category } from '../types';
import { 
  Zap, 
  Flame, 
  Footprints, 
  Activity, 
  Compass, 
  Sparkles, 
  Layers 
} from 'lucide-react';

export const CategoryBar: React.FC = () => {
  const { filters, setCategory, products } = useShop();

  const categories: { name: Category; icon: React.ReactNode }[] = [
    { name: 'All', icon: <Layers className="w-4 h-4" /> },
    { name: 'Running', icon: <Zap className="w-4 h-4" /> },
    { name: 'Lifestyle', icon: <Footprints className="w-4 h-4" /> },
    { name: 'Basketball', icon: <Activity className="w-4 h-4" /> },
    { name: 'Trail & Hiking', icon: <Compass className="w-4 h-4" /> },
    { name: 'Skateboarding', icon: <Sparkles className="w-4 h-4" /> },
    { name: 'Limited Edition', icon: <Flame className="w-4 h-4" /> },
  ];

  const getCount = (cat: Category) => {
    if (cat === 'All') return products.length;
    return products.filter((p) => p.category === cat).length;
  };

  return (
    <div className="py-6 border-b border-white/5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-2">
        {categories.map((cat) => {
          const isActive = filters.category === cat.name;
          const count = getCount(cat.name);

          return (
            <button
              key={cat.name}
              onClick={() => {
                setCategory(cat.name);
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm whitespace-nowrap transition-all duration-200 shrink-0 ${
                isActive
                  ? 'bg-gradient-to-r from-brand-accent to-rose-600 text-white shadow-glow font-bold'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              <span className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-brand-accent transition-colors'}>
                {cat.icon}
              </span>
              <span>{cat.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                  isActive
                    ? 'bg-white/25 text-white'
                    : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
