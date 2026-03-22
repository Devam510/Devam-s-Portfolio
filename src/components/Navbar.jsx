import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LetterSwapForward } from '@/components/ui/letter-swap';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About',        href: '#about' },
    { label: 'Skills',       href: '#skills' },
    { label: 'Projects',     href: '#projects' },
    { label: 'Availability', href: '#availability' },
    { label: 'Contact',      href: '#contact' },
  ];

  return (
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
          alignItems: 'center',
          lineHeight: 1,
          pointerEvents: 'all',
          transition: 'background 0.3s ease',
        }}
      >
        {/* Nav Links with LetterSwap animation */}
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
                color: 'rgba(255,255,255,0.55)',
                letterSpacing: '0.06em',
                whiteSpace: 'nowrap',
              }}
            />
          </a>
        ))}

        {/* Divider */}
        <div style={{
          width: '1px',
          height: '14px',
          background: 'rgba(255,255,255,0.15)',
          flexShrink: 0,
        }} />

        {/* Hire Me — white pill with letter swap */}
        <a
          href="#contact"
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
      </div>
    </motion.nav>
  );
};

export default Navbar;
