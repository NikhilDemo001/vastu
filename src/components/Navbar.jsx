import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Shop', to: '/shop' },
  { label: 'Consult', to: '/consult' },
];



const WaIcon = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.146 17.969a9.83 9.83 0 01-5.143 1.449c-1.691 0-3.36-.448-4.825-1.297l-3.373.884.904-3.291A9.794 9.794 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10a9.83 9.83 0 01-3.854 7.969z"/>
  </svg>
);

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevY, setPrevY] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      // Hide on scroll down (> 100px from top), show on scroll up
      if (y > 100) setVisible(y < prevY || y < 120);
      else setVisible(true);
      setPrevY(y);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, [prevY]);

  useEffect(() => setIsOpen(false), [location]);

  const linkClass = ({ isActive }) =>
    `relative py-1 text-[13px] font-semibold transition-colors duration-150 ${
      isActive ? 'text-[var(--jade)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
    } after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:rounded-full after:bg-[var(--gold)] after:transition-all after:duration-200 ${
      isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
    }`;

  return (
    <>
      {/* ── Announcement bar ── */}
      <div className="relative z-50 border-b border-[var(--border)] bg-[var(--ink)] px-4 py-2">
        <div className="section-shell flex items-center justify-between gap-4">
          <p className="hidden sm:block text-[11px] font-medium text-[var(--text-inverse)]/55">
            Spatial Harmony · Divine Living Atelier
          </p>
          <p className="font-mono text-[11px] font-bold tracking-wider text-[var(--gold-vivid)]">
            CALL: +91 7319178910
          </p>
          <p className="hidden md:block text-[11px] text-[var(--text-inverse)]/40">
            Remote consultations available
          </p>
        </div>
      </div>

      {/* ── Main header ── */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 navbar-glass ${
          scrolled ? 'shadow-[0_1px_32px_rgba(8,12,11,0.10)]' : ''
        } ${
          visible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <nav className="section-shell flex h-[68px] items-center justify-between gap-6">

          {/* Logo */}
          <Link to="/" className="group flex flex-shrink-0 items-center gap-3">
            <div className="relative flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-[10px] bg-[var(--ink)] shadow-md transition-shadow group-hover:shadow-[var(--shadow-gold)]">
              <div className="absolute bottom-0 inset-x-0 h-[3px] bg-gradient-to-r from-[var(--gold)] to-[var(--jade)] transition-all group-hover:h-[4px]" />
              <span className="font-display text-[20px] font-bold leading-none text-[var(--paper)] pb-0.5">HE</span>
            </div>
            <div className="leading-none">
              <span className="block font-display text-[16px] font-bold text-[var(--text-primary)] leading-none group-hover:text-[var(--jade)] transition-colors">
                Hareshvar Exim Pvt Ltd
              </span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--jade)] opacity-70 mt-1">
                Divine Living Atelier
              </span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass} end={item.to === '/'}>
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-2.5">


            {/* Auth */}
            {user ? (
              <>
                <span className="max-w-[100px] truncate text-sm font-medium text-[var(--text-muted)]">
                  {user.displayName || user.email}
                </span>
                <button onClick={logout} className="btn btn-outline text-xs py-2 px-4 min-h-[36px]">
                  Log out
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-dark text-sm min-h-[40px] px-5">
                Sign In
              </Link>
            )}

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/917319178910"
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp min-h-[40px] px-4 text-sm"
            >
              <WaIcon />
              WhatsApp
            </a>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">


            <button
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)]"
            >
              <div className="w-4 flex flex-col gap-[5px]">
                <span className={`block h-px bg-[var(--text-primary)] rounded-full transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-[6px]' : ''
                }`} />
                <span className={`block h-px bg-[var(--text-primary)] rounded-full transition-all duration-300 ${
                  isOpen ? 'opacity-0 scale-x-0' : ''
                }`} />
                <span className={`block h-px bg-[var(--text-primary)] rounded-full transition-all duration-300 ${
                  isOpen ? '-rotate-45 -translate-y-[6px]' : ''
                }`} />
              </div>
            </button>
          </div>
        </nav>

        {/* ── Mobile drawer ── */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 border-t border-[var(--border)] ${
            isOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="section-shell py-5 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-[12px] font-semibold text-sm transition-all ${
                    isActive
                      ? 'bg-[var(--jade-pale)] text-[var(--jade)] border border-[var(--border-jade)]'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--surface-glass)] hover:text-[var(--text-primary)]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className="mt-3 grid grid-cols-2 gap-2.5 border-t border-[var(--border)] pt-4">
              {!user ? (
                <Link to="/login" className="btn btn-dark text-sm col-span-1 min-h-[44px]">
                  Sign In
                </Link>
              ) : (
                <button
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="btn btn-outline text-sm col-span-2 min-h-[44px]"
                >
                  Log out
                </button>
              )}
              <a
                href="https://wa.me/917319178910"
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp text-sm min-h-[44px]"
              >
                <WaIcon />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
