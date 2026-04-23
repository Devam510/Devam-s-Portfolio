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

function DesktopSkills() {
  return (
    <section id="skills-desktop" style={{ background: '#fafafa', padding: '120px 80px', position: 'relative' }}>
      {/* Top Left Label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '80px' }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
        <span style={{ fontSize: '22px', letterSpacing: '0.2em', fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: '#18181b', textTransform: 'uppercase' }}>
          Skills
        </span>
      </div>

      {/* 3 Columns Layout */}
      <div className="grid grid-cols-3" style={{ width: '100%', gap: '48px', paddingLeft: 'max(80px, 40vw)' }}>
        {columnsData.map((col) => (
          <div key={col.title} style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#a1a1aa', textTransform: 'uppercase' }}>
              {col.title}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {col.items.map((skill) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: '-10%' }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontSize: 'clamp(22px, 3.5vw, 42px)',
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                    color: '#18181b',
                    textTransform: 'uppercase',
                    fontFamily: 'monospace',
                    borderBottom: '1px solid #e4e4e7',
                    paddingBottom: '16px'
                  }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
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
      <section id="skills" className="md:hidden" style={{ background: '#fafafa', paddingTop: '380px', paddingBottom: '80px', paddingLeft: 'clamp(24px, 6vw, 48px)', paddingRight: 'clamp(24px, 6vw, 48px)' }}>
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
