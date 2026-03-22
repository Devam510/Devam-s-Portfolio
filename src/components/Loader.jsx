import { useEffect, useRef } from 'react';
import './Loader.css';

export default function Loader({ onComplete }) {
  const barRef = useRef(null);
  const counterRef = useRef(null);
  const loaderRef = useRef(null);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count += Math.random() * 8 + 2;
      if (count >= 100) {
        count = 100;
        clearInterval(interval);
        setTimeout(() => {
          loaderRef.current.style.opacity = '0';
          loaderRef.current.style.pointerEvents = 'none';
          setTimeout(onComplete, 600);
        }, 400);
      }
      const rounded = Math.min(Math.floor(count), 100);
      if (counterRef.current) counterRef.current.textContent = rounded;
      if (barRef.current) barRef.current.style.width = `${rounded}%`;
    }, 60);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="loader" ref={loaderRef}>
      <div className="loader-inner">
        <div className="loader-name">Devam Patel</div>
        <div className="loader-bar-wrap">
          <div className="loader-bar" ref={barRef}></div>
        </div>
        <div className="loader-counter">
          <span ref={counterRef}>0</span>%
        </div>
      </div>
    </div>
  );
}
