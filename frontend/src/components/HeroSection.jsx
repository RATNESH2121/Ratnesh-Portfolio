import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Download, ArrowRight } from 'lucide-react';
import HeroScene from './three/HeroScene';
import HeroSampleDeck from './HeroSampleDeck';

/* ── Typewriter titles ── */
const TITLES = [
  'Full Stack Developer',
  'MERN Stack Engineer',
  'Creative Developer',
  'Open Source Contributor',
];

function Typewriter() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = TITLES[index];
    let timeout;

    if (!deleting && displayed.length < current.length) {
      // Typing
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === current.length) {
      // Pause then start deleting
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      // Deleting
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      // Move to next title
      setDeleting(false);
      setIndex((i) => (i + 1) % TITLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, index]);

  return (
    <span className="relative inline-block">
      <span className="text-foreground">
        {displayed}
      </span>
      {/* blinking cursor */}
      <span
        className="ml-[1px] inline-block w-[1.5px] h-[1em] align-middle"
        style={{
          background: 'hsl(var(--foreground))',
          animation: 'blink 1s step-end infinite',
          verticalAlign: 'middle',
          marginBottom: '2px',
        }}
      />
    </span>
  );
}

export default function HeroSection() {
  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 lg:pt-0">

      {/* ── @keyframes blink injected inline ── */}
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes float-bob {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          50%      { transform: translateY(-18px) rotate(1.5deg); }
        }
        @keyframes orb-drift {
          0%,100% { transform: scale(1) translate(0,0); opacity:.55; }
          33%      { transform: scale(1.08) translate(24px,-16px); opacity:.7; }
          66%      { transform: scale(0.94) translate(-18px,12px); opacity:.5; }
        }
        @keyframes label-glow {
          0%,100% { box-shadow: 0 0 0 0 hsl(var(--accent)/0); width:0%; }
          50%      { box-shadow: 0 0 12px 2px hsl(var(--accent)/.4); }
        }
        @keyframes label-bar-in {
          from { width:0% }
          to   { width:100% }
        }
        @keyframes btn-shimmer {
          0%   { transform: translateX(-130%) skewX(-20deg); }
          100% { transform: translateX(230%) skewX(-20deg); }
        }
        @keyframes btn-pulse-ring {
          0%   { box-shadow: 0 0 0 0px hsl(185 90% 60% / 0.55), 0 0 0 0px hsl(260 80% 65% / 0.35); }
          70%  { box-shadow: 0 0 0 10px hsl(185 90% 60% / 0), 0 0 0 18px hsl(260 80% 65% / 0); }
          100% { box-shadow: 0 0 0 0px hsl(185 90% 60% / 0), 0 0 0 0px hsl(260 80% 65% / 0); }
        }
      `}</style>

      {/* 3D Scene Background */}
      <HeroScene />

      {/* ── Ambient orb blob behind name ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[5%] top-[15%] w-[480px] h-[480px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse at 40% 40%, hsl(var(--foreground) / 0.15) 0%, transparent 70%)',
          filter: 'blur(72px)',
          animation: 'orb-drift 9s ease-in-out infinite',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[12%] top-[28%] w-[320px] h-[320px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse at 60% 60%, hsl(var(--foreground) / 0.08) 0%, transparent 70%)',
          filter: 'blur(56px)',
          animation: 'orb-drift 12s ease-in-out infinite reverse',
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

        {/* ── LEFT: Text Content ── */}
        <div className="text-center lg:text-left order-2 lg:order-1">

          {/* Label badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex flex-col items-start gap-1 mb-7"
          >
            <div className="flex items-center gap-3">
              {/* left dash */}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="block w-8 h-[2px] origin-left rounded-full"
                style={{ background: 'hsl(var(--foreground))' }}
              />
              <span className="text-sm md:text-base font-semibold tracking-[0.25em] uppercase text-foreground">
                Creative Developer
              </span>
            </div>
            {/* animated underline bar */}
            <motion.span
              className="block h-[1.5px] rounded-full ml-11"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '130px', opacity: 1 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: 'linear-gradient(90deg, hsl(var(--foreground)), transparent)',
                opacity: 0.5,
              }}
            />
          </motion.div>

          {/* Name — script/signature style */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="leading-[0.9] mb-5 text-center lg:text-left"
            style={{ fontFamily: "'Yellowtail', cursive", fontSize: 'clamp(5rem, 14vw, 9.5rem)', fontWeight: 400 }}
          >
            <span className="text-foreground relative z-10 drop-shadow-sm pr-4">Ratnesh</span>
          </motion.h1>

          {/* Typewriter subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl font-semibold mb-4 h-9 flex items-center justify-center lg:justify-start"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <Typewriter />
          </motion.div>

          {/* Sub-paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-lg text-foreground-muted font-body max-w-md mx-auto lg:mx-0 mb-10 leading-relaxed"
          >
            Building immersive digital experiences with cutting-edge technologies.
            Crafting the intersection of design and engineering.
          </motion.p>

          {/* ── CTA Buttons — glassmorphism container ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.88, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="inline-flex flex-col sm:flex-row items-center gap-3 p-2 rounded-2xl"
              style={{
                background: 'hsl(var(--background-elevated) / 0.45)',
                backdropFilter: 'blur(18px)',
                border: '1px solid hsl(var(--border) / 0.5)',
                boxShadow: '0 8px 32px hsl(0 0% 0% / 0.2), inset 0 1px 0 hsl(255 100% 100% / 0.06)',
              }}
            >
              {/* Primary: View My Work — Premium Aurora Button */}
              <motion.a
                href="#projects"
                className="relative overflow-hidden flex items-center justify-center gap-2 px-8 py-3.5 font-bold rounded-xl text-white text-sm whitespace-nowrap w-full sm:w-auto tracking-wide select-none"
                style={{
                  background: 'hsl(var(--foreground))',
                  color: 'hsl(var(--background))',
                  boxShadow: '0 4px 24px hsl(var(--foreground) / 0.15)',
                  border: '1px solid hsl(var(--background) / 0.1)',
                }}
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  boxShadow: '0 10px 36px hsl(240 80% 60% / 0.65), 0 2px 0 hsl(255 100% 100% / 0.2) inset',
                }}
                whileTap={{ scale: 0.96 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {/* Shimmer sweep */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: 'linear-gradient(105deg, transparent 35%, hsl(var(--background) / 0.2) 50%, transparent 65%)',
                    animation: 'btn-shimmer 2.6s ease-in-out infinite',
                  }}
                />
                {/* Top gloss highlight */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-[42%] rounded-t-xl"
                  style={{
                    background: 'linear-gradient(180deg, hsl(255 100% 100% / 0.18) 0%, transparent 100%)',
                  }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex items-center"
                  >
                    <ArrowRight size={15} strokeWidth={2.5} />
                  </motion.span>
                </span>
              </motion.a>

              {/* Secondary: Get in Touch */}
              <motion.a
                href="#contact"
                className="px-7 py-3 text-foreground font-semibold text-sm border rounded-xl hover:bg-background-elevated transition-all duration-300 w-full sm:w-auto text-center whitespace-nowrap"
                style={{ borderColor: 'hsl(var(--border))' }}
                whileHover={{ scale: 1.03, y: -2, borderColor: 'hsl(var(--border-glow))' }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get in Touch
              </motion.a>

              {/* Tertiary: Download Resume */}
              <motion.a
                href="/Ratnesh_CV.pdf"
                download="Ratnesh_CV.pdf"
                className="flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold rounded-xl border w-full sm:w-auto whitespace-nowrap transition-all duration-300"
                style={{
                  borderColor: 'hsl(var(--foreground) / 0.3)',
                  color: 'hsl(var(--foreground))',
                  background: 'transparent',
                }}
                whileHover={{
                  scale: 1.03,
                  y: -2,
                  background: 'hsl(var(--foreground) / 0.05)',
                  boxShadow: '0 0 20px hsl(var(--foreground) / 0.1)',
                }}
                whileTap={{ scale: 0.97 }}
              >
                <Download size={15} strokeWidth={2.2} />
                Download Resume
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT: Floating Cards with slow bob ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.82, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 lg:order-2 flex justify-center lg:justify-end"
          style={{ animation: 'float-bob 7s ease-in-out infinite' }}
        >
          <HeroSampleDeck />
        </motion.div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer hidden md:block"
        onClick={scrollToAbout}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-foreground-muted"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-[10px] tracking-[0.22em] uppercase font-medium">Scroll</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>

      {/* ── Social Links — vertical left ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="absolute left-6 bottom-10 hidden lg:flex flex-col items-center gap-4"
      >
        <div className="w-px h-12 bg-border" />
        {[
          { name: 'GitHub', href: 'https://github.com/RATNESH2121' },
          { name: 'LinkedIn', href: 'https://www.linkedin.com/in/ratnesh6208/' },
          { name: 'Twitter', href: '#' },
        ].map((social, i) => (
          <motion.a
            key={social.name}
            href={social.href}
            target={social.name === 'GitHub' || social.name === 'LinkedIn' ? '_blank' : undefined}
            rel={social.name === 'GitHub' || social.name === 'LinkedIn' ? 'noopener noreferrer' : undefined}
            className="text-foreground-muted hover:text-foreground transition-colors duration-300"
            whileHover={{ scale: 1.2, x: 2 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3 + i * 0.1 }}
          >
            {social.name === 'GitHub' && (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" clipRule="evenodd" />
              </svg>
            )}
            {social.name === 'LinkedIn' && (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            )}
            {social.name === 'Twitter' && (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            )}
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
