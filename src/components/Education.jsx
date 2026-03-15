import React from 'react';
import { motion } from 'framer-motion';
import { HiAcademicCap } from 'react-icons/hi';
import { BsBuilding, BsCalendar3, BsStarFill } from 'react-icons/bs';

/* ────────────────────────────────────────────────────────────
   Education data — add more entries as needed
────────────────────────────────────────────────────────────── */
const EDUCATION = [
  {
    id: 1,
    degree:      'B.Tech in Computer Science & Engineering',
    institution: 'Lovely Professional University',
    shortName:   'LPU',
    location:    'Punjab, India',
    period:      '2023 – 2027',
    status:      'Pursuing',
    cgpa:        '6.8 / 10',
    highlights: [
      'Core CS fundamentals: DSA, DBMS, OS, CN',
      'Web development & full-stack projects',
      'Collaborative project-based learning',
      'Active in coding communities & hackathons',
    ],
    gradient: 'from-purple-600 to-cyan-500',
    glow:     'rgba(124,58,237,0.25)',
  },
];

/* ── Framer variants ── */
const lineVariant = {
  hidden:  { scaleY: 0, originY: 0 },
  visible: { scaleY: 1, transition: { duration: 1.2, ease: 'easeInOut' } },
};
const cardVariant = {
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Education — animated vertical timeline.
 */
const Education = () => (
  <section id="education" className="relative section-pad overflow-hidden">
    {/* Decorative blobs */}
    <div className="absolute bottom-0 right-0 w-80 h-80 glow-blob-cyan opacity-15 pointer-events-none" />
    <div className="absolute top-0  left-0  w-80 h-80 glow-blob-purple opacity-10 pointer-events-none" />

    <div className="max-w-4xl mx-auto">
      {/* ── Heading ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-400 mb-3">
          Academic background
        </p>
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
          My{' '}
          <span className="gradient-text heading-underline">Education</span>
        </h2>
        <p className="text-gray-400 max-w-lg mx-auto">
          The academic foundation behind my skills and projects.
        </p>
      </motion.div>

      {/* ── Timeline ──────────────────────────────────── */}
      <div className="relative">
        {/* Vertical line */}
        <motion.div
          variants={lineVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="absolute left-6 top-0 bottom-0 w-0.5 timeline-line rounded-full"
          style={{ transformOrigin: 'top' }}
        />

        {EDUCATION.map((edu, i) => (
          <motion.div
            key={edu.id}
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative pl-16 pb-12 last:pb-0"
          >
            {/* ── Timeline dot ──────────────────────── */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3, type: 'spring', stiffness: 200 }}
              className="absolute left-0 top-1 w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, #7c3aed, #06b6d4)`,
                boxShadow:  edu.glow ? `0 0 20px ${edu.glow}` : 'none',
              }}
            >
              <HiAcademicCap size={22} className="text-white" />
            </motion.div>

            {/* ── Card ─────────────────────────────── */}
            <motion.div
              whileHover={{ y: -4, boxShadow: `0 20px 50px ${edu.glow}` }}
              transition={{ duration: 0.3 }}
              className="glass rounded-3xl p-6 sm:p-8"
            >
              {/* Status badge */}
              <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: 'rgba(34,197,94,0.1)',
                    border:     '1px solid rgba(34,197,94,0.25)',
                    color:      '#4ade80',
                  }}
                >
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  {edu.status}
                </span>

                {/* CGPA chip */}
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: 'rgba(124,58,237,0.12)',
                    border:     '1px solid rgba(124,58,237,0.25)',
                    color:      '#c4b5fd',
                  }}
                >
                  <BsStarFill size={10} />
                  CGPA: {edu.cgpa}
                </span>
              </div>

              {/* Degree */}
              <h3
                className="text-xl sm:text-2xl font-black mb-2"
                style={{
                  background: `linear-gradient(135deg, #a855f7, #22d3ee)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor:  'transparent',
                  backgroundClip:       'text',
                }}
              >
                {edu.degree}
              </h3>

              {/* Meta row */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
                <span className="flex items-center gap-1.5">
                  <BsBuilding size={13} className="text-purple-400" />
                  {edu.institution}
                </span>
                <span className="flex items-center gap-1.5">
                  <BsCalendar3 size={12} className="text-cyan-400" />
                  {edu.period}
                </span>
              </div>

              {/* Highlights grid */}
              <div className="grid sm:grid-cols-2 gap-2">
                {edu.highlights.map((h) => (
                  <div
                    key={h}
                    className="flex items-start gap-2.5 p-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.03)' }}
                  >
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: 'linear-gradient(135deg, #a855f7, #22d3ee)' }}
                    />
                    <span className="text-gray-300 text-sm">{h}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Education;
