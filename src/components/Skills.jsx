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

const allSkills = columnsData.flatMap(col => col.items);

const SkillItem = ({ skill, colIndex, scrollYProgress }) => {
  const start = colIndex * 0.10;
  const end = start + 0.10;

  const opacity = useTransform(scrollYProgress, [start, end], [0, 1], { clamp: true });
  const y = useTransform(scrollYProgress, [start, end], ['30px', '0px'], { clamp: true });

  return (
    <motion.div style={{
      opacity,
      y,
      fontSize: 'clamp(22px, 3.5vw, 52px)',
      fontWeight: 900,
      letterSpacing: '-0.02em',
      color: '#000000',
      textTransform: 'uppercase',
      fontFamily: 'monospace'
    }}>
      {skill}
    </motion.div>
  );
};

function DesktopSkills() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  });

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
          paddingLeft: 'max(80px, 45vw)',
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

export default function Skills() {
  return (
    <>
      {/* Desktop sticky scroll version */}
      <div className="hidden md:block">
        <DesktopSkills />
      </div>

      {/* Mobile simple grid version */}
      <section id="skills" className="md:hidden" style={{ background: '#fafafa', padding: 'clamp(60px, 8vw, 80px) clamp(24px, 6vw, 48px)' }}>
        {/* Label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '40px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
          <span style={{
            fontSize: '18px', letterSpacing: '0.2em', fontWeight: 600,
            fontFamily: "'JetBrains Mono', monospace", color: '#18181b', textTransform: 'uppercase'
          }}>
            Skills
          </span>
        </div>

        {columnsData.map((col) => (
          <div key={col.title} style={{ marginBottom: '40px' }}>
            <div style={{
              fontSize: '11px', letterSpacing: '0.2em', color: '#a1a1aa',
              textTransform: 'uppercase', marginBottom: '20px'
            }}>
              {col.title}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {col.items.map((skill) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 'clamp(16px, 4vw, 22px)',
                    fontWeight: 900,
                    color: '#18181b',
                    textTransform: 'uppercase',
                    borderBottom: '0.5px solid #e4e4e7',
                    paddingBottom: '12px',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
