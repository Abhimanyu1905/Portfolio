import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * ParticleBackground — fixed full-screen <canvas> with floating dots
 * and connecting lines. Particle colour adapts to dark/light mode.
 * Sits at z-index 0, fully pointer-events-none.
 */
const ParticleBackground = () => {
  const canvasRef  = useRef(null);
  const rafRef     = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const COUNT  = 90;
    const MAX_D  = 130; // max connection distance
    let particles = [];

    // ── Resize ──────────────────────────────────────────────
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Particle class ───────────────────────────────────────
    class Particle {
      constructor() { this.init(); }
      init() {
        this.x   = Math.random() * canvas.width;
        this.y   = Math.random() * canvas.height;
        this.vx  = (Math.random() - 0.5) * 0.35;
        this.vy  = (Math.random() - 0.5) * 0.35;
        this.r   = Math.random() * 1.6 + 0.4;
        this.a   = Math.random() * 0.45 + 0.1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height)  this.vy *= -1;
      }
      draw() {
        // Dark: purple tint. Light: muted purple (less opaque)
        const rgb   = isDark ? '139, 92, 246' : '124, 58, 237';
        const alpha = isDark ? this.a : this.a * 0.35;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${alpha})`;
        ctx.fill();
      }
    }

    // ── Init ────────────────────────────────────────────────
    particles = Array.from({ length: COUNT }, () => new Particle());

    // ── Animation loop ───────────────────────────────────────
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach((p) => { p.update(); p.draw(); });

      // Draw connections
      const lineRgb = isDark ? '124, 58, 237' : '124, 58, 237';
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_D) {
            const alpha = (1 - dist / MAX_D) * (isDark ? 0.08 : 0.03);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${lineRgb}, ${alpha})`;
            ctx.lineWidth   = 0.6;
            ctx.stroke();
          }
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
