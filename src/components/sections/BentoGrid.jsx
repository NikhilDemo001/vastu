import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// 3D tilt effect on mouse move
const useTilt = () => {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    el.style.transform = `perspective(1200px) rotateX(${y}deg) rotateY(${x}deg) scale(1.02)`;
    el.style.transition = 'transform 0.05s ease';
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) scale(1)';
    el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
  };

  return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
};

// Individual bento card
const BentoCard = ({ item, index }) => {
  const tilt = useTilt();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={() => { tilt.onMouseLeave(); setHovered(false); }}
      onMouseEnter={() => setHovered(true)}
      className={`reveal relative overflow-hidden rounded-[22px] ${item.span} border border-[var(--border)] group`}
      style={{
        minHeight: item.minH,
        transitionDelay: `${index * 60}ms`,
        willChange: 'transform',
      }}
    >
      {/* Background */}
      <div className={`absolute inset-0 ${item.bg}`} />

      {/* Image overlay */}
      {item.image && (
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center transition-all duration-700 group-hover:opacity-30 group-hover:scale-105"
          style={{ backgroundImage: `url(${item.image})` }}
        />
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
      <div
        className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      {/* Shine effect on hover */}
      <div
        className={`absolute -inset-full rotate-12 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transition-all duration-700 ${
          hovered ? 'translate-x-full' : '-translate-x-full'
        }`}
      />

      {/* Gold border glow on hover */}
      <div
        className="absolute inset-0 rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(200,146,42,0.35)' }}
      />

      {/* Decoration icon/pattern */}
      {item.decoration && (
        <div className="absolute top-5 right-5 opacity-[0.06] group-hover:opacity-[0.10] transition-opacity">
          {item.decoration}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end p-7 lg:p-8">
        {item.icon && <div className="mb-6">{item.icon}</div>}

        <div>
          <span
            className="mb-3 inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border"
            style={{
              color: item.dark ? (item.accent || 'var(--gold-vivid)') : 'var(--jade)',
              borderColor: item.dark
                ? (item.accent ? `${item.accent}30` : 'rgba(200,146,42,0.22)')
                : 'rgba(11,100,85,0.25)',
              background: item.dark
                ? (item.accent ? `${item.accent}10` : 'rgba(200,146,42,0.07)')
                : 'rgba(11,100,85,0.07)',
            }}
          >
            {item.tag}
          </span>

          <h3
            className="font-display text-2xl lg:text-3xl font-bold leading-tight mb-3"
            style={{ color: item.dark ? 'white' : 'var(--text-primary)' }}
          >
            {item.title}
          </h3>

          <p
            className="text-sm leading-relaxed mb-5 max-w-sm"
            style={{ color: item.dark ? 'rgba(255,255,255,0.5)' : 'var(--text-secondary)' }}
          >
            {item.body}
          </p>

          <Link
            to={item.link}
            className="inline-flex items-center gap-1.5 text-sm font-bold transition-all group-hover:gap-2.5"
            style={{ color: item.dark ? (item.accent || 'var(--gold-vivid)') : 'var(--jade)' }}
          >
            {item.linkLabel}
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

const BENTO_ITEMS = [
  {
    id: 'crystals',
    span: 'col-span-12 lg:col-span-12',
    minH: '360px',
    bg: 'bg-gradient-to-br from-[#151f1c] to-[#0b1a16]',
    tag: 'Crystal Healing',
    title: 'Premium Crystal Catalog',
    body: '200+ handpicked crystals, malas, and metaphysical tools — real INR pricing with specialist energetic annotations.',
    link: '/shop',
    linkLabel: 'Browse Shop',
    dark: true,
    accent: 'var(--jade-light)',
    icon: (
      <div className="flex gap-3">
        {['#8b5cf6', '#06b6d4', '#f59e0b', '#10b981'].map((c, i) => (
          <div
            key={i}
            className="h-9 w-9 rounded-full shadow-lg animate-float"
            style={{ background: c, opacity: 0.8, animationDelay: `${i * 0.6}s`, animationDuration: `${5 + i}s` }}
          />
        ))}
      </div>
    ),
  },
  {
    id: 'aura',
    span: 'col-span-12 md:col-span-6 lg:col-span-6',
    minH: '340px',
    bg: 'bg-gradient-to-br from-[#1a0f08] to-[#120a06]',
    tag: 'Energy Diagnostic',
    title: 'Aura Scanner',
    body: 'AI-guided compatibility scoring for your entrance direction with instant crystal recommendations.',
    link: '/#scanner',
    linkLabel: 'Scan Now',
    dark: true,
    accent: 'var(--gold-vivid)',
  },
  {
    id: 'consult',
    span: 'col-span-12 md:col-span-6 lg:col-span-6',
    minH: '340px',
    bg: 'bg-[var(--paper-warm)]',
    tag: 'Personal Sessions',
    title: 'Consultation Services',
    body: 'From Tarot to full Vastu audits — room-by-room expert guidance for your exact space and life goals.',
    link: '/services',
    linkLabel: 'View Services',
    dark: false,
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
  },
];

const BentoGrid = () => (
  <section className="py-28">
    <div className="section-shell">
      {/* Header */}
      <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="eyebrow mb-4 reveal">Studio Ecosystem</span>
          <h2 className="text-display-xl reveal delay-1">
            Everything you need<br />
            <em className="text-gradient not-italic">in one atelier.</em>
          </h2>
        </div>
        <p className="max-w-xs text-[var(--text-secondary)] leading-7 text-[15px] reveal reveal-right delay-2">
          From personalized Vastu audits to handpicked spiritual products — a complete ecosystem built for transformation.
        </p>
      </div>

      {/* Bento grid */}
      <div className="bento-grid" style={{ gridAutoRows: 'auto' }}>
        {BENTO_ITEMS.map((item, i) => (
          <BentoCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default BentoGrid;
