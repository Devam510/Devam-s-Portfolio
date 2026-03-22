import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ParticleBackground from './ParticleBackground';
import './Hero.css';

export default function Hero() {
  const heroRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const subtitleRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.from(line1Ref.current, { y: 100, opacity: 0, duration: 1, ease: 'power4.out' })
      .from(line2Ref.current, { y: 100, opacity: 0, duration: 1, ease: 'power4.out' }, '-=0.7')
      .from(subtitleRef.current, { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .from(scrollRef.current, { opacity: 0, duration: 0.6 }, '-=0.3');
  }, []);

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <ParticleBackground />
      <div className="hero-content container">
        <div className="hero-eyebrow">
          <span className="mono-tag">Based in Ahmedabad, India</span>
        </div>
        <div className="hero-name-wrap">
          <h1 className="hero-name">
            <span className="hero-line" ref={line1Ref}>Devam</span>
            <span className="hero-line hero-line--accent" ref={line2Ref}>Patel</span>
          </h1>
        </div>
        <p className="hero-subtitle" ref={subtitleRef}>
          Data Science&nbsp;&nbsp;·&nbsp;&nbsp;AI Systems&nbsp;&nbsp;·&nbsp;&nbsp;Quant Finance
        </p>
        <div className="hero-ctas">
          <a href="#projects" className="btn btn-primary" onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior:'smooth' }); }}>
            View Work <span>↓</span>
          </a>
          <a href="#contact" className="btn btn-outline" onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior:'smooth' }); }}>
            Get in touch
          </a>
        </div>
      </div>
      <div className="scroll-indicator" ref={scrollRef}>
        <span className="scroll-text">Scroll</span>
        <div className="scroll-line"><div className="scroll-dot"></div></div>
      </div>
    </section>
  );
}
