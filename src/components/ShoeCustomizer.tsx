import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import type { CustomShoeConfig, Product } from '../types';
import { 
  X, 
  Palette, 
  ShoppingBag, 
  RotateCw, 
  Type, 
  Sparkles, 
  Layers 
} from 'lucide-react';

export const ShoeCustomizer: React.FC = () => {
  const { isCustomizerOpen, setIsCustomizerOpen, addToCart } = useShop();

  const [activePart, setActivePart] = useState<'base' | 'upper' | 'swoosh' | 'sole' | 'laces' | 'lining'>('base');
  
  const [config, setConfig] = useState<CustomShoeConfig>({
    modelName: 'STRIDE Quantum Custom OG',
    baseColor: '#0f172a',
    upperColor: '#1e293b',
    swooshColor: '#ccff00',
    soleColor: '#ffffff',
    lacesColor: '#ff5e3a',
    liningColor: '#00f0ff',
    customText: 'STRIDE #01',
    size: 10,
  });

  const [isFlipped, setIsFlipped] = useState(false);

  if (!isCustomizerOpen) return null;

  const colorPalette = [
    { name: 'Obsidian Black', hex: '#0f172a' },
    { name: 'Slate Carbon', hex: '#1e293b' },
    { name: 'Pure Snow White', hex: '#ffffff' },
    { name: 'Volt Electric Lime', hex: '#ccff00' },
    { name: 'Cyber Cyan Glow', hex: '#00f0ff' },
    { name: 'Crimson Solar Red', hex: '#ff3366' },
    { name: 'Sunset Hyper Orange', hex: '#ff5e3a' },
    { name: 'Royal Velocity Blue', hex: '#3b82f6' },
    { name: 'Emerald Pine Green', hex: '#10b981' },
    { name: 'Ultra Violet Purple', hex: '#8b5cf6' },
    { name: 'Gum Sand Tan', hex: '#d97706' },
  ];

  const presets = [
    {
      name: 'Cyberpunk Neon',
      base: '#0f172a',
      upper: '#1e293b',
      swoosh: '#ccff00',
      sole: '#00f0ff',
      laces: '#ff3366',
      lining: '#8b5cf6',
    },
    {
      name: 'Chicago Bred',
      base: '#0f172a',
      upper: '#ff3366',
      swoosh: '#ffffff',
      sole: '#ffffff',
      laces: '#0f172a',
      lining: '#ff3366',
    },
    {
      name: 'Stealth Triple Black',
      base: '#0b0f19',
      upper: '#1e293b',
      swoosh: '#334155',
      sole: '#0f172a',
      laces: '#0b0f19',
      lining: '#1e293b',
    },
    {
      name: 'Solar Horizon',
      base: '#ffffff',
      upper: '#ffedd5',
      swoosh: '#ff5e3a',
      sole: '#ffffff',
      laces: '#ff5e3a',
      lining: '#fbbf24',
    },
  ];

  const partNames = [
    { id: 'base', label: 'Main Base Mesh' },
    { id: 'upper', label: 'Leather Overlays' },
    { id: 'swoosh', label: 'Lightning Accent' },
    { id: 'sole', label: 'Midsole & Cushion' },
    { id: 'laces', label: 'Laces & Eyelets' },
    { id: 'lining', label: 'Collar Lining' },
  ];

  const applyColor = (hex: string) => {
    switch (activePart) {
      case 'base':
        setConfig((p) => ({ ...p, baseColor: hex }));
        break;
      case 'upper':
        setConfig((p) => ({ ...p, upperColor: hex }));
        break;
      case 'swoosh':
        setConfig((p) => ({ ...p, swooshColor: hex }));
        break;
      case 'sole':
        setConfig((p) => ({ ...p, soleColor: hex }));
        break;
      case 'laces':
        setConfig((p) => ({ ...p, lacesColor: hex }));
        break;
      case 'lining':
        setConfig((p) => ({ ...p, liningColor: hex }));
        break;
    }
  };

  const applyPreset = (preset: typeof presets[0]) => {
    setConfig((prev) => ({
      ...prev,
      baseColor: preset.base,
      upperColor: preset.upper,
      swooshColor: preset.swoosh,
      soleColor: preset.sole,
      lacesColor: preset.laces,
      liningColor: preset.lining,
    }));
  };

  const handleAddCustomToCart = () => {
    // Construct custom product
    const customProduct: Product = {
      id: `custom-stride-${Date.now()}`,
      name: `Custom STRIDE (${config.customText || 'Bespoke Edition'})`,
      brand: 'Nike',
      price: 225,
      originalPrice: 260,
      rating: 5.0,
      reviewCount: 1,
      category: 'Limited Edition',
      gender: 'Unisex',
      sizes: [config.size],
      colors: [{ name: 'Custom Studio Blend', hex: config.swooshColor }],
      images: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80',
      ],
      stock: 1,
      description: `Custom bespoke build configured with ${config.customText} heel engraving and personalized colorway palette.`,
      details: [
        `Base Mesh: ${config.baseColor}`,
        `Accent Swoosh: ${config.swooshColor}`,
        `Sole Cushion: ${config.soleColor}`,
        `Custom Laser Inscription: "${config.customText}"`,
      ],
      technology: ['Bespoke Custom Build', 'Laser Engraved Heel', 'ZoomX Matrix'],
      sku: `STR-CUST-${Date.now().toString().slice(-4)}`,
      reviews: [],
    };

    addToCart(
      customProduct, 
      config.size, 
      { name: 'Custom Palette', hex: config.swooshColor }, 
      1, 
      true, 
      config
    );
    setIsCustomizerOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCustomizerOpen(false)}
        className="fixed inset-0 bg-black/85 backdrop-blur-lg animate-fade-in"
      />

      {/* Studio Modal */}
      <div className="relative w-full max-w-5xl bg-[#090e1a] border border-brand-volt/30 rounded-3xl shadow-2xl overflow-hidden z-10 animate-slide-up my-auto max-h-[95vh] flex flex-col">
        
        {/* Top Studio Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 bg-slate-900/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-brand-volt to-emerald-400 text-slate-950 font-black">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black font-display text-white tracking-tight flex items-center gap-2">
                STRIDE 3D CUSTOMIZER STUDIO
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-volt/20 text-brand-volt border border-brand-volt/40 font-bold uppercase">
                  Interactive Lab
                </span>
              </h2>
              <p className="text-xs text-slate-400">Design your one-of-a-kind athletic sneaker with live SVG rendering.</p>
            </div>
          </div>

          <button
            onClick={() => setIsCustomizerOpen(false)}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Body Grid */}
        <div className="p-6 sm:p-8 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left / Center: Interactive SVG Sneaker Canvas */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center space-y-6">
            
            {/* Visual Viewport Stage */}
            <div className="relative w-full aspect-[16/10] rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-white/10 p-4 sm:p-8 flex items-center justify-center overflow-hidden shadow-inner group">
              
              {/* Radial Lighting Background */}
              <div 
                className="absolute inset-0 opacity-20 blur-3xl transition-colors duration-500"
                style={{ backgroundColor: config.swooshColor }}
              />

              {/* Dynamic Interactive SVG Sneaker Silhouette */}
              <div className={`relative w-full max-w-md transition-transform duration-500 ${isFlipped ? 'scale-x-[-1]' : ''}`}>
                <svg
                  viewBox="0 0 800 500"
                  className="w-full h-auto drop-shadow-[0_25px_30px_rgba(0,0,0,0.9)]"
                >
                  <defs>
                    <linearGradient id="soleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={config.soleColor} />
                      <stop offset="100%" stopColor={config.soleColor} stopOpacity="0.85" />
                    </linearGradient>
                  </defs>

                  {/* Outsole Tread */}
                  <path
                    d="M 120 400 Q 200 420, 400 415 Q 650 420, 720 370 Q 730 390, 710 410 Q 600 440, 380 435 Q 180 430, 110 410 Z"
                    fill="#111827"
                    className="cursor-pointer"
                  />

                  {/* Midsole Cushion */}
                  <path
                    d="M 110 370 Q 200 380, 420 375 Q 650 370, 725 320 Q 735 345, 715 375 Q 600 415, 380 410 Q 180 410, 105 385 Z"
                    fill={config.soleColor}
                    stroke={activePart === 'sole' ? '#ccff00' : 'rgba(0,0,0,0.3)'}
                    strokeWidth={activePart === 'sole' ? '5' : '1'}
                    className="cursor-pointer transition-colors duration-300"
                    onClick={() => setActivePart('sole')}
                  />

                  {/* Main Base Body Mesh */}
                  <path
                    d="M 140 370 Q 180 280, 280 200 Q 380 240, 520 250 Q 640 270, 720 320 Q 640 370, 420 375 Q 200 380, 140 370 Z"
                    fill={config.baseColor}
                    stroke={activePart === 'base' ? '#ccff00' : 'none'}
                    strokeWidth="4"
                    className="cursor-pointer transition-colors duration-300"
                    onClick={() => setActivePart('base')}
                  />

                  {/* Upper Leather Overlay & Heel Counter */}
                  <path
                    d="M 140 370 Q 120 280, 180 210 Q 240 180, 290 200 Q 240 280, 200 365 Z"
                    fill={config.upperColor}
                    stroke={activePart === 'upper' ? '#ccff00' : 'none'}
                    strokeWidth="4"
                    className="cursor-pointer transition-colors duration-300"
                    onClick={() => setActivePart('upper')}
                  />

                  {/* Collar Lining & Tongue */}
                  <path
                    d="M 280 190 Q 320 140, 360 170 Q 340 220, 290 200 Z"
                    fill={config.liningColor}
                    stroke={activePart === 'lining' ? '#ccff00' : 'none'}
                    strokeWidth="4"
                    className="cursor-pointer transition-colors duration-300"
                    onClick={() => setActivePart('lining')}
                  />

                  {/* Laces Strands */}
                  <path
                    d="M 310 200 L 360 230 M 340 220 L 390 245 M 370 235 L 430 255 M 410 245 L 470 260"
                    stroke={config.lacesColor}
                    strokeWidth="8"
                    strokeLinecap="round"
                    className="cursor-pointer transition-colors duration-300"
                    onClick={() => setActivePart('laces')}
                  />

                  {/* Lightning / Swoosh Dynamic Accent */}
                  <path
                    d="M 230 330 Q 380 340, 520 280 Q 620 240, 660 220 Q 560 300, 400 340 Q 280 360, 230 330 Z"
                    fill={config.swooshColor}
                    stroke={activePart === 'swoosh' ? '#ffffff' : 'rgba(0,0,0,0.4)'}
                    strokeWidth={activePart === 'swoosh' ? '4' : '1'}
                    className="cursor-pointer transition-colors duration-300 filter drop-shadow-md"
                    onClick={() => setActivePart('swoosh')}
                  />

                  {/* Custom Engraving Live Text on Heel */}
                  {config.customText && (
                    <text
                      x="180"
                      y="270"
                      transform="rotate(-40 180 270)"
                      fill="#ffffff"
                      fontSize="16"
                      fontWeight="900"
                      letterSpacing="2"
                      className="font-mono select-none"
                    >
                      {config.customText.toUpperCase()}
                    </text>
                  )}
                </svg>
              </div>

              {/* View Controls Overlay */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <button
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass text-xs font-semibold text-white hover:bg-white/10"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  Flip Angle
                </button>
              </div>

              {/* Engraving Watermark Badge */}
              <div className="absolute top-4 right-4 glass px-3 py-1 rounded-lg text-[11px] font-mono text-brand-volt border border-brand-volt/30">
                Engraving: {config.customText || 'None'}
              </div>
            </div>

            {/* Quick Preset Packs */}
            <div className="w-full space-y-2 text-left">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-volt" /> Designer Color Presets:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left transition-all group"
                  >
                    <p className="text-[11px] font-bold text-white group-hover:text-brand-volt truncate">
                      {preset.name}
                    </p>
                    <div className="flex gap-1 mt-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: preset.base }} />
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: preset.swoosh }} />
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: preset.laces }} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Component Picker & Customizer Controls */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            {/* Step 1: Select Part to Modify */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-brand-accent" /> 1. Select Shoe Zone:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {partNames.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setActivePart(p.id as any)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all ${
                      activePart === p.id
                        ? 'bg-brand-volt text-slate-950 font-black shadow-glow-volt'
                        : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Pick Color for active zone */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-brand-volt" /> 2. Choose Palette Color:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {colorPalette.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => applyColor(color.hex)}
                    className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-600 flex flex-col items-center gap-1.5 transition-all group"
                  >
                    <span
                      className="w-7 h-7 rounded-full border border-black/40 shadow"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-[9px] text-slate-400 group-hover:text-white truncate w-full text-center">
                      {color.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Laser Heel Engraving Text */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5 text-cyan-400" /> 3. Personalized Heel Laser Inscription:
              </label>
              <input
                type="text"
                maxLength={12}
                value={config.customText}
                onChange={(e) => setConfig({ ...config, customText: e.target.value })}
                placeholder="e.g. YOUR NAME / #01"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-brand-volt"
              />
              <span className="text-[10px] text-slate-500">Max 12 uppercase characters. Laser-printed on back collar.</span>
            </div>

            {/* Step 4: Size Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                4. Select Shoe Size (US):
              </label>
              <div className="grid grid-cols-6 gap-1">
                {[7, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setConfig({ ...config, size: sz })}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                      config.size === sz
                        ? 'bg-brand-accent text-white shadow-glow'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Price & Add to Cart Action */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Custom Build Price</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white font-display">$225</span>
                  <span className="text-xs text-slate-500 line-through">$260</span>
                </div>
              </div>

              <button
                onClick={handleAddCustomToCart}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-brand-volt to-emerald-400 hover:from-emerald-400 hover:to-brand-volt text-slate-950 font-black text-xs sm:text-sm tracking-wider uppercase shadow-glow-volt hover:scale-105 active:scale-95 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Custom Sneaker</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
