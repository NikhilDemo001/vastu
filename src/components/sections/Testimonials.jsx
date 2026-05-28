import React, { useEffect, useRef, useState } from 'react';

const TESTIMONIALS = [
  {
    quote: "Our home felt stuck and heavy for months. After the Vastu audit, the energy completely transformed — lighter, more abundant. The crystal grid recommendation sealed it.",
    name: 'Priya Sharma',
    role: 'Homeowner · Delhi NCR',
    rating: 5,
    initial: 'P',
    color: 'from-[var(--gold)] to-[var(--jade)]',
  },
  {
    quote: "I was a skeptic. Our office now has 40% better productivity, client meetings feel smoother, and the atmosphere is noticeably calmer. The numerology session was a revelation.",
    name: 'Arvind Kapoor',
    role: 'Business Owner · Mumbai',
    rating: 5,
    initial: 'A',
    color: 'from-[var(--jade)] to-[#8b5cf6]',
  },
  {
    quote: "The angel card reading was deeply personal and precise. I left feeling seen, clear, and grounded in a way I hadn't felt in years. Remarkably transformative.",
    name: 'Meera Nair',
    role: 'Wellness Practitioner · Bangalore',
    rating: 5,
    initial: 'M',
    color: 'from-[#8b5cf6] to-[var(--gold)]',
  },
  {
    quote: "Bought the 7 Chakra Tree for my meditation corner. Exceptional quality — real stones, beautiful wire craft. Already noticing deeper focus and clarity during practice.",
    name: 'Rajan Gupta',
    role: 'Architect · Jaipur',
    rating: 5,
    initial: 'R',
    color: 'from-[var(--gold)] to-[var(--vermilion)]',
  },
];

const Stars = ({ n }) => (
  <div className="flex gap-1 mb-8">
    {Array.from({ length: n }, (_, i) => (
      <svg key={i} className="h-4 w-4 text-[var(--gold-vivid)] fill-current" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const go = (next) => {
    if (animating) return;
    setDirection(next > active ? 1 : -1);
    setAnimating(true);
    setTimeout(() => {
      setActive(next);
      setAnimating(false);
    }, 320);
  };

  const next = () => go((active + 1) % TESTIMONIALS.length);
  const prev = () => go((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  useEffect(() => {
    timerRef.current = setInterval(next, 5500);
    return () => clearInterval(timerRef.current);
  }, [active]);

  const resetTimer = (fn) => {
    clearInterval(timerRef.current);
    fn();
    timerRef.current = setInterval(next, 5500);
  };

  const t = TESTIMONIALS[active];

  return (
    <section className="relative overflow-hidden bg-[#060a09] py-28">
      {/* Orbs */}
      <div className="glow-orb glow-orb--jade" style={{ width: 700, height: 700, top: '-30%', left: '-15%', opacity: 0.09 }} />
      <div className="glow-orb glow-orb--gold" style={{ width: 500, height: 500, bottom: '-25%', right: '-10%', opacity: 0.08 }} />
      <div className="noise" />

      {/* Decorative rings */}
      <div className="absolute top-12 right-12 h-52 w-52 rounded-full border border-white/[0.04] animate-spin-slow hidden xl:block" />
      <div className="absolute top-20 right-20 h-36 w-36 rounded-full border border-[var(--gold)]/[0.06] animate-spin-reverse hidden xl:block" />

      <div className="section-shell--narrow relative z-10 text-center">
        <span className="eyebrow eyebrow--gold eyebrow--no-line mb-4 justify-center reveal">
          Client Stories
        </span>
        <h2 className="text-display-lg text-white mb-16 reveal delay-1">
          Spaces that have<br />
          <em className="text-shimmer not-italic">already transformed.</em>
        </h2>

        {/* Testimonial card */}
        <div
          className="card-glass rounded-[28px] border border-white/8 p-10 md:p-14"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? `translateX(${direction * 24}px)` : 'translateX(0)',
            transition: 'opacity 320ms ease, transform 320ms ease',
          }}
        >
          <Stars n={t.rating} />

          <blockquote className="font-quote text-xl md:text-2xl text-white leading-relaxed mb-10">
            &ldquo;{t.quote}&rdquo;
          </blockquote>

          <div className="flex items-center justify-center gap-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${t.color} font-display text-lg font-bold text-[#080c0b] shadow-lg`}>
              {t.initial}
            </div>
            <div className="text-left">
              <p className="font-semibold text-white text-sm">{t.name}</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/35 mt-0.5">{t.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-center gap-5">
          <button
            onClick={() => resetTimer(prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all duration-200"
            aria-label="Previous testimonial"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => resetTimer(() => go(i))}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-400 ${
                  active === i ? 'w-8 bg-[var(--gold-vivid)]' : 'w-1.5 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => resetTimer(next)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all duration-200"
            aria-label="Next testimonial"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
