import { useEffect, useRef } from 'react';
import './Cursor.css';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let raf;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      raf = requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      ringRef.current?.classList.add('cursor-ring--hover');
      dotRef.current?.classList.add('cursor-dot--hover');
    };
    const onLeaveLink = () => {
      ringRef.current?.classList.remove('cursor-ring--hover');
      dotRef.current?.classList.remove('cursor-dot--hover');
    };

    document.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    raf = requestAnimationFrame(animate);
    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef}></div>
      <div className="cursor-ring" ref={ringRef}></div>
    </>
  );
}
