import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaHeart } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

const SOCIALS = [
  { Icon: FaGithub,     href: 'https://github.com/abhimanyu',      label: 'GitHub'   },
  { Icon: FaLinkedinIn, href: 'https://linkedin.com/in/abhimanyu', label: 'LinkedIn' },
  { Icon: HiOutlineMail,href: 'mailto:abhimanyu@example.com',      label: 'Email'    },
];

const NAV_LINKS = [
  { label: 'Home',      id: 'home'      },
  { label: 'About',     id: 'about'     },
  { label: 'Skills',    id: 'skills'    },
  { label: 'Projects',  id: 'projects'  },
  { label: 'Education', id: 'education' },
  { label: 'Contact',   id: 'contact'   },
];

/**
 * Footer — gradient top border, logo, navigation links,
 * social icons, and copyright line.
 */
const Footer = () => {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="relative overflow-hidden">
      {/* Gradient top border */}
      <div
        className="h-px w-full"
        style={{ background: 'linear-gradient(90deg, transparent, #7c3aed, #ec4899, #06b6d4, transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center gap-8">
          {/* ── Logo ─────────────────────────────────── */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollTo('home')}
            className="flex items-center gap-2.5"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-xl font-mono"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}
            >
              A
            </div>
            <span className="font-bold text-white text-lg">Abhimanyu</span>
          </motion.button>

          {/* ── Navigation links ─────────────────────── */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-gray-500 hover:text-white text-sm transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* ── Social icons ─────────────────────────── */}
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 flex items-center justify-center rounded-xl
                           glass text-gray-400 hover:text-white transition-all duration-200"
                aria-label={label}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px w-32 bg-white/5" />

          {/* ── Copyright ────────────────────────────── */}
          <p className="text-gray-600 text-sm text-center">
            Designed &amp; built with{' '}
            <FaHeart className="inline-block text-pink-500 mx-1" size={12} />
            by{' '}
            <span
              className="font-semibold"
              style={{
                background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor:  'transparent',
                backgroundClip:       'text',
              }}
            >
              Abhimanyu
            </span>
            {' · '}
            {new Date().getFullYear()}
          </p>

          <p className="text-gray-700 text-xs">
            React · TailwindCSS · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
