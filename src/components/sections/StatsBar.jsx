import React from 'react';
import { useCountUp } from '../../hooks/useCountUp';

const STATS = [
  { value: 500, suffix: '+', label: 'Clients Served',    sub: 'Across India & worldwide',   icon: '✦' },
  { value: 12,  suffix: '+', label: 'Years of Practice', sub: 'Vastu & crystal expertise',   icon: '◈' },
  { value: 4.9, suffix: '',  label: 'Average Rating',    sub: 'Verified client reviews',     icon: '★' },
  { value: 8,   suffix: '',  label: 'Vastu Directions',  sub: 'Comprehensively mapped',      icon: '◆' },
];

const Stat = ({ value, suffix, label, sub, icon, index }) => {
  const ref = useCountUp(value, 1800, suffix);

  const handleMouseMove = (e) => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const xc = ((e.clientX - rect.left) / rect.width - 0.5);
    const yc = ((e.clientY - rect.top) / rect.height - 0.5);
    el.style.transform = `perspective(600px) rotateX(${-yc * 14}deg) rotateY(${xc * 14}deg) scale3d(1.04,1.04,1.04)`;
    el.style.transition = 'transform 0.08s ease';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    e.currentTarget.style.transition = 'transform 0.5s var(--ease-out)';
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="reveal flex flex-col items-center text-center px-4 py-6 group relative"
      style={{
        transitionDelay: `${index * 80}ms`,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {/* Floating ambient glow behind each stat */}
      <div
        className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 100%, rgba(200,146,42,0.08), transparent)',
          transform: 'translateZ(-10px)',
        }}
      />

      {/* Icon marker */}
      <span
        className="text-[var(--gold-vivid)] text-[10px] font-bold mb-3 opacity-40 group-hover:opacity-80 transition-opacity duration-300"
        style={{ transform: 'translateZ(20px)' }}
      >
        {icon}
      </span>

      {/* Animated number */}
      <span
        ref={ref}
        className="font-display text-[clamp(2.6rem,5vw,4rem)] font-black leading-none text-[var(--gold-vivid)] tabular"
        aria-label={`${value}${suffix} ${label}`}
        style={{ transform: 'translateZ(35px)' }}
      >
        0{suffix}
      </span>

      {/* Label */}
      <span
        className="mt-2 font-semibold text-white text-[15px] leading-tight"
        style={{ transform: 'translateZ(25px)' }}
      >
        {label}
      </span>

      {/* Subtitle */}
      <span
        className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/35"
        style={{ transform: 'translateZ(15px)' }}
      >
        {sub}
      </span>

      {/* Bottom accent line */}
      <div
        className="mt-4 h-px w-10 bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ transform: 'translateZ(10px)' }}
      />
    </div>
  );
};

const StatsBar = () => (
  <section className="relative overflow-hidden bg-[#060a09] border-y border-white/[0.06] py-16">
    {/* Atmospheric orbs */}
    <div
      className="glow-orb glow-orb--jade animate-orb-drift"
      style={{ width: 500, height: 500, top: '-60%', left: '-8%', opacity: 0.14 }}
    />
    <div
      className="glow-orb glow-orb--gold"
      style={{ width: 400, height: 400, bottom: '-50%', right: '-5%', opacity: 0.10, filter: 'blur(80px)' }}
    />

    {/* Noise */}
    <div className="noise" />

    <div className="section-shell relative z-10">
      {/* Header */}
      <div className="text-center mb-12 reveal">
        <span className="eyebrow eyebrow--gold eyebrow--no-line text-xs mb-3 inline-flex justify-center">
          By The Numbers
        </span>
        <p className="font-display text-2xl font-bold text-white/80">
          Trusted by hundreds of<br />
          <em className="text-shimmer not-italic">homes &amp; businesses.</em>
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
        {STATS.map((stat, i) => (
          <React.Fragment key={stat.label}>
            <Stat {...stat} index={i} />
            {i < STATS.length - 1 && (
              <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-white/10 to-transparent self-center h-16" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Bottom marquee ticker */}
      <div className="mt-14 pt-10 border-t border-white/[0.06] overflow-hidden marquee-wrapper">
        <div className="marquee-track gap-10">
          {[...Array(2)].map((_, gi) =>
            ['Vastu Shastra', 'Crystal Healing', 'Angel Guidance', 'Rune Reading', 'Numerology', 'Feng Shui', 'Switch-Word', 'Cartomancy', 'Aura Scanning', 'Tarot Reading'].map((item, i) => (
              <span key={`${gi}-${i}`} className="flex items-center gap-4 flex-shrink-0 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/25">
                <span className="text-[var(--gold-vivid)] opacity-40">&bull;</span>
                {item}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  </section>
);

export default StatsBar;


