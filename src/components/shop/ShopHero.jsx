import React from 'react';

const ShopHero = () => {
  const tickerItems = [
    { text: "✨ 100% Certified Energized Crystals", icon: "✨" },
    { text: "⚡ Free Shipping Across India", icon: "⚡" },
    { text: "☸️ Complimentary Sage Cleansing", icon: "☸️" },
    { text: "🔮 1-on-1 Vastu Consulting Available", icon: "🔮" },
    { text: "💎 Premium Handpicked Quality", icon: "💎" }
  ];

  // Double items for infinite marquee loop
  const doubleTickerItems = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#080c0b] via-[#0e1311] to-[#080c0b] text-white pt-24 pb-20 border-b border-[#f2b84b]/10">
      {/* Cinematic Glowing Background Orbs */}
      <div className="absolute top-0 left-1/4 w-[450px] h-[450px] bg-[#0b6455]/15 rounded-full blur-[140px] pointer-events-none mix-blend-screen animate-orb-drift" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-[#c8922a]/10 rounded-full blur-[140px] pointer-events-none mix-blend-screen animate-orb-drift [animation-delay:4s]" />
      
      {/* Noise overlay */}
      <div className="noise" />

      <div className="section-shell relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="animate-scale-in" style={{ animationDelay: '100ms' }}>
            <span className="eyebrow eyebrow--gold mb-6 inline-flex uppercase text-xs tracking-[0.25em] font-mono">
              The Divine Living Collection
            </span>
          </div>
          
          <h1 className="animate-slide-in-up font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-8" style={{ animationDelay: '200ms' }}>
            <span className="block text-white/95 text-balance">Metaphysical</span>
            <span className="block text-shimmer">Crystals & Remedies</span>
          </h1>
          
          <p className="animate-slide-in-up mt-2 text-[#a0b0aa] max-w-2xl text-base md:text-lg leading-relaxed font-body text-balance" style={{ animationDelay: '300ms' }}>
            Every piece is handpicked, individually authenticated, and ritually cleansed by master practitioners to align spatial frequencies with your home's destiny.
          </p>
          
          <div className="animate-slide-in-up mt-10 flex flex-wrap justify-center gap-4" style={{ animationDelay: '400ms' }}>
            <a href="#collection" className="btn btn-gold px-8 py-4 font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-gold hover:-translate-y-0.5 transition-all">
              Explore Collection
            </a>
            <a href="/consult" className="btn btn-glass px-8 py-4 font-bold text-xs uppercase tracking-wider flex items-center gap-3 border border-white/10 hover:bg-white/5 transition-all">
              <span className="w-2 h-2 rounded-full bg-[#14a090] animate-pulse"></span>
              Book Vastu Consultation
            </a>
          </div>
        </div>
      </div>
      
      {/* Infinite Scrolling Trust Banner */}
      <div className="absolute bottom-0 inset-x-0 bg-black/40 border-t border-b border-white/5 py-3.5 marquee-wrapper overflow-hidden backdrop-blur-sm z-10">
        <div className="marquee-track flex gap-12 whitespace-nowrap">
          {doubleTickerItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 text-[11px] font-mono font-bold tracking-widest text-[#a8b8b2] uppercase mx-4">
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopHero;

