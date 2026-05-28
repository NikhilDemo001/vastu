import React from 'react';
import { Link } from 'react-router-dom';
import { servicePackages } from '../data/catalog';
import { useScrollReveal } from '../hooks/useScrollReveal';

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

      {/* ─── SERVICE PACKAGES ─── */}
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

          <div className="grid gap-6 md:grid-cols-2">
            {servicePackages.map((service, index) => {
              const isPopular = index === 2;
              return (
                <article
                  key={service.title}
                  className={`reveal card-tilt rounded-[20px] border p-8 relative overflow-hidden transition-all duration-300 ${
                    isPopular
                      ? 'ink-panel border-[var(--gold)]/30 shadow-[0_0_60px_rgba(201,150,58,0.12)]'
                      : 'card-surface hover:border-[var(--border-gold)]'
                  }`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  {/* Popular Badge */}
                  {isPopular && (
                    <span className="absolute top-5 right-5 font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-[var(--gold)]/15 text-[var(--gold)] border border-[var(--gold)]/30">
                      Most Popular
                    </span>
                  )}

                  {/* Background glow for popular */}
                  {isPopular && (
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--gold)]/5 rounded-full blur-3xl pointer-events-none" />
                  )}

                  <div className="relative z-10">
                    <span className={`eyebrow block mb-3 ${isPopular ? 'eyebrow--gold' : ''}`}>
                      {service.eyebrow}
                    </span>

                    <div className="flex items-start justify-between gap-4 mb-4">
                      <h3 className={`font-display text-3xl font-bold leading-tight ${isPopular ? 'text-white' : 'text-[var(--text-primary)]'}`}>
                        {service.title}
                      </h3>
                      <span className={`flex-shrink-0 rounded-[10px] px-4 py-2 font-display text-xl font-bold ${
                        isPopular
                          ? 'bg-[var(--gold)] text-[#0a0e0d]'
                          : 'bg-[var(--jade)]/10 text-[var(--jade)] border border-[var(--jade)]/20'
                      }`}>
                        {service.price}
                      </span>
                    </div>

                    <p className={`text-sm leading-relaxed mb-6 ${isPopular ? 'text-white/60' : 'text-[var(--text-secondary)]'}`}>
                      {service.description}
                    </p>

                    <div className="grid gap-2 mb-7">
                      {service.includes.map((item) => (
                        <div key={item} className={`flex items-start gap-3 rounded-[10px] border px-4 py-3 ${
                          isPopular
                            ? 'border-white/8 bg-white/5'
                            : 'border-[var(--border)] bg-[var(--surface-2)]'
                        }`}>
                          <CheckIcon dark={isPopular} />
                          <span className={`text-sm font-medium ${isPopular ? 'text-white/75' : 'text-[var(--text-primary)]'}`}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Link
                      to="/consult"
                      className={isPopular ? 'btn btn-gold w-full justify-center' : 'btn btn-outline w-full justify-center'}
                    >
                      {isPopular ? 'Book This Package' : 'Learn More'}
                    </Link>
                  </div>
                </article>
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
