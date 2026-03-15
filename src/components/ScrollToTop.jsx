import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

/**
 * ScrollToTop — floating action button (bottom-right).
 * Appears when the user scrolls past 400 px.
 * Smooth-scrolls back to top on click.
 */
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="stt"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0,  scale: 1   }}
          exit={{    opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          whileHover={{ scale: 1.15, boxShadow: '0 0 24px rgba(124,58,237,0.6)' }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center
                     rounded-2xl text-white shadow-glow-purple"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}
          aria-label="Scroll to top"
        >
          <FaArrowUp size={15} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
