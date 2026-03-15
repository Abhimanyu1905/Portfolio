import React, { useState, useEffect } from 'react';

/**
 * ScrollProgress — a slim fixed bar at the very top of the viewport.
 * Width represents how far the user has scrolled down the page.
 */
const ScrollProgress = () => {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      setPct(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    /* Track */
    <div className="fixed top-0 left-0 w-full h-[3px] z-[9998] bg-transparent">
      {/* Fill */}
      <div
        className="h-full transition-[width] duration-75 ease-out"
        style={{
          width: `${pct}%`,
          background: 'linear-gradient(90deg, #7c3aed, #ec4899, #06b6d4)',
        }}
      />
    </div>
  );
};

export default ScrollProgress;
