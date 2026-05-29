import React, { useEffect, useRef } from 'react';

/* ── Floating crystal orb component ── */
const CrystalOrb = ({ size, color, blur, top, left, right, bottom, delay, duration, z }) => (
  <div
    aria-hidden="true"
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      top, left, right, bottom,
      background: `radial-gradient(circle at 35% 35%, ${color}, transparent 65%)`,
      filter: `blur(${blur}px)`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      animation: `float-3d ${duration}s ease-in-out ${delay}s infinite`,
      zIndex: z ?? 0,
    }}
  />
);

const ShopHero = () => {
  const heroRef = useRef(null);
  const layer1Ref = useRef(null);
  const layer2Ref = useRef(null);

  const tickerItems = [
    { text: "✨ 100% Certified Energized Crystals" },
    { text: "⚡ Free Shipping Across India" },
    { text: "☸️ Complimentary Sage Cleansing" },
    { text: "🔮 1-on-1 Vastu Consulting Available" },
    { text: "💎 Premium Handpicked Quality" },
  ];
  const doubleTickerItems = [...tickerItems, ...tickerItems, ...tickerItems];

  /* ── Scroll-reactive parallax on headline layers ── */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleScroll = () => {
      const rect = hero.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
      if (layer1Ref.current) {
        layer1Ref.current.style.transform = `translateY(${progress * -60}px)`;
      }
      if (layer2Ref.current) {
        layer2Ref.current.style.transform = `translateY(${progress * -30}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-gradient-to-b from-[#080c0b] via-[#0e1311] to-[#080c0b] text-white pt-24 pb-20 border-b border-[#f2b84b]/10"
    >
      {/* ── Floating crystal energy orbs ── */}
      <CrystalOrb size={420} color="rgba(11,100,85,0.22)"   blur={100} top="-5%"    left="5%"   delay={0}   duration={8}  z={0} />
      <CrystalOrb size={300} color="rgba(200,146,42,0.18)"  blur={80}  top="15%"   right="8%"  delay={2}   duration={10} z={0} />
      <CrystalOrb size={180} color="rgba(139,92,246,0.12)"  blur={50}  top="60%"   left="15%"  delay={4}   duration={7}  z={0} />
      <CrystalOrb size={260} color="rgba(11,100,85,0.14)"   blur={70}  bottom="5%" right="20%" delay={1.5} duration={9}  z={0} />
      <CrystalOrb size={120} color="rgba(200,146,42,0.20)"  blur={30}  top="30%"   left="40%"  delay={3}   duration={6}  z={0} />

      {/* ── Geometric depth lines (decorative) ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(200,146,42,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,146,42,0.015) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Noise overlay */}
      <div className="noise" />

      {/* ── Content — parallax depth layers ── */}
      <div className="section-shell relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">

          {/* Layer 1 — Eyebrow (slowest parallax) */}
          <div
            ref={layer1Ref}
            className="will-change-transform"
            style={{ transition: 'transform 0.05s linear' }}
          >
            <div className="animate-scale-in" style={{ animationDelay: '100ms' }}>
              <span className="eyebrow eyebrow--gold mb-6 inline-flex uppercase text-xs tracking-[0.25em] font-mono">
                The Divine Living Collection
              </span>
            </div>

            <h1
              className="animate-slide-in-up font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-8"
              style={{ animationDelay: '200ms' }}
            >
              <span
                className="block text-white/95 text-balance"
                style={{ textShadow: '0 0 80px rgba(200,146,42,0.12)' }}
              >
                Metaphysical
              </span>
              {/* Shimmer headline — floats highest */}
              <span
                className="block text-shimmer"
                style={{
                  filter: 'drop-shadow(0 0 30px rgba(200,146,42,0.3))',
                }}
              >
                Crystals &amp; Remedies
              </span>
            </h1>
          </div>

          {/* Layer 2 — Body (faster parallax) */}
          <div
            ref={layer2Ref}
            className="will-change-transform flex flex-col items-center"
            style={{ transition: 'transform 0.05s linear' }}
          >
            <p
              className="animate-slide-in-up mt-2 text-[#a0b0aa] max-w-2xl text-base md:text-lg leading-relaxed font-body text-balance"
              style={{ animationDelay: '300ms' }}
            >
              Every piece is handpicked, individually authenticated, and ritually cleansed by master
              practitioners to align spatial frequencies with your home's destiny.
            </p>

            <div
              className="animate-slide-in-up mt-10 flex flex-wrap justify-center gap-4"
              style={{ animationDelay: '400ms' }}
            >
              <a
                href="#collection"
                className="btn btn-gold px-8 py-4 font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-gold hover:-translate-y-0.5 transition-all"
              >
                Explore Collection
              </a>
              <a
                href="/consult"
                className="btn btn-glass px-8 py-4 font-bold text-xs uppercase tracking-wider flex items-center gap-3 border border-white/10 hover:bg-white/5 transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-[#14a090] animate-pulse" />
                Book Vastu Consultation
              </a>
            </div>

            {/* Floating badge row */}
            <div
              className="animate-slide-in-up mt-10 flex flex-wrap justify-center gap-3"
              style={{ animationDelay: '520ms' }}
            >
              {['Energized', 'Certified', 'Cleansed'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest border border-[var(--gold)]/20 text-[var(--gold)]/60 bg-[var(--gold)]/[0.04]"
                  style={{
                    boxShadow: '0 0 16px rgba(200,146,42,0.06)',
                    animation: `float-gentle 7s ease-in-out infinite`,
                    animationDelay: `${tag.length * 0.3}s`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
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
