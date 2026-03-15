import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { BsCheckLg } from 'react-icons/bs';

/* ────────────────────────────────────────────────────────────
   Project data
   Update `github` and `demo` hrefs with your real links.
────────────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 1,
    title: 'ChickenWorld',
    category: 'Web Platform',
    tagline: 'Multi-role vendor management platform',
    description:
      'A full-featured web platform with Customer, Vendor, and Admin modules for managing products, orders, and real-time status updates — built with pure web technologies and SQL.',
    features: [
      'Role-based access control (Customer · Vendor · Admin)',
      'Vendor product management & inventory',
      'Order tracking with live status updates',
      'SQL-powered data management',
      'Deployed on Vercel',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'SQL', 'GitHub', 'Vercel'],
    github: 'https://github.com/abhimanyu',   // ← update
    demo:   '#',                                // ← update
    gradient: 'from-orange-500 to-red-500',
    glow:     'rgba(249,115,22,0.2)',
    border:   'rgba(249,115,22,0.2)',
    iconBg:   'rgba(249,115,22,0.1)',
    number:   '01',
  },
  {
    id: 2,
    title: 'PlayPoints',
    category: 'Dashboard',
    tagline: 'Gaming dashboard with rewards & leaderboard',
    description:
      'An interactive gaming dashboard featuring a point-based reward system, dynamic leaderboard, and real-time score updates — with separate User and Admin views.',
    features: [
      'User and Admin module separation',
      'Points reward & redemption system',
      'Dynamic leaderboard with live rankings',
      'Real-time score updates',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'SQL'],
    github: 'https://github.com/abhimanyu',   // ← update
    demo:   '#',                                // ← update
    gradient: 'from-purple-500 to-pink-500',
    glow:     'rgba(168,85,247,0.2)',
    border:   'rgba(168,85,247,0.2)',
    iconBg:   'rgba(168,85,247,0.1)',
    number:   '02',
  },
];

const FILTERS = ['All', 'Web Platform', 'Dashboard'];

/* ── Single project card ── */
const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="glass rounded-3xl overflow-hidden group transition-all duration-300"
      style={{
        borderColor: hovered ? project.border : 'rgba(255,255,255,0.06)',
        boxShadow:   hovered ? `0 20px 60px ${project.glow}` : 'none',
      }}
    >
      {/* ── Card header ───────────────────────────────── */}
      <div
        className={`relative h-40 bg-gradient-to-br ${project.gradient} opacity-90 overflow-hidden`}
      >
        {/* Decorative number watermark */}
        <span
          className="absolute -right-4 -bottom-6 text-[120px] font-black leading-none select-none"
          style={{ color: 'rgba(255,255,255,0.06)' }}
        >
          {project.number}
        </span>

        {/* Category pill */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-black/30 text-white text-xs font-semibold backdrop-blur-sm">
            {project.category}
          </span>
        </div>

        {/* Gradient shine on hover */}
        <motion.div
          animate={{ x: hovered ? '100%' : '-100%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
        />
      </div>

      {/* ── Card body ─────────────────────────────────── */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <div>
          <h3 className="text-white font-black text-xl">{project.title}</h3>
          <p className="text-gray-400 text-sm mt-1">{project.tagline}</p>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Features list */}
        <ul className="space-y-1.5">
          {project.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-gray-300 text-xs">
              <BsCheckLg className="text-green-400 mt-0.5 shrink-0" size={11} />
              {f}
            </li>
          ))}
        </ul>

        {/* Tech stack chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium"
              style={{
                background: project.iconBg,
                color: '#e2e8f0',
                border: `1px solid ${project.border}`,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex gap-3 pt-2">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                       glass border-white/10 text-gray-300 hover:text-white text-sm font-semibold
                       transition-all duration-200 hover:bg-white/8"
          >
            <FiGithub size={15} /> GitHub
          </motion.a>
          <motion.a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                       text-white text-sm font-semibold transition-all duration-200"
            style={{ background: `linear-gradient(135deg, ${project.gradient.includes('orange') ? '#f97316,#ef4444' : '#a855f7,#ec4899'})` }}
          >
            <FiExternalLink size={14} /> Live Demo
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
};

/**
 * Projects — filter bar + animated grid of project cards.
 */
const Projects = () => {
  const [filter, setFilter] = useState('All');

  const visible = filter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative section-pad overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-1/2 right-0 w-96 h-96 glow-blob-purple opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* ── Heading ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-pink-400 mb-3">
            What I've built
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Featured{' '}
            <span className="gradient-text heading-underline">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Hands-on projects where I applied my skills to solve real problems.
          </p>
        </motion.div>

        {/* ── Filter tabs ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {FILTERS.map((f) => (
            <motion.button
              key={f}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200
                ${filter === f
                  ? 'text-white shadow-glow-pink'
                  : 'glass text-gray-400 hover:text-white'
                }`}
              style={filter === f
                ? { background: 'linear-gradient(135deg, #7c3aed, #ec4899)' }
                : {}
              }
            >
              {f}
            </motion.button>
          ))}
        </motion.div>

        {/* ── Project grid ─────────────────────────────── */}
        <motion.div layout className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── More coming banner ──────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 glass px-6 py-3 rounded-2xl text-gray-400 text-sm">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            More projects coming soon — stay tuned!
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
