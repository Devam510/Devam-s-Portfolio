import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MinimalistHeroProps {
  logoText: string;
  navLinks: { label: string; href: string }[];
  mainText: string;
  readMoreLink: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: {
    part1: string;
    part2: string;
  };
  socialLinks: { icon: LucideIcon; href: string }[];
  locationText: string;
  className?: string;
}

const SocialIcon = ({ href, icon: Icon }: { href: string; icon: LucideIcon }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-foreground/60 transition-colors hover:text-foreground">
    <Icon className="h-5 w-5" />
  </a>
);

export const MinimalistHero = ({
  mainText,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  className,
}: MinimalistHeroProps) => {

  const { scrollYProgress, scrollY } = useScroll();

  const [vh, setVh] = React.useState(typeof window !== 'undefined' ? window.innerHeight : 900);
  const [skillsHeight, setSkillsHeight] = React.useState(800); // Fallback estimate

  React.useEffect(() => {
    const handleResize = () => {
      setVh(window.innerHeight);
      const skillsEl = document.getElementById('skills-desktop');
      if (skillsEl) setSkillsHeight(skillsEl.clientHeight);
    };
    
    // Initial measure after mount
    handleResize();
    // Slight delay to ensure fonts/layout are loaded
    setTimeout(handleResize, 100);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Live clock — 24-hour format
  const [time, setTime] = useState({ h: '00', m: '00' });
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, '0');
      const m = now.getMinutes().toString().padStart(2, '0');
      setTime({ h, m });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Rotating roles
  const roles = [
    "Data Scientist · AI Engineer · Quant Dev",
    "Building intelligent systems from scratch.",
    "Python · TensorFlow · FastAPI · React",
    "Turning raw data into real decisions.",
    "Machine Learning · Deep Learning · NLP",
    "Obsessed with data. Powered by curiosity.",
  ];
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole(prev => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Fly-in animation completes at 820px
  const animEnd = 820;

  // The image stays exactly locked (0px) natively without jitter inside the Hero and Skills sections.
  // We calculate exactly when the bottom of the card touches the top of Projects.
  // Card bottom = 18vh + 76vh = 94vh. 
  // Projects top = 100vh + skillsHeight.
  // Overlap occurs when scrollY + 94vh = 100vh + skillsHeight -> scrollY = 6vh + skillsHeight.
  const exitStart = skillsHeight - 80;
  const exitEnd = exitStart + (vh * 1.5);

  const imageX = useTransform(scrollY, [0, animEnd], ['0vw', '-30vw']); // Responsively centers in the left half
  const imageScale = useTransform(scrollY, [0, animEnd], [1, 0.85]);
  const imageRotate = useTransform(scrollY, [0, animEnd], [0, 0]);
  const flipRotationY = useTransform(scrollY, [0, animEnd], ['0deg', '180deg'], { clamp: true });

  // Hero Typography Parting Effects
  const textLeftOut = useTransform(scrollY, [0, animEnd], ['0px', '-300px']);
  const textRightOut = useTransform(scrollY, [0, animEnd], ['0px', '300px']);
  const mobileTextUpOut = useTransform(scrollY, [0, animEnd], ['0px', '-100px']);
  const textFadeOut = useTransform(scrollY, [0, animEnd], [1, 0]);

  // It now perfectly simulates native scrolling by translating exactly 1px for every 1px scrolled!
  const imageY = useTransform(scrollY, [0, exitStart, exitEnd], ['0px', '0px', `-${vh * 1.5}px`]);

  // We map opacity to scrollYProgress to fade out eventually, or keep it 1 to stay solid entirely
  const imageOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1]                // always solid
  );

  // The glowing orb fades out smoothly during the first 500px of scrolling
  const circleOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div
      className={cn(
        'relative flex h-screen w-full flex-col items-center justify-between bg-background px-8 py-6 font-sans md:px-12 md:py-8 overflow-x-hidden',
        className
      )}
    >

      {/* ── TOP LEFT — Years of Experience ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
        className="hidden md:flex"
        style={{
          position: 'absolute',
          top: '80px',
          left: '40px',
          zIndex: 10,
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '3px' }}>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '56px',
            fontWeight: 800,
            color: '#18181b',
            lineHeight: 1,
            letterSpacing: '-0.04em',
          }}>3</span>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '28px',
            fontWeight: 700,
            color: '#a1a1aa',
            lineHeight: 1,
            marginTop: '6px',
          }}>+</span>
        </div>
        <span style={{
          fontFamily: 'monospace',
          fontSize: '10px',
          color: '#71717a',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          lineHeight: 1.6,
        }}>
          Years of<br />Coding
        </span>
        <div style={{ width: '32px', height: '1px', background: '#18181b', marginTop: '6px' }} />
      </motion.div>

      {/* ── TOP RIGHT — Quote ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
        className="hidden md:flex"
        style={{
          position: 'absolute',
          top: '15px',
          right: '40px',
          zIndex: 10,
          maxWidth: '350px',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '0px',
          textAlign: 'right',
        }}
      >
        <span style={{
          fontFamily: "'Instrument Serif', serif",
          fontStyle: 'italic',
          fontSize: '36px',
          color: '#2b2b2cff',
          lineHeight: 1,
        }}>&ldquo;</span>
        <p style={{
          fontFamily: "'Instrument Serif', serif",
          fontStyle: 'italic',
          fontSize: '26px',
          color: '#18181b',
          lineHeight: 1.7,
          letterSpacing: '0.01em',
          margin: 0,
        }}>
          Sometimes you gotta run before,<br />you can walk.
        </p>
        <span style={{
          fontFamily: 'monospace',
          fontSize: '9px',
          color: '#443f3fff',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}>— Devam Patel</span>
        <div style={{ width: '32px', height: '1px', background: '#18181b' }} />
      </motion.div>

      {/* ── BOTTOM LEFT — Rotating Role + Location ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 1.0 }}
        className="hidden md:flex"
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '40px',
          zIndex: 10,
          flexDirection: 'column',
          gap: '6px',
        }}
      >
        {/* Cycling text */}
        <div style={{ overflow: 'hidden', height: '26px', width: '600px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentRole}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: 'monospace',
                fontSize: '15px',
                fontWeight: 600,
                color: '#71717a',
                letterSpacing: '0.04em',
                whiteSpace: 'nowrap',
              }}
            >
              {roles[currentRole]}
            </motion.div>
          </AnimatePresence>
        </div>

      </motion.div>

      {/* ── BOTTOM RIGHT — Tagline + Live Clock ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 1.1 }}
        className="hidden md:flex"
        style={{
          position: 'absolute',
          bottom: '32px',
          right: '40px',
          zIndex: 10,
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '8px',
        }}
      >
        {/* Big bold time */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '32px',
            fontWeight: 700,
            color: '#18181b',
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}>
            {time.h}:{time.m}
          </span>
        </div>
        {/* Location label */}
        <span style={{
          fontFamily: 'monospace',
          fontSize: '10px',
          color: '#a1a1aa',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          Ahmedabad, India
        </span>
      </motion.div>
      {/* Mobile */}
      <div className="md:hidden flex flex-col items-center gap-6 w-full flex-grow justify-center">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ y: mobileTextUpOut, opacity: textFadeOut }}
        >
          <h1
            className="text-7xl font-extrabold text-foreground leading-none text-center"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {overlayText.part1} {overlayText.part2}
          </h1>
        </motion.div>
        <div className="relative flex justify-center items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="absolute z-0 h-[280px] w-[280px] rounded-full bg-yellow-400/90"
          />
          <motion.div
            style={{
              position: 'relative',
              zIndex: 10,
              height: '340px',
              width: '240px',
              perspective: 1000,
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          >
            <motion.div
              style={{
                width: '100%',
                height: '100%',
                transformStyle: 'preserve-3d',
                rotateY: flipRotationY,
              }}
            >
              {/* Front Face */}
              <img
                src={imageSrc}
                alt={imageAlt}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '32px',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              />
              {/* Back Face */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: '32px',
                  background: '#18181b',
                  color: '#fff',
                  padding: '32px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 800, marginBottom: '16px', lineHeight: 1.1 }}>
                  About Me
                </h3>
                <p style={{ fontFamily: 'monospace', fontSize: '11px', color: '#a1a1aa', lineHeight: 1.7 }}>
                  I'm Devam Patel, an AI & Full-Stack Engineer. I build scalable solutions bridging the gap between cutting-edge research and practical applications.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          style={{ opacity: textFadeOut }}
          className="text-sm leading-relaxed text-foreground/60 max-w-xs text-center px-4"
        >
          {mainText}
        </motion.p>
      </div>

      {/* Desktop */}
      <div
        className="hidden md:grid grid-cols-3 items-center w-full max-w-7xl"
        style={{ flex: 1, minHeight: 0 }}
      >
        {/* Col 1 — Devam */}
        <motion.div
          initial={{ opacity: 0, x: "-100vw" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="col-span-1 flex items-center justify-end"
        >
          <motion.h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '120px',
            fontWeight: 900,
            lineHeight: 1,
            marginRight: '60px',
            x: textLeftOut,
            opacity: textFadeOut
          }}>
            {overlayText.part1}
          </motion.h1>
        </motion.div>

        {/* Col 2 — Glowing Orb + Photo */}
        <div className="col-span-1 relative flex justify-center items-end h-full overflow-visible">

          {/* Glowing Orb Background */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="absolute z-0 h-[65vh] w-[65vh] rounded-full bg-yellow-400/70"
            style={{ 
              opacity: circleOpacity, 
              translateY: '-15%',
              filter: 'blur(100px)',
              pointerEvents: 'none'
            }}
          />

          {/* ✅ 3D Flip Card Container */}
          <motion.div
            style={{
              position: 'fixed',
              zIndex: 50,
              top: '18vh',
              left: '50%',
              marginLeft: '-220px',
              height: '76vh',
              width: '440px',
              x: imageX,
              y: imageY,
              scale: imageScale,
              rotate: imageRotate,
              opacity: imageOpacity,
              willChange: 'transform',
              perspective: 1200,
            }}
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            {/* The 3D Rotating Card */}
            <motion.div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                transformStyle: 'preserve-3d',
                rotateY: flipRotationY,
              }}
            >
              {/* Front Face */}
              <img
                src={imageSrc}
                alt={imageAlt}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '40px',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  boxShadow: '0 24px 64px rgba(0,0,0,0.15)',
                }}
              />
              {/* Back Face */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: '40px',
                  background: '#18181b',
                  color: '#fff',
                  padding: '48px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  boxShadow: '0 24px 64px rgba(0,0,0,0.15)',
                }}
              >
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '42px', fontWeight: 800, marginBottom: '24px', lineHeight: 1.1 }}>
                  About Me
                </h3>
                <p style={{ fontFamily: 'monospace', fontSize: '14px', color: '#dbd6d6ff', lineHeight: 1.8 }}>
                  I'm Devam Patel, an AI & Data Science professional passionate about turning complex data into real-world decisions.
                  <br /><br />
                  With experience in computer vision, autonomous systems, and predictive analytics, I build scalable solutions that bridge the gap between cutting-edge research and practical applications.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Col 3 — Patel */}
        <motion.div
          initial={{ opacity: 0, x: "100vw" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          className="col-span-1 flex items-center justify-end"
        >
          <motion.h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '120px',
            fontWeight: 900,
            lineHeight: 1,
            marginRight: '80px',
            x: textRightOut,
            opacity: textFadeOut
          }}>
            {overlayText.part2}
          </motion.h1>
        </motion.div>
      </div>

      {/* Footer spacer — keeps layout valid, corner elements handle the content */}
      <div className="hidden md:block w-full" />
    </div>
  );
};