import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import { ThemeProvider } from './context/ThemeContext';
import LoadingScreen     from './components/LoadingScreen';
import ParticleBackground from './components/ParticleBackground';
import ScrollProgress    from './components/ScrollProgress';
import ScrollToTop       from './components/ScrollToTop';
import Navbar            from './components/Navbar';
import Hero              from './components/Hero';
import About             from './components/About';
import Skills            from './components/Skills';
import Projects          from './components/Projects';
import Education         from './components/Education';
import Contact           from './components/Contact';
import Footer            from './components/Footer';

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loading screen for 2.5 s then reveal portfolio
    const t = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* Animated loading screen mounts/unmounts cleanly */}
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {/* Main site — always rendered but hidden behind loader */}
      {!isLoading && (
        <div className="relative min-h-screen noise">
          {/* Ambient particle canvas (fixed, z-0) */}
          <ParticleBackground />

          {/* Scroll progress bar (fixed, top) */}
          <ScrollProgress />

          {/* Navigation */}
          <Navbar />

          {/* All page sections */}
          <main className="relative z-10">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Education />
            <Contact />
          </main>

          <Footer />

          {/* Floating scroll-to-top FAB */}
          <ScrollToTop />
        </div>
      )}
    </>
  );
}

/**
 * App — root wrapper that provides the theme context.
 */
export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
