import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import confetti from 'canvas-confetti';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  CreditCard, 
  Lock, 
  ArrowRight
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartSubtotal,
    cartTotal,
    clearCart,
  } = useShop();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form Fields
  const [formData, setFormData] = useState({
    fullName: 'Alex Vance',
    email: 'alex.vance@example.com',
    address: '742 Evergreen Terrace, Apt 4B',
    city: 'New York',
    postalCode: '10001',
    country: 'United States',
    shippingMethod: 'standard',
    paymentMethod: 'card',
    cardNumber: '4532 •••• •••• 8892',
    cardExp: '12/28',
    cardCvc: '884',
  });

  const [orderNumber, setOrderNumber] = useState('');

  if (!isCheckoutOpen) return null;

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff5e3a', '#ccff00', '#00f0ff', '#ffffff'],
      });
    } catch (e) {
      // fallback
    }
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      // Generate Order
      const newOrderId = `STR-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(newOrderId);
      setStep(4);
      triggerConfetti();
      clearCart();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={() => {
          if (step !== 4) setIsCheckoutOpen(false);
        }}
        className="fixed inset-0 bg-black/85 backdrop-blur-md animate-fade-in"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#0d1322] border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 animate-slide-up my-auto max-h-[95vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 bg-slate-900/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Lock className="w-5 h-5 text-emerald-400" />
            <h2 className="font-display font-black text-lg text-white">STRIDE Express Checkout</h2>
          </div>

          <button
            onClick={() => {
              setIsCheckoutOpen(false);
              if (step === 4) setStep(1);
            }}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicators */}
        {step < 4 && (
          <div className="px-6 py-3 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between text-xs">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-brand-accent font-bold' : 'text-slate-500'}`}>
              <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px]">1</span>
              <span>Shipping</span>
            </div>
            <span className="text-slate-600">→</span>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-brand-accent font-bold' : 'text-slate-500'}`}>
              <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px]">2</span>
              <span>Delivery</span>
            </div>
            <span className="text-slate-600">→</span>
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-brand-accent font-bold' : 'text-slate-500'}`}>
              <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px]">3</span>
              <span>Payment</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          
          {/* STEP 1: Shipping Address */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-4 text-left">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Contact & Shipping Address</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-accent"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-accent"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-accent"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-accent"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-accent font-mono"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">Country</label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-accent"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <span className="text-xs text-slate-400">Total: <strong className="text-white font-mono font-bold">${cartTotal.toFixed(2)}</strong></span>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-accent hover:bg-rose-500 text-white font-bold text-xs shadow-glow transition-all"
                >
                  <span>Continue to Delivery</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Delivery Option */}
          {step === 2 && (
            <form onSubmit={handleNextStep} className="space-y-4 text-left">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Choose Shipping Method</h3>

              <div className="space-y-2.5">
                {[
                  {
                    id: 'standard',
                    title: 'Standard Tracked Delivery (3-5 business days)',
                    price: cartSubtotal >= 150 ? 'FREE' : '$15.00',
                    desc: 'Fully insured with real-time SMS tracking updates',
                  },
                  {
                    id: 'express',
                    title: 'Priority Air Courier (1-2 business days)',
                    price: '$25.00',
                    desc: 'Dispatched in signature hard-shell collector box',
                  },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-start justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      formData.shippingMethod === opt.id
                        ? 'border-brand-accent bg-slate-900 shadow-md'
                        : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="shippingMethod"
                        checked={formData.shippingMethod === opt.id}
                        onChange={() => setFormData({ ...formData, shippingMethod: opt.id })}
                        className="mt-1 accent-brand-accent"
                      />
                      <div>
                        <p className="text-xs font-bold text-white">{opt.title}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{opt.desc}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-brand-volt">{opt.price}</span>
                  </label>
                ))}
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  ← Back to Address
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-accent hover:bg-rose-500 text-white font-bold text-xs shadow-glow transition-all"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Payment Mock */}
          {step === 3 && (
            <form onSubmit={handleNextStep} className="space-y-4 text-left">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Payment Details</h3>

              {/* Payment Type Selector */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'card', label: 'Credit Card', icon: <CreditCard className="w-4 h-4" /> },
                  { id: 'apple', label: 'Apple Pay', icon: <span> Pay</span> },
                  { id: 'upi', label: 'UPI / PayPal', icon: <span>⚡ Fast</span> },
                ].map((pm) => (
                  <button
                    type="button"
                    key={pm.id}
                    onClick={() => setFormData({ ...formData, paymentMethod: pm.id })}
                    className={`py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      formData.paymentMethod === pm.id
                        ? 'bg-white text-slate-950 shadow'
                        : 'bg-slate-900 text-slate-300 border border-slate-800'
                    }`}
                  >
                    {pm.icon}
                    <span>{pm.label}</span>
                  </button>
                ))}
              </div>

              {/* Mock Credit Card Fields */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">Card Number</label>
                  <input
                    type="text"
                    required
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-brand-accent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      required
                      value={formData.cardExp}
                      onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-brand-accent"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">CVV Security Code</label>
                    <input
                      type="text"
                      required
                      value={formData.cardCvc}
                      onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-brand-accent"
                    />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2 text-xs text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Simulation mode: No actual credit card charge will be made.</span>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-accent to-rose-600 hover:from-rose-500 hover:to-brand-accent text-white font-black text-xs uppercase tracking-wider shadow-glow hover:scale-105 active:scale-95 transition-all"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Authorize & Pay ${cartTotal.toFixed(2)}</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Order Confirmation & Receipt */}
          {step === 4 && (
            <div className="text-center py-6 space-y-6 animate-slide-up">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono text-brand-volt font-bold">ORDER CONFIRMED</span>
                <h3 className="text-2xl font-black font-display text-white">
                  Thank You for Your Order, {formData.fullName.split(' ')[0]}!
                </h3>
                <p className="text-xs text-slate-400">
                  Order receipt and tracking info sent to <strong className="text-slate-200">{formData.email}</strong>.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-left space-y-3 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <span className="text-slate-400 font-semibold">Order ID:</span>
                  <span className="font-mono text-white font-bold">{orderNumber}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Shipping To:</span>
                  <span className="text-slate-200">{formData.address}, {formData.city}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Estimated Delivery:</span>
                  <span className="text-emerald-400 font-semibold">3-4 Days (Express Dispatch)</span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-sm font-bold text-white">
                  <span>Total Paid:</span>
                  <span className="text-brand-volt font-mono">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setStep(1);
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-accent to-rose-600 text-white font-bold text-xs uppercase tracking-wider shadow-glow hover:scale-[1.01] transition-all"
              >
                Continue Shopping More Sneakers
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
