import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PHRASES = [
  "I LOVE THE ANATHEMA VIBE!",
  "I PREFER TEA TO COFFEE!",
  "FUELED BY CURIOSITY AND CHAI.",
  "BUILDING WHAT MATTERS.",
  "PIXEL PERFECT OR BUST.",
  "ALWAYS BE LEARNING."
];

export default function Footer() {
  const [time, setTime] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);

  // Update clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate phrases every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Handle footer hover to toggle text
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Scroll back to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={scrollToTop}
      style={{
        width: '100%',
        background: '#000',
        color: '#fff',
        padding: '32px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        userSelect: 'none',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Left: Random Quote */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={phraseIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: '#d4d4d8'
            }}
          >
            {PHRASES[phraseIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Center: Back To Top */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
        <motion.span
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ fontSize: '12px', color: '#a1a1aa' }}
        >
          ↑
        </motion.span>
        
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '12px',
          fontWeight: 500,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}>
          Back To Top
        </span>

        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ fontSize: '12px', color: '#a1a1aa' }}
        >
          ↑
        </motion.span>
      </div>

      {/* Right: Clock */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <span style={{
          fontFamily: 'monospace',
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '0.05em',
          color: '#d4d4d8'
        }}>
          {time}
        </span>
      </div>
    </footer>
  );
}
