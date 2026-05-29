import React, { useState, useEffect } from 'react';
import { 
  X, 
  Trash2, 
  ArrowRight, 
  Minus, 
  Plus, 
  ShoppingBag, 
  ArrowLeft, 
  Sparkles, 
  MapPin, 
  Compass, 
  User, 
  Phone, 
  Mail, 
  CheckCircle2, 
  ChevronRight 
} from 'lucide-react';
import { shopProducts } from '../../data/catalog';

const CartDrawer = ({ 
  isOpen, 
  setIsOpen, 
  cartItems, 
  setCartItems,
  currency = 'INR'
}) => {
  const isUSD = currency === 'USD';
  const symbol = isUSD ? '$' : '₹';

  // Multi-step Checkout State Machine
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'form' | 'energizing' | 'success'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    vastuIntent: 'wealth', // 'wealth' | 'harmony' | 'career' | 'protection'
    vastuDirection: 'North-East', // Compass directions
  });
  const [formErrors, setFormErrors] = useState({});
  const [energizingText, setEnergizingText] = useState('');
  const [generatedOrderId, setGeneratedOrderId] = useState('');

  // Auto-fill details if present in localStorage to improve CX
  useEffect(() => {
    const savedName = localStorage.getItem('seeker_name');
    const savedPhone = localStorage.getItem('seeker_phone');
    const savedEmail = localStorage.getItem('seeker_email');
    const savedAddress = localStorage.getItem('seeker_address');
    const savedCity = localStorage.getItem('seeker_city');
    const savedPincode = localStorage.getItem('seeker_pincode');
    
    if (savedName || savedPhone || savedEmail) {
      setFormData(prev => ({
        ...prev,
        name: savedName || '',
        phone: savedPhone || '',
        email: savedEmail || '',
        address: savedAddress || '',
        city: savedCity || '',
        pincode: savedPincode || '',
      }));
    }
  }, []);

  const updateQuantity = (itemName, delta) => {
    setCartItems((current) =>
      current
        .map((item) => {
          if (item.name === itemName) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeItem = (itemName) => {
    setCartItems((current) => current.filter((item) => item.name !== itemName));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, cartItem) => {
      const product = shopProducts.find((p) => p.name === cartItem.name);
      return total + (product ? product.price * cartItem.quantity : 0);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const displaySubtotal = isUSD ? Math.round(subtotal / 85) : subtotal;

  // Handle Text/Input updates
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    const phoneRegex = /^[0-9+\s-]{10,15}$/;
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.trim().replace(/\s/g, ''))) {
      errors.phone = 'Enter a valid phone number (10+ digits)';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Enter a valid email address';
    }
    
    if (!formData.address.trim()) {
      errors.address = 'Shipping address is required';
    }
    
    if (!formData.city.trim()) {
      errors.city = 'City is required';
    }
    
    if (!formData.pincode.trim()) {
      errors.pincode = 'Pincode is required';
    } else if (formData.pincode.trim().length < 4) {
      errors.pincode = 'Enter a valid pincode';
    }
    
    return errors;
  };

  // Submit and start cosmic energization animation
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Persist details locally for convenience next time
    localStorage.setItem('seeker_name', formData.name);
    localStorage.setItem('seeker_phone', formData.phone);
    localStorage.setItem('seeker_email', formData.email);
    localStorage.setItem('seeker_address', formData.address);
    localStorage.setItem('seeker_city', formData.city);
    localStorage.setItem('seeker_pincode', formData.pincode);

    setCheckoutStep('energizing');
  };

  // Run Vedic chanting & redirection flow in background
  useEffect(() => {
    if (checkoutStep === 'energizing') {
      const messages = [
        '🕉️ Consecrating items under cosmic vibration...',
        '🌌 Harmonizing five elements (Panchamahabhutas)...',
        '🧭 Customizing grid layout to ' + formData.vastuDirection + ' alignment...',
        '🔮 Channeling focus intent: ' + formData.vastuIntent.toUpperCase() + '...',
        '✨ Sealing ritual activation codes...',
        '🌿 Manifestation complete! Finalizing sacred invoice...'
      ];
      
      let index = 0;
      setEnergizingText(messages[0]);
      
      const interval = setInterval(() => {
        index++;
        if (index < messages.length) {
          setEnergizingText(messages[index]);
        } else {
          clearInterval(interval);
          
          // Generate unique ritual hash order id
          const orderId = `HV-${Math.floor(100000 + Math.random() * 900000)}`;
          setGeneratedOrderId(orderId);
          
          // Redirect to WhatsApp
          triggerWhatsAppRedirect(orderId);
          
          // Finish and show invoice confirmation locally
          setCheckoutStep('success');
        }
      }, 700);
      
      return () => clearInterval(interval);
    }
  }, [checkoutStep]);

  const triggerWhatsAppRedirect = (orderId) => {
    const itemsText = cartItems
      .map((item) => {
        const product = shopProducts.find((p) => p.name === item.name);
        const itemPrice = product ? (isUSD ? Math.round(product.price / 85) : product.price) : 0;
        return `• *${item.name}* [Qty: ${item.quantity} × ${symbol}${itemPrice.toLocaleString()}] ─── ${symbol}${(itemPrice * item.quantity).toLocaleString()}`;
      })
      .join('\n');

    const intentLabels = {
      wealth: '💰 Wealth & Abundance (Laxmi Flow)',
      harmony: '🕊️ Peace & Harmony (Domestic Calm)',
      career: '⚡ Career & Power (Active growth)',
      protection: '🛡️ Aura Protection (Warding low vibes)'
    };

    const directionLabels = {
      'North-East': '🧭 North-East (Ishanya) - Growth & Wisdom',
      'North': '🧭 North (Kubera) - Wealth & Opportunities',
      'East': '🧭 East (Aditya) - Health & Social Influence',
      'South-East': '🧭 South-East (Agneya) - Cash Flow & Drive',
      'South': '🧭 South (Yama) - Peace & Reputation',
      'South-West': '🧭 South-West (Nairutya) - Relationships & Skills',
      'West': '🧭 West (Varuna) - Gains & Realization',
      'North-West': '🧭 North-West (Vayavya) - Support & Connections'
    };

    const text = `🕉️ *HARESHWAR VASTU - SACRED ORDER* 🕉️\n` +
      `─────────────────────────────\n` +
      `*Order Reference:* #${orderId}\n` +
      `*Date:* ${new Date().toLocaleDateString('en-IN')}\n` +
      `─────────────────────────────\n\n` +
      `👤 *CUSTOMER DETAILS*\n` +
      `• *Name:* ${formData.name}\n` +
      `• *Phone:* ${formData.phone}\n` +
      `• *Email:* ${formData.email}\n\n` +
      `📍 *SHIPPING DETAILS*\n` +
      `• *Address:* ${formData.address}\n` +
      `• *City:* ${formData.city}\n` +
      `• *Pincode:* ${formData.pincode}\n\n` +
      `✨ *SACRED VASTU ALIGNMENT*\n` +
      `• *Focus Intent:* ${intentLabels[formData.vastuIntent] || formData.vastuIntent}\n` +
      `• *Home Direction:* ${directionLabels[formData.vastuDirection] || formData.vastuDirection}\n\n` +
      `📦 *ORDERED ITEMS*\n` +
      `${itemsText}\n\n` +
      `💵 *INVOICE SUMMARY*\n` +
      `• *Subtotal:* ${symbol}${displaySubtotal.toLocaleString('en-IN')}\n` +
      `• *Vedic Energization:* _FREE (Complimentary)_\n` +
      `• *Grand Total:* *${symbol}${displaySubtotal.toLocaleString('en-IN')}*\n` +
      `─────────────────────────────\n` +
      `🌿 *SACRED REQUEST*\n` +
      `"I request the custom energization and alignment of these tools for my home to clear energy blocks. Please guide me on ritual guidelines."`;

    window.open(`https://wa.me/917319178910?text=${encodeURIComponent(text)}`, '_blank');
  };

  const intentOptions = [
    { id: 'wealth', label: '💰 Wealth', desc: 'Laxmi/Kuber flow' },
    { id: 'harmony', label: '🕊️ Harmony', desc: 'Domestic peace' },
    { id: 'career', label: '⚡ Career', desc: 'Growth & power' },
    { id: 'protection', label: '🛡️ Aura Protection', desc: 'Ward off low vibes' }
  ];

  const directionOptions = [
    { id: 'North-East', label: 'N-East', desc: 'Wisdom' },
    { id: 'East', label: 'East', desc: 'Social' },
    { id: 'South-East', label: 'S-East', desc: 'Cash' },
    { id: 'South', label: 'South', desc: 'Fame' },
    { id: 'South-West', label: 'S-West', desc: 'Skills' },
    { id: 'West', label: 'West', desc: 'Gains' },
    { id: 'North-West', label: 'N-West', desc: 'Support' },
    { id: 'North', label: 'North', desc: 'Wealth' }
  ];

  return (
    <>
      {/* self-contained animation styles */}
      <style>{`
        @keyframes mandala-rotate-clockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes mandala-rotate-counter {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        @keyframes pulse-bindu {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.35); opacity: 1; filter: drop-shadow(0 0 10px #e5a93a); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-mandala-cw {
          animation: mandala-rotate-clockwise 25s linear infinite;
        }
        .animate-mandala-ccw {
          animation: mandala-rotate-counter 30s linear infinite;
        }
        .animate-bindu {
          animation: pulse-bindu 2s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Dynamic Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-[150] transition-opacity duration-500"
          onClick={() => {
            if (checkoutStep !== 'energizing') setIsOpen(false);
          }}
        />
      )}

      {/* Slide-out Drawer Panel */}
      <div 
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-[#fffaf2] dark:bg-[#080c0b] z-[151] shadow-[0_0_80px_rgba(0,0,0,0.3)] transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col border-l border-black/5 dark:border-white/5 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-black/5 dark:border-white/5 bg-white/20 dark:bg-[#111715]/20 backdrop-blur-md">
          <div className="flex items-baseline gap-3">
            {checkoutStep === 'form' ? (
              <button 
                onClick={() => setCheckoutStep('cart')}
                className="flex items-center gap-1.5 text-[10px] font-bold text-[#e5a93a] uppercase tracking-wider font-mono hover:text-[#c8922a] transition-colors"
              >
                <ArrowLeft size={12} />
                Back to Bag
              </button>
            ) : (
              <>
                <h2 className="font-display text-2xl font-bold text-[#080c0b] dark:text-[#f0ede8]">
                  {checkoutStep === 'success' ? 'Sacred Confirmation' : checkoutStep === 'energizing' ? 'Ritual Center' : 'Your Sacred Bag'}
                </h2>
                {checkoutStep === 'cart' && (
                  <span className="text-[11px] font-bold text-[#e5a93a] bg-[#e5a93a]/10 px-3 py-1 rounded-full font-mono">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)} Items
                  </span>
                )}
              </>
            )}
          </div>
          <button 
            onClick={() => {
              if (checkoutStep !== 'energizing') setIsOpen(false);
            }}
            disabled={checkoutStep === 'energizing'}
            className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors text-[#080c0b] dark:text-white disabled:opacity-30"
          >
            <X size={20} />
          </button>
        </div>

        {/* STEP 1: SHOPPING CART */}
        {checkoutStep === 'cart' && (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
              {cartItems.length > 0 ? (
                <div className="space-y-4 animate-fade-in-up">
                  {cartItems.map((cartItem) => {
                    const product = shopProducts.find((p) => p.name === cartItem.name);
                    if (!product) return null;
                    
                    const itemPrice = isUSD ? Math.round(product.price / 85) : product.price;
                    const rowTotal = itemPrice * cartItem.quantity;
                    
                    return (
                      <div key={cartItem.name} className="flex gap-4 p-3 bg-white dark:bg-[#111715] rounded-[16px] border border-black/5 dark:border-white/5 transition-all hover:shadow-md">
                        {/* Item Thumbnail */}
                        <div className="w-20 h-24 shrink-0 rounded-[12px] overflow-hidden bg-[#f9f7f3] dark:bg-[#0c100f] border border-black/5">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Item Info details */}
                        <div className="flex-1 flex flex-col justify-between py-0.5">
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <h4 className="font-bold text-[13px] text-[#080c0b] dark:text-[#f0ede8] line-clamp-1 leading-snug">
                                {product.name}
                              </h4>
                              <button 
                                onClick={() => removeItem(cartItem.name)}
                                className="text-[#6e8078] hover:text-[#b84030] transition-colors p-1"
                                aria-label="Remove item"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                            <span className="text-[9px] uppercase tracking-widest text-[#6b8c82] font-mono mt-0.5 block">
                              {product.category}
                            </span>
                          </div>
                          
                          {/* Quantity & Row Total line */}
                          <div className="flex items-center justify-between mt-3">
                            {/* Incrementor / Decrementor */}
                            <div className="flex items-center border border-black/10 dark:border-white/10 rounded-full p-1 bg-[#f9f7f3] dark:bg-[#080c0b]">
                              <button
                                onClick={() => updateQuantity(cartItem.name, -1)}
                                className="p-1 hover:text-[#b84030] transition-colors"
                              >
                                <Minus size={11} />
                              </button>
                              <span className="text-[11px] font-bold font-mono px-3 select-none">
                                {cartItem.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(cartItem.name, 1)}
                                className="p-1 hover:text-[#0b6455] transition-colors"
                              >
                                <Plus size={11} />
                              </button>
                            </div>
                            
                            {/* Final Row Total */}
                            <span className="font-mono text-sm font-extrabold text-[#080c0b] dark:text-[#f0ede8]">
                              {symbol}{rowTotal.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-6">
                  <div className="w-20 h-20 rounded-full bg-[#ebe4d8]/50 dark:bg-white/5 flex items-center justify-center text-[#6e8078] animate-float">
                    <ShoppingBag size={28} strokeWidth={1.5} className="text-[#e5a93a]" />
                  </div>
                  <div className="space-y-1.5">
                    <p className="font-display text-xl font-bold text-[#080c0b] dark:text-[#f0ede8]">Your bag is currently empty</p>
                    <p className="text-xs text-[#6e8078] max-w-[250px] mx-auto leading-relaxed">Ensure a steady flow of positivity. Select a ritually energized remedy to begin your journey.</p>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="btn btn-gold text-[10px] tracking-wider uppercase font-mono px-8 py-3.5"
                  >
                    Continue Exploring
                  </button>
                </div>
              )}
            </div>

            {/* Footer Billing Section */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-white dark:bg-[#111715] border-t border-black/5 dark:border-white/5 shadow-[0_-15px_45px_rgba(0,0,0,0.06)] z-10 relative">
                <div className="flex justify-between items-end mb-6">
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#6e8078] font-mono">Grand Subtotal</span>
                    <span className="block text-[9px] text-[#6b8c82] leading-tight">Ritual cleansing & blessing included</span>
                  </div>
                  <div className="text-right">
                    <span className="block font-display text-3xl font-extrabold text-[#080c0b] dark:text-white tabular">
                      {symbol}{displaySubtotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
                
                <button 
                  onClick={() => setCheckoutStep('form')}
                  className="w-full btn btn-gold py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 group font-mono shadow-md hover:shadow-lg active:scale-97"
                >
                  Secure Order via WhatsApp
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </>
        )}

        {/* STEP 2: PREMIUM VASTU CHECKOUT FORM */}
        {checkoutStep === 'form' && (
          <div className="flex-1 flex flex-col justify-between overflow-hidden">
            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar animate-fade-in-up">
              <form id="vastu-checkout-form" onSubmit={handleFormSubmit} className="space-y-5">
                
                {/* 1. Contact Info */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#e5a93a] font-bold flex items-center gap-1.5">
                    <User size={11} className="text-[#e5a93a]"/>
                    1. Seeker Contact Details
                  </h4>
                  
                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-[#6e8078] font-bold mb-1">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Nikhil Sharma"
                      className={`w-full bg-[#111715]/40 border rounded-[10px] py-2.5 px-3.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-all ${
                        formErrors.name ? 'border-red-500/50 focus:border-red-500 bg-red-500/5' : 'border-white/5 focus:border-[#e5a93a] focus:bg-[#111715]/80'
                      }`}
                    />
                    {formErrors.name && <p className="text-[9px] text-red-400 font-medium mt-1 pl-1">{formErrors.name}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] uppercase tracking-wider text-[#6e8078] font-bold mb-1">WhatsApp Phone</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        className={`w-full bg-[#111715]/40 border rounded-[10px] py-2.5 px-3.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-all ${
                          formErrors.phone ? 'border-red-500/50 focus:border-red-500 bg-red-500/5' : 'border-white/5 focus:border-[#e5a93a] focus:bg-[#111715]/80'
                        }`}
                      />
                      {formErrors.phone && <p className="text-[9px] text-red-400 font-medium mt-1 pl-1">{formErrors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase tracking-wider text-[#6e8078] font-bold mb-1">Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="seeker@divine.com"
                        className={`w-full bg-[#111715]/40 border rounded-[10px] py-2.5 px-3.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-all ${
                          formErrors.email ? 'border-red-500/50 focus:border-red-500 bg-red-500/5' : 'border-white/5 focus:border-[#e5a93a] focus:bg-[#111715]/80'
                        }`}
                      />
                      {formErrors.email && <p className="text-[9px] text-red-400 font-medium mt-1 pl-1">{formErrors.email}</p>}
                    </div>
                  </div>
                </div>

                {/* 2. Physical Sanctuary */}
                <div className="space-y-3 pt-1">
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#e5a93a] font-bold flex items-center gap-1.5">
                    <MapPin size={11} className="text-[#e5a93a]"/>
                    2. Sanctuary Shipping Address
                  </h4>
                  
                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-[#6e8078] font-bold mb-1">Street Address</label>
                    <textarea 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Flat/House No, Building, Street, Area..."
                      rows={2}
                      className={`w-full bg-[#111715]/40 border rounded-[10px] py-2.5 px-3.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-all resize-none ${
                        formErrors.address ? 'border-red-500/50 focus:border-red-500 bg-red-500/5' : 'border-white/5 focus:border-[#e5a93a] focus:bg-[#111715]/80'
                      }`}
                    />
                    {formErrors.address && <p className="text-[9px] text-red-400 font-medium mt-1 pl-1">{formErrors.address}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] uppercase tracking-wider text-[#6e8078] font-bold mb-1">City & State</label>
                      <input 
                        type="text" 
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="e.g. Mumbai, MH"
                        className={`w-full bg-[#111715]/40 border rounded-[10px] py-2.5 px-3.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-all ${
                          formErrors.city ? 'border-red-500/50 focus:border-red-500 bg-red-500/5' : 'border-white/5 focus:border-[#e5a93a] focus:bg-[#111715]/80'
                        }`}
                      />
                      {formErrors.city && <p className="text-[9px] text-red-400 font-medium mt-1 pl-1">{formErrors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase tracking-wider text-[#6e8078] font-bold mb-1">Pincode / Zip</label>
                      <input 
                        type="text" 
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="e.g. 400001"
                        className={`w-full bg-[#111715]/40 border rounded-[10px] py-2.5 px-3.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-all ${
                          formErrors.pincode ? 'border-red-500/50 focus:border-red-500 bg-red-500/5' : 'border-white/5 focus:border-[#e5a93a] focus:bg-[#111715]/80'
                        }`}
                      />
                      {formErrors.pincode && <p className="text-[9px] text-red-400 font-medium mt-1 pl-1">{formErrors.pincode}</p>}
                    </div>
                  </div>
                </div>

                {/* 3. Vastu Intention Card Selector */}
                <div className="space-y-3 pt-1">
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#e5a93a] font-bold flex items-center gap-1.5">
                    <Sparkles size={11} className="text-[#e5a93a]"/>
                    3. Sacred Focus Intention
                  </h4>
                  <div className="grid grid-cols-2 gap-2.5">
                    {intentOptions.map((opt) => {
                      const isActive = formData.vastuIntent === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, vastuIntent: opt.id })}
                          className={`text-left p-3 rounded-[12px] border transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-[64px] ${
                            isActive 
                              ? 'border-[#e5a93a] bg-[#e5a93a]/10 shadow-[0_0_15px_rgba(229,169,58,0.1)]' 
                              : 'border-white/5 bg-[#111715]/40 hover:bg-white/5 hover:border-white/10'
                          }`}
                        >
                          <span className="block font-bold text-xs text-white leading-none">{opt.label}</span>
                          <span className="block text-[8px] text-[#6b8c82] leading-tight font-medium mt-1">{opt.desc}</span>
                          {isActive && (
                            <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#e5a93a] animate-pulse" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Direction Selector Grid */}
                <div className="space-y-3 pt-1">
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#e5a93a] font-bold flex items-center gap-1.5">
                    <Compass size={11} className="text-[#e5a93a]"/>
                    4. Home Facing Direction (Energetic Grid)
                  </h4>
                  <div className="grid grid-cols-4 gap-1.5">
                    {directionOptions.map((dir) => {
                      const isActive = formData.vastuDirection === dir.id;
                      return (
                        <button
                          key={dir.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, vastuDirection: dir.id })}
                          className={`text-center py-2 px-1 rounded-[8px] border transition-all duration-200 flex flex-col items-center justify-center h-[46px] ${
                            isActive 
                              ? 'border-[#0b6455] bg-[#0b6455]/20 text-white shadow-[0_0_12px_rgba(11,100,85,0.2)]' 
                              : 'border-white/5 bg-[#111715]/40 hover:bg-white/5 text-[#a8b8b2] hover:text-white'
                          }`}
                        >
                          <span className="block font-bold text-[9px] uppercase leading-none mb-0.5">{dir.label}</span>
                          <span className="block text-[7px] text-[#6b8c82] leading-none font-medium tracking-tight truncate w-full">{dir.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </form>
            </div>

            {/* Sticky Form Footer Billing Preview */}
            <div className="p-6 bg-white dark:bg-[#111715] border-t border-black/5 dark:border-white/5 shadow-[0_-15px_45px_rgba(0,0,0,0.06)] z-10 relative">
              <div className="mb-4 p-3 rounded-lg border border-dashed border-[#e5a93a]/20 bg-[#e5a93a]/3 text-left space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-[#6e8078]">INQUIRY RITUAL PACK</span>
                  <span className="text-emerald-500 font-bold">FREE BLOSSOMING</span>
                </div>
                <p className="text-[9px] text-[#6b8c82] leading-relaxed">
                  Your Vastu items will be personalized, chanted over with Vedic hymns, and aligned to your facing direction.
                </p>
              </div>

              <div className="flex justify-between items-end mb-5">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6e8078] font-mono">Sacred Total</span>
                  <span className="block text-[8px] text-[#6b8c82] leading-none">Complimentary energization included</span>
                </div>
                <div className="text-right">
                  <span className="block font-display text-2xl font-extrabold text-[#080c0b] dark:text-white tabular">
                    {symbol}{displaySubtotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button 
                type="submit"
                form="vastu-checkout-form"
                className="w-full btn btn-gold py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 group font-mono shadow-md hover:shadow-lg active:scale-97"
              >
                Initiate Vedic Activation
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: COSMIC ENERGIZING ANIMATION */}
        {checkoutStep === 'energizing' && (
          <div className="flex-1 flex items-center justify-center p-6 bg-[#080c0b]/95">
            <div className="flex flex-col items-center justify-center text-center space-y-8 animate-fade-in-up">
              
              {/* Complex Glowing Sri Yantra Mandala */}
              <div className="relative w-48 h-48 flex items-center justify-center">
                {/* Outer halo */}
                <div className="absolute inset-0 rounded-full border border-dashed border-[#e5a93a]/30 animate-mandala-cw" />
                
                {/* Inner rotating frame */}
                <div className="absolute inset-4 rounded-full border border-[#0b6455]/20 animate-mandala-ccw" />
                
                {/* Lotus Petals SVG overlay */}
                <svg className="absolute w-40 h-40 animate-mandala-cw text-[#e5a93a]/40" viewBox="0 0 100 100" fill="none">
                  <path d="M 50 10 C 45 30, 55 30, 50 10 Z" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="0.5"/>
                  <path d="M 50 90 C 45 70, 55 70, 50 90 Z" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="0.5"/>
                  <path d="M 10 50 C 30 45, 30 55, 10 50 Z" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="0.5"/>
                  <path d="M 90 50 C 70 45, 70 55, 90 50 Z" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="0.5"/>
                  
                  {/* Geometric Intersections */}
                  <polygon points="50,22 28,64 72,64" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3" />
                  <polygon points="50,78 28,36 72,36" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3" />
                  <polygon points="50,30 35,58 65,58" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.4" />
                  <polygon points="50,70 35,42 65,42" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.4" />
                  
                  <polygon points="50,42 43,54 57,54" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.6" />
                  <polygon points="50,58 43,46 57,46" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.6" />
                </svg>
                
                {/* Inner Compass ring rotating counter */}
                <svg className="absolute w-28 h-28 animate-mandala-ccw text-[#0b6455]/70" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
                  <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" />
                  <polygon points="50,18 78,68 22,68" stroke="currentColor" strokeWidth="0.5" />
                </svg>

                {/* Central pulsing cosmic bindu dot */}
                <div className="absolute w-3.5 h-3.5 rounded-full bg-[#e5a93a] animate-bindu shadow-[0_0_18px_#e5a93a]" />
              </div>

              {/* Dynamic ticker status logging */}
              <div className="space-y-4 max-w-xs mx-auto">
                <h3 className="text-[#e5a93a] font-display text-sm font-bold tracking-widest uppercase font-mono">
                  Sacred Consecration
                </h3>
                <div className="h-16 flex items-center justify-center px-4">
                  <p className="text-[11px] text-[#a8b8b2] font-mono leading-relaxed bg-white/3 border border-white/5 py-2.5 px-4 rounded-[12px] shadow-inner select-none transition-all duration-300 min-h-[50px] flex items-center justify-center">
                    {energizingText}
                  </p>
                </div>
                
                {/* Visual glow indicator line */}
                <div className="w-48 mx-auto bg-white/5 h-[2px] rounded-full overflow-hidden relative">
                  <div className="bg-gradient-to-r from-[#0b6455] via-[#e5a93a] to-[#0b6455] h-full rounded-full animate-pulse w-full" />
                </div>
              </div>
              
            </div>
          </div>
        )}

        {/* STEP 4: SUCCESS RECEIPT */}
        {checkoutStep === 'success' && (
          <div className="flex-1 flex flex-col justify-center items-center p-6 bg-white dark:bg-[#080c0b]">
            <div className="w-full max-w-xs flex flex-col items-center justify-center text-center space-y-6 animate-fade-in-up">
              
              <div className="w-16 h-16 rounded-full bg-[#0b6455]/10 border border-[#0b6455]/30 flex items-center justify-center text-[#e5a93a] shadow-[0_0_30px_rgba(11,100,85,0.15)]">
                <CheckCircle2 size={32} strokeWidth={1.5} className="text-[#0b6455]" />
              </div>
              
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#e5a93a] font-bold">Vastu Audit Initialized</span>
                <h3 className="font-display text-2xl font-bold text-[#080c0b] dark:text-[#f0ede8]">
                  Sacred Request Cast!
                </h3>
                <p className="text-[11px] text-[#6e8078] max-w-[280px] mx-auto leading-relaxed">
                  Your inquiry and customizable energization layout are generated. Check the new browser tab on WhatsApp to complete transaction guidelines!
                </p>
              </div>

              {/* Classic Gold-Bordered Receipt */}
              <div className="w-full p-4 rounded-xl border border-dashed border-[#e5a93a]/30 bg-[#e5a93a]/3 text-left space-y-2.5 font-mono text-[9px] text-[#6e8078] dark:text-slate-400">
                <div className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-2">
                  <span className="font-bold">TEMPLE DIGITAL RECEIPT</span>
                  <span className="font-bold text-[#e5a93a]">{generatedOrderId}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>SEEKER:</span>
                    <span className="text-[#080c0b] dark:text-white font-bold">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ALIGNMENT FOCUS:</span>
                    <span className="text-[#080c0b] dark:text-white font-bold uppercase">{formData.vastuIntent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>HOME DIRECTION:</span>
                    <span className="text-[#080c0b] dark:text-white font-bold uppercase">{formData.vastuDirection}</span>
                  </div>
                  <div className="flex justify-between border-t border-black/5 dark:border-white/5 pt-2 font-bold text-[#080c0b] dark:text-white">
                    <span>GRAND SUB-TOTAL:</span>
                    <span>{symbol}{displaySubtotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  setCartItems([]);
                  setCheckoutStep('cart');
                  setIsOpen(false);
                }}
                className="btn btn-gold text-[10px] tracking-wider uppercase font-mono px-8 py-3.5 shadow-md hover:shadow-lg w-full mt-2"
              >
                Return to Sanctuary
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
