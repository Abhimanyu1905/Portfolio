import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const NAV_LINKS = [
  { label: 'Home',      id: 'home'      },
  { label: 'About',     id: 'about'     },
  { label: 'Skills',    id: 'skills'    },
  { label: 'Projects',  id: 'projects'  },
  { label: 'Education', id: 'education' },
  { label: 'Contact',   id: 'contact'   },
];

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

/**
 * Navbar — sticky at top, becomes glassy after scrolling 50 px.
 * Tracks active section via scroll position.
 * Mobile: collapsible drawer with staggered link animation.
 */
const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [activeId,    setActiveId]    = useState('home');

  /* ── Scroll events ─────────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine which section is currently in view
      const ids = NAV_LINKS.map((l) => l.id).reverse();
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveId(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Close mobile menu on resize ───────────────── */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleLink = (id) => { scrollTo(id); setMenuOpen(false); };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-[3px] left-0 right-0 z-50 transition-all duration-300
          ${scrolled
            ? 'bg-black/70 backdrop-blur-2xl border-b border-white/10 shadow-lg'
            : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* ── Logo ─────────────────────────────────── */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => handleLink('home')}
            className="flex items-center gap-2.5 group"
            aria-label="Go to top"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-lg font-mono shadow-glow-purple"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}
            >
              A
            </div>
            <span className="hidden sm:block font-bold text-white text-base group-hover:text-purple-300 transition-colors duration-200">
              Abhimanyu
            </span>
          </motion.button>

          {/* ── Desktop links ────────────────────────── */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLink(link.id)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${activeId === link.id
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                  }`}
              >
                {/* Active underline */}
                {activeId === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-white/8"
                    style={{ zIndex: -1 }}
                  />
                )}
                {link.label}
                {activeId === link.id && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                    style={{ background: 'linear-gradient(90deg, #7c3aed, #06b6d4)' }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* ── Right controls ───────────────────────── */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-yellow-300 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
            </motion.button>

            {/* Hamburger (mobile) */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-200"
              aria-label="Toggle navigation"
            >
              {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile drawer ─────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed top-[67px] left-4 right-4 z-50 md:hidden
                         rounded-2xl bg-[#0d1117]/95 backdrop-blur-2xl
                         border border-white/10 shadow-card overflow-hidden"
            >
              <div className="p-4 space-y-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0  }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleLink(link.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                      transition-all duration-200 text-left
                      ${activeId === link.id
                        ? 'bg-purple-500/15 text-purple-300'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                  >
                    {activeId === link.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    )}
                    {link.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
