'use client';
import { motion, AnimatePresence, Transition } from 'framer-motion';
import { useState, CSSProperties } from 'react';
import { cn } from '@/lib/utils';

type StaggerFrom = 'first' | 'last' | 'center';

interface LetterSwapProps {
  label: string;
  reverse?: boolean;
  staggerFrom?: StaggerFrom;
  staggerDuration?: number;
  transition?: Transition;
  className?: string;
  style?: CSSProperties;
}

// Returns per-letter delay based on staggerFrom
function getDelays(length: number, staggerFrom: StaggerFrom, staggerDuration: number): number[] {
  return Array.from({ length }, (_, i) => {
    if (staggerFrom === 'first') return i * staggerDuration;
    if (staggerFrom === 'last') return (length - 1 - i) * staggerDuration;
    // center
    const center = Math.floor(length / 2);
    return Math.abs(i - center) * staggerDuration;
  });
}

// ─── LetterSwapForward ──────────────────────────────────────────────────────
// Letters swap UP on hover IN. Reset instantly on hover OUT.
export function LetterSwapForward({
  label,
  reverse = true,
  staggerFrom = 'first',
  staggerDuration = 0.03,
  transition = { type: 'spring', duration: 0.5 },
  className,
  style,
}: LetterSwapProps) {
  const [hovered, setHovered] = useState(false);
  const chars = label.split('');
  const delays = getDelays(chars.length, staggerFrom, staggerDuration);
  const yOut = reverse ? '-100%' : '100%';
  const yIn = reverse ? '100%' : '-100%';

  return (
    <span
      className={cn('relative inline-flex overflow-hidden', className)}
      style={{ cursor: 'pointer', verticalAlign: 'middle', lineHeight: 1, ...style }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          style={{ position: 'relative', display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : undefined }}
        >
          {/* Visible row */}
          <motion.span
            style={{ display: 'block' }}
            animate={hovered ? { y: yOut, opacity: 0 } : { y: '0%', opacity: 1 }}
            transition={{ ...transition, delay: delays[i] }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
          {/* Clone row — slides in from opposite side */}
          <motion.span
            style={{ position: 'absolute', top: 0, left: 0, display: 'block' }}
            animate={hovered ? { y: '0%', opacity: 1 } : { y: yIn, opacity: 0 }}
            transition={{ ...transition, delay: delays[i] }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// ─── LetterSwapPingPong ─────────────────────────────────────────────────────
// Letters swap on hover IN and reverse on hover OUT.
export function LetterSwapPingPong({
  label,
  reverse = true,
  staggerFrom = 'first',
  staggerDuration = 0.03,
  transition = { type: 'spring', duration: 0.5 },
  className,
  style,
}: LetterSwapProps) {
  const [hovered, setHovered] = useState(false);
  const chars = label.split('');
  const delays = getDelays(chars.length, staggerFrom, staggerDuration);
  const yOut = reverse ? '-100%' : '100%';
  const yIn = reverse ? '100%' : '-100%';

  return (
    <span
      className={cn('relative inline-flex overflow-hidden', className)}
      style={{ cursor: 'pointer', verticalAlign: 'middle', lineHeight: 1, ...style }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          style={{ position: 'relative', display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : undefined }}
        >
          <motion.span
            style={{ display: 'block' }}
            animate={hovered ? { y: yOut, opacity: 0 } : { y: '0%', opacity: 1 }}
            transition={{ ...transition, delay: delays[i] }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
          <motion.span
            style={{ position: 'absolute', top: 0, left: 0, display: 'block' }}
            animate={hovered ? { y: '0%', opacity: 1 } : { y: yIn, opacity: 0 }}
            transition={{ ...transition, delay: delays[i] }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
