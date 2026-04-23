import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { TextScramble } from "./ui/text-scramble";

const Availability = () => {
  // Effect 07: Scroll Parallax Background
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  // Effect 10: Cursor Glow Trail
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-15%' });

  const handleSectionMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  // Effect 02: 3D Tilt on Heading
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const handleHeadingMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    setTilt({ x, y });
  };

  // Effect 03: Magnetic Button
  const btnRef = useRef<HTMLAnchorElement>(null);
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });
  const handleBtnMouseMove = (e: React.MouseEvent) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setBtnPos({ x: x * 0.35, y: y * 0.35 });
  };

  // Effect 04: Staggered Row Reveal
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } }
  };

  const rowVariants = {
    hover: { backgroundColor: 'rgba(0,0,0,0.02)' }
  };

  const headingSpanVariants = {
    hidden: { opacity: 0, y: 60, clipPath: 'inset(100% 0% 0% 0%)' },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      clipPath: 'inset(0% 0% 0% 0%)',
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as any, delay: custom }
    })
  };

  const rowsData = [
    {
      label: 'Status',
      value: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a', fontSize: '13px', fontWeight: 500 }}>
          {/* Effect 06 — Enhanced Pulsing Status Dot */}
          <span style={{ position: 'relative', display: 'inline-flex', width: '10px', height: '10px' }}>
            <span style={{ position: 'absolute', inset: '-4px', borderRadius: '50%', border: '1px solid #16a34a', opacity: 0.3, animation: 'ping1 1.5s ease-in-out infinite' }} />
            <span style={{ position: 'absolute', inset: '-8px', borderRadius: '50%', border: '1px solid #16a34a', opacity: 0.15, animation: 'ping1 1.5s ease-in-out infinite 0.3s' }} />
            <span style={{ position: 'absolute', inset: '-2px', borderRadius: '50%', background: '#16a34a', opacity: 0.2, filter: 'blur(4px)' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#16a34a', display: 'inline-block', position: 'relative', zIndex: 1 }} />
          </span>
          Available
        </div>
      ),
    },
    { label: 'Experience', value: 'Ex-Intern @ VibeTech Labs' },
    { label: 'Role', value: 'AI / Full-Stack Engineer' },
    { label: 'Location', value: 'Ahmedabad, India' },
    { label: 'Open to', value: 'Full-time & freelance opportunities' },
    {
      label: 'GitHub',
      value: (
        <a href="https://github.com/Devam510" target="_blank" rel="noopener noreferrer" style={{ color: '#18181b', fontSize: '13px', fontWeight: 500, textDecoration: 'none' }}>
          @Devam510
        </a>
      ),
    },
  ];

  return (
    <section
      id="availability"
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        padding: 'clamp(60px, 8vw, 80px) clamp(24px, 6vw, 96px)',
        background: '#fafafa', width: '100%', boxSizing: 'border-box',
        position: 'relative', overflow: 'hidden'
      }}
    >
      {/* Effect 07 — Scroll Parallax Background */}
      <motion.div style={{ y: bgY, position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 50%, rgba(22,163,74,0.05) 0%, transparent 60%)', pointerEvents: 'none' }} />

      {/* Effect 08 — Noise Texture Overlay */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`, opacity: 0.4, pointerEvents: 'none', zIndex: 0, borderRadius: 'inherit' }} />

      {/* Effect 10 — Cursor Glow Trail */}
      <motion.div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(22,163,74,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0, left: cursor.x - 200, top: cursor.y - 200, transition: 'left 0.15s ease, top 0.15s ease' }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: 'clamp(48px, 6vw, 128px)', alignItems: 'center' }}>

        {/* Left Column (Effect 09) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-15%' }}
          variants={{
            hidden: { opacity: 0, x: -60 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as any } }
          }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}
        >
          {/* Effect 02 — 3D Tilt on Heading */}
          <motion.div
            onMouseMove={handleHeadingMouseMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            animate={{ rotateX: tilt.x, rotateY: tilt.y }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
          >
            <h2 style={{ fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '24px', color: '#18181b', display: 'flex', flexDirection: 'column' }}>
              {/* Effect 01 — Text Split Reveal */}
              <div style={{ overflow: 'hidden' }}>
                <motion.span 
                  style={{ display: 'inline-block' }} 
                  variants={headingSpanVariants}
                  custom={0}
                >
                  Currently
                </motion.span>
              </div>
              <div style={{ overflow: 'hidden' }}>
                <motion.span 
                  style={{ display: 'inline-block', fontStyle: 'italic', fontFamily: 'Georgia, serif', fontWeight: 300 }} 
                  variants={headingSpanVariants}
                  custom={0.12}
                >
                  available
                </motion.span>
              </div>
              <div style={{ overflow: 'hidden' }}>
                <motion.span 
                  style={{ display: 'inline-block' }} 
                  variants={headingSpanVariants}
                  custom={0.24}
                >
                  for hire
                </motion.span>
              </div>
            </h2>
          </motion.div>

          <p style={{ color: '#71717a', fontSize: '13px', fontFamily: 'monospace', lineHeight: 1.8, marginBottom: '40px', maxWidth: '360px' }}>
            <TextScramble duration={1.2} characterSet="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()" trigger={isInView}>
              My internship at VibeTech Labs has wrapped up. I'm actively looking for full-time or freelance roles in AI, data science, and full-stack engineering.
            </TextScramble>
          </p>

          {/* Effect 03 — Magnetic Button */}
          <div
            onMouseMove={handleBtnMouseMove}
            onMouseLeave={() => setBtnPos({ x: 0, y: 0 })}
            style={{ display: 'inline-block', position: 'relative' }}
          >
            <motion.a
              ref={btnRef}
              animate={{ x: btnPos.x, y: btnPos.y }}
              transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
              href="https://github.com/Devam510"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid #18181b', color: '#18181b', borderRadius: '100px', padding: '12px 28px', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'monospace', textDecoration: 'none', transition: 'background 0.3s, color 0.3s'
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#18181b'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#18181b'; }}
            >
              View My Work <ExternalLink size={14} />
            </motion.a>
          </div>
        </motion.div>

        {/* Right Column (Effect 09) */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: '-15%' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          style={{ width: '100%' }}
        >
          {/* Effect 04 — Staggered Row Reveal */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-10%' }}
            style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
          >
            {rowsData.map((row, i) => (
              /* Effect 05 — Row Hover Highlight */
              <motion.div
                key={i}
                variants={rowVariants}
                whileHover="hover"
                style={{
                  position: 'relative',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '20px 24px',
                  borderBottom: '1px solid #e4e4e7',
                  borderTop: i === 0 ? '1px solid #e4e4e7' : 'none',
                  marginLeft: '-24px',
                  marginRight: '-24px',
                  borderRadius: '8px',
                }}
              >
                {/* Animated left accent line */}
                <motion.div
                  variants={{ hidden: { scaleY: 0 }, visible: { scaleY: 0 }, hover: { scaleY: 1 } }}
                  transition={{ duration: 0.2 }}
                  style={{ position: 'absolute', left: '0px', top: '10%', width: '2px', height: '80%', background: '#18181b', transformOrigin: 'top', borderRadius: '2px' }}
                />
                <span style={{ color: '#515154ff', fontSize: '11px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {row.label}
                </span>
                {typeof row.value === 'string' ? <span style={{ color: '#18181b', fontSize: '13px', fontWeight: 500 }}>{row.value}</span> : row.value}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </div>

      <style>{`
        @keyframes ping1 {
          0% { transform: scale(1); opacity: 0.3; }
          70% { transform: scale(2); opacity: 0; }
          100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Availability;