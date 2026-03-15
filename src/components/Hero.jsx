import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { BsArrowRight } from 'react-icons/bs';

/* ─────────────────────────────────────────────────────────────
   Custom typing-effect hook
   Cycles through `words`, types char-by-char then deletes,
   pauses at the completed word before deleting.
───────────────────────────────────────────────────────────── */
const useTyping = (words, typeSpeed = 100, deleteSpeed = 55, pause = 1800) => {
  const [text,       setText]       = useState('');
  const [wordIdx,    setWordIdx]     = useState(0);
  const [deleting,   setDeleting]   = useState(false);
  const [isPaused,   setIsPaused]   = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isPaused) return;

    const current = words[wordIdx];

    timerRef.current = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) {
          setIsPaused(true);
          setTimeout(() => { setIsPaused(false); setDeleting(true); }, pause);
        }
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === '') {
          setDeleting(false);
          setWordIdx((i) => (i + 1) % words.length);
        }
      }
    }, deleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timerRef.current);
  }, [text, deleting, isPaused, wordIdx, words, typeSpeed, deleteSpeed, pause]);

  return text;
};

/* ─────────────────────────────────────────────────────────────
   Framer Motion variants
───────────────────────────────────────────────────────────── */
const container = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};
const item = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

const ROLES = [
  'Web Developer',
  'Problem Solver',
  'CS Student @ LPU',
  'Aspiring Engineer',
  'Open-Source Enthusiast',
];

/* ─────────────────────────────────────────────────────────────
   Hero Section
───────────────────────────────────────────────────────────── */
const Hero = () => {
  const typed = useTyping(ROLES);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Ambient gradient blobs ─────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -left-48 w-[500px] h-[500px] glow-blob-purple opacity-70" />
        <div className="absolute -bottom-48 -right-48 w-[500px] h-[500px] glow-blob-cyan   opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[700px] h-[700px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)' }}
        />
      </div>

      {/* ── Subtle dot-grid overlay ────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ── Main content ───────────────────────────────────── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
        <motion.div variants={container} initial="hidden" animate="visible">

          {/* Available badge */}
          <motion.div variants={item} className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                             text-xs font-semibold tracking-wide uppercase
                             bg-green-500/10 border border-green-500/25 text-green-400">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Open to Opportunities
            </span>
          </motion.div>

          {/* ── Name ─────────────────────────────────────── */}
          <motion.h1
            variants={item}
            className="text-5xl sm:text-7xl lg:text-8xl font-black leading-none tracking-tight mb-6"
          >
            <span className="text-white">Hi, I'm&nbsp;</span>
            <span
              style={{
                background: 'linear-gradient(135deg, #a855f7, #ec4899, #22d3ee)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradientShift 5s ease infinite',
              }}
            >
              Abhimanyu
            </span>
          </motion.h1>

          {/* ── Typing text ──────────────────────────────── */}
          <motion.div
            variants={item}
            className="flex items-center justify-center gap-2 text-xl sm:text-2xl md:text-3xl
                       font-semibold text-gray-300 font-mono mb-6 h-10"
          >
            <span className="text-cyan-400">&lt;</span>
            <span className="min-w-[16ch] text-left">{typed}</span>
            <span className="w-[2px] h-7 bg-cyan-400 cursor-blink" />
            <span className="text-cyan-400">/&gt;</span>
          </motion.div>

          {/* ── Description ──────────────────────────────── */}
          <motion.p
            variants={item}
            className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Computer Science student passionate about crafting&nbsp;
            <span className="text-purple-400 font-medium">beautiful web experiences</span>
            &nbsp;and building&nbsp;
            <span className="text-cyan-400 font-medium">efficient software systems</span>.
            Always learning. Always building.
          </motion.p>

          {/* ── CTA buttons ──────────────────────────────── */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            {/* View Projects */}
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo('projects')}
              className="btn-grad group"
            >
              View Projects
              <BsArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>

            {/* Download Resume — update href to your actual resume path */}
            <motion.a
              href="/public/Abhimanyu.pdf"
              download
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              className="btn-outline"
            >
              <FaDownload size={13} />
              Download Resume
            </motion.a>

            {/* Contact */}
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo('contact')}
              className="btn-ghost"
            >
              <HiOutlineMail size={16} />
              Contact Me
            </motion.button>
          </motion.div>

          {/* ── Quick social row ─────────────────────────── */}
          <motion.div
            variants={item}
            className="flex items-center justify-center gap-3"
          >
            <span className="text-gray-600 text-xs tracking-wide">Find me on</span>
            {[
              /* ↓ Update these hrefs with your real profiles */
              { Icon: FaGithub,     href: 'https://github.com/Abhimanyu1905',            label: 'GitHub'   },
              { Icon: FaLinkedinIn, href: 'https://linkedin.com/in/abhimanyu0001',       label: 'LinkedIn' },
              { Icon: HiOutlineMail,href: 'mailto:abhimanyusep19@gmail.com',            label: 'Email'    },
            ].map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={label !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 flex items-center justify-center rounded-xl
                           glass text-gray-400 hover:text-white transition-all duration-200"
                aria-label={label}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Scroll indicator ─────────────────────────────── */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ delay: 1.8, duration: 0.6 }}
          onClick={() => scrollTo('about')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
                     text-gray-600 hover:text-gray-400 transition-colors duration-300"
          aria-label="Scroll to About"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          {/* Mouse icon with animated scroll dot */}
          <div className="w-5 h-8 border border-gray-700 rounded-full flex justify-center pt-1.5">
            <motion.span
              animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-2 rounded-full"
              style={{ background: 'linear-gradient(to bottom, #7c3aed, #06b6d4)' }}
            />
          </div>
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
