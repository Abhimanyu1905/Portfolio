import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SiCplusplus, SiJavascript, SiHtml5, SiCss,
} from 'react-icons/si';
import {
  FaBrain, FaUsers, FaSearch, FaLightbulb,
} from 'react-icons/fa';
import { BsDatabase, BsCodeSlash } from 'react-icons/bs';

/* ────────────────────────────────────────────────────────────
   Skill data
────────────────────────────────────────────────────────────── */
const SKILLS = [
  // Programming
  { name: 'C++',          cat: 'Programming', Icon: SiCplusplus,  level: 70, color: '#00599C', bg: 'rgba(0,89,156,0.12)'     },
  { name: 'JavaScript',   cat: 'Programming', Icon: SiJavascript, level: 75, color: '#F7DF1E', bg: 'rgba(247,223,30,0.1)'    },
  // Web Dev
  { name: 'HTML5',        cat: 'Web Dev',     Icon: SiHtml5,      level: 88, color: '#E34F26', bg: 'rgba(227,79,38,0.1)'     },
  { name: 'CSS3',         cat: 'Web Dev',     Icon: SiCss,       level: 82, color: '#1572B6', bg: 'rgba(21,114,182,0.1)'    },
  { name: 'REST APIs',    cat: 'Web Dev',     Icon: BsCodeSlash,  level: 65, color: '#06b6d4', bg: 'rgba(6,182,212,0.1)'     },
  // Database
  { name: 'SQL',          cat: 'Database',    Icon: BsDatabase,   level: 70, color: '#336791', bg: 'rgba(51,103,145,0.12)'   },
  // Soft Skills
  { name: 'Problem Solving',       cat: 'Soft Skills', Icon: FaBrain,     level: 88, color: '#a855f7', bg: 'rgba(168,85,247,0.1)'  },
  { name: 'Team Collaboration',    cat: 'Soft Skills', Icon: FaUsers,     level: 90, color: '#22d3ee', bg: 'rgba(34,211,238,0.1)'  },
  { name: 'Adaptability',          cat: 'Soft Skills', Icon: FaLightbulb, level: 85, color: '#f472b6', bg: 'rgba(244,114,182,0.1)' },
  { name: 'Attention to Detail',   cat: 'Soft Skills', Icon: FaSearch,    level: 80, color: '#fbbf24', bg: 'rgba(251,191,36,0.1)'  },
];

const CATEGORIES = ['All', 'Programming', 'Web Dev', 'Database', 'Soft Skills'];

/* ── Animated progress bar (triggers when card enters view) ── */
const SkillBar = ({ level, color }) => (
  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: `${level}%` }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1.4, ease: 'easeOut', delay: 0.1 }}
      className="h-full rounded-full skill-bar"
    />
  </div>
);

/* ── Single skill card ── */
const SkillCard = ({ skill, index }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.85 }}
    transition={{ duration: 0.35, delay: index * 0.04 }}
    whileHover={{ y: -6, boxShadow: `0 0 28px ${skill.color}33` }}
    className="glass rounded-2xl p-5 cursor-default group transition-all duration-300"
    style={{ borderColor: `${skill.color}22` }}
  >
    {/* Icon */}
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
      style={{ background: skill.bg }}
    >
      <skill.Icon size={24} style={{ color: skill.color }} />
    </div>

    {/* Name + level label */}
    <div className="flex items-center justify-between mb-3">
      <span className="text-white font-semibold text-sm">{skill.name}</span>
      <span className="text-xs font-mono text-gray-500">{skill.level}%</span>
    </div>

    {/* Progress bar */}
    <SkillBar level={skill.level} color={skill.color} />
  </motion.div>
);

/**
 * Skills — filterable grid of skill cards with animated progress bars.
 */
const Skills = () => {
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? SKILLS
    : SKILLS.filter((s) => s.cat === active);

  return (
    <section id="skills" className="relative section-pad overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute bottom-0 left-0 w-96 h-96 glow-blob-cyan opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* ── Heading ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400 mb-3">
            What I work with
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            My{' '}
            <span className="gradient-text heading-underline">Skills</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            A snapshot of the technologies and soft skills I've developed on my learning journey.
          </p>
        </motion.div>

        {/* ── Filter tabs ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-250
                ${active === cat
                  ? 'text-white shadow-glow-purple'
                  : 'glass text-gray-400 hover:text-white'
                }`}
              style={active === cat
                ? { background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }
                : {}
              }
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* ── Skill cards grid ────────────────────────── */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Bottom note ─────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-600 text-xs mt-10"
        >
          Skill levels are self-assessed and reflect current proficiency.
        </motion.p>
      </div>
    </section>
  );
};

export default Skills;
