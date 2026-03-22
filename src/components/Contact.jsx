import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [focusedField, setFocusedField] = useState(null);

  const inputStyle = (fieldName) => ({
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
    <section id="contact" className="w-full flex flex-col bg-white" style={{ minHeight: '100vh', background: '#fff', padding: 'clamp(60px, 8vw, 96px) clamp(20px, 7vw, 96px)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: 'clamp(40px, 6vw, 56px)', alignItems: 'center', width: '100%', maxWidth: '1400px', margin: '0 auto' }}>

        {/* LEFT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>

          {/* Section label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
            <span style={{
              fontSize: '18px', letterSpacing: '0.2em', fontWeight: 600,
              fontFamily: "'JetBrains Mono', monospace", color: '#18181b', textTransform: 'uppercase'
            }}>
              Contact
            </span>
          </div>

          {/* Outcome-driven headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: '16px' }}
          >
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(28px, 4.5vw, 56px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.95, color: '#18181b' }}>
              Turn your data
            </div>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 'clamp(28px, 4.5vw, 56px)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 0.95, color: '#18181b' }}>
              into decisions.
            </div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(28px, 4.5vw, 56px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.95, color: '#18181b' }}>
              Let's talk.
            </div>
          </motion.div>

          {/* Short tagline */}
          <p style={{ fontFamily: 'monospace', fontSize: '11px', color: '#71717a', lineHeight: 1.6, letterSpacing: '0.02em', maxWidth: '320px', marginBottom: '24px' }}>
            Whether it's an internship, freelance project, or just a conversation about AI, my inbox is always open.
          </p>

          {/* Proof strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 0', borderTop: '0.5px solid #f0f0f0', borderBottom: '0.5px solid #f0f0f0', marginBottom: '24px', flexWrap: 'wrap' }}
          >
            {[
              { num: '10+', label: 'Projects' },
              { num: '3+', label: 'Yrs Coding' },
              { num: '3+', label: 'AI Domains' },
              { num: '1x', label: 'Internship' },
            ].map((stat, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div style={{ width: '1px', height: '24px', background: '#e4e4e7' }} className="hidden sm:block" />}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '20px', fontWeight: 800, color: '#18181b', letterSpacing: '-0.04em', lineHeight: 1 }}>{stat.num}</span>
                  <span style={{ fontFamily: 'monospace', fontSize: '9px', color: '#a1a1aa', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{stat.label}</span>
                </div>
              </React.Fragment>
            ))}
          </motion.div>

          {/* Contact links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0' }}
          >
            {[
              { label: 'Email', value: 'pateldevam5354@gmail.com', href: 'mailto:pateldevam5354@gmail.com' },
              { label: 'LinkedIn', value: 'patel-devam-596535312', href: 'https://linkedin.com/in/patel-devam-596535312' },
              { label: 'GitHub', value: '@Devam510', href: 'https://github.com/Devam510' },
            ].map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', padding: '15px 0', borderBottom: i < 2 ? '0.5px solid #f4f4f5' : 'none' }}
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
          viewport={{ once: false }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
          {/* Name + Email row — stack on mobile via auto-fit */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
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
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%',
              background: '#18181b',
              color: '#fff',
              padding: '14px 20px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '-0.01em',
            }}>
              Start a conversation →
            </span>
          </motion.button>

          {/* Personal note */}
          <p style={{
            fontFamily: 'monospace',
            fontSize: '14px',
            color: '#484444ff',
            lineHeight: 1.8,
            letterSpacing: '0.02em',
            textAlign: 'center',
            marginTop: '12px',
            fontStyle: 'italic',
          }}>
            "Got an idea? I've got the code. Let's talk."
          </p>

          {/* Response time */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            justifyContent: 'center',
            marginTop: '8px',
          }}>
            <div style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: '#000000ff',
            }} />
            <span style={{
              fontFamily: 'monospace',
              fontSize: '9px',
              color: '#353537ff',
              letterSpacing: '0.06em',
            }}>
              Responds within 12 hours
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
