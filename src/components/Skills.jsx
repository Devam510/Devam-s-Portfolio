import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const columnsData = [
  {
    title: "Languages",
    items: ["Python", "DBMS", "C", "C++", "Claude"]
  },
  {
    title: "Frontend",
    items: ["HTML", "CSS", "JS", "Three.js", "React"]
  },
  {
    title: "Backend & AI",
    items: ["Node.js", "FastAPI", "PostgreSQL", "TensorFlow", "PyTorch"]
  }
];

const SkillItem = ({ skill, colIndex, scrollYProgress }) => {
  // Pack all reveals strictly into the first 50% of the entire 250vh section track 
  // so everything is completely loaded well before the user approaches the bottom "Projects" transition
  const start = colIndex * 0.10; // Columns now cascade rapidly! 0%, 10%, 20%
  const end = start + 0.10; // Silky smooth 10% interpolation for a perfect fade

  const opacity = useTransform(scrollYProgress, [start, end], [0, 1], { clamp: true });
  const y = useTransform(scrollYProgress, [start, end], ['30px', '0px'], { clamp: true });

  return (
    <motion.div style={{
      opacity,
      y,
      fontSize: 'clamp(22px, 3.5vw, 52px)',
      fontWeight: 900,         // Increased boldness
      letterSpacing: '-0.02em',
      color: '#000000',        // Absolute pitch black
      textTransform: 'uppercase',
      fontFamily: 'monospace'
    }}>
      {skill}
    </motion.div>
  );
};

export default function Skills() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  });

  // Smoothly counts 0 to 18 based on exact overall scroll progress
  const revealedCount = useTransform(scrollYProgress, v => Math.min(18, Math.max(0, Math.floor(v * 18.99))));

  return (
    <div id="skills" ref={sectionRef} style={{ height: '150vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#fafafa', willChange: 'transform' }}>

        {/* Top Left Label */}
        <div style={{
          position: 'absolute', top: '48px', left: '80px',
          display: 'flex', alignItems: 'center', gap: '8px'
        }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
          <span style={{
            fontSize: '22px', letterSpacing: '0.2em', fontWeight: 600,
            fontFamily: "'JetBrains Mono', monospace", color: '#18181b', textTransform: 'uppercase'
          }}>
            Skills
          </span>
        </div>



        {/* 3 Columns Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3" style={{
          width: '100%',
          height: '100%',
          padding: '120px 80px',
          paddingLeft: 'max(80px, 45vw)', // Dynamically reserves the left 45% of any screen purely for the Hero portrait!
          alignContent: 'start',
          gap: '24px'
        }}>
          {columnsData.map((col, colIndex) => (
            <div key={col.title} style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>

              {/* Column Header */}
              <div style={{
                fontSize: '11px', letterSpacing: '0.2em',
                color: '#a1a1aa', textTransform: 'uppercase'
              }}>
                {col.title}
              </div>

              {/* Skill Items */}
              {col.items.map((skill) => (
                <SkillItem
                  key={skill}
                  skill={skill}
                  colIndex={colIndex}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
