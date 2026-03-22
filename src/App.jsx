import { useState, useEffect, useCallback } from 'react';
import './styles/global.css';

import Cursor from './components/Cursor';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MinimalistHeroDemo from './components/ui/minimalist-hero-demo';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Availability from './components/Availability';
import Contact from './components/Contact';
import Footer from './components/Footer';


export default function App() {
  const [loaded, setLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
    document.body.classList.remove('loading');
  }, []);

  useEffect(() => {
    document.body.classList.add('loading');
    // Force manual scroll restoration to begin at exactly top 0px on hard refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Cursor />
      {!loaded && <Loader onComplete={handleLoadComplete} />}
      {loaded && (
        <div className="app-container">
          <Navbar />
          <main>
            <MinimalistHeroDemo />
            <Skills />
            <Projects />
            <Availability />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}
