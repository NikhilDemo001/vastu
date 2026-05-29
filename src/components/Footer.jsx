import React from 'react';
import { Link } from 'react-router-dom';

const FOOTER_LINKS = {
  Explore: [
    { label: 'Home', to: '/' },
    { label: 'Services', to: '/services' },
    { label: 'Shop', to: '/shop' },
    { label: 'Consultation', to: '/consult' },
  ],
  Services: [
    { label: 'Tarot Card Reading', to: '/services' },
    { label: 'Angel Consultation', to: '/services' },
    { label: 'Crystal Healing', to: '/services' },
    { label: 'Runes Casting', to: '/services' },
    { label: 'Vastu & Feng Shui', to: '/services' },
    { label: 'Numerology', to: '/services' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '/' },
    { label: 'Terms & Conditions', to: '/' },
    { label: 'Refund Policy', to: '/' },
    { label: 'Shipping Policy', to: '/' },
  ],
};

const WaIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.146 17.969a9.83 9.83 0 01-5.143 1.449c-1.691 0-3.36-.448-4.825-1.297l-3.373.884.904-3.291A9.794 9.794 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10a9.83 9.83 0 01-3.854 7.969z"/>
  </svg>
);

const Footer = () => (
  <footer className="relative overflow-hidden bg-[#050808] border-t border-white/[0.05] pt-24 pb-10">
    {/* Ambient atmosphere */}
    <div className="glow-orb glow-orb--jade animate-orb-drift" style={{ width: 700, height: 700, top: '-30%', left: '-15%', opacity: 0.07 }} />
    <div className="glow-orb glow-orb--gold" style={{ width: 600, height: 600, bottom: '-25%', right: '-10%', opacity: 0.06 }} />
    <div className="noise" />

    {/* Decorative rotating element */}
    <div
      className="absolute top-10 right-10 h-56 w-56 rounded-full border border-white/[0.04] animate-spin-slow hidden xl:block"
      aria-hidden="true"
    >
      <div className="absolute top-0 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--gold)]/30" />
    </div>
    <div
      className="absolute top-16 right-16 h-36 w-36 rounded-full border border-[var(--gold)]/[0.07] animate-spin-reverse hidden xl:block"
      aria-hidden="true"
    />

    <div className="section-shell relative z-10">

      {/* ── CTA BANNER ── */}
      <div className="mb-20 rounded-[28px] border border-white/8 bg-[var(--surface-dark-glass)] p-8 md:p-12 backdrop-blur-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-lg">
            <span className="eyebrow eyebrow--gold eyebrow--no-line block mb-3 text-xs">
              Reach Us Instantly
            </span>
            <h3 className="text-display-md text-white mb-3">
              Questions? Let's talk<br />
              <em className="text-shimmer not-italic">directly.</em>
            </h3>
            <p className="text-white/45 text-sm leading-relaxed">
              Our team responds within hours. WhatsApp is fastest for bookings, crystal inquiries, and service questions.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a
              href="https://wa.me/917319178910?text=Hi! I'm interested in your Vastu and crystal services."
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp text-sm"
            >
              <WaIcon />
              Chat on WhatsApp
            </a>
            <Link to="/consult" className="btn btn-glass text-sm">
              Book Consultation
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 pt-8 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-3 gap-6">
          {[
            { label: 'Phone', value: '+91 7319178910' },
            { label: 'Email', value: 'hello@hareshwarvastu.com' },
            { label: 'Location', value: 'South Ex, New Delhi' },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="font-mono text-[9px] uppercase tracking-widest text-white/30 mb-1">{label}</p>
              <p className="text-sm font-medium text-white/65">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── LINKS GRID ── */}
      <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr] mb-16">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/10 bg-white/5">
              <span className="font-display text-lg font-bold text-[var(--gold-vivid)]">HV</span>
            </div>
            <div className="leading-none">
              <span className="block font-display text-[16px] font-bold text-white leading-none">hareshwar vastu</span>
              <span className="block font-mono text-[9px] text-white/30 uppercase tracking-[0.2em] mt-1">Divine Living Atelier</span>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-white/38 max-w-xs mb-8">
            Ancient Vastu wisdom, premium crystal healing, and spiritual commerce — for lives and spaces that feel extraordinary.
          </p>

          {/* Social icons */}
          <div className="flex gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/30 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all duration-200"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/30 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all duration-200"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/30 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all duration-200"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(FOOTER_LINKS).map(([group, links]) => (
          <div key={group}>
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--gold-vivid)] mb-5">
              {group}
            </h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-[13px] text-white/35 hover:text-white/80 transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Separator */}
      <hr className="sep-gold mb-8" />

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[12px] text-white/25">
          © {new Date().getFullYear()} Hareshwar Vastu. All rights reserved.
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--gold-vivid)]/40">
          Vastu · Crystals · Aura · Healing
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
