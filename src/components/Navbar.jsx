import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LetterSwapForward } from '@/components/ui/letter-swap';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = [
    { label: 'About',        href: '#about' },
    { label: 'Skills',       href: '#skills' },
    { label: 'Projects',     href: '#projects' },
    { label: 'Availability', href: '#availability' },
    { label: 'Contact',      href: '#contact' },
  ];

  return (
    <>
      {/* ── Full-screen mobile menu overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: '#18181b',
              zIndex: 200,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '40px',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#fff',
                fontSize: '28px',
                lineHeight: 1,
              }}
            >
              ✕
            </button>

            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: 'monospace',
                  fontSize: '28px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: 'rgba(255,255,255,0.8)',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                }}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.07 + 0.05, duration: 0.4 }}
              style={{
                fontFamily: 'monospace',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: '#18181b',
                textDecoration: 'none',
                background: '#fff',
                padding: '12px 32px',
                borderRadius: '100px',
              }}
            >
              Hire Me
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Navbar pill ── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{
          position: 'fixed',
          top: '16px',
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          justifyContent: 'center',
          padding: '0 48px',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '28px',
            background: scrolled ? 'rgba(24,24,27,0.95)' : '#18181b',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: '100px',
            padding: '10px 26px',
            lineHeight: 1,
            pointerEvents: 'all',
            transition: 'background 0.3s ease',
          }}
        >
          {/* Nav Links — hidden on mobile */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <LetterSwapForward
                  label={link.label}
                  reverse={true}
                  staggerFrom="first"
                  staggerDuration={0.03}
                  transition={{ type: 'spring', duration: 0.5 }}
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    color: '#ffffff',
                    letterSpacing: '0.06em',
                    whiteSpace: 'nowrap',
                  }}
                />
              </a>
            ))}
          </div>

          {/* Divider — hidden on mobile */}
          <div className="hidden md:block" style={{
            width: '1px',
            height: '14px',
            background: 'rgba(255,255,255,0.15)',
            flexShrink: 0,
          }} />

          {/* Hire Me pill — hidden on mobile */}
          <a
            href="#contact"
            className="hidden md:block"
            style={{
              textDecoration: 'none',
              background: '#ffffff',
              padding: '6px 14px',
              borderRadius: '100px',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#f4f4f5')}
            onMouseLeave={e => (e.currentTarget.style.background = '#ffffff')}
          >
            <LetterSwapForward
              label="Hire Me"
              reverse={true}
              staggerFrom="center"
              staggerDuration={0.04}
              transition={{ type: 'spring', duration: 0.5 }}
              style={{
                fontFamily: 'monospace',
                fontSize: '11px',
                fontWeight: 600,
                color: '#18181b',
                letterSpacing: '0.06em',
                whiteSpace: 'nowrap',
              }}
            />
          </a>

          {/* Hamburger — show only on mobile */}
          <button
            className="md:hidden flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#fff',
              fontSize: '22px',
              lineHeight: 1,
              padding: '2px 4px',
            }}
          >
            ☰
          </button>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
