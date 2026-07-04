import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { servicePackages } from '../data/catalog';
import { useScrollReveal } from '../hooks/useScrollReveal';

/* ── 3D tilt service card ── */
const ServiceCard3D = ({ children, index }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const shimmerRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const xc = (e.clientX - rect.left) / rect.width;
    const yc = (e.clientY - rect.top)  / rect.height;
    const rx = (yc - 0.5) * -12;
    const ry = (xc - 0.5) *  12;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px) scale3d(1.015,1.015,1.015)`;
    card.style.transition  = 'transform 0.08s ease';
    card.style.boxShadow   = `0 24px 60px rgba(200,146,42,0.12), 0 0 0 1px rgba(200,146,42,0.15)`;
    if (glow) {
      glow.style.background = `radial-gradient(ellipse 60% 60% at ${xc*100}% ${yc*100}%, rgba(200,146,42,0.07), transparent 70%)`;
      glow.style.opacity = '1';
    }
    if (shimmerRef.current) {
      shimmerRef.current.style.opacity = '1';
      shimmerRef.current.style.transform = `scaleX(${0.4 + xc * 0.6})`;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (card) {
      card.style.transform  = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1,1,1)';
      card.style.transition = 'transform 0.55s var(--ease-out), box-shadow 0.55s var(--ease-out)';
      card.style.boxShadow  = '0 16px 48px rgba(201,150,58,0.06)';
    }
    if (glow) glow.style.opacity = '0';
    if (shimmerRef.current) {
      shimmerRef.current.style.opacity = '0';
    }
  }, []);

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="reveal ink-panel border border-[var(--gold)]/30 rounded-[20px] shadow-[0_16px_48px_rgba(201,150,58,0.06)] relative overflow-hidden flex flex-col justify-between min-h-[580px]"
      style={{
        transitionDelay: `${index * 80}ms`,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        transition: 'transform 0.55s var(--ease-out), box-shadow 0.55s var(--ease-out)',
      }}
    >
      {/* Cursor-following inner glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none rounded-[20px] transition-opacity duration-200"
        style={{ opacity: 0 }}
      />
      {/* Top-edge neon shimmer */}
      <div
        ref={shimmerRef}
        className="absolute top-0 left-0 right-0 h-px pointer-events-none origin-left transition-all duration-150"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(200,146,42,0.6), transparent)',
          opacity: 0,
          transform: 'scaleX(0.4)',
          transformOrigin: 'left center',
          zIndex: 10,
        }}
      />
      {/* Glowing corner saffron blur */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--gold)]/[0.04] rounded-full blur-2xl pointer-events-none" />
      {children}
    </article>
  );
};

const journey = [
  ['01', 'Read the space', 'We identify directional strengths, blocked zones, and the daily movement pattern of energy.'],
  ['02', 'Set the intention', 'We connect the practical goal with the energetic priority: calm, prosperity, focus, or protection.'],
  ['03', 'Prescribe changes', 'You receive room-wise actions, product pairings, and styling moves that feel doable and clear.'],
  ['04', 'Refine the ritual', 'We help you turn the space into a maintainable daily practice, not a one-time makeover.'],
];

const CheckIcon = ({ dark }) => (
  <svg
    className={`w-4 h-4 flex-shrink-0 mt-0.5 ${dark ? 'text-[var(--gold)]' : 'text-[var(--jade)]'}`}
    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const serviceMetaphysicalData = {
  'Rudraksha Consultancy': {
    chakras: 'Heart & Third Eye 📿',
    focus: 'Astrological corrections, emotional balance & spiritual alignment.',
    deliverable: 'Detailed Rudraksha consultation report + custom energization guide.',
  },
  'Astrology & Ratna Guidance': {
    chakras: 'Crown & Solar Plexus 🪐',
    focus: 'Dasha analysis, planetary remedies & gemstone compatibility.',
    deliverable: '1-hour live session + 10-page horoscope & gemstone guidance PDF.',
  },
  'Crystals Grid Audit': {
    chakras: 'Solar Plexus & Heart ⛰️',
    focus: 'Spatial crystal grids, auric boundaries & chakra balancing.',
    deliverable: 'Full directional grid map overlay + live balancing call session.',
  },
  'Runes Casting': {
    chakras: 'Root & Throat 🛡️',
    focus: 'Ancestral blockages, decision bottlenecks & runic timeline mappings.',
    deliverable: '3-cast Elder Futhark casting session + runestone recommendations.',
  },
  'Mobile Numerology': {
    chakras: 'Throat & Throat 📱',
    focus: 'Communication success, client attraction & digit compatibility.',
    deliverable: 'Custom Mobile Numerology report + 3 recommended number grids.',
  },
  'Name Numerology': {
    chakras: 'Third Eye & Throat ✍️',
    focus: 'Identity resonance, career success & name vibration correction.',
    deliverable: 'Name spelling correction advice + custom signature layout.',
  },
  'Vastu Shastra Audit': {
    chakras: 'Earth Resonance & Solar 🏡',
    focus: 'Wealth gateways, relationship directions & structural remedies (0 demolition).',
    deliverable: 'Certified Vastu Acharya audit report + directional elemental maps.',
  },
  'Switch-Word remedy': {
    chakras: 'Throat & Third Eye 🗣️',
    focus: 'Subconscious manifestation, financial energy attraction & restful aura grids.',
    deliverable: 'Personalized switch-words prescription + subliminal chanting audio guide.',
  },
};

const ServicesPage = () => {
  useScrollReveal();

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative ink-panel overflow-hidden py-20 sm:py-28">
        <div className="glow-orb glow-orb--jade w-[500px] h-[500px] -top-40 -right-32 opacity-20" aria-hidden="true" />
        <div className="glow-orb glow-orb--gold w-[400px] h-[400px] -bottom-32 -left-20 opacity-15" aria-hidden="true" />

        <div className="section-shell relative z-10">
          <div className="max-w-4xl">
            <span className="eyebrow eyebrow--gold block mb-4 reveal">Services</span>
            <h1 className="text-display-xl text-white reveal delay-1">
              Spiritual guidance<br />
              <em className="text-shimmer not-italic">for life &amp; space.</em>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60 reveal delay-2">
              A premium consultation experience combining angelic guidance, crystal healing, rune reading, numerology, Vastu, and more — tailored entirely to you.
            </p>
            <div className="flex flex-wrap gap-4 mt-8 reveal delay-3">
              <Link to="/consult" className="btn btn-gold">Book Consultation</Link>
              <a
                href="https://wa.me/917319178910"
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-24">
        <div className="section-shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <span className="eyebrow block mb-3 reveal">Method</span>
            <h2 className="text-display-lg reveal delay-1">
              A consultation should feel<br />
              <em className="text-gradient not-italic">calm &amp; actionable.</em>
            </h2>
            <p className="mt-5 leading-8 text-[var(--text-secondary)] reveal delay-2">
              We frame the process like a studio brief: discover, align, prescribe, and refine — so you never leave feeling overwhelmed.
            </p>
            <Link to="/consult" className="btn btn-gold mt-8 inline-flex reveal delay-3">
              Begin Consultation
            </Link>
          </div>

          <div className="grid gap-4">
            {journey.map(([number, title, body], index) => (
              <article
                key={title}
                className="reveal card-surface rounded-[16px] p-6 flex gap-5 items-start group hover:border-[var(--gold)]/30 transition-all duration-300"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <span className="font-display text-4xl font-bold text-[var(--gold)]/25 group-hover:text-[var(--gold)]/50 transition-colors flex-shrink-0 w-14 text-right leading-none pt-1">
                  {number}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-2">{title}</h3>
                  <p className="text-sm leading-7 text-[var(--text-secondary)]">{body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICE PACKAGES (COHESIVE DEEP INK-PANEL) ─── */}
      <section className="py-24 bg-[var(--paper-warm)]">
        <div className="section-shell">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <span className="eyebrow block mb-3 reveal">Signature Packages</span>
              <h2 className="text-display-lg reveal delay-1">
                Choose the depth<br />
                <em className="text-gradient not-italic">of your guidance.</em>
              </h2>
            </div>
            <Link to="/shop" className="btn btn-outline reveal reveal-right delay-2">
              Pair With Products →
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {servicePackages.map((service, index) => {
              const meta = serviceMetaphysicalData[service.title] || {
                chakras: 'General Aura Alignment ✨',
                focus: 'Energetic shielding & spatial alignment.',
                deliverable: 'Custom live audit call session.',
              };

              return (
                <ServiceCard3D key={service.title} index={index}>
                  <div className="p-8 space-y-5" style={{ transformStyle: 'preserve-3d' }}>
                    {/* Header: Eyebrow and Tag — z-depth 8 */}
                    <div
                      className="flex justify-between items-center"
                      style={{ transform: 'translateZ(8px)' }}
                    >
                      <span className="eyebrow eyebrow--gold block text-xs tracking-widest font-mono">
                        {service.eyebrow}
                      </span>
                      <span className="text-[10px] font-mono uppercase bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/30 rounded-full px-2.5 py-0.5">
                        Active Package
                      </span>
                    </div>

                    {/* Title & Price — price badge floats highest z-depth 30 */}
                    <div
                      className="flex items-start justify-between gap-4"
                      style={{ transform: 'translateZ(14px)' }}
                    >
                      <h3 className="font-display text-3xl font-extrabold text-white leading-tight">
                        {service.title}
                      </h3>
                      <span
                        className="flex-shrink-0 rounded-[10px] px-4 py-2 font-display text-lg font-bold bg-[var(--gold)] text-[#0a0e0d] shadow-sm"
                        style={{
                          transform: 'translateZ(20px)',
                          boxShadow: '0 8px 24px rgba(200,146,42,0.25)',
                        }}
                      >
                        {service.price}
                      </span>
                    </div>

                    {/* Description — z-depth 10 */}
                    <p
                      className="text-xs sm:text-sm leading-relaxed text-white/70"
                      style={{ transform: 'translateZ(10px)' }}
                    >
                      {service.description}
                    </p>

                    {/* Metaphysical Alignment Details — z-depth 12 */}
                    <div
                      className="p-4 rounded-xl border border-white/5 bg-white/[0.02] space-y-2.5"
                      style={{ transform: 'translateZ(12px)' }}
                    >
                      <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-widest text-[#f2b84b] border-b border-white/5 pb-1">
                        <span>Energy Alignment</span>
                        <span>Diagnostics</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="block text-slate-400 text-[10px] uppercase">Aligned Chakras</span>
                          <strong className="text-white font-semibold">{meta.chakras}</strong>
                        </div>
                        <div>
                          <span className="block text-slate-400 text-[10px] uppercase">Session Focus</span>
                          <strong className="text-white font-semibold leading-normal block">{meta.focus}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Inclusions checklist — z-depth 16 */}
                    <div
                      className="space-y-2 pt-1"
                      style={{ transform: 'translateZ(16px)' }}
                    >
                      <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-400">Included in Session</span>
                      <div className="grid gap-2">
                        {service.includes.map((item) => (
                          <div
                            key={item}
                            className="flex items-center gap-3 rounded-[10px] border border-white/8 bg-white/5 px-4 py-2"
                          >
                            <CheckIcon dark={true} />
                            <span className="text-xs sm:text-sm font-semibold text-white/90">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Direct Booking CTA — z-depth 18 */}
                  <div
                    className="px-8 pb-8 pt-0"
                    style={{ transform: 'translateZ(18px)' }}
                  >
                    <Link
                      to="/consult"
                      className="btn btn-gold w-full justify-center text-center font-bold"
                    >
                      Book Consultation Session ➔
                    </Link>
                  </div>
                </ServiceCard3D>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CONCIERGE CTA ─── */}
      <section className="py-24">
        <div className="section-shell">
          <div className="relative overflow-hidden rounded-[24px] ink-panel p-10 md:p-14 lg:grid lg:grid-cols-[1fr_0.7fr] gap-10 items-center">
            <div className="glow-orb glow-orb--gold w-80 h-80 -bottom-24 -right-24 opacity-20" />
            <div className="relative z-10">
              <span className="eyebrow eyebrow--gold block mb-4">Concierge Bundles</span>
              <h2 className="text-display-lg text-white mb-5">
                Service plus shop,<br />
                <em className="text-shimmer not-italic">curated together.</em>
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-8 max-w-xl">
                After your consultation, receive a personalized shopping shortlist — matched crystals, ritual tools, and spatial objects, picked specifically for your space and goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/consult" className="btn btn-gold">Request Guidance</Link>
                <Link to="/shop" className="btn btn-glass text-white">Browse Shop</Link>
              </div>
            </div>
            <div className="hidden lg:block rounded-[16px] overflow-hidden mt-8 lg:mt-0">
              <img
                src="https://images.unsplash.com/photo-1604014238170-4def1e4e6fcf?auto=format&fit=crop&w=800&q=80"
                alt="Curated ritual products"
                className="w-full h-72 object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
