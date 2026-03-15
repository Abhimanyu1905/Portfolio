import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaPhone } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { BsCheckCircleFill, BsSendFill } from 'react-icons/bs';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

/* ────────────────────────────────────────────────────────────
   Contact info — update with your real details
────────────────────────────────────────────────────────────── */
const CONTACT_INFO = [
  {
    Icon:    HiOutlineMail,
    label:   'Email',
    value:   'abhimanyu@example.com',   // ← update
    href:    'mailto:abhimanyu@example.com',
    color:   '#a855f7',
    bg:      'rgba(168,85,247,0.1)',
  },
  {
    Icon:    FaPhone,
    label:   'Phone',
    value:   '+91 XXXXX XXXXX',          // ← update
    href:    'tel:+91XXXXXXXXXX',
    color:   '#22d3ee',
    bg:      'rgba(34,211,238,0.1)',
  },
  {
    Icon:    FaLinkedinIn,
    label:   'LinkedIn',
    value:   'linkedin.com/in/abhimanyu', // ← update
    href:    'https://linkedin.com/in/abhimanyu',
    color:   '#0ea5e9',
    bg:      'rgba(14,165,233,0.1)',
  },
  {
    Icon:    FaGithub,
    label:   'GitHub',
    value:   'github.com/abhimanyu',      // ← update
    href:    'https://github.com/abhimanyu',
    color:   '#e2e8f0',
    bg:      'rgba(226,232,240,0.07)',
  },
];

/* ── Animated form field ── */
const FormField = ({ label, id, type = 'text', rows, value, onChange, required }) => {
  const [focused, setFocused] = useState(false);
  const Tag = rows ? 'textarea' : 'input';

  return (
    <div className="relative">
      <Tag
        id={id}
        name={id}
        type={type}
        rows={rows}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={label}
        className={`form-input font-medium resize-none transition-all duration-300
          ${rows ? 'min-h-[120px]' : ''}`}
        style={{
          borderColor: focused ? '#7c3aed' : undefined,
          boxShadow:   focused ? '0 0 0 2px rgba(124,58,237,0.2)' : undefined,
        }}
      />
      {/* Animated focus border glow */}
      <AnimatePresence>
        {focused && (
          <motion.span
            key="glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{ boxShadow: '0 0 0 2px rgba(124,58,237,0.25)' }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * Contact — left: contact info cards, right: animated email form.
 * Form submission is simulated (integrate with EmailJS / Formspree / backend as needed).
 */
const Contact = () => {
  const [form,        setForm]        = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting,  setSubmitting]  = useState(false);
  const [submitted,   setSubmitted]   = useState(false);
  const [error,       setError]       = useState('');

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    // ── Replace this block with real API call (e.g. EmailJS) ──
    await new Promise((r) => setTimeout(r, 1600));
    // ──────────────────────────────────────────────────────────
    setSubmitting(false);
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <section id="contact" className="relative section-pad overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0  w-80 h-80 glow-blob-purple opacity-15 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 glow-blob-cyan   opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* ── Heading ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400 mb-3">
            Let's connect
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Get In{' '}
            <span className="gradient-text heading-underline">Touch</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Have a project in mind, want to collaborate, or just say hi?
            My inbox is always open.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* ── Left: contact info ───────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <p className="text-gray-400 text-base leading-relaxed mb-6">
              I'm currently open to internship and freelance opportunities. Whether you
              have a question, a project idea, or just want to connect — feel free to
              reach out through any of the channels below.
            </p>

            {CONTACT_INFO.map(({ Icon, label, value, href, color, bg }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 6, boxShadow: `0 0 20px ${color}30` }}
                className="flex items-center gap-4 glass rounded-2xl p-4 group transition-all duration-300"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0
                             transition-transform duration-300 group-hover:scale-110"
                  style={{ background: bg }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wide">{label}</p>
                  <p className="text-white font-medium text-sm">{value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* ── Right: contact form ──────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass rounded-3xl p-6 sm:p-8">
              {/* Success state */}
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center text-center py-8 gap-4"
                  >
                    <motion.div
                      animate={{ scale: [0.8, 1.1, 1] }}
                      transition={{ duration: 0.5 }}
                    >
                      <BsCheckCircleFill size={52} className="text-green-400" />
                    </motion.div>
                    <h3 className="text-white font-bold text-xl">Message Sent!</h3>
                    <p className="text-gray-400 text-sm max-w-xs">
                      Thanks for reaching out. I'll get back to you within 24–48 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <h3 className="text-white font-bold text-lg mb-6">Send a Message</h3>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        id="name"
                        label="Your Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                      <FormField
                        id="email"
                        label="Your Email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <FormField
                      id="subject"
                      label="Subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                    />

                    <FormField
                      id="message"
                      label="Your Message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      required
                    />

                    {error && (
                      <p className="text-red-400 text-sm">{error}</p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={!submitting ? { scale: 1.03 } : {}}
                      whileTap={!submitting ? { scale: 0.97 } : {}}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl
                                 text-white font-semibold transition-all duration-300 disabled:opacity-70"
                      style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}
                    >
                      {submitting ? (
                        <>
                          <AiOutlineLoading3Quarters
                            size={16}
                            className="animate-spin"
                          />
                          Sending…
                        </>
                      ) : (
                        <>
                          <BsSendFill size={14} />
                          Send Message
                        </>
                      )}
                    </motion.button>

                    <p className="text-gray-600 text-xs text-center">
                      To wire up real email delivery, integrate{' '}
                      <a
                        href="https://www.emailjs.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-500 hover:underline"
                      >
                        EmailJS
                      </a>{' '}
                      or{' '}
                      <a
                        href="https://formspree.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-500 hover:underline"
                      >
                        Formspree
                      </a>
                      .
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
