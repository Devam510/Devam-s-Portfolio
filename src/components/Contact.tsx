import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const inputStyle = (fieldName: string) => ({
    width: '100%',
    border: '0.5px solid',
    borderColor: focusedField === fieldName ? '#18181b' : '#e4e4e7',
    borderRadius: '8px',
    padding: '10px 14px',
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: '12px',
    color: '#18181b',
    background: '#fff',
    outline: 'none',
    transition: 'border-color 0.2s',
  });

  return (
    <section id="contact" className="w-full flex flex-col bg-white px-6 py-16 md:px-24 md:py-24" style={{ minHeight: '100vh', background: '#fff' }}>
      <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-14 items-start flex-1 w-full max-w-7xl mx-auto">
        
        {/* LEFT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          
          {/* Section label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '20px', height: '1px', background: '#18181b' }} />
            <span style={{ fontFamily: 'monospace', fontSize: '9px', color: '#a1a1aa', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              005 — Contact
            </span>
          </div>

          {/* Outcome-driven headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: '20px' }}
          >
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(38px, 5vw, 62px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.92, color: '#18181b' }}>
              Turn your data
            </div>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 'clamp(38px, 5vw, 62px)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 0.92, color: '#18181b' }}>
              into decisions.
            </div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(38px, 5vw, 62px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.92, color: '#18181b' }}>
              Let's talk.
            </div>
          </motion.div>

          {/* Short tagline */}
          <p style={{ fontFamily: 'monospace', fontSize: '11px', color: '#71717a', lineHeight: 1.7, letterSpacing: '0.02em', maxWidth: '280px', marginBottom: '32px' }}>
            AI Engineer & Data Scientist open to internships, freelance, and collaborations.
          </p>

          {/* Proof strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 0', borderTop: '0.5px solid #f0f0f0', borderBottom: '0.5px solid #f0f0f0', marginBottom: '24px', flexWrap: 'wrap' }}
          >
            {[
              { num: '6+', label: 'Projects' },
              { num: '2+', label: 'Yrs Coding' },
              { num: '3+', label: 'AI Domains' },
              { num: '1×', label: 'Hackathon W' },
            ].map((stat, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div style={{ width: '1px', height: '32px', background: '#e4e4e7' }} className="hidden sm:block" />}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '22px', fontWeight: 800, color: '#18181b', letterSpacing: '-0.04em', lineHeight: 1 }}>{stat.num}</span>
                  <span style={{ fontFamily: 'monospace', fontSize: '9px', color: '#a1a1aa', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{stat.label}</span>
                </div>
              </React.Fragment>
            ))}
          </motion.div>

          {/* Contact links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0' }}
          >
            {[
              { label: 'Email', value: 'devampatel@example.com', href: 'mailto:devampatel@example.com' },
              { label: 'LinkedIn', value: 'patel-devam-596535312', href: 'https://linkedin.com/in/patel-devam-596535312' },
              { label: 'GitHub', value: '@Devam510', href: 'https://github.com/Devam510' },
            ].map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', padding: '10px 0', borderBottom: i < 2 ? '0.5px solid #f4f4f5' : 'none' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#a1a1aa', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{link.label}</span>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '11px', color: '#18181b', fontWeight: 500 }}>{link.value} ↗</span>
              </a>
            ))}
          </motion.div>

        </div>

        {/* RIGHT COLUMN */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '8px' }}
        >
          {/* Name + Email row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
            <input 
              type="text" 
              placeholder="Your name" 
              style={inputStyle('name')}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
            />
            <input 
              type="email" 
              placeholder="Your email" 
              style={inputStyle('email')}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
            />
          </div>

          {/* Subject field */}
          <input 
            type="text" 
            placeholder="Subject" 
            style={inputStyle('subject')}
            onFocus={() => setFocusedField('subject')}
            onBlur={() => setFocusedField(null)}
          />

          {/* Message field */}
          <textarea 
            placeholder="Tell me about your project or opportunity..." 
            rows={5}
            style={{ ...inputStyle('message'), resize: 'none' }}
            onFocus={() => setFocusedField('message')}
            onBlur={() => setFocusedField(null)}
          />

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ width: '100%', background: '#18181b', color: '#fff', padding: '14px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}
          >
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '13px', fontWeight: 600 }}>Start a conversation →</span>
            <span style={{ fontFamily: 'monospace', fontSize: '9px', color: '#71717a', letterSpacing: '0.08em' }}>FREE · NO COMMITMENT</span>
          </motion.button>

          {/* Response time */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center', marginTop: '12px' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#18181b' }} />
            <span style={{ fontFamily: 'monospace', fontSize: '9px', color: '#a1a1aa', letterSpacing: '0.06em' }}>Usually responds within 24 hours</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
