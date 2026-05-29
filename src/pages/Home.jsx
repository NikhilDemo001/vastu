import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import StatsBar from '../components/sections/StatsBar';
import BentoGrid from '../components/sections/BentoGrid';
import Testimonials from '../components/sections/Testimonials';
import ConsultationForm from '../components/ConsultationForm';
import AuraScanner from '../components/AuraScanner';
import ProductCard from '../components/shop/ProductCard';
import { Star } from 'lucide-react';
import { servicePackages, shopProducts } from '../data/catalog';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Home = () => {
  useScrollReveal();

  const featuredProducts = shopProducts.slice(0, 4);
  const [wishlist, setWishlist] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [activeProduct, setActiveProduct] = useState(null);

  useEffect(() => {
    const savedWish = localStorage.getItem('wishlist');
    if (savedWish) setWishlist(JSON.parse(savedWish));

    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const toggleWishlist = (productName) => {
    setWishlist((current) => {
      const updated = current.includes(productName)
        ? current.filter((item) => item !== productName)
        : [...current, productName];
      localStorage.setItem('wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  const handleToggleCart = (productName) => {
    setCartItems((current) => {
      const exists = current.find(item => item.name === productName);
      if (exists) {
        return current.filter(item => item.name !== productName);
      } else {
        return [...current, { name: productName, quantity: 1 }];
      }
    });
  };

  return (
    <>
      {/* ─── CINEMATIC HERO ─── */}
      <HeroSection />

      {/* ─── ANIMATED STATS BAR ─── */}
      <StatsBar />

      {/* ─── BENTO GRID ─── */}
      <BentoGrid />

      {/* ─── AURA SCANNER ─── */}
      <section id="scanner" className="py-24 bg-[var(--paper-warm)]">
        <div className="section-shell">
          <div className="flex flex-col items-center text-center mb-12">
            <span className="eyebrow block mb-3 reveal">Aura Diagnostic</span>
            <h2 className="text-display-lg reveal delay-1">
              Scan your space.<br />
              <em className="text-gradient not-italic">Know your alignment.</em>
            </h2>
          </div>
          <div className="reveal delay-2">
            <AuraScanner />
          </div>
        </div>
      </section>

      {/* ─── SERVICES PREVIEW ─── */}
      <section className="py-24">
        <div className="section-shell">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span className="eyebrow block mb-3 reveal">Services</span>
              <h2 className="text-display-lg reveal delay-1">
                Expert-led<br />
                <em className="text-gradient not-italic">guidance sessions.</em>
              </h2>
            </div>
            <Link to="/services" className="btn btn-outline reveal reveal-right delay-2">
              View All Services →
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {servicePackages.map((service, index) => (
              <article
                key={service.title}
                className={`reveal card-tilt rounded-[16px] border p-7 transition-all ${
                  index === 2
                    ? 'ink-panel border-[var(--gold)]/20 animate-pulse-glow'
                    : 'card-surface'
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                {index === 2 && (
                  <span className="inline-block font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[var(--gold)]/15 text-[var(--gold)] border border-[var(--gold)]/25 mb-4">
                    Most Popular
                  </span>
                )}
                <span className={`eyebrow block mb-2 ${index === 2 ? 'eyebrow--gold' : ''}`}>
                  {service.eyebrow}
                </span>
                <h3 className={`font-display text-2xl font-bold leading-tight mb-3 ${index === 2 ? 'text-white' : 'text-[var(--text-primary)]'}`}>
                  {service.title}
                </h3>
                <p className={`text-sm leading-relaxed mb-4 ${index === 2 ? 'text-white/60' : 'text-[var(--text-secondary)]'}`}>
                  {service.description}
                </p>
                <p className={`font-display text-2xl font-bold ${index === 2 ? 'text-[var(--gold)]' : 'text-[var(--jade)]'}`}>
                  {service.price}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className="py-24 bg-[#0c0f0e] overflow-hidden">
        <div className="section-shell">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span className="eyebrow eyebrow--gold block mb-3 reveal">Featured Shop</span>
              <h2 className="text-display-lg text-white reveal delay-1">
                Curated tools for<br />
                <em className="text-shimmer not-italic">ritual &amp; space.</em>
              </h2>
            </div>
            <Link to="/shop" className="btn btn-gold reveal reveal-right delay-2">
              Shop Collection →
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.name} 
                className="reveal" 
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <ProductCard 
                  product={product}
                  isWishlisted={wishlist.includes(product.name)}
                  onToggleWishlist={toggleWishlist}
                  isInCart={!!cartItems.find(item => item.name === product.name)}
                  onToggleCart={handleToggleCart}
                  onQuickView={setActiveProduct}
                  currency="INR"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <Testimonials />

      {/* ─── CONSULTATION FORM ─── */}
      <ConsultationForm />

      {/* Expanded Quick View Modal */}
      {activeProduct && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 animate-scale-in text-[#080c0b] dark:text-[#f0ede8]">
          <div 
            className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity"
            onClick={() => setActiveProduct(null)}
          />
          <div className="bg-white dark:bg-[#111715] max-w-4xl w-full rounded-2xl shadow-2xl overflow-hidden relative z-10 flex flex-col md:flex-row max-h-[90vh] border border-white/10">
            <button
              onClick={() => setActiveProduct(null)}
              className="absolute top-4 right-4 h-10 w-10 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-[#080c0b] dark:text-white rounded-full flex items-center justify-center transition-colors z-20 backdrop-blur-sm"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            
            {/* Modal Image */}
            <div className="w-full md:w-1/2 h-64 md:h-auto bg-[#f9f7f3] dark:bg-[#0c100f] shrink-0 relative">
              <img
                src={activeProduct.image}
                alt={activeProduct.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                {activeProduct.stockStatus === 'low-stock' && (
                  <span className="bg-[#b84030] text-white text-[9px] font-extrabold px-3 py-1 rounded-[6px] uppercase tracking-wider shadow-md font-mono">
                    Low Stock Alert
                  </span>
                )}
              </div>
            </div>
            
            {/* Modal Details content */}
            <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center overflow-y-auto no-scrollbar">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#6b8c82] mb-2.5 block font-mono">
                {activeProduct.category} · {activeProduct.brand}
              </span>
              
              <h2 className="font-display text-3xl font-bold text-[#080c0b] dark:text-white leading-tight mb-4">
                {activeProduct.name}
              </h2>

              <div className="flex items-center gap-2 text-[#e5a93a] mb-5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={12} 
                      className={`fill-current ${i < Math.floor(activeProduct.rating) ? 'text-[#e5a93a]' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-[11px] font-bold font-mono text-[#3d4e49] dark:text-[#a8b8b2]">{activeProduct.rating} / 5.0 ({activeProduct.reviewsCount} reviews)</span>
              </div>
              
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-black text-[#080c0b] dark:text-white tracking-tight tabular">
                  ₹{activeProduct.price.toLocaleString('en-IN')}
                </span>
                {activeProduct.discount > 0 && (
                  <span className="text-sm text-[#6e8078] line-through tabular">
                    ₹{activeProduct.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              
              <p className="text-[13px] text-[#6e8078] dark:text-[#a0b0aa] leading-relaxed mb-6 font-medium">
                {activeProduct.description}
              </p>
              
              {/* Trust Indicators */}
              <div className="p-4 bg-[#0b6455]/5 dark:bg-[#0b6455]/10 border border-[#0b6455]/10 rounded-[12px] mb-8 text-left">
                <h4 className="text-[10px] font-bold text-[#0b6455] dark:text-[#14a090] uppercase tracking-widest mb-1.5 font-mono">
                  Sacred Ritual & Blessing
                </h4>
                <p className="text-[11px] text-[#3d4e49] dark:text-[#a8b8b2] leading-relaxed">
                  Cleansed under running spring water, smudged with white sage, and energized under moonlight. Place this crystal in the east corner of your workspace to invite maximum wealth flow.
                </p>
              </div>
              
              {/* CTA buttons */}
              <div className="flex gap-4 mt-auto">
                <button
                  onClick={() => {
                    handleToggleCart(activeProduct.name);
                    setActiveProduct(null);
                  }}
                  className={`flex-1 btn py-4 text-xs font-mono uppercase tracking-wider ${
                    cartItems.find(item => item.name === activeProduct.name)
                      ? 'bg-[#b84030] text-white hover:bg-[#b84030]/90 shadow-inner'
                      : 'btn-gold'
                  }`}
                >
                  {cartItems.find(item => item.name === activeProduct.name) ? 'Remove from Bag' : 'Add to Bag'}
                </button>
                <button
                  onClick={() => toggleWishlist(activeProduct.name)}
                  className="w-14 h-14 shrink-0 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 transition-all group"
                  aria-label="Add to Wishlist"
                >
                  <svg 
                    width="18" height="18" 
                    viewBox="0 0 24 24" 
                    className={`transition-all duration-300 ${wishlist.includes(activeProduct.name) ? 'fill-[#b84030] stroke-[#b84030] scale-110' : 'stroke-[#080c0b] dark:stroke-white fill-none group-hover:stroke-[#b84030]'}`} 
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
