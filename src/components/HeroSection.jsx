import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// ─── Canvas Particle System ───────────────────────────────────
const PARTICLE_COUNT = 90;

const createParticle = (w, h) => ({
  x: Math.random() * w,
  y: Math.random() * h,
  r: Math.random() * 1.4 + 0.3,
  vx: (Math.random() - 0.5) * 0.28,
  vy: (Math.random() - 0.5) * 0.28,
  alpha: Math.random() * 0.5 + 0.15,
  hue: Math.random() > 0.7 ? 165 : 38, // jade or gold
});

const useParticleCanvas = () => {
  const canvasRef = useRef(null);
  const stateRef = useRef({ particles: [], raf: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const s = stateRef.current;

    const init = () => {
      canvas.width = canvas.offsetWidth * Math.min(window.devicePixelRatio, 2);
      canvas.height = canvas.offsetHeight * Math.min(window.devicePixelRatio, 2);
      ctx.scale(Math.min(window.devicePixelRatio, 2), Math.min(window.devicePixelRatio, 2));
      s.particles = Array.from({ length: PARTICLE_COUNT }, () =>
        createParticle(canvas.offsetWidth, canvas.offsetHeight)
      );
    };

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      s.particles.forEach((p) => {
        p.x = (p.x + p.vx + W) % W;
        p.y = (p.y + p.vy + H) % H;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.hue === 38
          ? `rgba(200, 146, 42, ${p.alpha})`
          : `rgba(20, 160, 144, ${p.alpha * 0.7})`;
        ctx.fill();
      });

      // Connection lines — low opacity, only nearby
      for (let i = 0; i < s.particles.length; i++) {
        for (let j = i + 1; j < s.particles.length; j++) {
          const p = s.particles[i];
          const q = s.particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(200, 146, 42, ${0.04 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      s.raf = requestAnimationFrame(draw);
    };

    init();
    draw();

    const ro = new ResizeObserver(init);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(s.raf);
      ro.disconnect();
    };
  }, []);

  return canvasRef;
};

// ─── Floating Hero Badge ──────────────────────────────────────
const HeroBadge = ({ value, label, delay = 0 }) => (
  <div
    className="flex flex-col items-center gap-1 px-5 py-3.5 rounded-[16px] border border-white/10 bg-white/5 backdrop-blur-xl"
    style={{ animationDelay: `${delay}ms` }}
  >
    <span className="font-display text-2xl font-bold text-white leading-none tabular">{value}</span>
    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">{label}</span>
  </div>
);

// ─── Hero Section ─────────────────────────────────────────────
const HeroSection = () => {
  const canvasRef = useParticleCanvas();
  const [scrollY, setScrollY] = useState(0);
  const [activeZone, setActiveZone] = useState('N');

  const ZONE_DATA = {
    N: {
      title: 'North entrance',
      action: 'energises wealth.',
      code: 'N',
      label: 'NORTH',
      description: "Keep the entry well-lit, uncluttered, and welcoming. It's where movement, light and daily intention converge to invite prosperity.",
    },
    E: {
      title: 'East entrance',
      action: 'boosts health.',
      code: 'E',
      label: 'EAST',
      description: "Open windows in the morning to let fresh energy flow. It welcomes ancestral blessings, pristine health, and continuous positivity.",
    },
    SE: {
      title: 'Southeast zone',
      action: 'ignites active drive.',
      code: 'SE',
      label: 'SOUTH EAST',
      description: "The kitchen fire node of Vastu. Positioning stove and hot appliances here triggers elemental drive, cooking power, and financial metabolism.",
    },
    SW: {
      title: 'Southwest zone',
      action: 'locks grounding.',
      code: 'SW',
      label: 'SOUTH WEST',
      description: "The earth heavy corner, ideal for master bedrooms. Use heavier furniture and solid textures here to anchor commitment and relational safety.",
    },
  };

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Parallax offset
  const parallax = scrollY * 0.3;

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#060a09]">

      {/* ── Canvas Particle Background ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ transform: `translateY(${parallax * 0.4}px)` }}
        aria-hidden="true"
      />

      {/* ── Layered Gradient Atmospheres ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-10%,rgba(11,100,85,0.3),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_85%_80%,rgba(200,146,42,0.14),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_15%_70%,rgba(11,100,85,0.12),transparent)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#060a09]/60 via-transparent to-[#060a09]/95" />

      {/* ── Noise Texture ── */}
      <div className="noise" />

      {/* ── Floating Ambient Orbs (slow drift) ── */}
      <div
        className="glow-orb glow-orb--jade animate-orb-drift"
        style={{ width: 600, height: 600, top: '-20%', left: '-10%', opacity: 0.18 }}
      />
      <div
        className="glow-orb glow-orb--gold animate-orb-drift"
        style={{ width: 500, height: 500, bottom: '-15%', right: '-8%', opacity: 0.12, animationDelay: '-4s' }}
      />
      <div
        className="glow-orb glow-orb--jade"
        style={{ width: 300, height: 300, top: '40%', right: '20%', opacity: 0.08, filter: 'blur(60px)' }}
      />

      {/* ── Decorative Grid ── */}
      <div
        className="absolute inset-0 grid-bg"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,252,248,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,252,248,0.025) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* ── Bottom Fade to page bg ── */}
      <div
        className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[var(--paper)] to-transparent pointer-events-none"
        style={{ transform: `translateY(${-parallax * 0.1}px)` }}
      />

      {/* ════════════════════════════════════════════
          MAIN CONTENT
      ════════════════════════════════════════════ */}
      <div
        className="section-shell relative z-10 w-full py-[clamp(3.5rem,8vh,9rem)] lg:py-[clamp(6rem,12vh,10rem)]"
        style={{ transform: `translateY(${-parallax * 0.12}px)` }}
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">

          {/* ── LEFT: Headlines & CTA ── */}
          <div>
            {/* Pill label */}
            <div
              className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl animate-slide-in-up"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping-soft absolute inline-flex h-full w-full rounded-full bg-[var(--gold-vivid)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--gold-vivid)]" />
              </span>
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white/65">
                Vastu · Crystals · Spiritual Commerce
              </span>
            </div>

            {/* Main headline */}
            <h1
              className="text-display-hero text-white mb-7 animate-slide-in-up"
              style={{ animationDelay: '80ms' }}
            >
              Design spaces<br />
              <span className="text-shimmer font-display italic">that feel calm,</span><br />
              prosperous
              <span
                className="inline-block w-[3px] h-[0.85em] bg-[var(--gold-vivid)] ml-2 align-middle rounded-sm animate-blink"
                aria-hidden="true"
              />
            </h1>

            {/* Subheadline */}
            <p
              className="mb-10 max-w-lg text-lg leading-8 text-white/55 animate-slide-in-up"
              style={{ animationDelay: '160ms' }}
            >
              Ancient Vastu Shastra meets premium crystal healing and modern spatial design — for homes and offices that align your energy with your deepest intentions.
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col gap-3 sm:flex-row sm:items-center animate-slide-in-up"
              style={{ animationDelay: '240ms' }}
            >
              <Link to="/consult" className="btn btn-gold text-base">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Consultation
              </Link>

              <a
                href="https://wa.me/917319178910?text=Hi! I'd like to know more about your services."
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp text-base"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.146 17.969a9.83 9.83 0 01-5.143 1.449c-1.691 0-3.36-.448-4.825-1.297l-3.373.884.904-3.291A9.794 9.794 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10a9.83 9.83 0 01-3.854 7.969z"/>
                </svg>
                WhatsApp Us
              </a>

              <Link to="/shop" className="btn btn-glass">
                Browse Shop
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Trust pills */}
            <div
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 animate-slide-in-up"
              style={{ animationDelay: '320ms' }}
            >
              {[
                { icon: '✦', text: 'Certified Vastu Experts' },
                { icon: '★', text: '5.0 Client Rating' },
                { icon: '◆', text: '500+ Consultations' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <span className="text-[var(--gold-vivid)] text-xs">{icon}</span>
                  <span className="text-sm font-medium text-white/50">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Glassmorphic Dashboard Panel ── */}
          <aside
            className="flex flex-col gap-4 animate-slide-in-up"
            style={{ animationDelay: '200ms' }}
          >
            {/* Main info card */}
            <div className="card-glass rounded-[22px] p-6 border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                <div>
                  <span className="eyebrow eyebrow--gold eyebrow--no-line mb-2 block text-xs">
                    Today's Energy Zone
                  </span>
                  <h2 className="font-display text-2xl sm:text-[26px] font-bold text-white leading-[1.25]">
                    {ZONE_DATA[activeZone].title}<br />
                    <span className="text-shimmer font-display italic">{ZONE_DATA[activeZone].action}</span>
                  </h2>
                </div>
                <div className="flex-shrink-0 rounded-[12px] border border-[var(--gold)]/20 bg-[var(--gold)]/8 px-3 py-2 text-center w-[74px] h-[52px] flex flex-col justify-center items-center self-start sm:self-auto">
                  <p className="font-mono text-base font-bold text-[var(--gold)] leading-none">{ZONE_DATA[activeZone].code}</p>
                  <p className="font-mono text-[8px] text-white/40 tracking-wider uppercase mt-1 leading-none whitespace-nowrap">{ZONE_DATA[activeZone].label}</p>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-white/50 mb-5 min-h-[48px]">
                {ZONE_DATA[activeZone].description}
              </p>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-5" />

              {/* Zone grid */}
              <div className="grid grid-cols-4 gap-2">
                {[['N','Wealth'],['E','Health'],['SE','Fire'],['SW','Grounding']].map(([dir, label]) => {
                  const isActive = activeZone === dir;
                  return (
                    <button
                      key={dir}
                      type="button"
                      onClick={() => setActiveZone(dir)}
                      className={`rounded-[10px] border p-2.5 text-center transition-all cursor-pointer ${
                        isActive
                          ? 'border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold-vivid)] shadow-md scale-105'
                          : 'border-white/8 bg-white/4 text-white hover:border-[var(--gold)]/30 hover:bg-[var(--gold)]/5 hover:scale-102'
                      }`}
                    >
                      <p className="font-display text-sm font-bold transition-colors">{dir}</p>
                      <p className={`font-mono text-[8px] uppercase tracking-wider mt-0.5 transition-colors ${isActive ? 'text-[var(--gold-light)]' : 'text-white/35'}`}>{label}</p>
                    </button>
                  );
                })}
              </div>

              {/* Scanner redirect CTA */}
              <a
                href="#scanner"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('scanner')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-5 flex items-center justify-between text-xs font-mono uppercase tracking-wider font-semibold text-[var(--gold-vivid)] hover:text-[var(--gold-light)] transition-colors group"
              >
                <span>Explore all 8 directions</span>
                <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              <HeroBadge value="8" label="Directions" delay={300} />
              <HeroBadge value="500+" label="Clients" delay={360} />
              <HeroBadge value="24h" label="Response" delay={420} />
            </div>

            {/* Services quick links */}
            <div className="grid grid-cols-2 gap-3">
              {['Tarot Reading', 'Crystal Healing', 'Vastu Audit', 'Numerology'].map((s, i) => (
                <Link
                  key={s}
                  to="/services"
                  className="group rounded-[14px] border border-white/8 bg-white/4 px-4 py-3.5 backdrop-blur-sm hover:border-[var(--jade)]/30 hover:bg-[var(--jade)]/5 transition-all"
                  style={{ animationDelay: `${i * 60 + 400}ms` }}
                >
                  <p className="font-mono text-[9px] uppercase tracking-widest text-[var(--jade)] mb-1 opacity-70">Service</p>
                  <p className="font-semibold text-sm text-white group-hover:text-[var(--jade-light)] transition-colors leading-tight">{s}</p>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/35">Scroll</span>
        <div className="relative h-10 w-5 rounded-full border border-white/15 flex items-start justify-center pt-1.5">
          <div className="h-2.5 w-[3px] rounded-full bg-[var(--gold)] animate-scroll-dot" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
