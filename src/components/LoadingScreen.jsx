import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * LoadingScreen — shown for ~2.5 s while the portfolio initialises.
 * Features: rotating conic-gradient ring, pulsing "A" initial,
 * animated progress bar, and a smooth framer-motion fade-out.
 */
const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate asset loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 18 + 5;
        if (next >= 100) { clearInterval(interval); return 100; }
        return next;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050816] overflow-hidden"
    >
      {/* Ambient blobs */}
      <div className="absolute -top-32 -left-32 w-80 h-80 glow-blob-purple opacity-60" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 glow-blob-cyan opacity-60" />

      <div className="relative flex flex-col items-center gap-8">
        {/* ── Logo ring ── */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Outer conic ring — spins clockwise */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, #7c3aed, #ec4899, #06b6d4, #7c3aed)',
              padding: '3px',
            }}
          >
            {/* Mask inner circle to create ring effect */}
            <div className="w-full h-full rounded-full bg-[#050816]" />
          </motion.div>

          {/* Inner dashed ring — spins counter-clockwise */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-4 rounded-full border border-dashed border-purple-500/25"
          />

          {/* Centre "A" initial with glow pulse */}
          <motion.span
            animate={{
              textShadow: [
                '0 0 8px rgba(168,85,247,0.5)',
                '0 0 24px rgba(6,182,212,0.9)',
                '0 0 8px rgba(168,85,247,0.5)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="relative text-5xl font-black font-mono"
            style={{
              background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            A
          </motion.span>
        </div>

        {/* ── Label ── */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 text-xs tracking-[0.35em] uppercase font-mono"
        >
          Initialising portfolio…
        </motion.p>

        {/* ── Progress bar ── */}
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${Math.min(progress, 100)}%`,
              background: 'linear-gradient(90deg, #7c3aed, #ec4899, #06b6d4)',
              backgroundSize: '200% 100%',
              animation: 'gradientShift 2s ease infinite',
            }}
          />
        </div>

        {/* ── Percentage ── */}
        <motion.p
          className="text-gray-600 text-xs font-mono tabular-nums"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {Math.min(Math.round(progress), 100)}%
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
