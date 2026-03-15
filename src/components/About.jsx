import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaUsers, FaBrain, FaLightbulb } from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi';
import { BsCheckCircleFill } from 'react-icons/bs';

/* ── Stats displayed below the profile card ── */
const STATS = [
  { value: '2+',  label: 'Years Learning'   },
  { value: '2',   label: 'Projects Built'   },
  { value: '5+',  label: 'Technologies'     },
  { value: '6.8', label: 'CGPA'             },
];

/* ── Personality traits ── */
const TRAITS = [
  { Icon: FaBrain,        label: 'Problem Solver',       color: '#a855f7' },
  { Icon: FaUsers,        label: 'Team Collaborator',    color: '#22d3ee' },
  { Icon: FaLightbulb,    label: 'Adaptable Learner',    color: '#f472b6' },
  { Icon: FaCode,         label: 'Clean Code Advocate',  color: '#34d399' },
];

/* ── Framer variants ── */
const fadeLeft  = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } };
const fadeRight = { hidden: { opacity: 0, x:  40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } };
const stagger   = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp    = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

/**
 * About — bio on the left, animated floating profile card on the right.
 */
const About = () => (
  <section id="about" className="relative section-pad overflow-hidden">
    {/* Decorative blobs */}
    <div className="absolute top-0 right-0 w-96 h-96 glow-blob-purple opacity-20 pointer-events-none" />

    <div className="max-w-7xl mx-auto">
      {/* ── Heading ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-400 mb-3">
          Get to know me
        </p>
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
          About{' '}
          <span className="gradient-text heading-underline">Me</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          A little bit about my background, mindset, and what drives me.
        </p>
      </motion.div>

      {/* ── Two-column layout ─────────────────────────── */}
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* ── Left: bio text ──────────────────────────── */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-6"
        >
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            I'm <span className="text-white font-semibold">Abhimanyu</span>, a second-year
            B.Tech Computer Science &amp; Engineering student at{' '}
            <span className="text-purple-400 font-semibold">Lovely Professional University</span>.
            I'm deeply passionate about web development and software engineering, driven by
            a curiosity to understand how things work and a desire to build meaningful
            digital experiences.
          </p>

          <p className="text-gray-400 text-base leading-relaxed">
            My journey started with learning the fundamentals of HTML, CSS, and JavaScript,
            which quickly evolved into building full-stack web applications. I enjoy solving
            complex problems and translating them into clean, efficient code. I believe great
            software is built through collaboration, continuous learning, and attention to detail.
          </p>

          {/* Bullet highlights */}
          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-3"
          >
            {[
              'B.Tech CS&E at LPU (2023 – 2027)',
              'Strong foundation in web technologies',
              'Passionate about clean, maintainable code',
              'Adaptable team player with a growth mindset',
            ].map((point) => (
              <motion.li
                key={point}
                variants={fadeUp}
                className="flex items-start gap-3 text-gray-300 text-sm"
              >
                <BsCheckCircleFill className="text-purple-400 mt-0.5 shrink-0" size={15} />
                {point}
              </motion.li>
            ))}
          </motion.ul>

          {/* Trait chips */}
          <div className="flex flex-wrap gap-3 pt-2">
            {TRAITS.map(({ Icon, label, color }) => (
              <motion.div
                key={label}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-gray-300"
              >
                <Icon size={14} style={{ color }} />
                {label}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Right: animated profile card ────────────── */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative">
            {/* Animated ring behind card */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-[-20px] rounded-3xl border border-dashed border-purple-500/20"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-[-36px] rounded-3xl border border-dashed border-cyan-500/10"
            />

            {/* Card */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative glass rounded-3xl p-8 w-72 sm:w-80 shadow-card"
            >
              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div
                    className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl font-black text-white"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}
                  >
                    A 
                  </div>
                  {/* Online dot */}
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-[#050816]" />
                </div>
              </div>

              {/* Name & title */}
              <div className="text-center mb-6">
                <h3 className="text-white font-bold text-xl">Abhimanyu</h3>
                <p className="text-gray-400 text-sm mt-1 flex items-center justify-center gap-1.5">
                  <HiAcademicCap size={14} className="text-purple-400" />
                  CS Student @ LPU
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/8 mb-6" />

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {STATS.map(({ value, label }) => (
                  <div key={label} className="text-center">
                    <p
                      className="text-2xl font-black"
                      style={{
                        background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {value}
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5">{label}</p>
                  </div>
                ))}
              </div>

              {/* Status bar */}
              <div className="mt-6 flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-2.5">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shrink-0" />
                <span className="text-green-400 text-xs font-medium">Available for internships</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default About;
