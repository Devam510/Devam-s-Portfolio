import { useRef } from 'react';
import { projects } from '../data/projects';
import ExpandOnHover from './ui/expand-cards';
import './Projects.css';

export default function Projects() {
  const sectionRef = useRef(null);

  return (
    <section className="projects" id="projects" ref={sectionRef}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full px-5 gap-8">
          <div style={{ textAlign: 'left' }}>
            <p style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', letterSpacing: '0.2em', fontSize: '0.85rem', textTransform: 'uppercase', color: '#71717a', fontWeight: '600' }}>
              <span style={{ display: 'inline-block', width: '40px', height: '2px', backgroundColor: '#18181b' }}></span>
              Selected Work
            </p>
            <h2 className="section-title" style={{ marginTop: '24px', fontSize: 'clamp(80px, 10vw, 140px)', lineHeight: '0.85', color: '#18181b', margin: 0 }}>
              <span style={{ fontWeight: 300, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
                THINGS I<br/>HAVE BUILT
              </span>
            </h2>
          </div>
          {/* --- GITHUB LINK POSITION CONTROLS --- */}
          {/* Change these exact pixel values to physically drag the text in any direction! */}
          <div 
            className="font-mono text-xs md:text-sm text-[#a1a1aa] mb-2"
            style={{ 
              position: 'relative',
              top: '40px',    /* Vertical: change to -20px to move UP, or 50px to move DOWN */
              right: '40px',  /* Horizontal: change to 50px to move LEFT, or -20px to move RIGHT */
              zIndex: 10
            }}
          >
            <a 
              href="https://github.com/Devam510" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="uppercase tracking-[0.2em] hover:text-[#18181b] transition-colors flex items-center gap-2 border-b border-[#e4e4e7] hover:border-[#18181b] pb-1 cursor-pointer"
            >
              View all on Github ↗
            </a>
          </div>
        </div>
        
        {/* Physical Spacer to Bypass Line-Height Bleed */}
        <div className="mobile-gap" style={{ display: 'block', height: '50px', width: '100%', flexShrink: 0 }}></div>

        <div className="w-full overflow-hidden pb-32">
          <ExpandOnHover items={projects} />
        </div>
      </div>
    </section>
  );
}
