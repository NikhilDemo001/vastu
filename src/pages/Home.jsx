import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import StatsBar from '../components/sections/StatsBar';
import BentoGrid from '../components/sections/BentoGrid';
import Testimonials from '../components/sections/Testimonials';
import ConsultationForm from '../components/ConsultationForm';
import AuraScanner from '../components/AuraScanner';
import { servicePackages, shopProducts } from '../data/catalog';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Home = () => {
  useScrollReveal();

  const featuredProducts = shopProducts.slice(0, 4);

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
              <article
                key={product.name}
                className="reveal product-card overflow-hidden rounded-[16px] border border-white/8 bg-white/5 backdrop-blur-md group"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {product.originalPrice && (
                    <div className="absolute top-3 left-3 bg-[var(--vermilion)] text-white text-xs font-bold px-2 py-1 rounded-full">
                      Sale
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--gold)] block mb-1">
                    {product.category}
                  </span>
                  <h3 className="font-display text-xl font-bold text-white leading-tight mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[var(--gold)] text-lg">₹{product.price.toLocaleString('en-IN')}</span>
                    {product.originalPrice && (
                      <span className="text-white/35 text-sm line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <Testimonials />

      {/* ─── CONSULTATION FORM ─── */}
      <ConsultationForm />
    </>
  );
};

export default Home;
